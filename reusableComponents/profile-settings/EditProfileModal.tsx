"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Camera, Check } from "phosphor-react"
import { UserProfileData, EditFormData } from "./types"
import EditProfileWorkSection from "./EditProfileWorkSection"
import EditProfileFormFields from "./EditProfileFormFields"
import ReusableAvatar from "../ReusableAvatar"
import ReusableConfirmationModal from "../ReusableConfirmationModal"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: UserProfileData
  onSave: (updated: UserProfileData) => void
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const [avatar, setAvatar] = useState<string | null>(profile.avatar || null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<EditFormData>({
    name: profile.name,
    preferredName: profile.preferredName || "",
    personalEmail: profile.contactData.personalEmail || "",
    mobilePhone: profile.contactData.mobilePhone,
    dob: profile.contactData.dob || "15 Mar 1990",
    gender: profile.contactData.gender || "Male",
    street: profile.contactData.residentialAddress.street,
    city: profile.contactData.residentialAddress.city,
    statePostal: profile.contactData.residentialAddress.statePostal,
    emergencyPerson: profile.contactData.emergencyContact.person,
    emergencyRelationship: profile.contactData.emergencyContact.relationship,
    emergencyPhone: profile.contactData.emergencyContact.phone,
  })

  const handleFieldChange = (fields: Partial<EditFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      setFileError("Only JPG, PNG, and WebP images are allowed.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Image size must be less than 5MB.")
      return
    }
    setFileError(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setAvatar(ev.target.result)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...profile,
      avatar: avatar || undefined,
      name: formData.name,
      preferredName: formData.preferredName,
      contactData: {
        ...profile.contactData,
        personalEmail: formData.personalEmail,
        mobilePhone: formData.mobilePhone,
        dob: formData.dob,
        gender: formData.gender,
        residentialAddress: {
          street: formData.street,
          city: formData.city,
          statePostal: formData.statePostal,
        },
        emergencyContact: {
          person: formData.emergencyPerson,
          relationship: formData.emergencyRelationship,
          phone: formData.emergencyPhone,
        },
      },
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1150] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[460px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer shrink-0">
                  <ArrowLeft size={16} weight="bold" />
                </button>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Edit Profile</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#5B50EC] border border-purple-100">IC4 Member</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">Update personal records, contact and emergency details</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 pb-6 flex flex-col gap-3.5 custom-scrollbar min-h-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xs">
                  <div className="relative shrink-0">
                    <ReusableAvatar
                      src={avatar}
                      name={profile.name}
                      size={56}
                      shape="rounded"
                      status={profile.status === "Active" ? "online" : "offline"}
                      fallbackType="icon"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">{profile.name}</h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">Active</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug break-words mt-0.5">{profile.role} • {profile.team}</p>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/jpg" onChange={handleFileChange} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2.5 py-1 rounded-lg bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5B50EC] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0">
                        <Camera size={13} weight="bold" />
                        <span>Change Photo</span>
                      </button>
                      <button type="button" onClick={() => setShowRemoveModal(true)} className="text-[11px] font-semibold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer shrink-0">Remove</button>
                    </div>
                    {fileError && <p className="text-[10px] text-rose-500 font-medium mt-1">{fileError}</p>}
                  </div>
                </div>

                <EditProfileFormFields formData={formData} onChange={handleFieldChange} />
                <EditProfileWorkSection profile={profile} />
              </div>

              <div className="shrink-0 bg-white border-t border-gray-200/80 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-20">
                <button type="button" onClick={onClose} className="px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200/60 active:scale-98 whitespace-nowrap">
                  Discard Changes
                </button>
                <button type="submit" className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#5B50EC] hover:bg-[#4E44D6] shadow-md shadow-[#5B50EC]/20 transition-all cursor-pointer active:scale-98 whitespace-nowrap">
                  <Check size={14} weight="bold" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </motion.aside>

          <ReusableConfirmationModal
            isOpen={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            onConfirm={() => {
              setAvatar(null)
              setShowRemoveModal(false)
            }}
            title="Remove Profile Photo?"
            description="Are you sure you want to remove your profile photo? This will reset your avatar to the default icon."
            confirmText="Remove Photo"
            cancelText="Cancel"
            type="danger"
            zIndex={1250}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
