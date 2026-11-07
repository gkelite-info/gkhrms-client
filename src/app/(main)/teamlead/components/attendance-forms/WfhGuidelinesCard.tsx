"use client"

import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole } from "./types"
import { getRoleGuidelines } from "./wfhGuidelinesData"

interface WfhGuidelinesCardProps {
  role?: ApplicantRole
}

export default function WfhGuidelinesCard({ role }: WfhGuidelinesCardProps) {
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isFinanceExecutive =
    pathname?.startsWith("/financeexecutive") || authRole === "FinanceExecutive"
  const isFinance =
    !isFinanceExecutive &&
    (pathname?.startsWith("/financemanager") ||
      pathname?.startsWith("/finance") ||
      (authRole as string) === "Finance" ||
      (authRole as string) === "FinanceManager")
  const isHrManager =
    pathname?.startsWith("/hrmanager") || authRole === "HrManager"
  const isHr = !isHrManager && (pathname?.startsWith("/hr") || authRole === "Hr")
  const isManager = pathname?.startsWith("/manager") || authRole === "Manager"
  const isProductManager =
    pathname?.startsWith("/productmanager") || authRole === "ProductManager"
  const isEmployee =
    pathname?.startsWith("/employee") || authRole === "Employee"

  const activeRole: ApplicantRole =
    role ||
    (isFinanceExecutive
      ? "Finance Executive"
      : isFinance
      ? "Finance Manager"
      : isHrManager
      ? "HR Manager"
      : isHr
      ? "HR"
      : isManager
      ? "Manager"
      : isProductManager
      ? "Product Manager"
      : isEmployee
      ? "Employee"
      : "Team Lead")

  const guidelines = getRoleGuidelines(activeRole)

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
          <span className="text-sm font-bold">i</span>
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Work From Home Guidelines
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Key policies to remember when working remotely as {activeRole}.
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
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {item.title}
                </span>
                <span className="text-xs text-gray-500 font-normal leading-relaxed">
                  {item.description}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
