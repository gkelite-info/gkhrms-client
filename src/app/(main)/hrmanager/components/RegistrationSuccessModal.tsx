"use client"

import { Check, X } from "lucide-react"
import Image from "next/image"
import { UserRecord } from "../types"

interface RegistrationSuccessModalProps {
  isOpen: boolean
  user: UserRecord | null
  onClose: () => void
  onViewUser: () => void
  onRegisterAnother: () => void
}

export default function RegistrationSuccessModal({
  isOpen,
  user,
  onClose,
  onViewUser,
  onRegisterAnother,
}: RegistrationSuccessModalProps) {
  if (!isOpen || !user) return null

  const roleTitle = user.role
    ? `${user.role} Registered Successfully!`
    : "HR Manager Registered Successfully!"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[70vh] sm:max-h-[75vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-end px-5 pt-3.5 pb-1 shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-lg shadow-emerald-200 ring-8 ring-emerald-50">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#10B981] rounded-full" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#10B981] rounded-full" />
              <span className="absolute top-1 -right-2 w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
              <span className="absolute bottom-1.5 -right-2.5 w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
              <span className="absolute top-1.5 -left-2 w-1.5 h-1.5 bg-[#06B6D4] rounded-full" />
              <span className="absolute -top-1 right-3.5 w-1 h-2 bg-[#10B981] rounded-full rotate-25" />
              <span className="absolute -top-1 left-3.5 w-1 h-2 bg-[#10B981] rounded-full -rotate-25" />
              <span className="absolute bottom-1 -left-1.5 w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {roleTitle}
            </h3>

            <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
              An invitation email with a set password link has been sent to the
              registered email address.
            </p>

            <div className="w-full mt-4 bg-[#F8FAFC] border border-slate-100 rounded-xl p-3.5 flex items-center gap-3.5 text-left">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200/80 shadow-2xs">
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
                    sizes="48px"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {user.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Employee ID:{" "}
                  <span className="font-semibold text-slate-700">
                    {user.employeeId}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Email:{" "}
                  <span className="font-semibold text-slate-700">
                    {user.email}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Role:{" "}
                  <span className="font-semibold text-slate-700">
                    {user.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3 border-t border-slate-100 bg-white shrink-0 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onViewUser}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer text-center"
          >
            View User
          </button>

          <button
            type="button"
            onClick={onRegisterAnother}
            className="flex-1 py-2 px-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs shadow-sm shadow-indigo-200 transition-colors cursor-pointer text-center"
          >
            Register Another
          </button>
        </div>
      </div>
    </div>
  )
}
