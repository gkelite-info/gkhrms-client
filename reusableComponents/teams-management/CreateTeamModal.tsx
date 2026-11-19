"use client"

import { useState, useEffect } from "react"
import { X, Crown, Briefcase, UsersThree, UserCircle, CurrencyDollar, ShieldCheck, Bank } from "phosphor-react"
import { TeamItem, ManagerUser, TeamMember, RoleUser } from "./types"
import {
  AVAILABLE_CHAIRMEN,
  AVAILABLE_HR_MANAGERS,
  AVAILABLE_MANAGERS,
  AVAILABLE_FINANCE_MANAGERS,
  AVAILABLE_ASST_MANAGERS,
  AVAILABLE_FINANCE_EXECUTIVES,
  AVAILABLE_TECH_ADMINS,
  AVAILABLE_LEADS,
} from "./mockTeamsData"
import RoleUserSelectDropdown from "./RoleUserSelectDropdown"
import TeamMembersInput from "./TeamMembersInput"

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (team: Partial<TeamItem>) => void
  initialTeam?: TeamItem | null
}

export default function CreateTeamModal({
  isOpen,
  onClose,
  onSave,
  initialTeam,
}: CreateTeamModalProps) {
  const [name, setName] = useState("")
  const [chairman, setChairman] = useState<RoleUser | null>(null)
  const [hrManager, setHrManager] = useState<RoleUser | null>(null)
  const [manager, setManager] = useState<ManagerUser | null>(AVAILABLE_MANAGERS[0])
  const [financeManager, setFinanceManager] = useState<RoleUser | null>(null)
  const [asstManager, setAsstManager] = useState<RoleUser | null>(null)
  const [financeExecutive, setFinanceExecutive] = useState<RoleUser | null>(null)
  const [techAdmin, setTechAdmin] = useState<RoleUser | null>(null)
  const [teamLead, setTeamLead] = useState<RoleUser | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialTeam) {
      setName(initialTeam.name)
      setChairman((initialTeam.chairman as RoleUser) || null)
      setHrManager((initialTeam.hrManager as RoleUser) || null)
      setManager((initialTeam.manager as ManagerUser) || null)
      setFinanceManager((initialTeam.financeManager as RoleUser) || null)
      setAsstManager((initialTeam.asstManager as RoleUser) || null)
      setFinanceExecutive((initialTeam.financeExecutive as RoleUser) || null)
      setTechAdmin((initialTeam.techAdmin as RoleUser) || null)
      setTeamLead((initialTeam.teamLead as RoleUser) || null)
      setMembers(initialTeam.members || [])
    } else {
      setName("")
      setChairman(null)
      setHrManager(null)
      setManager(AVAILABLE_MANAGERS[0])
      setFinanceManager(null)
      setAsstManager(null)
      setFinanceExecutive(null)
      setTechAdmin(null)
      setTeamLead(null)
      setMembers([
        { id: "m-1", name: "Rahul Verma", role: "Software Engineer" },
        { id: "m-2", name: "Sarah Chen", role: "UI Designer" },
      ])
    }
    setError(null)
  }, [initialTeam, isOpen])

  if (!isOpen) return null

  const handleAddMember = (memberName: string, role?: string) => {
    if (members.some((m) => m.name.toLowerCase() === memberName.toLowerCase())) {
      setError("Member is already in the list.")
      return
    }
    setMembers((prev) => [...prev, { id: `m-${Date.now()}`, name: memberName, role: role || "Employee" }])
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter a team name.")
      return
    }
    onSave({
      id: initialTeam?.id,
      name: name.trim(),
      chairman: chairman || undefined,
      hrManager: hrManager || undefined,
      manager: manager || undefined,
      financeManager: financeManager || undefined,
      asstManager: asstManager || undefined,
      financeExecutive: financeExecutive || undefined,
      techAdmin: techAdmin || undefined,
      teamLead: teamLead || undefined,
      members,
      membersCount: Math.max(members.length, initialTeam?.membersCount || members.length),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[88vh] overflow-hidden">
        <div className="flex items-center justify-between p-5 sm:p-6 pb-3 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              {initialTeam ? "Edit Team" : "Create New Team"}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Hierarchy roles are optional for smaller staff organizations.</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 pt-3.5 flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">
              Team Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Phoenix Team"
              required
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-900 bg-white placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none min-h-[42px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RoleUserSelectDropdown label="Chairman" icon={<Crown size={14} weight="fill" className="text-amber-500" />} selectedUser={chairman} options={AVAILABLE_CHAIRMEN} onSelect={(u) => setChairman(u as RoleUser | null)} />
            <RoleUserSelectDropdown label="HR / HR Manager" icon={<Briefcase size={14} weight="fill" className="text-[#5B50EC]" />} selectedUser={hrManager} options={AVAILABLE_HR_MANAGERS} onSelect={(u) => setHrManager(u as RoleUser | null)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RoleUserSelectDropdown label="Manager" icon={<Briefcase size={14} weight="bold" className="text-[#5B50EC]" />} selectedUser={manager} options={AVAILABLE_MANAGERS} onSelect={(u) => setManager(u as ManagerUser | null)} />
            <RoleUserSelectDropdown label="Finance Manager" icon={<Bank size={14} weight="bold" className="text-emerald-600" />} selectedUser={financeManager} options={AVAILABLE_FINANCE_MANAGERS} onSelect={(u) => setFinanceManager(u as RoleUser | null)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RoleUserSelectDropdown label="Assistant Manager" icon={<UsersThree size={14} weight="bold" className="text-[#5B50EC]" />} selectedUser={asstManager} options={AVAILABLE_ASST_MANAGERS} onSelect={(u) => setAsstManager(u as RoleUser | null)} />
            <RoleUserSelectDropdown label="Finance Executive" icon={<CurrencyDollar size={14} weight="bold" className="text-emerald-600" />} selectedUser={financeExecutive} options={AVAILABLE_FINANCE_EXECUTIVES} onSelect={(u) => setFinanceExecutive(u as RoleUser | null)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RoleUserSelectDropdown label="Tech Admin" icon={<ShieldCheck size={14} weight="bold" className="text-indigo-600" />} selectedUser={techAdmin} options={AVAILABLE_TECH_ADMINS} onSelect={(u) => setTechAdmin(u as RoleUser | null)} />
            <RoleUserSelectDropdown label="Team Lead" icon={<UserCircle size={15} weight="bold" className="text-[#5B50EC]" />} selectedUser={teamLead} options={AVAILABLE_LEADS} onSelect={(u) => setTeamLead(u as RoleUser | null)} />
          </div>

          <TeamMembersInput
            members={members}
            onAddMember={handleAddMember}
            onRemoveMember={(id) => setMembers((prev) => prev.filter((item) => item.id !== id))}
            error={error}
          />
        </form>

        <div className="p-4 sm:p-6 pt-3 border-t border-gray-100 bg-white shrink-0 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5B50EC] hover:bg-[#4E44D6] shadow-sm shadow-[#5B50EC]/20 transition-all cursor-pointer">
            {initialTeam ? "Save Changes" : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  )
}
