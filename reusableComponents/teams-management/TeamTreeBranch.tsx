"use client"

import { TeamTreeNode } from "./types"
import TeamTreeCard from "./TeamTreeCard"

interface TeamTreeBranchProps {
  branchData: {
    manager: TeamTreeNode
    assistantManager: TeamTreeNode
    project: TeamTreeNode
    teamLead: TeamTreeNode
    members: TeamTreeNode[]
  }
  selectedNodeId?: string
  onSelectNode: (node: TeamTreeNode) => void
}

export default function TeamTreeBranch({
  branchData,
  selectedNodeId,
  onSelectNode,
}: TeamTreeBranchProps) {
  const { manager, assistantManager, project, teamLead, members } = branchData

  return (
    <div className="flex flex-col items-center shrink-0">
      <TeamTreeCard
        node={manager}
        isSelected={selectedNodeId === manager.id}
        onClick={onSelectNode}
      />

      <div className="w-0.5 h-6 bg-[#C7C3FA]" />

      <TeamTreeCard
        node={assistantManager}
        isSelected={selectedNodeId === assistantManager.id}
        onClick={onSelectNode}
      />

      <div className="w-0.5 h-6 bg-[#C7C3FA]" />

      <TeamTreeCard
        node={project}
        variant="project"
        isSelected={selectedNodeId === project.id}
        onClick={onSelectNode}
      />

      <div className="w-0.5 h-6 bg-[#C7C3FA]" />

      <TeamTreeCard
        node={teamLead}
        isSelected={selectedNodeId === teamLead.id}
        onClick={onSelectNode}
      />

      <div className="w-0.5 h-5 bg-[#C7C3FA]" />

      <div className="flex items-start justify-center shrink-0">
        {members.map((member, index) => {
          const isFirst = index === 0
          const isLast = index === members.length - 1
          const isSingle = members.length === 1

          return (
            <div key={member.id} className="relative flex flex-col items-center px-1.5 sm:px-2 shrink-0">
              {!isSingle && (
                <div
                  className={`absolute top-0 h-0.5 bg-[#C7C3FA] ${
                    isFirst ? "left-1/2 right-0" : isLast ? "left-0 right-1/2" : "left-0 right-0"
                  }`}
                />
              )}
              <div className="w-0.5 h-5 bg-[#C7C3FA]" />
              <TeamTreeCard
                node={member}
                variant="compact"
                isSelected={selectedNodeId === member.id}
                onClick={onSelectNode}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
