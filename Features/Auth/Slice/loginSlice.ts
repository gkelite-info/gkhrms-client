import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
// Assuming these imports are correct based on your file structure
import { API } from "../../../Core/url" 
import { AuthState, LoginResponse, LoginUserData, Roles } from "./loginType"

// --- Async Thunk for User Login ---
export const userLogin = createAsyncThunk<
	LoginResponse,
	{ userData: LoginUserData },
	{ rejectValue: string }
>("auth/login", async ({ userData }, { rejectWithValue }) => {
	try {
		const response = await API.post("/auth/login", userData)
		return response.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log("LoginSlice error:", error?.response?.data)
		if (error?.response?.data?.message) {
			return rejectWithValue(error.response.data.message)
		}
		// Fallback for general errors (e.g., network issues)
		return rejectWithValue(error.message) 
	}
})

// --- Initial State and Role Validation ---
const initialState: AuthState = {
	token: null,
	role: null,
	loading: false,
	error: null,
	fullname: null,
	photoURL: null
}

const validRoles: Roles[] = [
	"Employee",
	"Hr",
	"Manager",
	"Admin",
	"TeamLead",
	"ProductManager",
	"HrManager",
	"Finance",
	"FinanceManager",
	"FinanceExecutive",
	"Accountant",
]

function isValidRole(role: string): role is Roles {
	return validRoles.includes(role as Roles)
}

// --- Slice Definition ---
const tokenSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null
			state.error = null
			state.role = null
            state.fullname = null
            state.photoURL = null
            state.loading = false
		},
		setAuthDetails: (state, action: PayloadAction<{ role: string; fullName: string; photoURL: string | null; token: string }>) => { 
			const { role, fullName, photoURL, token } = action.payload;

			if (isValidRole(role)) {
				state.role = role as Roles;
			}
			state.fullname = fullName;
			state.photoURL = photoURL;
			state.token = token;
            state.error = null
		},
		setProfileData: (state, action: PayloadAction<any>) => {
			// Used to update profile details (fullname, photoURL) after initial login
			state.fullname = action.payload.fullname || state.fullname;
			state.photoURL = action.payload.photoURL || state.photoURL;
		},
        // Corrected state type for simplicity (it's inferred as AuthState)
		setRoleFromStorage: (state, action: PayloadAction<string>) => {
			if (isValidRole(action.payload)) {
				state.role = action.payload as Roles
			}
		},
        // Corrected state type for simplicity (it's inferred as AuthState)
		setTokenFromStorage: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
	}, // <-- All reducers are correctly contained within this object
    
	// --- Extra Reducers (Async Thunk handling) ---
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				userLogin.fulfilled,
				(state, action: PayloadAction<LoginResponse>) => {
					state.loading = false

					if (isValidRole(action.payload.role)) {
						state.role = action.payload.role
					}

                    // Assuming LoginResponse also contains token, fullName, and photoURL
                    // If not, you might need to fetch profile data separately.
					state.token = action.payload.token
					state.error = null
                    // If the payload contains more details:
                    // state.fullname = action.payload.fullName || state.fullname;
                    // state.photoURL = action.payload.photoURL || state.photoURL;
				}
			)
			.addCase(
				userLogin.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false
					state.token = null // Clear token on failed login attempt
					state.error = action.payload || "An unknown error occurred during login."
				}
			)
	},
}) // <-- The main createSlice argument object closes here

// --- Actions Export ---
export const { 
    logout, 
    setAuthDetails, 
    setProfileData, 
    setRoleFromStorage, 
    setTokenFromStorage 
} = tokenSlice.actions

// --- Reducer Export ---
export default tokenSlice.reducer
