"use client"

import { DotsSixVertical, Trash, Plus } from "phosphor-react"

interface SocialMediaPollOptionsEditorProps {
  options: string[]
  onChangeOption: (index: number, value: string) => void
  onAddOption: () => void
  onRemoveOption: (index: number) => void
}

export default function SocialMediaPollOptionsEditor({
  options,
  onChangeOption,
  onAddOption,
  onRemoveOption,
}: SocialMediaPollOptionsEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-700">
        Poll Options <span className="text-rose-500">*</span>
      </label>
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl focus-within:border-[#5B50EC] transition-all">
            <DotsSixVertical size={16} weight="bold" className="text-gray-400 shrink-0 cursor-grab" />
            <input
              type="text"
              value={opt}
              onChange={(e) => onChangeOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 text-xs bg-transparent focus:outline-none text-gray-900 font-medium placeholder:text-gray-400"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => onRemoveOption(idx)}
                className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
              >
                <Trash size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {options.length < 6 && (
        <button
          type="button"
          onClick={onAddOption}
          className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F3E8FF] text-[#7E22CE] hover:bg-[#EDE9FE] text-xs font-semibold transition-colors cursor-pointer mt-1"
        >
          <Plus size={13} weight="bold" />
          <span>Add Option</span>
        </button>
      )}
    </div>
  )
}

