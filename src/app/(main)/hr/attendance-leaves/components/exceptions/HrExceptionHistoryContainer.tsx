"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { UsersThree, User } from "phosphor-react"
import HrExceptionHistorySection from "./HrExceptionHistorySection"
import MyExceptionDetailsSection from "@/app/(main)/teamlead/components/exception-history/MyExceptionDetailsSection"

interface HrExceptionHistoryContainerProps {
  hideHrDepartment?: boolean
}

export default function HrExceptionHistoryContainer({
  hideHrDepartment = false,
}: HrExceptionHistoryContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const subParam = searchParams.get("sub") || searchParams.get("subtab")
  const activeSubtab = subParam === "me" || subParam === "my" || subParam === "my-exceptions" ? "my" : "organization"

  const handleSubtabChange = (tab: "organization" | "my") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "exception-history")
    params.set("sub", tab === "my" ? "me" : "organization")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-0.5">
          <button
            type="button"
            onClick={() => handleSubtabChange("organization")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeSubtab === "organization"
                ? "bg-[#5B50EC] text-white shadow-xs"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
            }`}
          >
            <UsersThree size={16} weight={activeSubtab === "organization" ? "bold" : "regular"} />
            <span>Organization Exceptions</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubtabChange("my")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeSubtab === "my"
                ? "bg-[#5B50EC] text-white shadow-xs"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
            }`}
          >
            <User size={16} weight={activeSubtab === "my" ? "bold" : "regular"} />
            <span>My Exceptions</span>
          </button>
        </div>
      </div>

      {activeSubtab === "my" ? (
        <MyExceptionDetailsSection />
      ) : (
        <HrExceptionHistorySection hideHrDepartment={hideHrDepartment} />
      )}
    </div>
  )
}

