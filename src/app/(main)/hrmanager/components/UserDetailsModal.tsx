"use client"

import {
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  UserCheck,
  Briefcase,
  Pencil,
  Link2,
} from "lucide-react"
import Image from "next/image"
import { UserRecord } from "../types"

interface UserDetailsModalProps {
  user: UserRecord | null
  onClose: () => void
  onEdit?: (user: UserRecord) => void
}

export default function UserDetailsModal({
  user,
  onClose,
  onEdit,
}: UserDetailsModalProps) {
  if (!user) return null

  const modalTitle = user.role ? `${user.role} Details` : "HR Manager Details"
  const workLocation = user.workLocation || "Hyderabad"
  const designation = user.designation || user.role
  const joiningDate = user.joiningDate || user.createdDate
  const employmentType = user.employmentType || "Permanent"
  const reportingTo = user.reportingTo || "Ramesh Kumar (Chairman)"
  const invitationStatus = user.invitationStatus || "Invited (08 Oct 2026)"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[75vh] sm:max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            {modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3.5">
              <div className="w-full flex flex-col items-center pb-3 border-b border-slate-100">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs">
                  {user.avatarUrl && (user.avatarUrl.startsWith("http://") || user.avatarUrl.startsWith("https://")) ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={user.avatarUrl || "/images/jane_smith.jpg"}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-2.5">
                  {user.name}
                </h3>

                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2FF] text-[#4F46E5]">
                  {user.role}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    user.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      user.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  />
                  {user.status}
                </span>
              </div>

              <div className="w-full space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{user.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{user.department}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{workLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Joined on {joiningDate}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-600 pt-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Reports to
                    </span>
                    <span className="text-xs text-slate-800 font-semibold">
                      {reportingTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3.5">
              <div className="border border-slate-200/80 rounded-xl sm:rounded-2xl p-4 bg-white space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <h4 className="font-bold text-slate-800 text-xs">
                      Employment Details
                    </h4>
                  </div>

                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-[#4F46E5] hover:border-[#4F46E5]/40 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Employee ID
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {user.employeeId}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Department / HR Function
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {user.department}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Designation
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {designation}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Work Location
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {workLocation}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Joining Date
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {joiningDate}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Employment Type
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {employmentType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-xl sm:rounded-2xl p-4 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Link2 className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <h4 className="font-bold text-slate-800 text-xs">
                    Account Details
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Role
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {user.role}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Reporting To
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {reportingTo}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Account Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        user.status === "Active"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Invitation Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {invitationStatus}
                    </span>
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
