"use client"

import { Bell } from "phosphor-react"

interface SettingsNotificationSectionProps {
  approvalsNotif: boolean
  onToggleApprovals: () => void
  payrollNotif: boolean
  onTogglePayroll: () => void
  orgNotif: boolean
  onToggleOrg: () => void
}

export default function SettingsNotificationSection({
  approvalsNotif,
  onToggleApprovals,
  payrollNotif,
  onTogglePayroll,
  orgNotif,
  onToggleOrg,
}: SettingsNotificationSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        <Bell size={13} weight="bold" className="text-[#5B50EC]" /> Smart Notifications & Alerts
      </span>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-2xs">
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-gray-800 block">Approvals, Leaves & Attendance</span>
            <span className="text-[10px] text-gray-400 block leading-tight mt-0.5">Immediate alerts for requests needing review</span>
          </div>
          <button
            type="button"
            onClick={onToggleApprovals}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${approvalsNotif ? "bg-[#5B50EC]" : "bg-gray-200"}`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${approvalsNotif ? "translate-x-5" : "translate-x-0.5"} top-0.5 absolute`} />
          </button>
        </div>
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-gray-800 block">Payroll, Payslips & Tax Documents</span>
            <span className="text-[10px] text-gray-400 block leading-tight mt-0.5">Disbursement and Form 16 alerts</span>
          </div>
          <button
            type="button"
            onClick={onTogglePayroll}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${payrollNotif ? "bg-[#5B50EC]" : "bg-gray-200"}`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${payrollNotif ? "translate-x-5" : "translate-x-0.5"} top-0.5 absolute`} />
          </button>
        </div>
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-gray-800 block">Organization Announcements</span>
            <span className="text-[10px] text-gray-400 block leading-tight mt-0.5">Town halls and HR policy changes</span>
          </div>
          <button
            type="button"
            onClick={onToggleOrg}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer shrink-0 ${orgNotif ? "bg-[#5B50EC]" : "bg-gray-200"}`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${orgNotif ? "translate-x-5" : "translate-x-0.5"} top-0.5 absolute`} />
          </button>
        </div>
      </div>
    </div>
  )
}

