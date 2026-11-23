"use client"

export default function ChatShimmerSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3 py-2 shrink-0 animate-in fade-in duration-200">
      <div className="flex justify-center my-0.5">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500">
          Loading earlier messages...
        </span>
      </div>

      <div className="flex justify-start gap-1.5 sm:gap-2.5 items-end w-full">
        <div className="w-6.5 h-6.5 rounded-full bg-gray-200 animate-pulse shrink-0 mb-1" />
        <div className="flex flex-col items-start max-w-[94%] sm:max-w-[80%] md:max-w-[70%] min-w-0">
          <div className="px-3 sm:px-4 py-2.5 rounded-2xl rounded-bl-xs bg-white text-gray-900 shadow-xs border border-gray-200/90 w-fit min-w-[200px] sm:min-w-[240px]">
            <div className="h-3 bg-gray-200 rounded-md w-40 sm:w-52 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded-md w-28 sm:w-36 mt-1.5 animate-pulse" />
            <div className="h-2 bg-gray-100 rounded-md w-12 ml-auto mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-1.5 sm:gap-2.5 items-end w-full">
        <div className="flex flex-col items-end max-w-[94%] sm:max-w-[80%] md:max-w-[70%] min-w-0">
          <div className="px-3 sm:px-4 py-2.5 rounded-2xl rounded-br-xs bg-[#EEF2FF] shadow-xs border border-[#D5D2FB] w-fit min-w-[190px] sm:min-w-[230px]">
            <div className="h-3 bg-[#D5D2FB]/80 rounded-md w-36 sm:w-48 animate-pulse" />
            <div className="h-2 bg-[#D5D2FB]/60 rounded-md w-14 ml-auto mt-2 animate-pulse" />
          </div>
        </div>
        <div className="w-6.5 h-6.5 rounded-full bg-[#D5D2FB]/60 animate-pulse shrink-0 mb-1" />
      </div>

      <div className="flex justify-start gap-1.5 sm:gap-2.5 items-end w-full">
        <div className="w-6.5 h-6.5 rounded-full bg-gray-200 animate-pulse shrink-0 mb-1" />
        <div className="flex flex-col items-start max-w-[94%] sm:max-w-[80%] md:max-w-[70%] min-w-0">
          <div className="px-3 sm:px-4 py-2.5 rounded-2xl rounded-bl-xs bg-white shadow-xs border border-gray-200/90 w-full min-w-[210px] sm:min-w-[250px] max-w-full">
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse shrink-0" />
                <div className="min-w-0 flex-1 flex flex-col gap-1">
                  <div className="h-2.5 bg-gray-200 rounded w-28 animate-pulse" />
                  <div className="h-2 bg-gray-100 rounded w-14 animate-pulse" />
                </div>
              </div>
              <div className="w-6 h-6 rounded-lg bg-gray-200 animate-pulse shrink-0" />
            </div>
            <div className="h-2 bg-gray-100 rounded-md w-12 ml-auto mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
