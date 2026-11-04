"use client"

import { Suspense } from "react"
import TeamLeadAttendanceContent from "../components/TeamLeadAttendanceContent"

export default function TeamLeadAttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-xs text-gray-400">
          Loading...
        </div>
      }
    >
      <TeamLeadAttendanceContent />
    </Suspense>
  )
}
