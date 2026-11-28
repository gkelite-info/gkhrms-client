"use client"

import {
  X,
  Building2,
  User,
  Package,
  CreditCard,
  Share2,
  RefreshCw,
  MapPin,
} from "lucide-react"
import { TeamCompanyRecord } from "../teamsData"

interface CompanyDetailModalProps {
  company: TeamCompanyRecord | null
  isOpen: boolean
  onClose: () => void
}

export default function CompanyDetailModal({
  company,
  isOpen,
  onClose,
}: CompanyDetailModalProps) {
  if (!isOpen || !company) return null

  const activeUsers =
    company.activeUsers ??
    Math.max(1, Math.round(company.employees * 0.93))

  const companyType = "Client Company"
  const industry = company.industry || "Technology Services"
  const email = company.email || `admin@${company.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`
  const phone = company.phone || "+91 98765 43210"
  const address = company.address || "Hitech City, Hyderabad"
  const cityLocation = company.cityLocation || "Hyderabad, India"
  const subscriptionStart = company.subscriptionStart || "01 Jan 2026"

  const chairmanName = company.chairmanName || "Eleanor Vance"
  const chairmanRole = company.chairmanRole || "Chairman / Primary Admin"
  const chairmanEmail =
    company.chairmanEmail ||
    `${chairmanName.toLowerCase().replace(" ", ".")}@${company.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`
  const chairmanPhone = company.chairmanPhone || "+91 99887 77665"
  const chairmanDepartment = company.chairmanDepartment || "Executive Office"
  const chairmanAvatar = company.chairmanAvatar || "/images/jane_smith.jpg"

  const billingCycle = company.billingCycle || "Annual"
  const modules = company.modules || "HRMS, Payroll, Attendance, Finance, Teams"
  const renewalDate = company.renewalDate || company.subscriptionExpiry || "31 Dec 2026"

  const lastPaymentAmount = company.lastPaymentAmount || "₹4,80,000"
  const lastPaymentDate = company.lastPaymentDate || "01 Jan 2026"
  const nextDueDate = company.nextDueDate || company.subscriptionExpiry || "31 Dec 2026"
  const paymentMethod = company.paymentMethod || "Bank Transfer"
  const invoiceId = company.invoiceId || "INV-2026-011"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-[#EFF3FA] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200/80 p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0EFFE] text-[#5046E5] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Company Details
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5">
                View company profile, primary admin, subscription and payment information.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center text-lg font-bold shrink-0">
              {company.initials}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {company.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {companyType} • {industry}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {company.accountStatus}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F3FF] text-[#7C3AED]">
                  {company.code}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {cityLocation}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[95px] text-center shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center mb-1.5">
                <Share2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-900 leading-tight">
                {company.employees.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">
                Employee Count
              </span>
            </div>

            <div className="bg-[#F5FBF7] border border-emerald-100/70 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[95px] text-center shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-900 leading-tight">
                {activeUsers.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">
                Active Users
              </span>
            </div>

            <div className="bg-[#FAFBFD] border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[95px] text-center shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center mb-1.5">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {company.plan}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">
                Current Plan
              </span>
            </div>

            <div className="bg-[#F5FBF7] border border-emerald-100/70 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[95px] text-center shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-1.5">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span
                className={`text-xs font-bold leading-tight ${
                  company.paymentStatus === "Paid"
                    ? "text-emerald-600"
                    : "text-amber-600"
                }`}
              >
                {company.paymentStatus}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">
                Payment Status
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Company Profile
              </h4>
            </div>

            <div className="mt-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Company Name</span>
                <span className="font-bold text-slate-900">{company.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Industry</span>
                <span className="text-slate-800 font-medium">{industry}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Company Email</span>
                <span className="text-[#6D28D9] font-medium">{email}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Phone</span>
                <span className="text-slate-800 font-medium">{phone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Address</span>
                <span className="text-slate-800 font-medium">{address}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Subscription Start</span>
                <span className="text-slate-800 font-medium">{subscriptionStart}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Chairman / Primary Admin
              </h4>
            </div>

            <div className="mt-3.5 flex items-start gap-4">
              <img
                src={chairmanAvatar}
                alt={chairmanName}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0 mt-1"
              />
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Name</span>
                  <span className="font-bold text-slate-900">{chairmanName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Role</span>
                  <span className="text-slate-800 font-medium">{chairmanRole}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="text-[#6D28D9] font-medium truncate max-w-[180px]">
                    {chairmanEmail}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="text-slate-800 font-medium">{chairmanPhone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Department</span>
                  <span className="text-slate-800 font-medium">{chairmanDepartment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Package className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Subscription Details
              </h4>
            </div>

            <div className="mt-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Plan</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F3FF] text-[#7C3AED]">
                  {company.plan}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Billing Cycle</span>
                <span className="text-slate-800 font-medium">{billingCycle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Modules</span>
                <span className="text-slate-800 font-medium text-right truncate max-w-[210px]">
                  {modules}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Start Date</span>
                <span className="text-slate-800 font-medium">{subscriptionStart}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Renewal Date</span>
                <span className="text-slate-800 font-medium">{renewalDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Subscription Status</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {company.accountStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Payment Details
              </h4>
            </div>

            <div className="mt-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Last Payment Amount</span>
                <span className="font-bold text-slate-900">{lastPaymentAmount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Last Payment Date</span>
                <span className="text-slate-800 font-medium">{lastPaymentDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Next Due Date</span>
                <span className="text-slate-800 font-medium">{nextDueDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Payment Method</span>
                <span className="text-slate-800 font-medium">{paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Invoice ID</span>
                <span className="text-slate-800 font-medium">{invoiceId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Payment Status</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {company.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
