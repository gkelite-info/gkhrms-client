"use client"

import { User, IdentificationBadge, Flag, Buildings, UserSwitch, UsersThree, X } from "phosphor-react"
import { TeamTreeNode } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface TeamTreeDetailsCardProps {
  selectedNode: TeamTreeNode | null
  onClose?: () => void
}

export default function TeamTreeDetailsCard({
  selectedNode,
  onClose,
}: TeamTreeDetailsCardProps) {
  if (!selectedNode) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs flex flex-col items-center justify-center text-center text-gray-400 py-12">
        <UsersThree size={36} className="text-gray-300 mb-2" />
        <span className="text-xs font-semibold text-gray-500">Select any node in the tree</span>
        <span className="text-[11px] text-gray-400">Click a card to view complete reporting details</span>
      </div>
    )
  }

  const items = [
    { label: "Name", value: selectedNode.name, icon: User },
    { label: "Role", value: selectedNode.role, icon: IdentificationBadge },
    { label: "Team / Project", value: selectedNode.teamName || "GK Gym Life", icon: Flag },
    { label: "Department", value: selectedNode.department || "Product & Engineering", icon: Buildings },
    {
      label: "Reporting To",
      value: selectedNode.reportingTo || "None",
      subValue: selectedNode.reportingToRole ? `(${selectedNode.reportingToRole})` : undefined,
      icon: UserSwitch,
    },
    {
      label: "Members Count",
      value: selectedNode.membersCount !== undefined ? String(selectedNode.membersCount) : "5",
      icon: UsersThree,
    },
  ]

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs flex flex-col w-full overflow-hidden select-none">
      <div className="px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Details</h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar max-h-[calc(100vh-260px)]">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#F8F7FF] to-white border border-[#EEF0FE] flex items-center gap-3 shrink-0">
          <ReusableAvatar src={selectedNode.avatar} name={selectedNode.name} size={42} shape="circle" fallbackType="icon" />
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-tight">{selectedNode.name}</h4>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC]">
              {selectedNode.role}
            </span>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-50 text-xs shrink-0">
          {items.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <IconComponent size={15} />
                  <span className="text-gray-500 font-medium">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">{item.value}</span>
                  {item.subValue && <span className="text-[10px] text-gray-400 font-normal block">{item.subValue}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
