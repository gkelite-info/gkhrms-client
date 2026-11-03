import { ChangeEvent, useState } from "react"
import { AppDispatch } from "../../../Redux/Store"
import { useDispatch } from "react-redux"
import { userLogin } from "../Slice/loginSlice"
import { useRouter } from "next/navigation"
export type loginData = {
  email: string
  password: string
}

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [user, setUser] = useState<loginData>({
    email: "",
    password: "",
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(userLogin({ userData: user }))

    if (userLogin.fulfilled.match(result)) {
      const { role } = result.payload
      switch (role) {
        case "Employee":
          router.push("/employee")
          break
        case "Hr":
          router.push("/")
          break
        case "Manager":
          router.push("/manager")
          break
        case "Admin":
          router.push("/admin")
          break
        case "TeamLead":
          router.push("/teamlead")
          break
        case "ProductManager":
          router.push("/productmanager")
          break
        default:
          router.push("/login")
      }
    }
  }

  return {
    user,
    handleChangeInput,
    handleSubmit,
  }
}
