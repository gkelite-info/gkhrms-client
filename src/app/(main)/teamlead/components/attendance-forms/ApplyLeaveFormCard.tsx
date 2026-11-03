"use client"

import { useState, useMemo, type FormEvent } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { PencilSimpleLine } from "phosphor-react"
import { ReusableDropdown } from "@/components/reusableComponents"
import { RootState } from "../../../../../../Redux/Store"
import FileUploadDropzone from "./FileUploadDropzone"
import LeaveDateDaySelector from "./LeaveDateDaySelector"
import {
  ApplicantRole,
  DayOption,
  UploadedFileItem,
} from "./types"
import { applicantRoles, ROLE_APPROVAL_CONFIG } from "./approvalConfig"

const leaveOptions = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Maternity / Paternity Leave",
  "Loss of Pay (LOP)",
]

interface ApplyLeaveFormCardProps {
  currentRole?: ApplicantRole
  onRoleChange?: (role: ApplicantRole) => void
}

export default function ApplyLeaveFormCard({
  currentRole,
  onRoleChange,
}: ApplyLeaveFormCardProps = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isHr = pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")
  const basePath = isHr
    ? "/hr/attendance"
    : isManager
    ? "/manager/attendance"
    : isProductManager
    ? "/productmanager/attendance"
    : "/teamlead/attendance"

  const availableRoles: ApplicantRole[] = useMemo(() => {
    if (isHr) return ["HR", "Manager", "Product Manager", "Team Lead", "Employee"]
    if (isManager) return ["Manager", "Team Lead", "Employee"]
    if (isProductManager) return ["Product Manager", "Team Lead", "Employee"]
    return ["Team Lead", "Employee"]
  }, [isHr, isManager, isProductManager])

  const resolveInitialRole = (): ApplicantRole => {
    if (currentRole && availableRoles.includes(currentRole)) return currentRole
    if (isHr) return "HR"
    if (isManager) return "Manager"
    if (isProductManager) return "Product Manager"
    if (authRole === "Hr") return "HR"
    if (authRole === "Manager") return "Manager"
    if (authRole === "ProductManager") return "Product Manager"
    if (authRole === "Employee") return "Employee"
    return "Team Lead"
  }

  const [internalRole, setInternalRole] = useState<ApplicantRole>(resolveInitialRole)
  const applicantRole = currentRole || internalRole
  const [primaryApprover, setPrimaryApprover] = useState("")
  const [secondaryApprover, setSecondaryApprover] = useState("")
  const [leaveType, setLeaveType] = useState("")
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

  const calculateDays = () => {
    if (!fromDate) return 0
    if (dayType === "half") return 0.5
    if (!toDate) return 1
    const s = new Date(fromDate)
    const e = new Date(toDate)
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) return 1
    return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
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
    if (!leaveType) {
      toast.error("Please select a leave type.", { position: "top-right" })
      return
    }
    if (!fromDate) {
      toast.error("Please select a From Date.", { position: "top-right" })
      return
    }
    if (dayType === "full" && !toDate) {
      toast.error("Please select a To Date.", { position: "top-right" })
      return
    }
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date.", {
        position: "top-right",
      })
      return
    }
    if (!reason.trim()) {
      toast.error("Please enter the reason for your leave request.", {
        position: "top-right",
      })
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Leave request submitted successfully!", {
        position: "top-right",
      })
      setTimeout(() => router.push(isHr ? "/hr/attendance-leaves?tab=attendance-requests&subtab=my-requests" : `${basePath}?tab=requests&subtab=my-requests`), 600)
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <PencilSimpleLine size={20} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Apply Leave
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Submit a leave request for approval.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Applicant Role <span className="text-rose-500">*</span>
          </label>
          <ReusableDropdown
            value={applicantRole}
            options={availableRoles.map((r) => ({ label: r, value: r }))}
            onChange={(val) => handleRoleChange(val as ApplicantRole)}
            placeholder="Select Applicant Role"
            align="left"
            className="w-full"
            buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between"
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
            Leave Type <span className="text-rose-500">*</span>
          </label>
          <ReusableDropdown
            value={leaveType}
            options={leaveOptions.map((opt) => ({ label: opt, value: opt }))}
            onChange={(val) => setLeaveType(String(val))}
            placeholder="Select leave type"
            align="left"
            className="w-full"
            buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between"
          />
        </div>

        <LeaveDateDaySelector
          fromDate={fromDate}
          toDate={toDate}
          dayType={dayType}
          totalDays={calculateDays()}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onDayTypeChange={setDayType}
        />

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
              placeholder="Please enter the reason for your leave request..."
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
