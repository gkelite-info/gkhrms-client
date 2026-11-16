"use client"

import { UserCircle, EnvelopeSimple, Phone, Heart, MapPin } from "phosphor-react"
import { UserProfileData } from "./types"

interface ProfileContactDataSectionProps {
  profile: UserProfileData
}

export default function ProfileContactDataSection({
  profile,
}: ProfileContactDataSectionProps) {
  const { contactData } = profile

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
        <div className="w-6 h-6 rounded-lg bg-[#ECFDF5] text-emerald-600 flex items-center justify-center shrink-0">
          <UserCircle size={14} weight="bold" />
        </div>
        <span>Contact & Personal Data</span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="bg-gray-50/70 rounded-xl p-2.5 sm:p-3 border border-gray-100/90 flex items-start gap-2.5">
          <EnvelopeSimple size={15} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-gray-400 font-medium">Work Email</span>
            <span className="text-xs font-semibold text-gray-900 break-all sm:break-normal mt-0.5">
              {contactData.workEmail}
            </span>
          </div>
        </div>

        <div className="bg-gray-50/70 rounded-xl p-2.5 sm:p-3 border border-gray-100/90 flex items-start gap-2.5">
          <Phone size={15} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-gray-400 font-medium">Mobile Phone</span>
            <span className="text-xs font-semibold text-gray-900 break-words mt-0.5">
              {contactData.mobilePhone}
            </span>
          </div>
        </div>

        <div className="bg-gray-50/70 rounded-xl p-2.5 sm:p-3 border border-gray-100/90 flex items-start gap-2.5">
          <Heart size={15} weight="bold" className="text-rose-400 mt-0.5 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-gray-400 font-medium">
              Emergency Contact ({contactData.emergencyContact.relationship})
            </span>
            <span className="text-xs font-semibold text-gray-900 break-words mt-0.5">
              {contactData.emergencyContact.phone}
            </span>
          </div>
        </div>

        <div className="bg-gray-50/70 rounded-xl p-2.5 sm:p-3 border border-gray-100/90 flex items-start gap-2.5">
          <MapPin size={15} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-gray-400 font-medium">Residential Address</span>
            <span className="text-xs font-semibold text-gray-900 leading-snug mt-0.5">
              {contactData.residentialAddress.street}, {contactData.residentialAddress.city} — {contactData.residentialAddress.statePostal}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

