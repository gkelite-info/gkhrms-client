"use client"

import { useState, useEffect } from "react"
import { MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsCounterClockwise, Info, TreeStructure } from "phosphor-react"
import { TeamTreeNode, TeamItem } from "./types"
import { ROOT_HR_NODE, BRANCH_ONE_NODES, BRANCH_TWO_NODES } from "./mockTreeData"
import { INITIAL_TEAMS } from "./mockTeamsData"
import TeamTreeCard from "./TeamTreeCard"
import TeamTreeBranch from "./TeamTreeBranch"
import TeamTreeDetailsCard from "./TeamTreeDetailsCard"
import DynamicTeamTree from "./DynamicTeamTree"
import ReusableDropdown, { DropdownOption } from "../ReusableDropdown"

const BRANCHES = [BRANCH_ONE_NODES, BRANCH_TWO_NODES]

interface TeamTreeViewProps {
  teams?: TeamItem[]
  selectedTeamId?: string | null
  onSelectTeamId?: (id: string | null) => void
}

export default function TeamTreeView({
  teams = INITIAL_TEAMS,
  selectedTeamId = null,
  onSelectTeamId,
}: TeamTreeViewProps) {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(selectedTeamId)
  const [selectedNode, setSelectedNode] = useState<TeamTreeNode>(BRANCH_ONE_NODES.teamLead)
  const [zoom, setZoom] = useState(1)
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false)

  useEffect(() => {
    setActiveTeamId(selectedTeamId)
  }, [selectedTeamId])

  const activeTeam = teams.find((t) => t.id === activeTeamId)

  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 1.5))
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.5))
  const handleResetZoom = () => setZoom(1)

  const handleSelectNode = (node: TeamTreeNode) => {
    setSelectedNode(node)
    setIsMobileDetailsOpen(true)
  }

  const handleTeamChange = (id: string | null) => {
    setActiveTeamId(id)
    if (onSelectTeamId) onSelectTeamId(id)
  }

  const treeDropdownOptions: DropdownOption<string>[] = [
    { label: "Full Organization Tree", value: "all" },
    ...teams.map((t) => ({
      label: `${t.name} (Team Tree)`,
      value: t.id,
    })),
  ]

  return (
    <div className="w-full flex flex-col xl:flex-row items-start gap-5 select-none">
      <div className="flex-1 w-full bg-white rounded-3xl border border-gray-100/90 shadow-xs p-4 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 flex-wrap z-10 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <TreeStructure size={16} weight="bold" className="text-[#5B50EC]" />
              <span className="text-xs font-bold text-gray-800">Tree View:</span>
            </div>
            <ReusableDropdown
              value={activeTeamId || "all"}
              options={treeDropdownOptions}
              onChange={(val: string) => handleTeamChange(val === "all" ? null : val)}
              align="left"
              buttonClassName="font-bold text-gray-800 bg-gray-50 hover:bg-[#F9F9FE] border-gray-200 hover:border-[#5B50EC] rounded-xl px-3 py-1.5 max-w-[210px] sm:max-w-xs truncate"
              menuClassName="w-64 max-h-60"
            />
            {activeTeam && (
              <span className="text-[11px] font-semibold text-[#5B50EC] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full truncate max-w-[160px]">
                Viewing: {activeTeam.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/70 p-1 rounded-xl ml-auto">
            <button type="button" onClick={handleZoomOut} disabled={zoom <= 0.5} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 transition-colors cursor-pointer" title="Zoom out">
              <MagnifyingGlassMinus size={15} weight="bold" />
            </button>
            <span className="text-xs font-bold text-gray-700 px-1 min-w-[42px] text-center">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={handleZoomIn} disabled={zoom >= 1.5} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 transition-colors cursor-pointer" title="Zoom in">
              <MagnifyingGlassPlus size={15} weight="bold" />
            </button>
            <button type="button" onClick={handleResetZoom} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white transition-colors cursor-pointer" title="Reset view">
              <ArrowsCounterClockwise size={15} weight="bold" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-8 pt-4">
          <div
            className="w-max min-w-full flex flex-col items-center transition-transform duration-150 origin-top py-2 px-6"
            style={{ transform: `scale(${zoom})` }}
          >
            {activeTeam ? (
              <DynamicTeamTree
                team={activeTeam}
                selectedNodeId={selectedNode.id}
                onSelectNode={handleSelectNode}
              />
            ) : (
              <>
                <TeamTreeCard
                  node={ROOT_HR_NODE}
                  isSelected={selectedNode.id === ROOT_HR_NODE.id}
                  onClick={handleSelectNode}
                />
                <div className="w-0.5 h-6 bg-[#C7C3FA]" />
                <div className="flex items-start justify-center shrink-0">
                  {BRANCHES.map((branch, index, array) => {
                    const isFirst = index === 0
                    const isLast = index === array.length - 1
                    const isSingle = array.length === 1
                    return (
                      <div key={branch.manager.id} className="relative flex flex-col items-center px-6 sm:px-10 shrink-0">
                        {!isSingle && (
                          <div
                            className={`absolute top-0 h-0.5 bg-[#C7C3FA] ${
                              isFirst ? "left-1/2 right-0" : isLast ? "left-0 right-1/2" : "left-0 right-0"
                            }`}
                          />
                        )}
                        <div className="w-0.5 h-6 bg-[#C7C3FA]" />
                        <TeamTreeBranch
                          branchData={branch}
                          selectedNodeId={selectedNode.id}
                          onSelectNode={handleSelectNode}
                        />
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="xl:hidden flex flex-col sm:flex-row items-center sm:justify-between gap-2.5 pt-3 border-t border-gray-100 text-xs">
          <span className="text-gray-400 text-[11px] sm:text-xs text-center sm:text-left">Scroll horizontally to view tree</span>
          <button
            type="button"
            onClick={() => setIsMobileDetailsOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#EEF2FF] hover:bg-[#E0DCFE] text-[#5B50EC] font-bold cursor-pointer whitespace-nowrap transition-colors shadow-2xs shrink-0"
          >
            <Info size={15} weight="bold" className="shrink-0" />
            <span className="truncate max-w-[200px]">Details ({selectedNode.name})</span>
          </button>
        </div>
      </div>

      <div className="hidden xl:block w-72 lg:w-80 shrink-0 sticky top-20">
        <TeamTreeDetailsCard selectedNode={selectedNode} />
      </div>

      {isMobileDetailsOpen && (
        <div className="fixed inset-0 z-[1200] xl:hidden flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileDetailsOpen(false)} />
          <div className="relative z-10 w-full max-w-md max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
            <TeamTreeDetailsCard selectedNode={selectedNode} onClose={() => setIsMobileDetailsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
