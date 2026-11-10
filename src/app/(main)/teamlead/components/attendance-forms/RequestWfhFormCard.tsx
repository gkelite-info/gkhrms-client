"use client"

import { useState, useMemo, type FormEvent, type ChangeEvent } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { House, CalendarBlank } from "phosphor-react"
import { ReusableDropdown } from "@/components/reusableComponents"
import { RootState } from "../../../../../../Redux/Store"
import FileUploadDropzone from "./FileUploadDropzone"
import {
  ApplicantRole,
  DayOption,
  UploadedFileItem,
} from "./types"
import { ROLE_APPROVAL_CONFIG } from "./approvalConfig"

interface RequestWfhFormCardProps {
  currentRole?: ApplicantRole
  onRoleChange?: (role: ApplicantRole) => void
}

export default function RequestWfhFormCard({
  currentRole,
  onRoleChange,
}: RequestWfhFormCardProps = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isTechAdmin = pathname?.startsWith("/techadmin") || (authRole as string) === "TechAdmin"
  const isAccountantManager = pathname?.startsWith("/accountantmanager") || (authRole as string) === "AccountantManager" || (authRole as string) === "Accountant"
  const isAccountantExecutive = pathname?.startsWith("/accountantexecutive") || (authRole as string) === "AccountantExecutive"
  const isFinanceExecutive = pathname?.startsWith("/financeexecutive")
  const isFinance =
    !isFinanceExecutive && !isAccountantExecutive && !isAccountantManager && !isTechAdmin &&
    (pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance"))
  const isHrManager = pathname?.startsWith("/hrmanager")
  const isHr = !isHrManager && pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")
  const isEmployee = pathname?.startsWith("/employee")
  const basePath = isTechAdmin
    ? "/techadmin/attendance"
    : isAccountantManager
    ? "/accountantmanager/attendance"
    : isAccountantExecutive
    ? "/accountantexecutive/attendance"
    : isFinanceExecutive
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance
    ? "/financemanager/attendance"
    : isHrManager
    ? "/hrmanager/attendance"
    : isHr
    ? "/hr/attendance"
    : isManager
    ? "/manager/attendance"
    : isProductManager
    ? "/productmanager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"

  const availableRoles: ApplicantRole[] = useMemo(() => {
    if (isTechAdmin) return ["Tech Admin"]
    if (isAccountantManager) return ["Accountant Manager"]
    if (isAccountantExecutive) return ["Accountant Executive"]
    if (isFinanceExecutive) return ["Finance Executive"]
    if (isFinance) return ["Finance Manager"]
    if (isHrManager) return ["HR Manager"]
    if (isHr) return ["HR"]
    if (isManager) return ["Manager"]
    if (isProductManager) return ["Product Manager"]
    if (isEmployee) return ["Employee"]
    return ["Team Lead"]
  }, [isTechAdmin, isAccountantManager, isAccountantExecutive, isFinanceExecutive, isFinance, isHrManager, isHr, isManager, isProductManager, isEmployee])

  const resolveInitialRole = (): ApplicantRole => {
    if (currentRole && availableRoles.includes(currentRole)) return currentRole
    if (isTechAdmin || (authRole as string) === "TechAdmin") return "Tech Admin"
    if (isAccountantManager || (authRole as string) === "AccountantManager" || (authRole as string) === "Accountant") return "Accountant Manager"
    if (isAccountantExecutive || (authRole as string) === "AccountantExecutive") return "Accountant Executive"
    if (isFinanceExecutive || authRole === "FinanceExecutive") return "Finance Executive"
    if (
      isFinance ||
      (authRole as string) === "Finance" ||
      (authRole as string) === "FinanceManager" ||
      (authRole as string) === "Finance Manager"
    )
      return "Finance Manager"
    if (isHrManager || authRole === "HrManager") return "HR Manager"
    if (isHr || authRole === "Hr") return "HR"
    if (isManager || authRole === "Manager") return "Manager"
    if (isProductManager || authRole === "ProductManager") return "Product Manager"
    if (isEmployee || authRole === "Employee") return "Employee"
    return "Team Lead"
  }

  const [internalRole, setInternalRole] = useState<ApplicantRole>(resolveInitialRole)
  const applicantRole = currentRole || internalRole
  const [primaryApprover, setPrimaryApprover] = useState("")
  const [secondaryApprover, setSecondaryApprover] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [dayType, setDayType] = useState<DayOption>("full")
  const [reason, setReason] = useState("")
  const [files, setFiles] = useState<UploadedFileItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentApprovalConfig = ROLE_APPROVAL_CONFIG[applicantRole]

  const handleRoleChange = (role: ApplicantRole) => {
    if (onRoleChange) {
      onRoleChange(role)
    } else {
      setInternalRole(role)
    }
    const nextConfig = ROLE_APPROVAL_CONFIG[role]
    if (!nextConfig.primaryOptions.includes(primaryApprover)) {
      setPrimaryApprover("")
    }
    if (!nextConfig.secondaryOptions.includes(secondaryApprover)) {
      setSecondaryApprover("")
    }
  }

  const handleFromDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (toDate && val && new Date(val) > new Date(toDate)) {
      toast.error("From Date cannot be after To Date.", { position: "top-right" })
      setToDate(val)
    }
    setFromDate(val)
  }

  const handleToDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (fromDate && val && new Date(val) < new Date(fromDate)) {
      toast.error("To Date cannot be before From Date.", { position: "top-right" })
      return
    }
    setToDate(val)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!applicantRole) {
      toast.error("Please select an applicant role.", { position: "top-right" })
      return
    }
    if (!primaryApprover) {
      toast.error(`Please select a ${currentApprovalConfig.primaryLabel}.`, {
        position: "top-right",
      })
      return
    }
    if (!secondaryApprover) {
      toast.error(`Please select a ${currentApprovalConfig.secondaryLabel}.`, {
        position: "top-right",
      })
      return
    }
    if (!fromDate) {
      toast.error("Please select From Date.", { position: "top-right" })
      return
    }
    if (dayType === "full" && !toDate) {
      toast.error("Please select To Date.", { position: "top-right" })
      return
    }
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date.", {
        position: "top-right",
      })
      return
    }
    if (!reason.trim()) {
      toast.error("Please enter the reason for your request.", {
        position: "top-right",
      })
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Work from home request submitted successfully!", {
        position: "top-right",
      })
      setTimeout(
        () =>
          router.push(
            isHrManager
              ? "/hrmanager/attendance?tab=attendance-requests&subtab=my-requests"
              : isHr
              ? "/hr/attendance?tab=attendance-requests&subtab=my-requests"
              : `${basePath}?tab=requests&subtab=my-requests`
          ),
        600
      )
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <House size={20} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Request Work From Home
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Submit a work from home request for approval.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Applicant Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={applicantRole}
            disabled
            readOnly
            className="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/80 cursor-not-allowed select-none focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1 min-h-[20px] whitespace-nowrap">
              <span>{currentApprovalConfig.primaryLabel}</span>
              <span className="text-rose-500">*</span>
            </label>
            <ReusableDropdown
              value={primaryApprover}
              options={currentApprovalConfig.primaryOptions.map((opt) => ({
                label: opt,
                value: opt,
              }))}
              onChange={(val) => setPrimaryApprover(String(val))}
              placeholder={currentApprovalConfig.primaryPlaceholder}
              align="left"
              className="w-full"
              buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between truncate"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1 min-h-[20px] whitespace-nowrap">
              <span>{currentApprovalConfig.secondaryLabel}</span>
              <span className="text-rose-500">*</span>
            </label>
            <ReusableDropdown
              value={secondaryApprover}
              options={currentApprovalConfig.secondaryOptions.map((opt) => ({
                label: opt,
                value: opt,
              }))}
              onChange={(val) => setSecondaryApprover(String(val))}
              placeholder={currentApprovalConfig.secondaryPlaceholder}
              align="left"
              className="w-full"
              buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between truncate"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            WFH Date / Date Range <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="w-full h-10 px-3.5 pr-9 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white"
              />
              <CalendarBlank
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {dayType === "full" && (
              <>
                <span className="text-xs text-gray-400 font-semibold px-0.5">
                  -
                </span>
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate}
                    onChange={handleToDateChange}
                    className="w-full h-10 px-3.5 pr-9 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white"
                  />
                  <CalendarBlank
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Day Type <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDayType("full")}
              className={`flex-1 sm:flex-initial sm:w-36 h-10 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                dayType === "full"
                  ? "bg-[#EEF2FF] text-[#1E1B4B] border border-[#DDD9FD] shadow-2xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  dayType === "full"
                    ? "border-[#5B50EC] bg-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {dayType === "full" && (
                  <span className="w-2 h-2 rounded-full bg-[#5B50EC]" />
                )}
              </span>
              <span>Full Day</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDayType("half")
                if (fromDate) setToDate(fromDate)
              }}
              className={`flex-1 sm:flex-initial sm:w-36 h-10 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                dayType === "half"
                  ? "bg-[#EEF2FF] text-[#1E1B4B] border border-[#DDD9FD] shadow-2xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  dayType === "half"
                    ? "border-[#5B50EC] bg-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {dayType === "half" && (
                  <span className="w-2 h-2 rounded-full bg-[#5B50EC]" />
                )}
              </span>
              <span>Half Day</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">
              Reason <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-gray-400 font-medium">
              {reason.length}/500
            </span>
          </div>
          <div className="relative">
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Please enter the reason for your work from home request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white resize-none"
            />
          </div>
        </div>

        <FileUploadDropzone files={files} onFilesChange={setFiles} />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push(basePath)}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4d42e0] text-xs font-semibold text-white transition-all shadow-xs cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  )
}
