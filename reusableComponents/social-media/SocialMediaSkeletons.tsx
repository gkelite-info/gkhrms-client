"use client"

export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-1.5">
            <div className="w-24 h-3 bg-gray-200 rounded-md" />
            <div className="w-16 h-2.5 bg-gray-100 rounded-md" />
          </div>
        </div>
        <div className="w-5 h-5 rounded-md bg-gray-100" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="w-full h-3 bg-gray-200 rounded-md" />
        <div className="w-4/5 h-3 bg-gray-200 rounded-md" />
      </div>

      <div className="w-full h-24 sm:h-28 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="w-16 h-6 rounded-lg bg-gray-100" />
        <div className="w-20 h-6 rounded-lg bg-gray-100" />
        <div className="w-12 h-6 rounded-lg bg-gray-100" />
      </div>
    </div>
  )
}

export function CommentItemSkeleton() {
  return (
    <div className="flex items-start gap-2.5 animate-pulse py-1">
      <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="p-2.5 rounded-xl bg-gray-100 flex flex-col gap-1.5">
          <div className="w-20 h-2.5 bg-gray-200 rounded-md" />
          <div className="w-3/4 h-2.5 bg-gray-200 rounded-md" />
        </div>
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-2 bg-gray-100 rounded-sm" />
          <div className="w-8 h-2 bg-gray-100 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

