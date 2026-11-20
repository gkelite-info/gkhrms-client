"use client"

import ChairmanHeadcountHeader from "./ChairmanHeadcountHeader"
import ChairmanHeadcountTopCards from "./ChairmanHeadcountTopCards"
import ChairmanHeadcountTrendChartCard from "./ChairmanHeadcountTrendChartCard"
import ChairmanHeadcountBottomCards from "./ChairmanHeadcountBottomCards"

interface ChairmanHeadcountViewProps {
  onBack?: () => void
}

export default function ChairmanHeadcountView({
  onBack,
}: ChairmanHeadcountViewProps) {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 flex flex-col gap-4 pb-12">
      <ChairmanHeadcountHeader onBack={onBack} />
      <ChairmanHeadcountTopCards />
      <ChairmanHeadcountTrendChartCard />
      <ChairmanHeadcountBottomCards />
    </div>
  )
}
