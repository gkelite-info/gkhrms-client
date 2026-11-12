"use client"

import { useState } from "react"
import {
  X,
  CreditCard,
  Building2,
  User,
  CheckCircle2,
  ChevronDown,
  Landmark,
} from "lucide-react"
import { AccountantReimbursementClaim } from "../types"

interface AccountantProcessPayModalProps {
  claim: AccountantReimbursementClaim | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (claimId: string, paymentRef: string) => void
}

const paymentMethods = [
  "Bank Transfer (NEFT / RTGS)",
  "Instant UPI Transfer",
  "Corporate Account Payout",
]

export default function AccountantProcessPayModal({
  claim,
  isOpen,
  onClose,
  onConfirm,
}: AccountantProcessPayModalProps) {
  const [method, setMethod] = useState("Bank Transfer (NEFT / RTGS)")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [txnRef, setTxnRef] = useState(`TXN-REIMB-${Math.floor(100000 + Math.random() * 900000)}`)

  if (!isOpen || !claim) return null

  const handlePay = () => {
    onConfirm(claim.id, txnRef)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Process Reimbursement
            </h3>
            <p className="text-[11px] text-slate-400">
              Claim ID: {claim.claimId}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto modal-scrollbar p-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-indigo-500 font-medium block">
                Disbursement Amount
              </span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {claim.amount}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-[#4F46E5] shadow-2xs">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Employee / Beneficiary
              </span>
              <span className="font-semibold text-slate-800">
                {claim.employeeName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Department
              </span>
              <span className="font-semibold text-slate-800">
                {claim.department}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-slate-400" />
                Salary Account
              </span>
              <span className="font-semibold text-slate-800">
                HDFC Bank ••••4910
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Payment Method
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 transition-colors cursor-pointer text-left"
              >
                <span>{method}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-1 left-0 z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                    {paymentMethods.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setMethod(m)
                          setDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                          method === m
                            ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                            : "text-slate-700"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Transaction Reference
            </label>
            <input
              type="text"
              value={txnRef}
              onChange={(e) => setTxnRef(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-slate-50/50 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePay}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm & Disburse</span>
          </button>
        </div>
      </div>
    </div>
  )
}

