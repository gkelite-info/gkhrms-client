"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gear, X, NotePencil, Camera, Clock, Buildings } from "phosphor-react"
import { ProfileSettingsDrawerProps, UserProfileData } from "./types"
import { DEFAULT_USER_PROFILE } from "./mockProfileData"
import ProfileWorkAndLeaveSections from "./ProfileWorkAndLeaveSections"
import ProfileContactDataSection from "./ProfileContactDataSection"
import SettingsPreferencesModal from "./SettingsPreferencesModal"
import EditProfileModal from "./EditProfileModal"
import ProfileSuccessModal from "./ProfileSuccessModal"
import ReusableAvatar from "../ReusableAvatar"

export default function ProfileSettingsDrawer({
  isOpen,
  onClose,
  userProfile = DEFAULT_USER_PROFILE,
  onProfileUpdated,
  onSignOut,
}: ProfileSettingsDrawerProps) {
  const [profile, setProfile] = useState<UserProfileData>(userProfile)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  useEffect(() => {
    if (userProfile) setProfile(userProfile)
  }, [userProfile])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSettingsOpen && !isEditModalOpen && !isSuccessModalOpen) onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, isSettingsOpen, isEditModalOpen, isSuccessModalOpen, onClose])

  const handleSaveProfile = (updated: UserProfileData) => {
    setProfile(updated)
    setIsEditModalOpen(false)
    setIsSuccessModalOpen(true)
    onProfileUpdated?.(updated)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[460px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Profile & Settings</h3>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-xl text-gray-500 hover:text-[#5B50EC] hover:bg-[#EEF2FF] transition-colors cursor-pointer" title="Settings & Preferences">
                    <Gear size={18} weight="bold" />
                  </button>
                  <button type="button" onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                    <X size={18} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 pb-6 sm:pb-8 flex flex-col gap-3.5 custom-scrollbar min-h-0">
                <div className="bg-gradient-to-br from-white via-white to-[#F5F3FF] rounded-2xl border border-purple-100/80 p-3.5 sm:p-4 flex flex-col gap-3.5 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <ReusableAvatar
                        src={profile.avatar}
                        name={profile.name}
                        size={56}
                        shape="rounded"
                        status={profile.status === "Active" ? "online" : "offline"}
                        fallbackType="icon"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center flex-wrap gap-1.5">
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{profile.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">Active</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-snug break-words mt-0.5">{profile.role} • {profile.team}</p>
                      <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-gray-500 mt-1">
                        <span className="bg-white/80 px-2 py-0.5 rounded-md border border-gray-100 font-semibold text-gray-700 whitespace-nowrap">Emp ID: {profile.empId}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 font-medium whitespace-nowrap">{profile.band}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-purple-100/60">
                    <button type="button" onClick={() => setIsEditModalOpen(true)} className="flex-1 h-9 px-3 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5B50EC] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#5B50EC]/20 active:scale-98">
                      <NotePencil size={15} weight="bold" />
                      <span>Edit Profile</span>
                    </button>
                    <button type="button" onClick={() => setIsEditModalOpen(true)} className="h-9 px-3 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-gray-200 shadow-2xs active:scale-98">
                      <Camera size={15} weight="bold" />
                      <span>Photo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2">
                  <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex items-center justify-between min-[380px]:flex-col min-[380px]:items-start gap-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 min-[380px]:w-full min-[380px]:justify-between">
                      <span className="text-[10px] text-gray-400 font-medium">Today</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-right min-[380px]:text-left">
                      <span className="text-xs font-bold text-gray-900 block leading-tight">{profile.todayStatus.status}</span>
                      <span className="text-[10px] min-[380px]:text-[9px] text-gray-400 block mt-0.5 whitespace-nowrap">Checked In {profile.todayStatus.checkInTime}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex items-center justify-between min-[380px]:flex-col min-[380px]:items-start gap-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 min-[380px]:w-full min-[380px]:justify-between">
                      <span className="text-[10px] text-gray-400 font-medium">Shift</span>
                      <Clock size={12} className="text-gray-400" />
                    </div>
                    <div className="text-right min-[380px]:text-left">
                      <span className="text-xs font-bold text-gray-900 block leading-tight">{profile.shift.name}</span>
                      <span className="text-[10px] min-[380px]:text-[9px] text-gray-400 block mt-0.5 leading-tight break-words">{profile.shift.timing}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex items-center justify-between min-[380px]:flex-col min-[380px]:items-start gap-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 min-[380px]:w-full min-[380px]:justify-between">
                      <span className="text-[10px] text-gray-400 font-medium">Work Mode</span>
                      <Buildings size={12} className="text-gray-400" />
                    </div>
                    <div className="text-right min-[380px]:text-left">
                      <span className="text-xs font-bold text-gray-900 block leading-tight break-words">{profile.workMode.type}</span>
                      <span className="text-[10px] min-[380px]:text-[9px] text-gray-400 block mt-0.5 leading-tight break-words">{profile.workMode.location}</span>
                    </div>
                  </div>
                </div>

                <ProfileWorkAndLeaveSections profile={profile} />
                <ProfileContactDataSection profile={profile} />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <SettingsPreferencesModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} profile={profile} onSignOut={onSignOut} />
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} profile={profile} onSave={handleSaveProfile} />
      <ProfileSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} empId={profile.empId} userName={profile.name} />
    </>
  )
}
