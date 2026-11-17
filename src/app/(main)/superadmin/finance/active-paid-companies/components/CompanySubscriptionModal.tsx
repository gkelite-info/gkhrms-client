"use client"

import {
  X,
  Building2,
  Calendar,
  CreditCard,
  CheckCircle2,
  Download,
  Users,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { ActivePaidCompany } from "../activePaidCompaniesData"

interface CompanySubscriptionModalProps {
  company: ActivePaidCompany | null
  onClose: () => void
}

export default function CompanySubscriptionModal({
  company,
  onClose,
}: CompanySubscriptionModalProps) {
  if (!company) return null

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${company.avatarBg} ${company.avatarColor}`}
            >
              {company.avatarLetter}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {company.name}
              </h3>
              <span className="text-[11px] text-slate-400">
                Subscription #{company.invoiceId}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-xs overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">
                Subscription Value
              </span>
              <div className="text-xl font-bold text-slate-800 mt-0.5">
                {company.amount}
              </div>
              <span className="text-[11px] text-slate-500">
                {company.billingCycle} Subscription
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {company.paymentStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {company.accountStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-slate-400" />
                Plan Tier
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.plan}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Billing Cycle
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.billingCycle}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Subscription Start
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.subscriptionStart}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Renewal Date
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.renewalDate}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                Assigned Seats
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.seats} Active Employees
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                Renewal Status
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {company.isRenewingThisMonth ? (
                  <span className="text-amber-600 font-bold">Renewing This Month</span>
                ) : (
                  <span className="text-emerald-600">Up to Date</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{company.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{company.contactPhone}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(`Invoice ${company.invoiceId} downloaded.`)
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#5B50E5] hover:bg-[#4E44C9] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  )
}
