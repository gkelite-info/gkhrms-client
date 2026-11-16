"use client"

import { User, House, Heart } from "phosphor-react"
import { EditFormData } from "./types"
import ProfileDobPicker from "./ProfileDobPicker"
import ReusableDropdown, { DropdownOption } from "../ReusableDropdown"

interface EditProfileFormFieldsProps {
  formData: EditFormData
  onChange: (fields: Partial<EditFormData>) => void
}

const GENDER_OPTIONS: DropdownOption[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-Binary", value: "Non-Binary" },
  { label: "Prefer not to say", value: "Other" },
]

export default function EditProfileFormFields({
  formData,
  onChange,
}: EditProfileFormFieldsProps) {
  const inputStyle =
    "w-full px-3 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] focus:ring-2 focus:ring-[#5B50EC]/10 outline-none transition-all"

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
            <User size={14} weight="bold" />
          </div>
          <span>Personal Information</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Full Legal Name <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.name}
              placeholder="e.g. Rohit Sharma"
              onChange={(e) => onChange({ name: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Preferred Display Name</label>
            <input
              type="text"
              value={formData.preferredName}
              placeholder="e.g. Rohit"
              onChange={(e) => onChange({ preferredName: e.target.value })}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Personal Email Address <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="email"
              value={formData.personalEmail}
              placeholder="rohit.personal@gmail.com"
              onChange={(e) => onChange({ personalEmail: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Mobile Phone Number <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.mobilePhone}
              placeholder="+91 98765 43210"
              onChange={(e) => onChange({ mobilePhone: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <ProfileDobPicker value={formData.dob} onChange={(dob) => onChange({ dob })} />
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Gender Identity <span className="text-rose-500 font-bold">*</span></label>
            <ReusableDropdown
              value={formData.gender}
              options={GENDER_OPTIONS}
              onChange={(val) => onChange({ gender: String(val) })}
              placeholder="Select gender"
              align="full"
              className="w-full"
              buttonClassName="w-full h-8.5 px-3 py-2 text-xs font-semibold text-gray-900 bg-white rounded-xl border border-gray-200 focus:border-[#5B50EC] flex items-center justify-between cursor-pointer transition-all hover:border-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-blue-600 flex items-center justify-center shrink-0">
            <House size={14} weight="bold" />
          </div>
          <span>Residential Address</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Street Address & Apartment <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.street}
              placeholder="e.g. Flat 402, Green View Apts, Outer Ring Rd"
              onChange={(e) => onChange({ street: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-gray-700 block mb-1">City <span className="text-rose-500 font-bold">*</span></label>
              <input
                type="text"
                value={formData.city}
                placeholder="e.g. Bengaluru"
                onChange={(e) => onChange({ city: e.target.value })}
                required
                className={inputStyle}
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-700 block mb-1">State & Postal Code <span className="text-rose-500 font-bold">*</span></label>
              <input
                type="text"
                value={formData.statePostal}
                placeholder="e.g. Karnataka – 560037"
                onChange={(e) => onChange({ statePostal: e.target.value })}
                required
                className={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-[#FFF1F2] text-rose-500 flex items-center justify-center shrink-0">
            <Heart size={14} weight="bold" />
          </div>
          <span>Emergency Contact Details</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Primary Contact Person <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.emergencyPerson}
              placeholder="e.g. Suresh Sharma"
              onChange={(e) => onChange({ emergencyPerson: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Relationship <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.emergencyRelationship}
              placeholder="e.g. Father"
              onChange={(e) => onChange({ emergencyRelationship: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Emergency Phone Number <span className="text-rose-500 font-bold">*</span></label>
            <input
              type="text"
              value={formData.emergencyPhone}
              placeholder="e.g. +91 98123 45678"
              onChange={(e) => onChange({ emergencyPhone: e.target.value })}
              required
              className={inputStyle}
            />
          </div>
        </div>
      </div>
    </>
  )
}
