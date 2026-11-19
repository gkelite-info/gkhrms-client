"use client"

import { Crown, Briefcase, UsersThree, Flag } from "phosphor-react"
import { TeamTreeNode } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface TeamTreeCardProps {
  node: TeamTreeNode
  isSelected?: boolean
  onClick?: (node: TeamTreeNode) => void
  variant?: "standard" | "compact" | "project"
}

export default function TeamTreeCard({
  node,
  isSelected = false,
  onClick,
  variant = "standard",
}: TeamTreeCardProps) {
  const handleClick = () => {
    if (onClick) onClick(node)
  }

  const renderIcon = () => {
    if (node.iconType === "crown") return <Crown size={16} weight="fill" className={isSelected ? "text-amber-300" : "text-amber-500"} />
    if (node.iconType === "briefcase") return <Briefcase size={16} weight="fill" className={isSelected ? "text-white/90" : "text-[#5B50EC]"} />
    if (node.iconType === "flag") return <Flag size={16} weight="fill" className="text-[#5B50EC]" />
    return <UsersThree size={16} weight="bold" className={isSelected ? "text-white/90" : "text-[#5B50EC]"} />
  }

  if (variant === "compact") {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
        className={`w-32 h-[116px] flex flex-col items-center justify-center text-center p-2.5 rounded-2xl transition-all cursor-pointer select-none bg-white border shrink-0 ${
          isSelected
            ? "border-[#5B50EC] ring-2 ring-[#5B50EC]/20 shadow-md shadow-[#5B50EC]/10"
            : "border-gray-100 hover:border-[#5B50EC]/60 hover:shadow-xs shadow-xs"
        }`}
      >
        <div className="w-9 h-9 mb-1.5 shrink-0 flex items-center justify-center overflow-hidden rounded-full">
          <ReusableAvatar src={node.avatar} name={node.name} size={36} shape="circle" fallbackType="icon" />
        </div>
        <span className="text-xs font-bold text-gray-900 leading-tight truncate w-full block px-1">{node.name}</span>
        <span className="text-[10px] text-gray-500 font-medium leading-tight truncate w-full block mt-1 px-1">{node.role}</span>
      </div>
    )
  }

  if (variant === "project" || node.isTeamProject) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
        className={`w-52 sm:w-56 h-[58px] px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer select-none bg-[#F5F4FE] border shrink-0 ${
          isSelected
            ? "border-[#5B50EC] ring-2 ring-[#5B50EC]/25 shadow-md shadow-[#5B50EC]/15"
            : "border-[#E0DCFE] hover:border-[#5B50EC]"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate mr-2">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#5B50EC] shadow-xs shrink-0">
            <UsersThree size={16} weight="bold" />
          </div>
          <div className="text-left truncate">
            <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">{node.name}</span>
            <span className="text-[10px] text-gray-500 font-medium block truncate mt-0.5">{node.role}</span>
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center text-[#5B50EC] shrink-0">
          <Flag size={14} weight="fill" />
        </div>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      className={`w-52 sm:w-56 h-[58px] px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer select-none shrink-0 ${
        isSelected
          ? "bg-[#5B50EC] text-white shadow-md shadow-[#5B50EC]/25 border border-[#5B50EC]"
          : "bg-white text-gray-900 border border-gray-100 hover:border-[#5B50EC]/60 hover:shadow-xs shadow-xs"
      }`}
    >
      <div className="flex items-center gap-2.5 truncate mr-2">
        <div className="w-8 h-8 shrink-0 flex items-center justify-center overflow-hidden rounded-full">
          <ReusableAvatar src={node.avatar} name={node.name} size={32} shape="circle" fallbackType="icon" />
        </div>
        <div className="text-left truncate">
          <span className={`text-xs sm:text-sm font-bold block leading-tight truncate ${isSelected ? "text-white" : "text-gray-900"}`}>
            {node.name}
          </span>
          <span className={`text-[10px] block leading-tight truncate mt-0.5 ${isSelected ? "text-white/80" : "text-gray-500"}`}>
            {node.role}
          </span>
        </div>
      </div>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-white/20" : "bg-gray-50"}`}>
        {renderIcon()}
      </div>
    </div>
  )
}
