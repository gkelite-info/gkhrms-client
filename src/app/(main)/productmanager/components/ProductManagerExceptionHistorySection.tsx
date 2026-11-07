"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { UsersThree, User } from "phosphor-react"
import HrExceptionHistorySection from "@/app/(main)/hr/attendance-leaves/components/exceptions/HrExceptionHistorySection"
import MyExceptionDetailsSection from "@/app/(main)/teamlead/components/exception-history/MyExceptionDetailsSection"

export default function ProductManagerExceptionHistorySection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subParam = searchParams.get("sub") || searchParams.get("subtab")
  const activeSubTab = subParam === "my" || subParam === "me" ? "my" : "team"

  const handleSubTabChange = (tab: "team" | "my") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "exception-history")
    params.set("sub", tab)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-0.5">
          <button
            type="button"
            onClick={() => handleSubTabChange("team")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeSubTab === "team"
                ? "bg-[#5B50EC] text-white shadow-xs"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
            }`}
          >
            <UsersThree size={16} weight={activeSubTab === "team" ? "bold" : "regular"} />
            <span>Product Team Exceptions</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubTabChange("my")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeSubTab === "my"
                ? "bg-[#5B50EC] text-white shadow-xs"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
            }`}
          >
            <User size={16} weight={activeSubTab === "my" ? "bold" : "regular"} />
            <span>My Exceptions</span>
          </button>
        </div>
      </div>

      {activeSubTab === "team" ? (
        <HrExceptionHistorySection />
      ) : (
        <MyExceptionDetailsSection />
      )}
    </div>
  )
}
