"use client"

import { useState } from "react"
import { Plus, ArrowsClockwise, ArrowsLeftRight, Gear } from "phosphor-react"
import ReusableDropdown from "../../ReusableDropdown"
import { HrTeamMember } from "./types"

interface HrMemberActionsPanelProps {
  members: HrTeamMember[]
  selectedMemberId: string | null
  onAddMember: (employeeName: string, role: string) => void
  onUpdateLeadership: (teamLead: string, asstManager: string) => void
  onReassignMember: (memberId: string, targetTeam: string) => void
}

export default function HrMemberActionsPanel({
  members,
  selectedMemberId,
  onAddMember,
  onUpdateLeadership,
  onReassignMember,
}: HrMemberActionsPanelProps) {
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [newRole, setNewRole] = useState("Member")
  const [selectedLead, setSelectedLead] = useState("Priya Singh")
  const [selectedAsst, setSelectedAsst] = useState("Anjali Mehta")
  const [reassignMemberId, setReassignMemberId] = useState(selectedMemberId || "m-4")
  const [targetTeam, setTargetTeam] = useState("Tekton Platform")

  const roleOptions = ["Member", "Senior Member", "Team Lead", "Specialist"]
  const leadOptions = ["Priya Singh", "Anjali Mehta", "Ravi Kumar", "Vikram Reddy"]
  const teamOptions = ["Tekton Platform", "HRMS Revamp", "Finance Automation", "Operations Support"]

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
        <Gear size={18} className="text-[#5B50EC]" weight="bold" />
        <span>Member Actions</span>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-100/90 shadow-xs flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <Plus size={14} className="text-[#5B50EC]" weight="bold" />
          <span>Add Member to Team</span>
        </div>
        <div className="flex flex-col gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Select Employee *</label>
            <input
              type="text"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              placeholder="Search employee by name or ID..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-xs outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Team Role *</label>
            <ReusableDropdown value={newRole} options={roleOptions} onChange={setNewRole} align="left" buttonClassName="w-full !justify-between bg-white border border-gray-200 !py-2 text-xs" />
          </div>
          <button
            type="button"
            onClick={() => {
              if (newEmployeeName.trim()) {
                onAddMember(newEmployeeName.trim(), newRole)
                setNewEmployeeName("")
              }
            }}
            className="w-full mt-1 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
          >
            + Add Member
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-100/90 shadow-xs flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <ArrowsClockwise size={14} className="text-purple-600" weight="bold" />
          <span>Change Team Lead / Assistant Manager</span>
        </div>
        <div className="flex flex-col gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Team Lead *</label>
            <ReusableDropdown value={selectedLead} options={leadOptions} onChange={setSelectedLead} align="left" buttonClassName="w-full !justify-between bg-white border border-gray-200 !py-2 text-xs" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Assistant Manager *</label>
            <ReusableDropdown value={selectedAsst} options={leadOptions} onChange={setSelectedAsst} align="left" buttonClassName="w-full !justify-between bg-white border border-gray-200 !py-2 text-xs" />
          </div>
          <button
            type="button"
            onClick={() => onUpdateLeadership(selectedLead, selectedAsst)}
            className="w-full mt-1 py-2.5 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5B50EC] text-xs font-bold transition-all cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-100/90 shadow-xs flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <ArrowsLeftRight size={14} className="text-[#5B50EC]" weight="bold" />
          <span>Reassign Selected Member</span>
        </div>
        <div className="flex flex-col gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Selected Member *</label>
            <ReusableDropdown
              value={reassignMemberId}
              options={members.map((m) => ({ label: `${m.name} (${m.employeeId})`, value: m.id }))}
              onChange={setReassignMemberId}
              align="left"
              buttonClassName="w-full !justify-between bg-white border border-gray-200 !py-2 text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Target Team *</label>
            <ReusableDropdown value={targetTeam} options={teamOptions} onChange={setTargetTeam} align="left" buttonClassName="w-full !justify-between bg-white border border-gray-200 !py-2 text-xs" />
          </div>
          <button
            type="button"
            onClick={() => onReassignMember(reassignMemberId, targetTeam)}
            className="w-full mt-1 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
          >
            Reassign
          </button>
        </div>
      </div>
    </div>
  )
}
