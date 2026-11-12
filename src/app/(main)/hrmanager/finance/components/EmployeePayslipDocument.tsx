import React from "react"
import Image from "next/image"

export interface PayslipItem {
  label: string
  amount: string
}

export interface PayslipData {
  company: {
    name: string
    address: string
    phone: string
    logoUrl?: string
  }
  period: string
  employee: {
    name: string
    addressLine1: string
    addressLine2: string
    phone: string
    employeeId: string
    dateOfJoining: string
    designation: string
  }
  bankAndStatutory: {
    bankName: string
    bankAccount: string
    bankIfsc: string
    pan: string
    aadhaar: string
    taxRegime: string
    pfAccount: string
    pfUan: string
  }
  earnings: {
    items: PayslipItem[]
    gross: string
  }
  deductions: {
    items: PayslipItem[]
    total: string
  }
  netPayable: string
}

export const DEFAULT_PAYSLIP_DATA: PayslipData = {
  company: {
    name: "GK HRMS",
    address: "HITEC City, Madhapur, Hyderabad, Telangana 500081 | contact@gkhrms.com",
    phone: "+91 40 2345 6789",
    logoUrl: "/images/gkLogoblack.png",
  },
  period: "26 Jun 2025 - 25 Jul 2025",
  employee: {
    name: "ALEXANDER",
    addressLine1: "Flat 502, Sun City Apartments",
    addressLine2: "Hyderabad, Telangana 500081",
    phone: "+91 98765 43210",
    employeeId: "GK-EMP-1048",
    dateOfJoining: "Jan 21, 2025",
    designation: "Software Developer",
  },
  bankAndStatutory: {
    bankName: "Bank of aroda",
    bankAccount: "2345678906789",
    bankIfsc: "234567890",
    pan: "XXXXXXXX9678",
    aadhaar: "49087579678",
    taxRegime: "Old",
    pfAccount: "DFG3456789045678",
    pfUan: "1234567890567",
  },
  earnings: {
    items: [
      { label: "Basic", amount: "₹17,500.00" },
      { label: "HRA", amount: "₹5,000.00" },
      { label: "Special Allowance", amount: "₹2,500.00" },
      { label: "Transport Allowance", amount: "₹750.00" },
      { label: "Telephone Allowance", amount: "₹500.00" },
      { label: "Bonus", amount: "₹1,250.00" },
    ],
    gross: "₹27,500.00",
  },
  deductions: {
    items: [
      { label: "Company Deduction", amount: "₹1,000.00" },
      { label: "Loss of Pay (LOP)", amount: "-" },
    ],
    total: "₹1,000.00",
  },
  netPayable: "₹26,500.00",
}

export interface EmployeePayslipDocumentProps {
  data?: PayslipData
  id?: string
}

export default function EmployeePayslipDocument({
  data = DEFAULT_PAYSLIP_DATA,
  id = "printable-payslip",
}: EmployeePayslipDocumentProps) {
  return (
    <div
      id={id}
      className="w-full bg-white text-slate-800 p-6 sm:p-10 md:p-12 font-sans select-text max-w-4xl mx-auto shadow-sm rounded-xl border border-slate-200/80 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none"
    >
      <div className="flex flex-col items-center text-center pb-4 border-b border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          {data.company.logoUrl ? (
            <Image
              src={data.company.logoUrl}
              alt="Logo"
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
          ) : (
            <div className="w-6 h-6 rounded-md bg-[#5B50EC] text-white font-bold text-xs flex items-center justify-center">
              GK
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {data.company.name}
          </h1>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-600 max-w-2xl leading-relaxed">
          {data.company.address} | Ph: {data.company.phone}
        </p>

        <div className="mt-4">
          <h2 className="text-sm sm:text-base font-bold tracking-[0.25em] text-slate-900 uppercase">
            PAYSLIP
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
            {data.period}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-slate-200 text-xs sm:text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="font-extrabold text-sm sm:text-base text-slate-900 uppercase">
            {data.employee.name}
          </span>
          <span className="text-slate-600">{data.employee.addressLine1}</span>
          <span className="text-slate-600">{data.employee.addressLine2}</span>
          <span className="text-slate-600">Phone: {data.employee.phone}</span>
        </div>

        <div className="flex flex-col justify-start sm:items-end gap-1 text-slate-700">
          <div>
            <span className="text-slate-600">Employee ID: </span>
            <span className="font-bold text-slate-900">
              {data.employee.employeeId}
            </span>
          </div>
          <div>
            <span className="text-slate-600">Date of Joining: </span>
            <span className="font-bold text-slate-900">
              {data.employee.dateOfJoining}
            </span>
          </div>
          <div>
            <span className="text-slate-600">Designation: </span>
            <span className="font-bold text-slate-900">
              {data.employee.designation}
            </span>
          </div>
        </div>
      </div>

      <div className="my-5 bg-[#FBFBFC] rounded-lg border border-slate-200/90 p-3.5 sm:p-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">Bank Name</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.bankName}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">Bank A/c</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.bankAccount}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">Bank IFSC</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.bankIfsc}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">PAN #</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.pan}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">AADHAAR #</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.aadhaar}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">Tax Regime</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.taxRegime}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">PF A/c #</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.pfAccount}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="w-24 shrink-0 text-slate-500">PF UAN #</span>
            <span className="font-bold text-slate-900">
              {data.bankAndStatutory.pfUan}
            </span>
          </div>
          <div className="hidden sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
        <div className="flex flex-col">
          <div className="border-b-2 border-slate-900 pb-2 mb-3">
            <h3 className="font-bold text-xs sm:text-sm tracking-wide text-slate-900 uppercase">
              EARNINGS & ALLOWANCES
            </h3>
          </div>

          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            {data.earnings.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-0.5">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-slate-900">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 mt-4 flex justify-between items-center text-xs sm:text-sm">
            <span className="font-bold text-slate-900">Gross Earnings</span>
            <span className="font-bold text-slate-900 text-sm sm:text-base">
              {data.earnings.gross}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-slate-900 pb-2 mb-3">
              <h3 className="font-bold text-xs sm:text-sm tracking-wide text-slate-900 uppercase">
                DEDUCTIONS
              </h3>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              {data.deductions.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-0.5">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium text-slate-900">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 mt-4 flex justify-between items-center text-xs sm:text-sm">
            <span className="font-bold text-slate-900">Total Deductions</span>
            <span className="font-bold text-slate-900 text-sm sm:text-base">
              {data.deductions.total}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-slate-900 pt-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-black text-xs sm:text-sm tracking-wide text-slate-900 uppercase">
            NET PAYABLE SALARY
          </span>
          <span className="text-xs text-slate-500">
            Amount transferred to bank account
          </span>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {data.netPayable}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
        <span>This is a system generated payslip and does not require a signature.</span>
        <span>© 2026 gkhrms</span>
      </div>
    </div>
  )
}

