"use client"

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, AirplaneInFlight, Laptop } from "phosphor-react"

// Exact custom icons matching the design screenshot
function HotelIcon({ className = "text-[#7D73E3]" }: { className?: string }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top roof bar */}
      <line x1="5" y1="4.5" x2="19" y2="4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Left and right walls */}
      <line x1="6.8" y1="4.5" x2="6.8" y2="19.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="17.2" y1="4.5" x2="17.2" y2="19.5" stroke="currentColor" strokeWidth="1.6" />
      {/* Bottom ground line */}
      <line x1="4" y1="19.5" x2="20" y2="19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* 6 windows (small horizontal rects) */}
      <rect x="9.2" y="7" width="2" height="1.8" rx="0.3" fill="currentColor" />
      <rect x="12.8" y="7" width="2" height="1.8" rx="0.3" fill="currentColor" />
      <rect x="9.2" y="10.2" width="2" height="1.8" rx="0.3" fill="currentColor" />
      <rect x="12.8" y="10.2" width="2" height="1.8" rx="0.3" fill="currentColor" />
      <rect x="9.2" y="13.4" width="2" height="1.8" rx="0.3" fill="currentColor" />
      <rect x="12.8" y="13.4" width="2" height="1.8" rx="0.3" fill="currentColor" />
      {/* Doorway with center split */}
      <path d="M9.8 19.5v-3.5h4.4v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function MegaphoneIcon({ className = "text-[#1F2937]" }: { className?: string }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 8.5L19 5.5V17.5L10 14.5" />
      <path d="M10 8.5H5.5A2 2 0 0 0 3.5 10.5V12.5A2 2 0 0 0 5.5 14.5H10" />
      <line x1="10" y1="8.5" x2="10" y2="14.5" />
      <path d="M7 14.5V19H9.5V14.5" />
    </svg>
  )
}

