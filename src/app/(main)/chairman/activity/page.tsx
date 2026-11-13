"use client"

import { Suspense } from "react"
import { MyActivityScreen } from "../../../../../reusableComponents"

export default function ChairmanActivityPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-xs text-gray-400">
          Loading Activity...
        </div>
      }
    >
      <MyActivityScreen />
    </Suspense>
  )
}
