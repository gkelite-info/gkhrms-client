"use client"

import { useState } from "react"
import { X, UserPlus } from "lucide-react"
import { RegisteredUser } from "./UserRegistrationData"

interface RegisterUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAddUser: (user: RegisteredUser) => void
  defaultRole?: "HR Manager" | "Manager"
}

export default function RegisterUserModal({
  isOpen,
  onClose,
  onAddUser,
  defaultRole = "HR Manager",
}: RegisterUserModalProps) {
  const [name, setName] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState<"HR Manager" | "Manager">(defaultRole)
  const [department, setDepartment] = useState("Human Resources")
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")

  if (!isOpen) return null

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return fullName.slice(0, 2).toUpperCase() || "U"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const generatedId =
      employeeId.trim() ||
      (role === "HR Manager"
        ? `HRM${Math.floor(100 + Math.random() * 900)}`
        : `MNG${Math.floor(100 + Math.random() * 900)}`)

    const newUser: RegisteredUser = {
      id: Date.now(),
      name: name.trim(),
      initials: getInitials(name),
      avatarColor: getRandomColor(),
      employeeId: generatedId,
      email: email.trim(),
      phone: phone.trim() || "98765 00000",
      role,
      department: department.trim() || "Operations",
      status,
      createdDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      designation: role,
      workLocation: "Hyderabad",
      employmentType: "Permanent",
      joiningDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      reportingTo: "Chairman",
      invitationStatus: `Invited (${new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })})`,
      avatarPhoto: "/images/jane_smith.jpg",
    }

    onAddUser(newUser)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Register New User
              </h2>
              <p className="text-xs text-slate-500">
                Add an HR Manager or Manager to your organization.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patel"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Auto-generated if empty"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh.patel@gk.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 12345"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Role</label>
              <input
                type="text"
                disabled
                value="HR Manager"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Department / Function
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Human Resources"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">Status</label>
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="userStatus"
                  checked={status === "Active"}
                  onChange={() => setStatus("Active")}
                  className="text-[#5B50E5] focus:ring-[#5B50E5]"
                />
                <span className="text-slate-700 font-medium">Active</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="userStatus"
                  checked={status === "Inactive"}
                  onChange={() => setStatus("Inactive")}
                  className="text-[#5B50E5] focus:ring-[#5B50E5]"
                />
                <span className="text-slate-700 font-medium">Inactive</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5B50E5] hover:bg-[#4E44D4] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Register User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
