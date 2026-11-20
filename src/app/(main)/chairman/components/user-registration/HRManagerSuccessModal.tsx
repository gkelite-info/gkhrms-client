"use client"

import { X, Check } from "lucide-react"
import { RegisteredUser } from "./UserRegistrationData"

interface HRManagerSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  user: RegisteredUser | null
  onViewUser: () => void
  onRegisterAnother: () => void
}

export default function HRManagerSuccessModal({
  isOpen,
  onClose,
  user,
  onViewUser,
  onRegisterAnother,
}: HRManagerSuccessModalProps) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 relative text-center border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-20 h-20 mx-auto flex items-center justify-center mt-1">
          <span className="absolute -top-1 left-4 w-1.5 h-3 bg-emerald-400 rounded-full rotate-[-25deg] opacity-80" />
          <span className="absolute -top-1.5 right-6 w-1 h-2.5 bg-indigo-400 rounded-full rotate-[15deg] opacity-80" />
          <span className="absolute top-3 -left-1 w-2.5 h-1 bg-amber-400 rounded-full rotate-[-15deg] opacity-80" />
          <span className="absolute top-4 -right-1 w-2.5 h-1.5 bg-emerald-500 rounded-full rotate-[30deg] opacity-80" />
          <span className="absolute bottom-2 -left-0.5 w-1.5 h-1.5 bg-purple-400 rounded-full" />
          <span className="absolute bottom-1 -right-0.5 w-2 h-1 bg-sky-400 rounded-full rotate-[-20deg]" />

          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-emerald-100/60">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight">
          HR Manager Registered Successfully!
        </h3>

        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
          An invitation email with a set password link has been sent to the registered email address.
        </p>

        <div className="bg-[#F9FAFC] border border-slate-100/90 rounded-2xl p-3.5 mt-5 flex items-center gap-3.5 text-left">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200/60 bg-slate-100 flex items-center justify-center">
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
                className={`w-full h-full flex items-center justify-center text-xs font-bold ${user.avatarColor}`}
              >
                {user.initials}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {user.name}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Employee ID: {user.employeeId}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              Email: {user.email}
            </p>
            <p className="text-[11px] text-slate-500">
              Role: {user.role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={onViewUser}
            className="h-10 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center"
          >
            View User
          </button>

          <button
            type="button"
            onClick={onRegisterAnother}
            className="h-10 px-4 bg-[#5B50E5] hover:bg-[#4E44D4] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center"
          >
            Register Another
          </button>
        </div>
      </div>
    </div>
  )
}
