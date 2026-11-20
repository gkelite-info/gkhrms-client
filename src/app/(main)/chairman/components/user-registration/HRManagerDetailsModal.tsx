"use client"

import { useState, useEffect } from "react"
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Key,
  Pencil,
  Check,
  Building2,
} from "lucide-react"
import { RegisteredUser } from "./UserRegistrationData"

interface HRManagerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: RegisteredUser | null
  onUpdateUser?: (updated: RegisteredUser) => void
}

export default function HRManagerDetailsModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}: HRManagerDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editEmployeeId, setEditEmployeeId] = useState("")
  const [editDepartment, setEditDepartment] = useState("")
  const [editDesignation, setEditDesignation] = useState("")
  const [editWorkLocation, setEditWorkLocation] = useState("")
  const [editJoiningDate, setEditJoiningDate] = useState("")
  const [editEmploymentType, setEditEmploymentType] = useState("")

  useEffect(() => {
    if (user) {
      setEditEmployeeId(user.employeeId)
      setEditDepartment(user.department)
      setEditDesignation(user.designation || "HR Manager")
      setEditWorkLocation(user.workLocation || "Hyderabad")
      setEditJoiningDate(user.joiningDate || user.createdDate)
      setEditEmploymentType(user.employmentType || "Permanent")
      setIsEditing(false)
    }
  }, [user])

  if (!isOpen || !user) return null

  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        employeeId: editEmployeeId,
        department: editDepartment,
        designation: editDesignation,
        workLocation: editWorkLocation,
        joiningDate: editJoiningDate,
        employmentType: editEmploymentType,
      })
    }
    setIsEditing(false)
  }

  const reportsToDisplay = user.reportingTo || "Ramesh Kumar (Chairman)"
  const reportingToShort = reportsToDisplay.includes("(")
    ? reportsToDisplay.split("(")[1].replace(")", "").trim()
    : reportsToDisplay

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            HR Manager Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4 flex flex-col items-center text-center p-2">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs flex items-center justify-center bg-slate-100">
                {user.avatarPhoto ? (
                  <img
                    src={user.avatarPhoto}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-xl font-bold ${user.avatarColor}`}
                  >
                    {user.initials}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-3">
                {user.name}
              </h3>

              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-[#5B50E5] border border-purple-100 mt-1">
                {user.role}
              </span>

              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    user.status === "Active"
                      ? "bg-emerald-500"
                      : user.status === "Invited"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />
                <span
                  className={
                    user.status === "Active"
                      ? "text-emerald-600"
                      : user.status === "Invited"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }
                >
                  {user.status}
                </span>
              </div>

              <div className="w-full border-t border-slate-100 mt-6 pt-5 space-y-3.5 text-xs text-slate-600 text-left">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{user.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{user.department}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{user.workLocation || "Hyderabad"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined on {user.joiningDate || user.createdDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Reports to {reportsToDisplay}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col gap-4">
              <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span>Employment Details</span>
                  </div>

                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#5B50E5] border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#5B50E5] hover:bg-[#4E44D4] text-white rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4 text-xs">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Employee ID
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.employeeId}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Department / HR Function
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.department}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Designation
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.designation || "HR Manager"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Work Location
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.workLocation || "Hyderabad"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Joining Date
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.joiningDate || user.createdDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Employment Type
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {user.employmentType || "Permanent"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={editEmployeeId}
                        onChange={(e) => setEditEmployeeId(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Department / HR Function
                      </label>
                      <input
                        type="text"
                        value={editDepartment}
                        onChange={(e) => setEditDepartment(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={editDesignation}
                        onChange={(e) => setEditDesignation(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Work Location
                      </label>
                      <input
                        type="text"
                        value={editWorkLocation}
                        onChange={(e) => setEditWorkLocation(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Joining Date
                      </label>
                      <input
                        type="text"
                        value={editJoiningDate}
                        onChange={(e) => setEditJoiningDate(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Employment Type
                      </label>
                      <input
                        type="text"
                        value={editEmploymentType}
                        onChange={(e) => setEditEmploymentType(e.target.value)}
                        className="w-full h-8 px-2.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5B50E5]"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm pb-3 border-b border-slate-100">
                  <Key className="w-4 h-4 text-slate-500" />
                  <span>Account Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4 text-xs">
                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      Role
                    </p>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {user.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      Reporting To
                    </p>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {reportingToShort || "Chairman"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      Account Status
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : user.status === "Invited"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          user.status === "Active"
                            ? "text-emerald-600"
                            : user.status === "Invited"
                            ? "text-amber-600"
                            : "text-slate-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      Invitation Status
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-amber-600">
                        {user.invitationStatus || `Invited (${user.createdDate})`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
