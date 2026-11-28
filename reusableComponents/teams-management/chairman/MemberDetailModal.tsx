"use client"

import React, { useEffect } from "react"
import { X, EnvelopeSimple, Phone, MapPin, Briefcase, User, CalendarBlank, Buildings, IdentificationCard } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import { ChairmanMemberItem } from "./types"

interface MemberDetailModalProps {
  member: ChairmanMemberItem | null
  onClose: () => void
}

export default function MemberDetailModal({ member, onClose }: MemberDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!member) return null

  const getDesignationBadgeClass = (designation: string) => {
    const lower = designation.toLowerCase()
    if (lower.includes("accountant")) return "bg-[#EEF2FF] text-[#5046E5]"
    if (lower.includes("product")) return "bg-[#EEF2FF] text-[#5046E5]"
    if (lower.includes("tech admin") || lower.includes("tech")) return "bg-[#EEF2FF] text-[#5046E5]"
    if (lower === "manager") return "bg-[#F3E8FF] text-[#9333EA]"
    if (lower.includes("assistant")) return "bg-[#E0F2FE] text-[#0284C7]"
    if (lower.includes("lead")) return "bg-amber-50 text-amber-700"
    return "bg-indigo-50 text-[#5046E5]"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-[#FAF5FF] p-6 border-b border-gray-100/80">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} weight="bold" />
          </button>

          <div className="flex items-center gap-4">
            <ReusableAvatar
              src={member.avatar}
              name={member.name}
              size={64}
              fallbackType="initials"
              shape="circle"
              className="ring-4 ring-white shadow-sm"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {member.name}
                </h3>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDesignationBadgeClass(
                    member.designation
                  )}`}
                >
                  {member.designation}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{member.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-mono text-xs font-semibold">
                  {member.employeeId}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {member.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-xs sm:text-sm">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <EnvelopeSimple size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Email Address</div>
                  <div className="font-medium text-gray-800 truncate">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <Phone size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Phone Number</div>
                  <div className="font-medium text-gray-800">
                    {member.phone || "+91 98765 43210"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <MapPin size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Location</div>
                  <div className="font-medium text-gray-800">{member.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <Buildings size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Work Mode</div>
                  <div className="font-medium text-gray-800">{member.workMode || "Hybrid"}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Organizational Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <Briefcase size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Department / Function</div>
                  <div className="font-medium text-gray-800">{member.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <User size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Reporting To</div>
                  <div className="font-medium text-gray-800">{member.reportingTo}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <CalendarBlank size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Joining Date</div>
                  <div className="font-medium text-gray-800">{member.joinDate || "15 Jan 2023"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <IdentificationCard size={18} className="text-[#5046E5] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Employment Type</div>
                  <div className="font-medium text-gray-800">Full-Time (Permanent)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-98"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
