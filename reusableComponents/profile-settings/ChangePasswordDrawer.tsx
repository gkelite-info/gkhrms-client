"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, X, Key, Eye, EyeSlash, ShieldCheck, CheckCircle, Circle } from "phosphor-react"

interface ChangePasswordDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ChangePasswordDrawer({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordDrawerProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const reqLength = newPassword.length >= 8
  const reqUpper = /[A-Z]/.test(newPassword)
  const reqLower = /[a-z]/.test(newPassword)
  const reqNumber = /[0-9]/.test(newPassword)
  const reqSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const allReqsMet = reqLength && reqUpper && reqLower && reqNumber && reqSpecial

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword) return setError("Please enter your current password.")
    if (!allReqsMet) return setError("Please fulfill all password requirements.")
    if (newPassword !== confirmPassword) return setError("Passwords do not match.")

    setError(null)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      onSuccess?.()
      onClose()
    }, 1200)
  }

  const requirements = [
    { label: "At least 8 characters long", met: reqLength },
    { label: "Include at least one uppercase letter (A–Z)", met: reqUpper },
    { label: "Include at least one lowercase letter (a–z)", met: reqLower },
    { label: "Include at least one number (0–9)", met: reqNumber },
    { label: "Include at least one special character (e.g. !@#$%)", met: reqSpecial },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[460px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                  <Lock size={18} weight="bold" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Change Password</h3>
                  <p className="text-[11px] text-gray-500">Update your account password securely.</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 pb-6 flex flex-col gap-3.5 custom-scrollbar min-h-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3.5 shadow-2xs">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                      Current Password <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Key size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        required
                        className="w-full pl-8 pr-9 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
                      />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showCurrent ? <EyeSlash size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                      New Password <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Key size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        className="w-full pl-8 pr-9 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showNew ? <EyeSlash size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                      Confirm New Password <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Key size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        className="w-full pl-8 pr-9 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                        {showConfirm ? <EyeSlash size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-gray-700">Password Requirements</span>
                    <div className="flex flex-col gap-1.5">
                      {requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px]">
                          {req.met ? (
                            <CheckCircle size={13} weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Circle size={13} className="text-gray-300 shrink-0 mt-0.5" />
                          )}
                          <span className={`leading-tight ${req.met ? "text-gray-800 font-medium" : "text-gray-400"}`}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#EEF2FF] rounded-2xl p-3 sm:p-3.5 border border-purple-100 flex items-center gap-2.5">
                  <ShieldCheck size={18} weight="bold" className="text-[#5B50EC] shrink-0" />
                  <p className="text-[11px] text-[#4338CA] leading-snug">For your security, avoid reusing old passwords.</p>
                </div>

                {error && <p className="text-xs text-rose-500 font-semibold px-1">{error}</p>}
                {isSuccess && <p className="text-xs text-emerald-600 font-semibold px-1">Password updated successfully!</p>}
              </div>

              <div className="shrink-0 bg-white border-t border-gray-200/80 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-20">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200/60 active:scale-98 whitespace-nowrap">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#5B50EC] hover:bg-[#4E44D6] shadow-md shadow-[#5B50EC]/20 transition-all cursor-pointer active:scale-98 whitespace-nowrap">
                  Update Password
                </button>
              </div>
            </form>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