function EmployeeExpensesContent({
  defaultSubTab = "new_pending",
  onAddMore,
}: {
  defaultSubTab?: "new_pending" | "past_rejected"
  onAddMore?: () => void
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const rawQuery = (
    searchParams?.get("subtab") ||
    searchParams?.get("tab") ||
    searchParams?.get("view") ||
    searchParams?.get("type") ||
    ""
  ).toLowerCase()

  const isPast =
    rawQuery === "past_rejected" ||
    rawQuery === "past_claims" ||
    rawQuery === "past" ||
    rawQuery === "rejected" ||
    rawQuery === "past-claims" ||
    rawQuery === "past-rejected"

  const isNew =
    rawQuery === "new_pending" ||
    rawQuery === "new" ||
    rawQuery === "pending" ||
    rawQuery === "new-pending"

  const initialTab = isPast ? "past_rejected" : isNew ? "new_pending" : defaultSubTab
  const [subTab, setSubTab] = useState<"new_pending" | "past_rejected">(initialTab)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync sub-tab whenever URL search parameters change or on popstate
  useEffect(() => {
    if (isPast) {
      setSubTab("past_rejected")
    } else if (isNew) {
      setSubTab("new_pending")
    } else if (defaultSubTab) {
      setSubTab(defaultSubTab)
    }
  }, [isPast, isNew, defaultSubTab])

  // Change sub-tab and update URL query routing
  const handleSubTabChange = (newSubTab: "new_pending" | "past_rejected") => {
    setSubTab(newSubTab)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("subtab", newSubTab)
      window.history.pushState(null, "", url.toString())
      try {
        router.push(url.pathname + url.search, { scroll: false })
      } catch {
        // Fallback
      }
    }
  }

  const [claimedCards, setClaimedCards] = useState([
    {
      id: "claim-1",
      title: "Add Bill Photo",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...",
    },
    {
      id: "claim-2",
      title: "Add Bill Photo",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...",
    },
  ])

  const handleAddCard = () => {
    const newId = `claim-${claimedCards.length + 1}`
    setClaimedCards([
      ...claimedCards,
      {
        id: newId,
        title: "Add Bill Photo",
        note: "Upload supporting invoice, bill receipt or ticket voucher for reimbursement claim.",
      },
    ])
  }

  const handleAddMore = () => {
    if (onAddMore) {
      onAddMore()
    } else {
      router.push("/employee/me/tickets")
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full max-w-full flex flex-col gap-4 sm:gap-5">
      {/* Hidden file input for bill photo uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            alert(`Selected file: ${e.target.files[0].name}`)
          }
        }}
      />

      {/* 1. Sub-Tabs with Query Routing (New/Pending Expenses vs Past Claims / Rejected Claims) */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => handleSubTabChange("new_pending")}
          style={{ cursor: "pointer" }}
          className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none ${subTab === "new_pending"
              ? "bg-[#7D73E3] text-white shadow-sm"
              : "bg-[#E5E5EA] text-[#374151] hover:bg-[#dedde3] hover:text-[#1F2937]"
            }`}
        >
          New/Pending Expenses
        </button>

        <button
          type="button"
          onClick={() => handleSubTabChange("past_rejected")}
          style={{ cursor: "pointer" }}
          className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none ${subTab === "past_rejected"
              ? "bg-[#7D73E3] text-white shadow-sm"
              : "bg-[#E5E5EA] text-[#374151] hover:bg-[#dedde3] hover:text-[#1F2937]"
            }`}
        >
          Past Claims / Rejected Claims
        </button>
      </div>

      {/* Main Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1F2937]">Expenses & Travel</h1>
      </div>

      {subTab === "new_pending" ? (
        /* Sub-Tab 1: New / Pending Expenses */
        <div className="w-full flex flex-col gap-5 sm:gap-6">
          {/* Section 1: Expenses to be Claimed */}
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">Expenses to be Claimed</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4 items-center">
              {claimedCards.map((card) => (
                <div
                  key={card.id}
                  onClick={handleUploadClick}
                  style={{ cursor: "pointer" }}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-[#7D73E3]/50 transition-all duration-200 group min-h-[145px]"
                  title="Click to add bill photo"
                >
                  <div className="h-10 w-10 rounded-full bg-[#EBE8FD] group-hover:bg-[#dedafc] flex items-center justify-center text-[#7D73E3] transition-colors mb-2">
                    <Plus size={20} weight="bold" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1F2937] group-hover:text-[#7D73E3] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                    <span className="font-semibold text-gray-700">Note : </span>
                    {card.note}
                  </p>
                </div>
              ))}

              {/* Add More Button Card - Opens Open Tickets & ClosedTickets Screen */}
              <div
                onClick={handleAddMore}
                style={{ cursor: "pointer" }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-[#7D73E3]/50 transition-all duration-200 group w-full lg:w-[110px] min-h-[90px] sm:min-h-[110px] lg:min-h-[145px] self-stretch"
                title="Add More (Open Tickets)"
              >
                <div className="h-8 w-8 rounded-full bg-[#EBE8FD] group-hover:bg-[#dedafc] flex items-center justify-center text-[#7D73E3] transition-colors mb-1.5">
                  <Plus size={16} weight="bold" />
                </div>
                <span className="text-xs font-semibold text-[#1F2937] group-hover:text-[#7D73E3] transition-colors whitespace-nowrap">
                  Add More
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Expenses Claims in Process */}
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">Expenses Claims in Process</h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Hotel Bill Photo */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <HotelIcon className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Hotel Bill Photo</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...
                </p>
              </div>

              {/* Flight Ticket Photo */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <AirplaneInFlight size={22} weight="regular" className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Flight Ticket Photo</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Advance Settlements in Process */}
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">Advance Settlements in Process</h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Marketing Dept. Advance */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <MegaphoneIcon className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Marketing Dept. Advance</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...
                </p>
              </div>

              {/* Chargers for Laptops. Advance */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <Laptop size={22} weight="regular" className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Chargers for Laptops. Advance</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sub-Tab 2: Past Claims / Rejected Claims (Matching Latest Screenshot) */
        <div className="w-full flex flex-col gap-5 sm:gap-6">
          {/* Section 1: Past Claims */}
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">Past Claims</h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Past Claim 1: Hotel Bill Photo */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <HotelIcon className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Hotel Bill Photo</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>

              {/* Past Claim 2: Flight Ticket Photo */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <AirplaneInFlight size={22} weight="regular" className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Flight Ticket Photo</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>

              {/* Past Claim 3: Hotel Bill Photo */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-[#EBE8FD] flex items-center justify-center text-[#7D73E3] mb-2">
                  <HotelIcon className="text-[#7D73E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Hotel Bill Photo</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-gray-700">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Rejected Claims (Pink / Salmon Coral Cards) */}
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">Rejected Claims</h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Rejected Claim 1: Marketing Dept. Advance */}
              <div className="bg-[#F08C94] rounded-2xl p-4 sm:p-5 shadow-sm border border-transparent flex flex-col items-center justify-center text-center hover:shadow-md hover:brightness-[0.98] transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1F2937] mb-2">
                  <MegaphoneIcon className="text-[#1F2937]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Marketing Dept. Advance</h3>
                <p className="text-[11px] sm:text-xs text-[#1F2937]/80 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-[#1F2937]">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>

              {/* Rejected Claim 2: Chargers for Laptops. Advance */}
              <div className="bg-[#F08C94] rounded-2xl p-4 sm:p-5 shadow-sm border border-transparent flex flex-col items-center justify-center text-center hover:shadow-md hover:brightness-[0.98] transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1F2937] mb-2">
                  <Laptop size={22} weight="regular" className="text-[#1F2937]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Chargers for Laptops. Advance</h3>
                <p className="text-[11px] sm:text-xs text-[#1F2937]/80 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-[#1F2937]">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>

              {/* Rejected Claim 3: Marketing Dept. Advance */}
              <div className="bg-[#F08C94] rounded-2xl p-4 sm:p-5 shadow-sm border border-transparent flex flex-col items-center justify-center text-center hover:shadow-md hover:brightness-[0.98] transition-all duration-200 min-h-[145px]">
                <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1F2937] mb-2">
                  <MegaphoneIcon className="text-[#1F2937]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Marketing Dept. Advance</h3>
                <p className="text-[11px] sm:text-xs text-[#1F2937]/80 font-normal mt-2 text-left w-full line-clamp-2">
                  <span className="font-semibold text-[#1F2937]">Note : </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor....
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EmployeeExpensesView(props: {
  defaultSubTab?: "new_pending" | "past_rejected"
  onAddMore?: () => void
}) {
  return (
    <Suspense fallback={null}>
      <EmployeeExpensesContent {...props} />
    </Suspense>
  )
}
