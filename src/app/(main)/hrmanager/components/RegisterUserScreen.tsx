"use client"

import { useState } from "react"
import {
  User,
  Briefcase,
  Users,
  Building2,
  Calendar,
  ChevronDown,
} from "lucide-react"
import { UserRecord, UserStatus } from "../types"
import RegistrationSuccessModal from "./RegistrationSuccessModal"

interface RegisterUserScreenProps {
  onCancel: () => void
  onRegister: (newUser: UserRecord) => void
  onViewRegisteredUser: (user: UserRecord) => void
  nextEmployeeId: string
  activeTab: "users" | "departments"
  onTabChange: (tab: "users" | "departments") => void
}

export default function RegisterUserScreen({
  onCancel,
  onRegister,
  onViewRegisteredUser,
  nextEmployeeId,
  activeTab,
  onTabChange,
}: RegisterUserScreenProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phonePrefix, setPhonePrefix] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("98765 43210")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")

  const [employeeId, setEmployeeId] = useState(nextEmployeeId || "EMP-1048")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
  const [designation, setDesignation] = useState("")
  const [workLocation, setWorkLocation] = useState("")
  const [joiningDate, setJoiningDate] = useState("")

  const [reportingTo, setReportingTo] = useState("")
  const [accountStatus, setAccountStatus] = useState<UserStatus>("Active")
  const [sendInviteEmail, setSendInviteEmail] = useState(true)

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [stateName, setStateName] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [notes, setNotes] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [registeredUser, setRegisteredUser] = useState<UserRecord | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const getInitials = (first: string, last: string): string => {
    const f = first.trim().charAt(0).toUpperCase()
    const l = last.trim().charAt(0).toUpperCase()
    if (f && l) return `${f}${l}`
    if (f) return f.substring(0, 2)
    return "UR"
  }

  const resetForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhoneNumber("98765 43210")
    setGender("")
    setDob("")
    setRole("")
    setDepartment("")
    setDesignation("")
    setWorkLocation("")
    setJoiningDate("")
    setReportingTo("")
    setAddress("")
    setCity("")
    setStateName("")
    setPinCode("")
    setNotes("")
    setErrorMessage("")
    setEmployeeId(`EMP-${1000 + Math.floor(Math.random() * 900) + 100}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter both First Name and Last Name.")
      return
    }

    if (!email.trim()) {
      setErrorMessage("Please enter a valid Email Address.")
      return
    }

    const todayStr = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date())

    const fullName = `${firstName.trim()} ${lastName.trim()}`
    const fullPhone = `${phonePrefix} ${phoneNumber.trim()}`

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      name: fullName,
      initials: getInitials(firstName, lastName),
      employeeId: employeeId.trim() || nextEmployeeId,
      email: email.trim(),
      phone: fullPhone,
      role: role.trim() || "HR Manager",
      department: department.trim() || "Human Resources",
      designation: designation.trim() || role.trim() || "HR Manager",
      workLocation: workLocation.trim() || "Hyderabad",
      joiningDate: joiningDate.trim() || todayStr,
      employmentType: "Permanent",
      reportingTo: reportingTo.trim() || "Ramesh Kumar (Chairman)",
      invitationStatus: "Invited (08 Oct 2026)",
      avatarUrl: "/images/jane_smith.jpg",
      gender,
      address,
      city,
      state: stateName,
      pinCode,
      notes,
      status: accountStatus,
      createdDate: todayStr,
    }

    onRegister(newUser)
    setRegisteredUser(newUser)
    setIsSuccessModalOpen(true)
  }

  const handleRegisterAnother = () => {
    setIsSuccessModalOpen(false)
    resetForm()
  }

  const handleViewUser = () => {
    if (registeredUser) {
      setIsSuccessModalOpen(false)
      onViewRegisteredUser(registeredUser)
    }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Register User
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Add a new user to the HR portal. Fill in the details below and send an
          invitation email.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange("users")}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "users"
              ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Registration</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("departments")}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "departments"
              ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Departments</span>
        </button>
      </div>

      <div className="pt-1">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Register User
        </h2>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Add a new user to the HR portal. Fill in the details below and send an
          invitation email.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-xl border border-rose-100">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100/80">
              <User className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    setErrorMessage("")
                  }}
                  placeholder="Enter first name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    setErrorMessage("")
                  }}
                  placeholder="Enter last name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrorMessage("")
                  }}
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#4F46E5]/20 focus-within:border-[#4F46E5] bg-white transition-all">
                  <select
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+971">+971</option>
                  </select>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Date of Birth
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD MMM YYYY"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all pr-9"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100/80">
              <Briefcase className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                Employment Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Employee ID <span className="text-rose-500">*</span>
                  </label>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Auto-generated
                  </span>
                </div>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Role <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select role</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Employee">Employee</option>
                    <option value="Finance">Finance</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Finance Executive">Finance Executive</option>
                    <option value="Tech Admin">Tech Admin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select department</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product">Product</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Designation <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select designation</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Senior Software Engineer">
                      Senior Software Engineer
                    </option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Lead">Product Lead</option>
                    <option value="Product Analyst">Product Analyst</option>
                    <option value="Senior Accountant">Senior Accountant</option>
                    <option value="Finance Associate">Finance Associate</option>
                    <option value="DevOps Lead">DevOps Lead</option>
                    <option value="Operations Executive">
                      Operations Executive
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Work Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select location</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Head Office (Mumbai)">
                      Head Office (Mumbai)
                    </option>
                    <option value="Bengaluru Branch">Bengaluru Branch</option>
                    <option value="Delhi Regional Hub">
                      Delhi Regional Hub
                    </option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Joining Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    placeholder="DD MMM YYYY"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all pr-9"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100/80">
              <Users className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                Reporting & Access
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Reporting To <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={reportingTo}
                    onChange={(e) => setReportingTo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="">Select reporting manager</option>
                    <option value="Chairman">Chairman</option>
                    <option value="Ramesh Kumar (Chairman)">
                      Ramesh Kumar (Chairman)
                    </option>
                    <option value="Eleanor Vance (HR Manager)">
                      Eleanor Vance (HR Manager)
                    </option>
                    <option value="Aarav Sharma (Product Manager)">
                      Aarav Sharma (Product Manager)
                    </option>
                    <option value="Meera Patel (Team Lead)">
                      Meera Patel (Team Lead)
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Options will be shown based on selected role.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Account Status <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={accountStatus}
                    onChange={(e) =>
                      setAccountStatus(e.target.value as UserStatus)
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-400">
                  User can access the portal after registration.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSendInviteEmail((prev) => !prev)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    sendInviteEmail ? "bg-[#4F46E5]" : "bg-slate-200"
                  }`}
                  aria-label="Toggle send invitation email"
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform transform ${
                      sendInviteEmail ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">
                    Send Invitation Email
                  </span>
                  <span className="text-[11px] text-slate-400">
                    An invitation email with login details will be sent to the
                    user.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100/80">
              <Building2 className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                Additional Information{" "}
                <span className="text-slate-400 font-normal text-xs">
                  (Optional)
                </span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    State
                  </label>
                  <div className="relative">
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer transition-all pr-8"
                    >
                      <option value="">Select state</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter PIN code"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes (optional)"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
          >
            Register User
          </button>
        </div>
      </form>

      <RegistrationSuccessModal
        isOpen={isSuccessModalOpen}
        user={registeredUser}
        onClose={onCancel}
        onViewUser={handleViewUser}
        onRegisterAnother={handleRegisterAnother}
      />
    </div>
  )
}
