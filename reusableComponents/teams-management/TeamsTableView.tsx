"use client"

import { useState, useMemo } from "react"
import { Eye, NotePencil, Trash, MagnifyingGlass, X } from "phosphor-react"
import { TeamItem, TeamsManagementProps, RoleUser, ManagerUser } from "./types"
import { INITIAL_TEAMS } from "./mockTeamsData"
import CreateTeamModal from "./CreateTeamModal"
import DeleteTeamModal from "./DeleteTeamModal"
import ViewTeamModal from "./ViewTeamModal"
import ReusableTable, { TableColumn } from "../../src/components/reusableComponents/ReusableTable"
import ReusablePagination from "../ReusablePagination"
import ReusableAvatar from "../ReusableAvatar"

interface TeamsTableViewProps extends TeamsManagementProps {
  teams?: TeamItem[]
  setTeams?: React.Dispatch<React.SetStateAction<TeamItem[]>>
  isCreateModalOpen?: boolean
  setIsCreateModalOpen?: (open: boolean) => void
  onViewTeamTree?: (team: TeamItem) => void
}

export default function TeamsTableView({
  teams: externalTeams,
  setTeams: externalSetTeams,
  initialTeams = INITIAL_TEAMS,
  isCreateModalOpen,
  setIsCreateModalOpen,
  onViewTeamTree,
}: TeamsTableViewProps) {
  const [localTeams, setLocalTeams] = useState<TeamItem[]>(initialTeams)
  const teams = externalTeams || localTeams
  const setTeams = externalSetTeams || setLocalTeams

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  const [internalCreateOpen, setInternalCreateOpen] = useState(false)
  const isCreateOpen = isCreateModalOpen !== undefined ? isCreateModalOpen : internalCreateOpen
  const setCreateOpen = setIsCreateModalOpen || setInternalCreateOpen

  const [editingTeam, setEditingTeam] = useState<TeamItem | null>(null)
  const [deletingTeam, setDeletingTeam] = useState<TeamItem | null>(null)
  const [viewingTeam, setViewingTeam] = useState<TeamItem | null>(null)

  const getName = (val?: RoleUser | ManagerUser | string) => {
    if (!val) return ""
    return typeof val === "object" ? val.name : val
  }
  const getAvatar = (val?: RoleUser | ManagerUser | string) => {
    if (!val || typeof val !== "object") return undefined
    return val.avatar
  }

  const filteredTeams = useMemo(() => {
    if (!search.trim()) return teams
    const q = search.toLowerCase()
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        getName(t.manager).toLowerCase().includes(q) ||
        getName(t.teamLead).toLowerCase().includes(q) ||
        getName(t.chairman).toLowerCase().includes(q) ||
        getName(t.financeManager).toLowerCase().includes(q)
    )
  }, [teams, search])

  const totalPages = Math.ceil(filteredTeams.length / pageSize) || 1
  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredTeams.slice(start, start + pageSize)
  }, [filteredTeams, currentPage, pageSize])

  const handleSaveTeam = (teamData: Partial<TeamItem>) => {
    if (editingTeam) {
      setTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? ({ ...t, ...teamData } as TeamItem) : t)))
    } else {
      const newTeam: TeamItem = {
        id: `team-${Date.now()}`,
        name: teamData.name || "New Team",
        chairman: teamData.chairman,
        hrManager: teamData.hrManager,
        manager: teamData.manager,
        financeManager: teamData.financeManager,
        asstManager: teamData.asstManager,
        financeExecutive: teamData.financeExecutive,
        techAdmin: teamData.techAdmin,
        teamLead: teamData.teamLead || "Unassigned",
        membersCount: teamData.membersCount || (teamData.members?.length || 5),
        members: teamData.members || [],
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTeams((prev) => [newTeam, ...prev])
    }
  }

  const columns: TableColumn<TeamItem>[] = [
    { header: "TEAM NAME", accessor: "name", className: "font-semibold text-gray-900 text-xs sm:text-sm py-4" },
    {
      header: "MANAGER",
      render: (row) => {
        const mName = getName(row.manager)
        const mAvatar = getAvatar(row.manager)
        return (
          <div className="flex items-center gap-2.5">
            {mName ? (
              <>
                <ReusableAvatar src={mAvatar} name={mName} size={28} shape="circle" fallbackType="icon" />
                <span className="text-xs sm:text-sm text-gray-800 font-medium whitespace-nowrap">{mName}</span>
              </>
            ) : (
              <span className="text-xs text-gray-400 italic">Unassigned</span>
            )}
          </div>
        )
      },
    },
    {
      header: "TEAM LEAD",
      render: (row) => <span className="text-xs sm:text-sm text-gray-700 font-medium whitespace-nowrap">{getName(row.teamLead) || "—"}</span>,
    },
    {
      header: "MEMBERS",
      render: (row) => (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 whitespace-nowrap">
          {row.membersCount} Members
        </span>
      ),
    },
    {
      header: "ACTIONS",
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => (onViewTeamTree ? onViewTeamTree(row) : setViewingTeam(row))}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-[#EEF2FF] transition-colors cursor-pointer"
            title="View Team Tree"
          >
            <Eye size={16} weight="bold" />
          </button>
          <button type="button" onClick={() => { setEditingTeam(row); setCreateOpen(true); }} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer" title="Edit Team">
            <NotePencil size={16} weight="bold" />
          </button>
          <button type="button" onClick={() => setDeletingTeam(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" title="Delete Team">
            <Trash size={16} weight="bold" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 shrink-0">All Active Teams</h3>
        <div className="relative flex items-center w-full sm:w-72 md:w-80 lg:w-96">
          <MagnifyingGlass size={15} weight="bold" className="absolute left-3 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search teams, leads, managers..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none transition-all shadow-2xs"
          />
          {search && (
            <button type="button" onClick={() => { setSearch(""); setCurrentPage(1); }} className="absolute right-2.5 p-0.5 rounded text-gray-400 hover:text-gray-700 cursor-pointer">
              <X size={14} weight="bold" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <ReusableTable columns={columns} data={paginatedTeams} headerBgColor="#FAFAFC" headerTextColor="#6B7280" headerRounded="rounded-xl" rowHover />
      </div>

      <ReusablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredTeams.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => { setPageSize(newSize); setCurrentPage(1); }}
        pageSizeOptions={[4, 8, 12, 24]}
        showPageSize={true}
        showTotalInfo={true}
        showJumpToPage={false}
        className="pt-2 border-t border-gray-100"
      />

      <CreateTeamModal isOpen={isCreateOpen} onClose={() => { setCreateOpen(false); setEditingTeam(null); }} onSave={handleSaveTeam} initialTeam={editingTeam} />
      <DeleteTeamModal isOpen={!!deletingTeam} onClose={() => setDeletingTeam(null)} onConfirm={() => { setTeams((prev) => prev.filter((t) => t.id !== deletingTeam?.id)); setDeletingTeam(null); }} team={deletingTeam} />
      <ViewTeamModal isOpen={!!viewingTeam} onClose={() => setViewingTeam(null)} onEdit={(t) => { setEditingTeam(t); setCreateOpen(true); }} onViewTree={onViewTeamTree} team={viewingTeam} />
    </div>
  )
}
