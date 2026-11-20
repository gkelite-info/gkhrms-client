"use client"

import { useState } from "react"
import {
  Upload,
  User,
  Calendar,
  ChevronDown,
} from "lucide-react"
import { RegisteredUser } from "./UserRegistrationData"
import HRManagerSuccessModal from "./HRManagerSuccessModal"
import HRManagerDetailsModal from "./HRManagerDetailsModal"

interface RegisterUserScreenProps {
  onCancel: () => void
  onRegister: (user: RegisteredUser) => void
}

export default function RegisterUserScreen({
  onCancel,
  onRegister,
}: RegisterUserScreenProps) {
  const role = "HR Manager"
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phonePrefix, setPhonePrefix] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const [employeeId, setEmployeeId] = useState(
    `HRM00${Math.floor(Math.random() * 90) + 10}`
  )
  const [department, setDepartment] = useState("Human Resources")
  const [designation, setDesignation] = useState("HR Manager")
  const [workLocation, setWorkLocation] = useState("")
  const [employmentType, setEmploymentType] = useState("Permanent")
  const [joiningDate, setJoiningDate] = useState("")

  const [reportingTo, setReportingTo] = useState("Chairman")
  const [accountStatus, setAccountStatus] = useState<"Active" | "Inactive">("Active")

  const [photoError, setPhotoError] = useState("")
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Photo must be less than 2 MB")
      return
    }
    setPhotoError("")
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfilePhoto(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const getInitials = (first: string, last: string) => {
    const f = first.trim().charAt(0).toUpperCase()
    const l = last.trim().charAt(0).toUpperCase()
    return f && l ? `${f}${l}` : f || "UR"
  }

  const getRandomColor = () => {
    const colors = [
      "bg-purple-100 text-purple-700",
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-sky-100 text-sky-700",
      "bg-pink-100 text-pink-700",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleResetForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhoneNumber("")
    setGender("")
    setProfilePhoto(null)
    setEmployeeId(`HRM00${Math.floor(Math.random() * 90) + 10}`)
    setWorkLocation("")
    setJoiningDate("")
    setIsSuccessOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return

    const fullName = `${firstName.trim()} ${lastName.trim()}`
    const newUser: RegisteredUser = {
      id: Date.now(),
      name: fullName,
      initials: getInitials(firstName, lastName),
      avatarColor: getRandomColor(),
      employeeId: employeeId.trim() || `HRM00${Math.floor(Math.random() * 90) + 10}`,
      email: email.trim(),
      phone: phoneNumber.trim() ? `${phonePrefix} ${phoneNumber.trim()}` : "+91 98765 00000",
      role,
      department: department.trim() || "Human Resources",
      status: accountStatus,
      createdDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      designation: designation.trim() || "HR Manager",
      workLocation: workLocation.trim() || "Hyderabad",
      employmentType: employmentType.trim() || "Permanent",
      joiningDate: joiningDate.trim() || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      reportingTo: `${reportingTo.trim()} (Chairman)`,
      invitationStatus: `Invited (${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })})`,
      avatarPhoto: profilePhoto || "/images/jane_smith.jpg",
    }

    onRegister(newUser)
    setRegisteredUser(newUser)
    setIsSuccessOpen(true)
  }

  return (
    <div className="w-full bg-white border border-slate-100/90 rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Register {role}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Add a new {role} to your organization. An invitation email will be sent to the registered email address.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs">
        <div className="border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Phone <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-20 shrink-0">
                  <select
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Gender</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Profile Photo <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-400">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs cursor-pointer transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG (Max 2 MB)
                  </span>
                  {photoError && (
                    <span className="text-[10px] text-rose-500">{photoError}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Employment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Employee ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter employee ID"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Department / HR Function <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product Team">Product Team</option>
                  <option value="IT & Infrastructure">IT & Infrastructure</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">
                  Designation <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <span className="text-[10px] font-semibold text-[#5B50E5] bg-[#EEF0FD] px-1.5 py-0.5 rounded-md">
                  Auto-filled
                </span>
              </div>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Work Location</label>
              <div className="relative">
                <select
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="">Select location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Remote">Remote</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Employment Type</label>
              <div className="relative">
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Probation">Probation</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Joining Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Account Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Role</label>
              <input
                type="text"
                disabled
                value={role}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-600 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Reporting To <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={reportingTo}
                  onChange={(e) => setReportingTo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="Chairman">Chairman</option>
                  <option value="CEO">CEO</option>
                  <option value="Board of Directors">Board of Directors</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Account Status <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={accountStatus}
                  onChange={(e) => setAccountStatus(e.target.value as "Active" | "Inactive")}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] cursor-pointer"
                >
                  <option value="Active">● Active</option>
                  <option value="Inactive">● Inactive</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#5B50E5] hover:bg-[#4E44D4] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Register {role}
          </button>
        </div>
      </form>

      <HRManagerSuccessModal
        isOpen={isSuccessOpen}
        onClose={onCancel}
        user={registeredUser}
        onViewUser={() => {
          setIsDetailsOpen(true)
        }}
        onRegisterAnother={handleResetForm}
      />

      <HRManagerDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        user={registeredUser}
        onUpdateUser={(updated) => {
          setRegisteredUser(updated)
        }}
      />
    </div>
  )
}
