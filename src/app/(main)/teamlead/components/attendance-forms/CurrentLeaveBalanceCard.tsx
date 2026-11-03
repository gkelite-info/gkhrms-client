"use client"

import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import {
  Database,
  CalendarBlank,
  Heartbeat,
  Sun,
  Info,
  Clock,
  ShieldCheck,
  UsersThree,
} from "phosphor-react"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole, LeaveBalanceItem } from "./types"

const balances: LeaveBalanceItem[] = [
  {
    id: "casual",
    label: "Casual Leave",
    used: 8,
    total: 12,
    icon: CalendarBlank,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
  },
  {
    id: "sick",
    label: "Sick Leave",
    used: 6,
    total: 10,
    icon: Heartbeat,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#059669]",
  },
  {
    id: "earned",
    label: "Earned Leave",
    used: 14,
    total: 20,
    icon: Sun,
    iconBg: "bg-[#FFFBEB]",
    iconColor: "text-[#D97706]",
  },
]

interface CurrentLeaveBalanceCardProps {
  role?: ApplicantRole
}

export default function CurrentLeaveBalanceCard({ role }: CurrentLeaveBalanceCardProps) {
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isHr = pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")

  const activeRole: ApplicantRole =
    role ||
    (isHr
      ? "HR"
      : isManager
      ? "Manager"
      : isProductManager
      ? "Product Manager"
      : authRole === "Hr"
      ? "HR"
      : authRole === "Manager"
      ? "Manager"
      : authRole === "ProductManager"
      ? "Product Manager"
      : authRole === "Employee"
      ? "Employee"
      : "Team Lead")

  const getLeaveInstructions = () => {
    switch (activeRole) {
      case "Product Manager":
        return [
          {
            icon: UsersThree,
            title: "Product Leadership Sign-Off",
            text: "Product Manager leaves require sign-off from Head of Product / VP and HRBP.",
          },
          {
            icon: Clock,
            title: "Sprint Alignment Notice",
            text: "Submit leaves in advance of sprint planning to ensure roadmap delivery is unblocked.",
          },
          {
            icon: ShieldCheck,
            title: "Delegate Ownership",
            text: "Designate an interim sprint lead for backlog grooming and stakeholder updates.",
          },
        ]
      case "HR":
        return [
          {
            icon: UsersThree,
            title: "Executive & Board Review",
            text: "All HR leaves require approval from HR Director / CHRO and Executive Managing Director.",
          },
          {
            icon: Clock,
            title: "3 Days Advance Notice",
            text: "Submit planned leave at least 3 business days in advance to ensure organizational coverage.",
          },
          {
            icon: ShieldCheck,
            title: "Interim HRBP Delegation",
            text: "Designate a backup HRBP for emergency grievance handling and urgent payroll sign-offs.",
          },
        ]
      case "Manager":
        return [
          {
            icon: UsersThree,
            title: "Executive & HR Sign-Off",
            text: "Manager leaves require approval from Chairman / Director and Chief HR Officer.",
          },
          {
            icon: Clock,
            title: "3 Days Advance Notice",
            text: "Apply at least 3 working days in advance for planned personal or professional leaves.",
          },
          {
            icon: ShieldCheck,
            title: "Interim Delegation",
            text: "Delegate team approval authority to your designated Team Lead during your absence.",
          },
        ]
      case "Team Lead":
        return [
          {
            icon: UsersThree,
            title: "Project Manager Approval",
            text: "Leaves require approval from your Reporting Project Manager and HR Manager.",
          },
          {
            icon: Clock,
            title: "2 Days Advance Notice",
            text: "Apply at least 2 working days in advance for planned leaves.",
          },
          {
            icon: ShieldCheck,
            title: "Sprint Handover",
            text: "Ensure daily standup moderation and critical blockers are handed over to your co-lead.",
          },
        ]
      case "Employee":
      default:
        return [
          {
            icon: UsersThree,
            title: "Team Lead & HRBP Approval",
            text: "Leaves require approval from your Reporting Team Lead and HR Business Partner.",
          },
          {
            icon: Clock,
            title: "24 Hours Advance Notice",
            text: "Apply at least 24 hours in advance for planned casual or earned leaves.",
          },
          {
            icon: ShieldCheck,
            title: "Deliverables Handover",
            text: "Inform your project team and ensure all in-progress sprint deliverables are current.",
          },
        ]
    }
  }

  const instructions = getLeaveInstructions()

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <Database size={20} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Current Leave Balance
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Your available leave balance
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {balances.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon size={16} weight="bold" />
                </div>
                <span className="text-xs font-bold text-gray-900 truncate">
                  {item.label}
                </span>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-bold text-gray-900">
                  {item.used} / {item.total}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  days remaining
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <Info size={16} weight="bold" className="text-[#5B50EC]" />
          <span>Leave Policy & Guidelines</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {instructions.map((inst, idx) => {
            const Icon = inst.icon
            return (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={13} weight="bold" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-gray-800 leading-tight">
                    {inst.title}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium leading-relaxed mt-0.5">
                    {inst.text}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
