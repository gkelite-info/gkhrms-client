"use client"

import { Landmark, CreditCard, Eye } from "lucide-react"
import { AccountantVendorPayment } from "../types"

interface AccountantVendorPaymentsTableProps {
  payments: AccountantVendorPayment[]
  onViewPayment?: (payment: AccountantVendorPayment) => void
}

export default function AccountantVendorPaymentsTable({
  payments,
  onViewPayment,
}: AccountantVendorPaymentsTableProps) {
  const renderPaymentMethod = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Bank Transfer</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Card</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="italic font-extrabold text-[11px] text-indigo-600 tracking-tight leading-none">
              UPI
            </span>
            <span>UPI</span>
          </div>
        )
      default:
        return <span className="text-slate-700 font-medium">{method}</span>
    }
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
            Paid
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF8EB] text-[#D97706]">
            Pending
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[960px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-white">
              <th className="py-3.5 px-5 font-semibold">PAYMENT ID</th>
              <th className="py-3.5 px-4 font-semibold">VENDOR NAME</th>
              <th className="py-3.5 px-4 font-semibold">BILL DATE</th>
              <th className="py-3.5 px-4 font-semibold">PAYMENT DATE</th>
              <th className="py-3.5 px-4 font-semibold">AMOUNT</th>
              <th className="py-3.5 px-4 font-semibold">PAYMENT METHOD</th>
              <th className="py-3.5 px-4 font-semibold">STATUS</th>
              <th className="py-3.5 px-5 font-semibold text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                  No vendor payments match the selected criteria.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50/70 transition-colors text-xs text-slate-700"
                >
                  <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                    {payment.paymentId}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {payment.vendorInitials}
                      </div>
                      <span className="font-semibold text-slate-900">
                        {payment.vendorName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                    {payment.billDate}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                    {payment.paymentDate}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {renderPaymentMethod(payment.paymentMethod)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {renderStatus(payment.status)}
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => onViewPayment && onViewPayment(payment)}
                      className="w-7 h-7 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 transition-colors cursor-pointer"
                      title="View vendor payment details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

