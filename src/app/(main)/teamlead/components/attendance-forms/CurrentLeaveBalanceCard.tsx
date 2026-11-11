"use client"

import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import {
  CalendarBlank,
  FirstAid,
  SuitcaseSimple,
  Heart,
  CalendarCheck,
} from "phosphor-react"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole, LeaveBalanceItem } from "./types"
import { getRoleLeaveInstructions } from "./leaveInstructionsData"

const balances: LeaveBalanceItem[] = [
  {
    id: "casual",
    label: "Casual Leave",
    used: 4,
    total: 12,
    icon: CalendarBlank,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
  {
    id: "sick",
    label: "Sick Leave",
    used: 2,
    total: 8,
    icon: FirstAid,
    iconBg: "bg-[#FFF1F2]",
    iconColor: "text-[#F43F5E]",
  },
  {
    id: "earned",
    label: "Earned Leave",
    used: 5,
    total: 15,
    icon: SuitcaseSimple,
    iconBg: "bg-[#E8FAF4]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "special",
    label: "Special / Compensatory",
    used: 1,
    total: 4,
    icon: Heart,
    iconBg: "bg-[#FFF8EC]",
    iconColor: "text-[#F59E0B]",
  },
]

interface CurrentLeaveBalanceCardProps {
  role?: ApplicantRole
}

export default function CurrentLeaveBalanceCard({ role }: CurrentLeaveBalanceCardProps) {
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const activeRole: ApplicantRole =
    role ||
    (pathname?.startsWith("/superadmin") || authRole === "SuperAdmin"
      ? "Super Admin"
      : pathname?.startsWith("/chairman") || authRole === "Chairman"
      ? "Chairman"
      : pathname?.startsWith("/asstmanager") || authRole === "AssistantManager"
      ? "Assistant Manager"
      : pathname?.startsWith("/techadmin") || (authRole as string) === "TechAdmin"
      ? "Tech Admin"
      : pathname?.startsWith("/accountantmanager") || (authRole as string) === "AccountantManager" || (authRole as string) === "Accountant"
      ? "Accountant Manager"
      : pathname?.startsWith("/accountantexecutive") || (authRole as string) === "AccountantExecutive"
      ? "Accountant Executive"
      : pathname?.startsWith("/financeexecutive") || authRole === "FinanceExecutive"
      ? "Finance Executive"
      : pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance") || (authRole as string) === "Finance" || (authRole as string) === "FinanceManager"
      ? "Finance Manager"
      : pathname?.startsWith("/hrmanager") || authRole === "HrManager"
      ? "HR Manager"
      : pathname?.startsWith("/hr") || authRole === "Hr"
      ? "HR"
      : pathname?.startsWith("/manager") || authRole === "Manager"
      ? "Manager"
      : pathname?.startsWith("/productmanager") || authRole === "ProductManager"
      ? "Product Manager"
      : pathname?.startsWith("/employee") || authRole === "Employee"
      ? "Employee"
      : "Team Lead")

  const instructions = getRoleLeaveInstructions(activeRole)

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <CalendarCheck size={20} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Current Leave Balance
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Overview of your available leave quotas for {activeRole}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {balances.map((item) => {
          const Icon = item.icon
          const remaining = Math.max(0, item.total - item.used)
          return (
            <div
              key={item.id}
              className="p-3 sm:p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon size={15} weight="bold" />
                </div>
                <span className="text-[11px] font-bold text-gray-500">
                  {remaining} Left
                </span>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-base sm:text-lg font-bold text-gray-900 leading-none">
                  {remaining}
                  <span className="text-xs font-normal text-gray-400">
                    /{item.total}
                  </span>
                </span>
                <span className="text-xs text-gray-500 font-medium truncate">
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 flex flex-col gap-2.5">
        <span className="text-xs font-bold text-gray-900">
          Leave Policy Guidelines ({activeRole})
        </span>
        <div className="flex flex-col gap-2">
          {instructions.map((inst, idx) => {
            const Icon = inst.icon
            return (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-white text-[#5B50EC] border border-gray-100 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Icon size={12} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    {inst.title}
                  </span>
                  <span className="text-[11px] text-gray-500 leading-relaxed font-normal">
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
