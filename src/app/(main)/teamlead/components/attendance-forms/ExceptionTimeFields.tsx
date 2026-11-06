"use client"

import { ReusableDropdown } from "@/components/reusableComponents"
import { ExceptionType } from "./types"

interface ExceptionTimeFieldsProps {
  exceptionType: ExceptionType
  onExceptionTypeChange: (type: ExceptionType) => void
  exceptionTypes: ExceptionType[]
  exceptionDate: string
  onExceptionDateChange: (date: string) => void
  actualTime: string
  onActualTimeChange: (time: string) => void
  correctedTime: string
  onCorrectedTimeChange: (time: string) => void
}

export default function ExceptionTimeFields({
  exceptionType,
  onExceptionTypeChange,
  exceptionTypes,
  exceptionDate,
  onExceptionDateChange,
  actualTime,
  onActualTimeChange,
  correctedTime,
  onCorrectedTimeChange,
}: ExceptionTimeFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Exception Type <span className="text-rose-500">*</span>
          </label>
          <ReusableDropdown
            value={exceptionType}
            options={exceptionTypes.map((type) => ({ label: type, value: type }))}
            onChange={(val) => onExceptionTypeChange(val as ExceptionType)}
            placeholder="Select Exception Type"
            align="left"
            className="w-full"
            buttonClassName="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50/50 justify-between"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Discrepancy Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={exceptionDate}
            onChange={(e) => onExceptionDateChange(e.target.value)}
            className="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Actual Recorded Time <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={actualTime}
            onChange={(e) => onActualTimeChange(e.target.value)}
            placeholder="e.g. 10:25 AM"
            className="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">
            Requested Corrected Time <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={correctedTime}
            onChange={(e) => onCorrectedTimeChange(e.target.value)}
            placeholder="e.g. 09:30 AM"
            className="h-10 px-3.5 w-full rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC]"
          />
        </div>
      </div>
    </>
  )
}

