"use client"

import React, { useEffect, Suspense, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { TreeStructure, ChatCircleDots, VideoCamera } from "phosphor-react"
import EngageTreeChart from "./components/EngageTreeChart"
import EngageChatPanel from "./components/EngageChatPanel"
import EngageMeetingsView from "./components/EngageMeetingsView"

function EngageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tab = searchParams?.get("tab")?.toLowerCase()
  const viewParam = searchParams?.get("view")?.toLowerCase()
  const chatParam = searchParams?.get("chat")

  const mobileView = viewParam === "chat" || (!viewParam && Boolean(chatParam)) ? "chat" : "tree"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    const mainEl = document.querySelector("main")
    if (mainEl) {
      mainEl.scrollTop = 0
    }
  }, [tab])

  const setMobileView = useCallback(
    (view: "tree" | "chat") => {
      const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
      if (view === "tree") {
        params.delete("view")
      } else {
        params.set("view", "chat")
      }
      const query = params.toString()
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
    },
    [searchParams, pathname, router]
  )

  if (tab === "meetings") {
    return <EngageMeetingsView />
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] flex-1 min-h-0 px-3 py-3 sm:px-4 sm:pt-4 md:px-6 md:pt-4 pb-4 flex flex-col gap-3 select-none overflow-y-auto xl:overflow-hidden">
      <div className="xl:hidden w-full bg-white rounded-xl p-1.5 flex items-center justify-between gap-2 shadow-xs border border-gray-100 shrink-0">
        <div className="flex items-center gap-1.5 flex-1">
          <button
            type="button"
            onClick={() => setMobileView("tree")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mobileView === "tree"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <TreeStructure size={15} weight="bold" />
            <span>Hierarchy Tree</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView("chat")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mobileView === "chat"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChatCircleDots size={15} weight="bold" />
            <span>Team Chat</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
            params.set("tab", "meetings")
            router.push(`${pathname}?${params.toString()}`)
          }}
          className="p-2 text-gray-600 hover:text-[#8571EE] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer shrink-0"
          title="Meetings"
          aria-label="Meetings"
        >
          <VideoCamera size={18} weight="bold" />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col xl:flex-row gap-3.5 sm:gap-4 items-stretch overflow-hidden">
        <div
          className={`flex-1 min-w-0 w-full flex flex-col gap-3 h-full min-h-0 ${
            mobileView === "chat" ? "hidden xl:flex" : "flex"
          }`}
        >
          <EngageTreeChart />
        </div>

        <div
          className={`w-full xl:w-[280px] 2xl:w-[290px] shrink-0 flex flex-col h-[520px] xl:h-full min-h-0 ${
            mobileView === "tree" ? "hidden xl:flex" : "flex"
          }`}
        >
          <EngageChatPanel />
        </div>
      </div>
    </div>
  )
}

export default function EmployeeEngagePage() {
  return (
    <Suspense fallback={<div className="w-full h-40 animate-pulse bg-white/40 rounded-2xl m-4" />}>
      <EngageContent />
    </Suspense>
  )
}
