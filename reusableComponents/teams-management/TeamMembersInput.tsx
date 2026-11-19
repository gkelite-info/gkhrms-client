"use client"

import { useState } from "react"
import { Plus, X } from "phosphor-react"
import { TeamMember } from "./types"

interface TeamMembersInputProps {
  members: TeamMember[]
  onAddMember: (name: string, role?: string) => void
  onRemoveMember: (id: string) => void
  error?: string | null
}

export default function TeamMembersInput({
  members,
  onAddMember,
  onRemoveMember,
  error,
}: TeamMembersInputProps) {
  const [nameInput, setNameInput] = useState("")
  const [roleInput, setRoleInput] = useState("")

  const handleAdd = () => {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    onAddMember(trimmed, roleInput.trim() || undefined)
    setNameInput("")
    setRoleInput("")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-gray-700 block">Team Members (Employees)</label>
        <span className="text-[10px] text-gray-400 font-medium">Optional</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
          placeholder="Member name or email..."
          className="flex-1 w-full px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
        />
        <input
          type="text"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
          placeholder="Role (e.g. Developer)..."
          className="w-full sm:w-44 px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer transition-colors shrink-0 flex items-center justify-center gap-1"
        >
          <Plus size={13} weight="bold" />
          <span>Add</span>
        </button>
      </div>

      {error && <p className="text-xs text-rose-500 font-semibold mt-1">{error}</p>}

      {members.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5 max-h-28 overflow-y-auto custom-scrollbar p-0.5">
          {members.map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EEF2FF] text-[#5B50EC] border border-purple-100"
            >
              <span>{m.name}</span>
              {m.role && <span className="text-[10px] text-gray-500">({m.role})</span>}
              <button type="button" onClick={() => onRemoveMember(m.id)} className="hover:text-rose-500 cursor-pointer">
                <X size={11} weight="bold" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
