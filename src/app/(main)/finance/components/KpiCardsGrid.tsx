"use client"

import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  Building2,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Calendar,
  BarChart3,
} from "lucide-react"
import { KpiCardData } from "../types"

interface KpiCardsGridProps {
  cards: KpiCardData[]
  onCardClick?: (cardId: string) => void
}

export default function KpiCardsGrid({ cards, onCardClick }: KpiCardsGridProps) {
  const renderIcon = (type: KpiCardData["iconType"]) => {
    switch (type) {
      case "currency":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-xs xl:text-sm font-bold shrink-0">
            ₹
          </div>
        )
      case "receipt":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
        )
      case "payment":
      case "credit-card":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
        )
      case "budget":
      case "clock":
      case "pending":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
        )
      case "approved":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        )
      case "trend-up":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        )
      case "overdue":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
        )
      case "alert-triangle":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        )
      case "rejected":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <XCircle className="w-3.5 h-3.5" />
          </div>
        )
      case "users":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
        )
      case "building":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#FEF9C3] text-[#CA8A04] flex items-center justify-center shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
        )
      case "calendar":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <Calendar className="w-3.5 h-3.5" />
          </div>
        )
      case "bar-chart":
        return (
          <div className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
        )
      default:
        return null
    }
  }

  const getTrendColorClass = (card: KpiCardData) => {
    if (
      card.id === "expenses-pending-approval" ||
      card.id === "expenses-rejected" ||
      card.id === "reimbursements-pending-review" ||
      card.id === "reimbursements-rejected"
    ) {
      return "text-rose-500"
    }
    return "text-emerald-600"
  }

  const getGridColsClass = () => {
    if (cards.length === 4) return "grid-cols-2 lg:grid-cols-4"
    if (cards.length === 5) return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    return "grid-cols-2 sm:grid-cols-3 xl:grid-cols-6"
  }

  return (
    <div className={`grid ${getGridColsClass()} gap-2.5 sm:gap-3 xl:gap-3.5`}>
      {cards.map((card) => {
        const isClickable = Boolean(card.clickable || onCardClick)

        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card.id)}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            className={`bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-100/80 shadow-xs flex flex-col justify-between transition-all min-h-[105px] xl:min-h-[110px] ${
              isClickable
                ? "cursor-pointer hover:border-[#4F46E5]/40 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-2.5">
              {renderIcon(card.iconType)}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  {card.value}
                </span>
                <span className="text-[10.5px] xl:text-[11px] font-medium text-slate-500 leading-snug mt-1 break-normal hyphens-none">
                  {card.title}
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between text-xs">
              {card.trend ? (
                <div
                  className={`flex items-center gap-1 font-semibold text-[11px] whitespace-nowrap ${getTrendColorClass(card)}`}
                >
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                  <span>{card.trend}</span>
                  {card.trendLabel && (
                    <span className="text-slate-400 font-normal ml-0.5 text-[10px]">
                      {card.trendLabel}
                    </span>
                  )}
                </div>
              ) : card.badgeText ? (
                <span
                  className={`font-semibold text-xs whitespace-nowrap ${card.badgeColor || "text-slate-700"}`}
                >
                  {card.badgeText}
                </span>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
