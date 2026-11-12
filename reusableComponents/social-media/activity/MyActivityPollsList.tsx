"use client"

import { useState } from "react"
import { ActivityPollItem } from "./types"
import ReusableAvatar from "../../ReusableAvatar"

interface MyActivityPollsListProps {
  polls: ActivityPollItem[]
  onViewProfile?: (name: string) => void
}

export default function MyActivityPollsList({
  polls,
  onViewProfile,
}: MyActivityPollsListProps) {
  const [subFilter, setSubFilter] = useState<"all" | "closed" | "my">("all")

  const filteredPolls = polls.filter((p) => {
    if (subFilter === "closed") return p.status === "closed"
    if (subFilter === "my") return Boolean(p.isMyPoll)
    return p.status === "active"
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-2xl w-fit border border-gray-100">
        <button
          type="button"
          onClick={() => setSubFilter("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            subFilter === "all"
              ? "bg-[#5B50EC] text-white shadow-2xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Active Polls
        </button>
        <button
          type="button"
          onClick={() => setSubFilter("closed")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            subFilter === "closed"
              ? "bg-[#5B50EC] text-white shadow-2xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Closed Polls
        </button>
        <button
          type="button"
          onClick={() => setSubFilter("my")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            subFilter === "my"
              ? "bg-[#5B50EC] text-white shadow-2xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          My Polls
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredPolls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ReusableAvatar
                  src={poll.authorAvatar}
                  name={poll.authorName}
                  size={32}
                  shape="circle"
                  fallbackType="initials"
                  bgColor="#EEF2FF"
                  textColor="#5B50EC"
                />
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {poll.authorName}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onViewProfile?.(poll.authorName)}
                className="text-xs font-medium text-gray-500 hover:text-[#5B50EC] transition-colors cursor-pointer"
              >
                View profile
              </button>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-gray-800">
              {poll.question}
            </h3>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span className="w-10">Yes</span>
                  <div className="flex-1 mx-3 h-3.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${poll.yesPercentage}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-gray-700">
                    {poll.yesPercentage}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span className="w-10">No</span>
                  <div className="flex-1 mx-3 h-3.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${poll.noPercentage}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-gray-700">
                    {poll.noPercentage}%
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[11px] text-gray-400 font-medium pt-1">
              {poll.totalResponses} Responses
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

