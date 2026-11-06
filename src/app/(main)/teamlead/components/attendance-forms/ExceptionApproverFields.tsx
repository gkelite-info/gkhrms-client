"use client"

import { ReusableDropdown } from "@/components/reusableComponents"

export const DEFAULT_HR_APPROVERS = [
  "Sneha Kapoor (HR Manager)",
  "Priya Mehta (Senior HRBP)",
  "Amit Verma (HR Operations Lead)",
  "Neha Singh (People Operations)",
  "Dr. Priya Mehta (CHRO)",
]

interface ExceptionApproverFieldsProps {
  approver: string
  onApproverChange: (val: string) => void
  label?: string
  placeholder?: string
  options?: string[]
}

export default function ExceptionApproverFields({
  approver,
  onApproverChange,
  label = "HR Approver / HR Manager",
  placeholder = "Select HRBP / HR Manager",
  options = DEFAULT_HR_APPROVERS,
}: ExceptionApproverFieldsProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-gray-700 flex items-center gap-1 min-h-[20px] whitespace-nowrap">
        <span>{label}</span>
        <span className="text-rose-500">*</span>
      </label>
      <ReusableDropdown
        value={approver}
        options={options.map((opt) => ({ label: opt, value: opt }))}
        onChange={(val) => onApproverChange(String(val))}
        placeholder={placeholder}
        align="left"
        className="w-full"
        buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between truncate"
      />
    </div>
  )
}
