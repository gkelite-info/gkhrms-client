import React from "react"
import IndiaFlag from "./IndiaFlag"
import { HrPayrollEmployee } from "./hrPayrollData"

export interface FinanceSummaryViewProps {
  onViewPayslip: () => void
  employee?: HrPayrollEmployee
}

interface DetailRowProps {
  label: string
  value: React.ReactNode
  labelWidthClass?: string
}

function DetailRow({
  label,
  value,
  labelWidthClass = "w-[170px] sm:w-[210px]",
}: DetailRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline text-xs sm:text-sm gap-0.5 sm:gap-0">
      <span className={`${labelWidthClass} shrink-0 font-semibold text-slate-800`}>
        {label} :
      </span>
      <span className="text-slate-500 font-normal break-words flex-1 sm:pl-2">
        {value}
      </span>
    </div>
  )
}

export default function FinanceSummaryView({
  onViewPayslip,
  employee,
}: FinanceSummaryViewProps) {
  const bankName = employee?.bankInfo?.bankName || "Bank of aroda"
  const accountNumber = employee?.bankInfo?.accountNumber || "2345678906789"
  const ifscCode = employee?.bankInfo?.ifscCode || "234567890"
  const accountName = employee?.bankInfo?.accountName || employee?.name || "Alexander"
  const branch = employee?.bankInfo?.branch || "N/A"
  const pfStatus = employee?.statutoryInfo?.pfStatus || "Enabled"
  const pfNumber = employee?.statutoryInfo?.pfNumber || "DFG3456789045678"
  const uan = employee?.statutoryInfo?.uan || "1234567890567"
  const pfJoinDate = employee?.statutoryInfo?.pfJoinDate || "21 Jan 2025"
  const aadharNumber = employee?.identityInfo?.aadhaarNumber || "49087579678"
  const dob = employee?.identityInfo?.dob || "19 Feb 2003"
  const address = employee?.identityInfo?.address || "Flat 502, Sun..."
  const enrollmentNumber = employee?.identityInfo?.enrollmentNumber || "49087579678"
  const empName = employee?.name || "Alexander"
  const gender = employee?.identityInfo?.gender || "Female"
  const panNumber = employee?.identityInfo?.panNumber || "XXXXXXXX9678"
  const fatherName = employee?.identityInfo?.fatherName || "Jones"

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5">
      <div className="w-full bg-white rounded-xl shadow-xs p-4 sm:p-5 md:p-6 border border-slate-100/80">
        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center justify-between gap-4 lg:gap-6">
          <div className="shrink-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Payroll Summary
            </h2>
          </div>

          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
              Last processed cycle
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 mt-1 whitespace-nowrap">
              JUl 2025 (26 Jun–25Jul)
            </span>
          </div>

          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
              Working Days
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 mt-1 whitespace-nowrap">
              30
            </span>
          </div>

          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
              Loss of Day
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 mt-1 whitespace-nowrap">
              0
            </span>
          </div>

          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
              Payslip
            </span>
            <button
              type="button"
              onClick={onViewPayslip}
              className="text-xs sm:text-sm md:text-base font-semibold text-[#5B50EC] underline hover:text-[#4338CA] transition-colors cursor-pointer text-left mt-1 whitespace-nowrap"
            >
              View Payslip
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="w-full bg-white rounded-xl shadow-xs p-4 sm:p-5 md:p-6 border border-slate-100/80 flex flex-col gap-3 sm:gap-3.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Payment Information
            </h3>
            <div className="border-b border-slate-100 -mt-1 mb-1" />

            <DetailRow
              label="Salary Payment Mode"
              value="Bank Transfer"
              labelWidthClass="w-[180px] sm:w-[210px]"
            />

            <h4 className="text-sm sm:text-base font-bold text-slate-900 pt-3">
              Bank Information
            </h4>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <DetailRow
                label="Bank Name"
                value={bankName}
                labelWidthClass="w-[180px] sm:w-[210px]"
              />
              <DetailRow
                label="Account Number"
                value={accountNumber}
                labelWidthClass="w-[180px] sm:w-[210px]"
              />
              <DetailRow
                label="IFSC Code"
                value={ifscCode}
                labelWidthClass="w-[180px] sm:w-[210px]"
              />
              <DetailRow
                label="Name on the Account"
                value={accountName}
                labelWidthClass="w-[180px] sm:w-[210px]"
              />
              <DetailRow
                label="Branch"
                value={branch}
                labelWidthClass="w-[180px] sm:w-[210px]"
              />
            </div>
          </div>

          <div className="w-full bg-white rounded-xl shadow-xs p-4 sm:p-5 md:p-6 border border-slate-100/80 flex flex-col gap-3 sm:gap-3.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Statutory Information
            </h3>
            <div className="border-b border-slate-100 -mt-1 mb-1" />

            <h4 className="text-sm sm:text-base font-bold text-slate-900 pt-1">
              PF Account Information
            </h4>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <DetailRow
                label="PF Status"
                value={pfStatus}
                labelWidthClass="w-[190px] sm:w-[220px]"
              />
              <DetailRow
                label="PF Number"
                value={pfNumber}
                labelWidthClass="w-[190px] sm:w-[220px]"
              />
              <DetailRow
                label="Universal Account Number"
                value={uan}
                labelWidthClass="w-[190px] sm:w-[220px]"
              />
              <DetailRow
                label="PF Join Date"
                value={pfJoinDate}
                labelWidthClass="w-[190px] sm:w-[220px]"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-xs p-4 sm:p-5 md:p-6 border border-slate-100/80 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Identity Information
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              Photo ID
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:gap-3.5">
            <div className="flex items-center gap-2">
              <IndiaFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span className="text-xs sm:text-sm font-medium text-slate-900">
                Aadhar Card
              </span>
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#4CAF50] text-white">
                Verified
              </span>
            </div>
            <div className="border-b border-slate-100 -mt-1 mb-1" />

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <DetailRow
                label="Aadhar Number"
                value={aadharNumber}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Date of Birth"
                value={dob}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Address"
                value={address}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Enrollment Number"
                value={enrollmentNumber}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Name"
                value={empName}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Gender"
                value={gender}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-3.5 pt-2">
            <div className="flex items-center gap-2">
              <IndiaFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span className="text-xs sm:text-sm font-medium text-slate-900">
                Pan Card
              </span>
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#4CAF50] text-white">
                Verified
              </span>
            </div>
            <div className="border-b border-slate-100 -mt-1 mb-1" />

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <DetailRow
                label="Permanent Account Number"
                value={panNumber}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Date Of Birth"
                value={dob}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Name"
                value={empName}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
              <DetailRow
                label="Father's Name"
                value={fatherName}
                labelWidthClass="w-[200px] sm:w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
