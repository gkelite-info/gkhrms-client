"use client"

import Link from "next/link"
import {
  Wallet,
  Clock,
  AlertTriangle,
  RotateCcw,
  Building2,
  TrendingUp,
} from "lucide-react"

interface StatCardProps {
  id: string
  label: string
  value: string
  subtext: string
  subtextHighlight?: boolean
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
  href?: string
}

const STAT_CARDS: StatCardProps[] = [
  {
    id: "money-received",
    label: "Money Received",
    value: "₹ 24,80,000",
    subtext: "This Month",
    icon: Wallet,
    iconContainerClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    href: "/superadmin/finance/money-received",
  },
  {
    id: "pending-payments",
    label: "Pending Payments",
    value: "₹ 4,20,000",
    subtext: "5 Companies",
    icon: Clock,
    iconContainerClass: "bg-blue-50 text-blue-600 border border-blue-100",
    href: "/superadmin/finance/pending-payments",
  },
  {
    id: "overdue-payments",
    label: "Overdue Payments",
    value: "₹ 1,50,000",
    subtext: "2 Companies",
    icon: AlertTriangle,
    iconContainerClass: "bg-rose-50 text-rose-500 border border-rose-100",
    href: "/superadmin/finance/overdue-payments",
  },
  {
    id: "refunds",
    label: "Refunds",
    value: "₹ 60,000",
    subtext: "3 Transactions",
    icon: RotateCcw,
    iconContainerClass: "bg-sky-50 text-sky-500 border border-sky-100",
    href: "/superadmin/finance/refunds",
  },
  {
    id: "active-companies",
    label: "Active Paid Companies",
    value: "64",
    subtext: "+9.1%",
    subtextHighlight: true,
    icon: Building2,
    iconContainerClass: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    href: "/superadmin/finance/active-paid-companies",
  },
]

export default function FinanceStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {STAT_CARDS.map((card) => {
        const IconComponent = card.icon
        const cardContent = (
          <div
            className={`bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between h-full ${
              card.href
                ? "hover:shadow-md hover:border-[#5B50E5]/30 cursor-pointer group"
                : "hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${card.iconContainerClass} ${
                  card.href ? "group-hover:scale-105" : ""
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs font-medium text-slate-400 block group-hover:text-slate-600 transition-colors">
                {card.label}
              </span>
              <div className="text-xl font-bold text-slate-800 tracking-tight mt-1 group-hover:text-[#5B50E5] transition-colors">
                {card.value}
              </div>
              <div className="mt-2 text-[11px] font-medium flex items-center gap-1">
                {card.subtextHighlight ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    {card.subtext}
                  </span>
                ) : (
                  <span className="text-slate-400">{card.subtext}</span>
                )}
              </div>
            </div>
          </div>
        )

        if (card.href) {
          return (
            <Link key={card.id} href={card.href} className="block h-full">
              {cardContent}
            </Link>
          )
        }

        return <div key={card.id}>{cardContent}</div>
      })}
    </div>
  )
}

