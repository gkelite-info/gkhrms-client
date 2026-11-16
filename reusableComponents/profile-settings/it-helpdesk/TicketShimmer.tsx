"use client"

export default function TicketShimmer({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center justify-between gap-3 shadow-2xs animate-pulse"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="w-16 h-3 bg-gray-200 rounded-md" />
              <div className="w-3/4 h-3.5 bg-gray-200 rounded-md" />
              <div className="flex items-center gap-2">
                <div className="w-20 h-2.5 bg-gray-100 rounded-md" />
                <div className="w-12 h-2.5 bg-gray-100 rounded-md" />
              </div>
            </div>
          </div>
          <div className="w-20 h-6 bg-gray-200 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  )
}

