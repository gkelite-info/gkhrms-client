"use client"

import { Trash } from "phosphor-react"
import { ActivityPollItem } from "./types"
import ReusableAvatar from "../../ReusableAvatar"

interface MyActivityPollsListProps {
  polls: ActivityPollItem[]
  activeSubTab?: "active" | "closed" | "my"
  onSubTabChange?: (subTab: "active" | "closed" | "my") => void
  onViewProfile?: (name: string) => void
  onDeletePoll?: (pollId: string) => void
}

export default function MyActivityPollsList({
  polls,
  activeSubTab = "active",
  onSubTabChange,
  onViewProfile,
  onDeletePoll,
}: MyActivityPollsListProps) {
  const filteredPolls = polls.filter((p) => {
    if (activeSubTab === "closed") return p.status === "closed"
    if (activeSubTab === "my") return Boolean(p.isMyPoll)
    return p.status === "active"
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-2xl w-fit border border-gray-100">
        <button
          type="button"
          onClick={() => onSubTabChange?.("active")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "active"
              ? "bg-[#5B50EC] text-white shadow-2xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Active Polls
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange?.("closed")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "closed"
              ? "bg-[#5B50EC] text-white shadow-2xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Closed Polls
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange?.("my")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "my"
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <ReusableAvatar
                  src={poll.authorAvatar}
                  name={poll.authorName}
                  size={32}
                  shape="circle"
                  fallbackType="initials"
                  bgColor="#EEF2FF"
                  textColor="#5B50EC"
                />
                <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {poll.authorName}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onDeletePoll?.(poll.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-rose-500 bg-white hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
                title="Delete Poll"
              >
                <Trash size={15} weight="bold" />
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
