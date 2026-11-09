'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { origin } from '@/api-requests/config';
import { useDispatch } from 'react-redux';
import { setRoleFromStorage, setTokenFromStorage } from '../../../../Features/Auth/Slice/loginSlice';
import { Roles } from '../../../../Features/Auth/Slice/loginType';

export default function Signin() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const handleLogin = async () => {
		setLoading(true)
		try {
			const res = await axios.post(`${origin}/api/v1/employee/login`, {
				email,
				password
			})
			const employee = res.data.employee;
			const token = res.data.token;

			localStorage.setItem('employeeId', employee.employeeId.toString());
			if (token) {
				localStorage.setItem('token', token);
			}

			const apiRole = employee.role.toLowerCase();
			let roleForRedux: Roles | null = null;

			if (apiRole === 'admin') {
				roleForRedux = 'Admin';
			} else if (apiRole === 'employee') {
				roleForRedux = 'Employee';
			} else if (apiRole === 'hr') {
				roleForRedux = 'Hr';
			} else if (apiRole === 'manager') {
				roleForRedux = 'Manager';
			} else if (apiRole === 'teamlead' || apiRole === 'team lead') {
				roleForRedux = 'TeamLead';
			} else if (apiRole === 'productmanager' || apiRole === 'product manager' || apiRole === 'pm') {
				roleForRedux = 'ProductManager';
			} else if (apiRole === 'hrmanager' || apiRole === 'hr manager' || apiRole === 'hrm') {
				roleForRedux = 'HrManager';
			} else if (apiRole === 'finance' || apiRole === 'financemanager' || apiRole === 'finance manager') {
				roleForRedux = 'FinanceManager';
			} else if (apiRole === 'financeexecutive' || apiRole === 'finance executive' || apiRole === 'fe') {
				roleForRedux = 'FinanceExecutive';
			} else if (apiRole === 'accountant' || apiRole === 'account' || apiRole === 'accounts') {
				roleForRedux = 'Accountant';
			} else if (apiRole === 'accountantexecutive' || apiRole === 'accountant executive' || apiRole === 'ae') {
				roleForRedux = 'AccountantExecutive';
			}

			if (roleForRedux) {
				dispatch(setRoleFromStorage(roleForRedux));
				if (token) {
					dispatch(setTokenFromStorage(token));
				}
			}

			console.log('Login Success:', employee)

			if (apiRole === 'admin') {
				router.push('/admin')
			} else if (apiRole === 'employee') {
				router.push('/employee')
			} else if (apiRole === 'hr') {
				router.push('/hr')
			} else if (apiRole === 'manager') {
				router.push('/manager')
			} else if (apiRole === 'teamlead' || apiRole === 'team lead') {
				router.push('/teamlead')
			} else if (apiRole === 'productmanager' || apiRole === 'product manager' || apiRole === 'pm') {
				router.push('/productmanager')
			} else if (apiRole === 'hrmanager' || apiRole === 'hr manager' || apiRole === 'hrm') {
				router.push('/hrmanager/attendance')
			} else if (apiRole === 'finance' || apiRole === 'financemanager' || apiRole === 'finance manager') {
				router.push('/financemanager/attendance')
			} else if (apiRole === 'financeexecutive' || apiRole === 'finance executive' || apiRole === 'fe') {
				router.push('/financeexecutive/attendance')
			} else if (apiRole === 'accountant' || apiRole === 'account' || apiRole === 'accounts') {
				router.push('/accountant')
			} else if (apiRole === 'accountantexecutive' || apiRole === 'accountant executive' || apiRole === 'ae') {
				router.push('/accountantexecutive/attendance')
			} else {
				router.push('/unauthorized')
			}

		} catch (err: any) {
			alert(err.response?.data?.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}


	return (
		<div className="h-screen flex">
			<div className="w-1/2 flex items-center justify-center bg-white">
				<div className="w-[70%] p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-4 text-[#323232] text-center">Login</h2>

					<div className="mb-3">
						<label className="block mb-1 text-[#323232]">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full border px-2 py-1 border-[#AFAFAF] text-sm text-[#777777] focus:outline-none text-[#323232] rounded"
						/>
					</div>

					<div className="mb-3">
						<label className="block mb-1 text-[#323232]">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleLogin();
								}
							}}
							className="w-full border px-2 py-1 border-[#AFAFAF] focus:outline-none text-[#777777] rounded"
						/>
					</div>

					<button
						onClick={handleLogin}
						disabled={loading}
						className="w-full bg-[#874DE6] text-white py-2 rounded mb-2 cursor-pointer">{loading ? 'Logging in...' : 'Login'}</button>
				</div>
			</div>

			<div className="w-1/2 bg-[#F6F0FF] flex items-center justify-center">
				<img src="/images/Login.png" alt="Login Image" className="h-full object-cover" />
			</div>
		</div>
	)
}