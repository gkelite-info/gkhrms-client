"use client"

import React from "react"
import {
  X,
  IdentificationBadge,
  Briefcase,
  UsersThree,
  Cube,
  TreeStructure,
  User,
  MapPin,
  EnvelopeSimple,
  Phone,
  CalendarBlank,
} from "phosphor-react"
import { TeamLeadMemberItem } from "./types"

interface TeamLeadEmployeeDetailsModalProps {
  member: TeamLeadMemberItem | null
  teamName: string
  onClose: () => void
}

export default function TeamLeadEmployeeDetailsModal({
  member,
  teamName,
  onClose,
}: TeamLeadEmployeeDetailsModalProps) {
  if (!member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-gray-100/80">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Employee Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FE] border border-indigo-50/80 flex items-center gap-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-white shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  {member.name}
                </h4>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  {member.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {member.role}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <IdentificationBadge size={14} className="text-gray-400" />
                  <span>Employee ID:</span>
                  <strong className="text-gray-900 font-semibold">
                    {member.employeeId}
                  </strong>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-gray-400" />
                  <span>Role:</span>
                  <strong className="text-gray-900 font-semibold">
                    {member.designation}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FE]/70 border border-gray-100 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                <UsersThree size={18} weight="bold" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                  Team / Project
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block mt-0.5">
                  {teamName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                <Cube size={18} weight="bold" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                  Status
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5">
                  {member.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1 text-xs">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <TreeStructure size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Department / Function
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.department}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Assigned Project
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {teamName}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <User size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Reporting To
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.reportingTo}{" "}
                    <span className="text-gray-400 font-normal">
                      ({member.reportingToRole || "Manager"})
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Employment Type
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.employmentType || "Full-Time"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Work Location
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.workLocation || "Bengaluru"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <EnvelopeSimple size={15} weight="bold" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Email
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5 truncate">
                    {member.email || `${member.name.toLowerCase().replace(" ", ".")}@gkelite.com`}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Phone
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.phone || "+91 98765 43210"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarBlank size={15} weight="bold" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-medium block">
                    Joining Date
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                    {member.joiningDate || "Jan 15, 2024"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-gray-100 flex items-center justify-end bg-gray-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
