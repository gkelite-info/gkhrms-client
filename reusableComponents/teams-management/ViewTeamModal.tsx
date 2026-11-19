"use client"

import { X, UsersThree, NotePencil, GitFork, Crown, Briefcase, User, Bank, CurrencyDollar, ShieldCheck } from "phosphor-react"
import { TeamItem, RoleUser, ManagerUser } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface ViewTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (team: TeamItem) => void
  onViewTree?: (team: TeamItem) => void
  team: TeamItem | null
}

export default function ViewTeamModal({
  isOpen,
  onClose,
  onEdit,
  onViewTree,
  team,
}: ViewTeamModalProps) {
  if (!isOpen || !team) return null

  const getName = (val?: RoleUser | ManagerUser | string) => {
    if (!val) return ""
    return typeof val === "object" ? val.name : val
  }
  const getAvatar = (val?: RoleUser | ManagerUser | string) => {
    if (!val || typeof val !== "object") return undefined
    return val.avatar
  }

  const roleCards = [
    { label: "Chairman", name: getName(team.chairman), avatar: getAvatar(team.chairman), icon: <Crown size={12} weight="fill" className="text-amber-500" /> },
    { label: "HR Manager", name: getName(team.hrManager), avatar: getAvatar(team.hrManager), icon: <Briefcase size={12} weight="fill" className="text-[#5B50EC]" /> },
    { label: "Manager", name: getName(team.manager), avatar: getAvatar(team.manager), icon: <Briefcase size={12} weight="bold" className="text-[#5B50EC]" /> },
    { label: "Finance Manager", name: getName(team.financeManager), avatar: getAvatar(team.financeManager), icon: <Bank size={12} weight="bold" className="text-emerald-600" /> },
    { label: "Asst. Manager", name: getName(team.asstManager), avatar: getAvatar(team.asstManager), icon: <UsersThree size={12} weight="bold" className="text-[#5B50EC]" /> },
    { label: "Finance Exec", name: getName(team.financeExecutive), avatar: getAvatar(team.financeExecutive), icon: <CurrencyDollar size={12} weight="bold" className="text-emerald-600" /> },
    { label: "Tech Admin", name: getName(team.techAdmin), avatar: getAvatar(team.techAdmin), icon: <ShieldCheck size={12} weight="bold" className="text-indigo-600" /> },
    { label: "Team Lead", name: getName(team.teamLead), avatar: getAvatar(team.teamLead) || team.teamLeadAvatar, icon: <User size={12} weight="bold" className="text-[#7E22CE]" /> },
  ].filter((r) => Boolean(r.name))

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[88vh] overflow-hidden">
        <div className="flex items-center justify-between p-5 sm:p-6 pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
              <UsersThree size={20} weight="bold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{team.name}</h3>
              <p className="text-[11px] text-gray-500">Team Hierarchy & Member Details</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 pt-3 flex flex-col gap-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {roleCards.map((r, i) => (
              <div key={i} className="bg-gray-50/80 p-2.5 rounded-2xl border border-gray-100 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  {r.icon} {r.label}
                </span>
                <div className="flex items-center gap-2 truncate">
                  <ReusableAvatar src={r.avatar} name={r.name} size={24} shape="circle" fallbackType="icon" />
                  <span className="text-xs font-bold text-gray-900 truncate">{r.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-700">Team Members ({team.membersCount})</span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 custom-scrollbar">
              {team.members.map((m) => (
                <span key={m.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EEF2FF] text-[#5B50EC] border border-purple-100/60">
                  <span>{m.name}</span>
                  {m.role && <span className="text-[10px] text-[#5B50EC]/70">({m.role})</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 sm:p-6 pt-3 border-t border-gray-100 bg-white shrink-0 flex-wrap gap-2">
          {onViewTree && (
            <button
              type="button"
              onClick={() => {
                onClose()
                onViewTree(team)
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#5B50EC] bg-[#EEF2FF] hover:bg-[#E0DCFE] transition-colors cursor-pointer"
            >
              <GitFork size={14} weight="bold" />
              <span>View Tree Hierarchy</span>
            </button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer">
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                onEdit(team)
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#5B50EC] hover:bg-[#4E44D6] shadow-sm shadow-[#5B50EC]/20 transition-all cursor-pointer"
            >
              <NotePencil size={14} weight="bold" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
