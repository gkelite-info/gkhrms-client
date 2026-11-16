"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gear, X, ShieldCheck, SignOut, Copy, Check, CaretRight } from "phosphor-react"
import { UserProfileData } from "./types"
import SettingsNotificationSection from "./SettingsNotificationSection"
import SettingsSupportSection from "./SettingsSupportSection"
import ChangePasswordDrawer from "./ChangePasswordDrawer"
import { ItHelpdeskDrawer } from "./it-helpdesk"
import ReusableAvatar from "../ReusableAvatar"
import ReusableConfirmationModal from "../ReusableConfirmationModal"

interface SettingsPreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  profile: UserProfileData
  onSignOut?: () => void
}

export default function SettingsPreferencesModal({
  isOpen,
  onClose,
  profile,
  onSignOut,
}: SettingsPreferencesModalProps) {
  const [copied, setCopied] = useState(false)
  const [approvalsNotif, setApprovalsNotif] = useState(true)
  const [payrollNotif, setPayrollNotif] = useState(true)
  const [orgNotif, setOrgNotif] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const handleCopyId = () => {
    navigator.clipboard?.writeText(profile.empId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1150] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[460px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                    <Gear size={18} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Settings & Preferences</h3>
                    <p className="text-[11px] text-gray-500">Enterprise account controls & system parameters</p>
                  </div>
                </div>
                <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 pb-6 flex flex-col gap-3.5 custom-scrollbar min-h-0">
                <div className="rounded-2xl p-4 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <ReusableAvatar
                        src={profile.avatar}
                        name={profile.name}
                        size={44}
                        shape="rounded"
                        status={profile.status === "Active" ? "online" : "offline"}
                        fallbackType="icon"
                        bgColor="rgba(255, 255, 255, 0.15)"
                        textColor="#FFFFFF"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center flex-wrap gap-1.5">
                        <span className="text-sm font-bold leading-tight">{profile.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">Active</span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-0.5 leading-snug break-words">{profile.role} • IC4</p>
                      <button type="button" onClick={handleCopyId} className="inline-flex items-center gap-1.5 mt-1 text-[10px] text-gray-300 hover:text-white bg-white/10 px-2 py-0.5 rounded-md cursor-pointer transition-colors">
                        <span>ID: {profile.empId}</span>
                        {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                  </div>
                </div>

                <SettingsNotificationSection
                  approvalsNotif={approvalsNotif}
                  onToggleApprovals={() => setApprovalsNotif(!approvalsNotif)}
                  payrollNotif={payrollNotif}
                  onTogglePayroll={() => setPayrollNotif(!payrollNotif)}
                  orgNotif={orgNotif}
                  onToggleOrg={() => setOrgNotif(!orgNotif)}
                />

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={13} weight="bold" className="text-rose-500" /> Security
                  </span>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setIsChangePasswordOpen(true)}
                      className="w-full p-3 flex items-center justify-between hover:bg-gray-50/70 transition-colors text-left cursor-pointer rounded-2xl"
                    >
                      <div>
                        <span className="text-xs font-bold text-gray-800 block">Change Password</span>
                        <span className="text-[10px] text-gray-400 block">Last changed 32 days ago</span>
                      </div>
                      <span className="text-xs font-semibold text-[#5B50EC] flex items-center gap-0.5">
                        Update <CaretRight size={13} />
                      </span>
                    </button>
                  </div>
                </div>

                <SettingsSupportSection
                  onOpenHelpdesk={() => setIsHelpdeskOpen(true)}
                />
              </div>

              <div className="shrink-0 bg-white border-t border-gray-200/80 px-4 py-3 sm:px-5 sm:py-3.5 z-20">
                <button
                  type="button"
                  onClick={() => setShowSignOutModal(true)}
                  className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <SignOut size={15} weight="bold" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <ChangePasswordDrawer
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      <ItHelpdeskDrawer
        isOpen={isHelpdeskOpen}
        onClose={() => setIsHelpdeskOpen(false)}
      />

      <ReusableConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={() => {
          setShowSignOutModal(false)
          onSignOut?.()
        }}
        title="Sign Out"
        description="Are you sure you want to sign out of your account? You will need to log in again to access the portal."
        confirmText="Sign Out"
        cancelText="Cancel"
        type="danger"
        zIndex={1300}
      />
    </>
  )
}
