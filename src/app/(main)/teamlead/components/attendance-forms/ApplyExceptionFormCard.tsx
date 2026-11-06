"use client"

import { useState, useMemo, type FormEvent } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { WarningCircle } from "phosphor-react"
import { RootState } from "../../../../../../Redux/Store"
import FileUploadDropzone from "./FileUploadDropzone"
import ExceptionApproverFields from "./ExceptionApproverFields"
import ExceptionTimeFields from "./ExceptionTimeFields"
import { ApplicantRole, ExceptionType, UploadedFileItem } from "./types"

const exceptionTypes: ExceptionType[] = [
  "Late Check-in",
  "Missed Check-out",
  "Low Working Hours",
  "Missed Biometric",
  "On Duty / Client Visit",
]

const hrManagerApprovers = [
  "Dr. Priya Mehta (CHRO)",
  "Anand Joshi (VP People Operations)",
  "Suresh Iyer (Executive Director)",
]

interface ApplyExceptionFormCardProps {
  currentRole?: ApplicantRole
  onRoleChange?: (role: ApplicantRole) => void
}

export default function ApplyExceptionFormCard({ currentRole }: ApplyExceptionFormCardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isFinance =
    pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance") ||
    (authRole as string) === "Finance" || (authRole as string) === "FinanceManager"
  const isHrManager = pathname?.startsWith("/hrmanager") || authRole === "HrManager"
  const isHr = !isHrManager && (pathname?.startsWith("/hr") || authRole === "Hr")
  const isManager = pathname?.startsWith("/manager") || authRole === "Manager"
  const isProductManager = pathname?.startsWith("/productmanager") || authRole === "ProductManager"
  const isEmployee = pathname?.startsWith("/employee") || authRole === "Employee"

  const basePath = pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance ? "/finance/attendance"
    : isHrManager ? "/hrmanager/attendance"
    : isHr ? "/hr/attendance"
    : isManager ? "/manager/attendance"
    : isProductManager ? "/productmanager/attendance"
    : isEmployee ? "/employee/attendance"
    : "/teamlead/attendance"

  const applicantRole: ApplicantRole = useMemo(() => {
    if (currentRole) return currentRole
    if (isFinance) return "Finance Manager"
    if (isHrManager) return "HR Manager"
    if (isHr) return "HR"
    if (isManager) return "Manager"
    if (isProductManager) return "Product Manager"
    if (isEmployee) return "Employee"
    return "Team Lead"
  }, [currentRole, isFinance, isHrManager, isHr, isManager, isProductManager, isEmployee])

  const [hrApprover, setHrApprover] = useState("")
  const [exceptionType, setExceptionType] = useState<ExceptionType>("Late Check-in")
  const [exceptionDate, setExceptionDate] = useState("2025-08-25")
  const [actualTime, setActualTime] = useState("10:25 AM")
  const [correctedTime, setCorrectedTime] = useState("09:30 AM")
  const [reason, setReason] = useState("")
  const [resolutionNote, setResolutionNote] = useState("Approved per explanation")
  const [files, setFiles] = useState<UploadedFileItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!hrApprover) return toast.error("Please select an HR Approver / HR Manager.")
    if (!exceptionDate) return toast.error("Please select the discrepancy date.")
    if (!reason.trim()) return toast.error("Please enter the detailed reason for the exception.")

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Attendance exception submitted for HR review!")
      setTimeout(() => router.push(`${basePath}?tab=exception-history&sub=me`), 600)
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <WarningCircle size={22} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Apply Attendance Exception
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Submit a regularization request for attendance discrepancy review.
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

        <ExceptionApproverFields
          approver={hrApprover}
          onApproverChange={setHrApprover}
          options={applicantRole === "HR Manager" ? hrManagerApprovers : undefined}
        />

        <ExceptionTimeFields
          exceptionType={exceptionType}
          onExceptionTypeChange={setExceptionType}
          exceptionTypes={exceptionTypes}
          exceptionDate={exceptionDate}
          onExceptionDateChange={setExceptionDate}
          actualTime={actualTime}
          onActualTimeChange={setActualTime}
          correctedTime={correctedTime}
          onCorrectedTimeChange={setCorrectedTime}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Reason for Exception <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain the circumstances (e.g. metro breakdown, client emergency, power outage)..."
            className="w-full p-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC] resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Resolution Note / Justification Note
          </label>
          <input
            type="text"
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            placeholder="e.g. Requesting 55 mins late arrival regularization"
            className="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC]"
          />
        </div>

        <FileUploadDropzone files={files} onFilesChange={setFiles} />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push(basePath)}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4d42e0] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Exception"}
          </button>
        </div>
      </form>
    </div>
  )
}
