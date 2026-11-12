"use client"

import { useState } from "react"
import { Check, CalendarBlank } from "phosphor-react"
import { SocialPollData } from "./types"

interface SocialMediaPollCardProps {
  pollData: SocialPollData
  onVote?: (optionId: string) => void
}

export default function SocialMediaPollCard({ pollData, onVote }: SocialMediaPollCardProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(pollData.userVotedOptionId)
  const [options, setOptions] = useState(pollData.options)
  const [totalVotes, setTotalVotes] = useState(pollData.totalVotes)

  const handleSelectOption = (optId: string) => {
    if (selectedId === optId) return

    if (!selectedId) {
      setSelectedId(optId)
      setTotalVotes((prev) => prev + 1)
      setOptions((prev) =>
        prev.map((opt) => (opt.id === optId ? { ...opt, votes: opt.votes + 1 } : opt))
      )
    } else {
      const prevId = selectedId
      setSelectedId(optId)
      setOptions((prev) =>
        prev.map((opt) => {
          if (opt.id === prevId) return { ...opt, votes: Math.max(0, opt.votes - 1) }
          if (opt.id === optId) return { ...opt, votes: opt.votes + 1 }
          return opt
        })
      )
    }
    onVote?.(optId)
  }

  return (
    <div className="bg-[#FAF9FF] border border-[#EEF2FF] rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2.5">
      <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
        {pollData.question}
      </h4>

      <div className="flex flex-col gap-2 pt-1">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`relative overflow-hidden w-full text-left p-2.5 sm:p-3 rounded-xl border text-xs transition-all cursor-pointer select-none ${
                isSelected
                  ? "border-[#5B50EC] bg-[#EEF2FF]/70 font-bold shadow-2xs"
                  : selectedId
                  ? "border-gray-200 bg-white hover:border-[#5B50EC]/70"
                  : "border-gray-200 bg-white hover:border-[#5B50EC] hover:bg-gray-50"
              }`}
            >
              {selectedId && (
                <div
                  style={{ width: `${percentage}%` }}
                  className={`absolute inset-y-0 left-0 transition-all duration-500 rounded-lg ${
                    isSelected ? "bg-[#5B50EC]/20" : "bg-gray-100/90"
                  }`}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#5B50EC] text-white flex items-center justify-center shrink-0">
                      <Check size={10} weight="bold" />
                    </div>
                  )}
                  <span className="truncate text-gray-800">{option.text}</span>
                </div>

                {selectedId && (
                  <span className="text-[11px] font-bold text-gray-700 shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-1 px-0.5">
        <span>
          {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
          {selectedId ? " • Click to change vote" : ""}
        </span>
        {pollData.endDate && (
          <div className="flex items-center gap-1">
            <CalendarBlank size={12} weight="bold" />
            <span>Closes {pollData.endDate}</span>
          </div>
        )}
      </div>
    </div>
  )
}
