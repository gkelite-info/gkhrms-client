"use client"

import { usePathname, useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantModeToggle() {
  const { financeMode, setFinanceMode } = useAccountant()
  const router = useRouter()
  const pathname = usePathname()

  const handleModeChange = (mode: "My Finance" | "Executive Finance") => {
    setFinanceMode(mode)
    if (mode === "Executive Finance" && pathname?.includes("/payments")) {
      router.push("/accountantmanager")
    }
  }

  return (
    <div className="flex items-center gap-2 pt-1">
      <button
        type="button"
        onClick={() => handleModeChange("My Finance")}
        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
          financeMode === "My Finance"
            ? "bg-[#4F46E5] text-white shadow-xs"
            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80"
        }`}
      >
        My Finance
      </button>

      <button
        type="button"
        onClick={() => handleModeChange("Executive Finance")}
        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
          financeMode === "Executive Finance"
            ? "bg-[#4F46E5] text-white shadow-xs"
            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80"
        }`}
      >
        Executive Finance
      </button>
    </div>
  )
}

