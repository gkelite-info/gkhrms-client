"use client"

import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import {
  Clock,
  ShieldCheck,
  FileText,
  CalendarCheck,
  CheckCircle,
} from "phosphor-react"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole } from "./types"

const guidelines = [
  {
    id: "timely",
    title: "Timely Submission",
    description: "Submit exception requests within 3 working days of the attendance discrepancy.",
    icon: Clock,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
  {
    id: "evidence",
    title: "Supporting Verification",
    description: "Attach relevant transit delays, client visit approvals, or medical slips for verification.",
    icon: FileText,
    iconBg: "bg-[#E8FAF4]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "approval",
    title: "Dual Level Review",
    description: "Attendance regularizations are validated by your direct manager and final HRBP authority.",
    icon: ShieldCheck,
    iconBg: "bg-[#FFF8EC]",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: "policy",
    title: "Policy Quota Limit",
    description: "A maximum of 3 late check-in or missed punch regularizations are permitted per calendar month.",
    icon: CheckCircle,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-700",
  },
]

interface ExceptionGuidelinesCardProps {
  role?: ApplicantRole
}

export default function ExceptionGuidelinesCard({ role }: ExceptionGuidelinesCardProps) {
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

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <CalendarCheck size={20} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Exception Guidelines
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Key regularization policies for {activeRole}.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {guidelines.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon size={18} weight="bold" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

