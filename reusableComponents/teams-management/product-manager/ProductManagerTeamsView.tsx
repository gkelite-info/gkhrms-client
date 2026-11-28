"use client"

import { useState, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  Briefcase,
  ShareNetwork,
  ChatTeardropText,
  UsersThree,
  CheckCircle,
  MagnifyingGlass,
  CaretDown,
  CaretLeft,
  CaretRight,
  ArrowsLeftRight,
  Desktop,
  Archive,
  DeviceMobile,
} from "phosphor-react"
import { ProductProjectItem, ProductManagerTabKey } from "./types"
import { MOCK_PRODUCT_PROJECTS, MOCK_PRODUCT_STATS } from "./mockProductProjectsData"
import CreateGroupModal, { CreateGroupData } from "./CreateGroupModal"
import ProductManagerTeamChatView from "./ProductManagerTeamChatView"
import ProductManagerProjectTeamView from "./ProductManagerProjectTeamView"
import ProductManagerTeamTreeView from "./ProductManagerTeamTreeView"
import ReusableTable, { TableColumn } from "@/components/reusableComponents/ReusableTable"

export default function ProductManagerTeamsView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawTab = searchParams.get("tab")
  const activeTab: ProductManagerTabKey =
    rawTab === "tree" || rawTab === "chat" ? rawTab : "projects"

  const [projects, setProjects] = useState<ProductProjectItem[]>(MOCK_PRODUCT_PROJECTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All Status")
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedChatGroup, setSelectedChatGroup] = useState<CreateGroupData | null>(null)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const projectParam = searchParams.get("project")
  const selectedProjectForView = useMemo(() => {
    if (!projectParam) return null
    return (
      projects.find(
        (p) =>
          p.code.toLowerCase() === projectParam.toLowerCase() ||
          p.id.toLowerCase() === projectParam.toLowerCase()
      ) || null
    )
  }, [projectParam, projects])

  const pageParam = searchParams.get("page")
  const currentPage = useMemo(() => {
    const p = parseInt(pageParam || "1", 10)
    return isNaN(p) || p < 1 ? 1 : p
  }, [pageParam])

  const handleTabChange = (tab: ProductManagerTabKey) => {
    const params = new URLSearchParams()
    if (tab !== "projects") {
      params.set("tab", tab)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set("page", String(page))
    } else {
      params.delete("page")
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handleSelectProjectForView = (project: ProductProjectItem) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("project", project.code)
    params.delete("member")
    params.delete("page")
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handleBackFromProjectView = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("project")
    params.delete("member")
    params.delete("page")
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.code.toLowerCase().includes(q) ||
        project.manager.name.toLowerCase().includes(q) ||
        project.assistantManager.name.toLowerCase().includes(q)

      const matchesStatus =
        statusFilter === "All Status" || project.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [projects, searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / rowsPerPage))
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleGroupCreated = (data: CreateGroupData) => {
    const newProject: ProductProjectItem = {
      id: `proj-${Date.now()}`,
      numericId: projects.length + 1,
      name: data.groupName,
      code: `GRP-${String(projects.length + 1).padStart(3, "0")}`,
      iconType: "swap",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      manager: {
        name: data.admins[0]?.name || "Priya Shah",
        avatar: data.admins[0]?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      },
      assistantManager: {
        name: data.admins[1]?.name || data.members[0]?.name || "Meera Das",
        avatar: data.admins[1]?.avatar || data.members[0]?.avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      },
      teamLeads: data.members.slice(0, 3).map((m) => ({
        name: m.name,
        avatar: m.avatar,
        role: m.role,
      })),
      totalMembers: data.members.length,
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Active",
    }

    setProjects((prev) => [newProject, ...prev])
  }

  const renderProjectIcon = (iconType: ProductProjectItem["iconType"], iconBg: string, iconColor: string) => {
    return (
      <div className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        {iconType === "swap" && <ArrowsLeftRight size={16} weight="bold" />}
        {iconType === "desktop" && <Desktop size={16} weight="bold" />}
        {iconType === "archive" && <Archive size={16} weight="bold" />}
        {iconType === "mobile" && <DeviceMobile size={16} weight="bold" />}
      </div>
    )
  }

  const projectColumns: TableColumn<ProductProjectItem>[] = useMemo(
    () => [
      {
        key: "numericId",
        header: "#",
        width: "40px",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "text-xs text-gray-500 font-medium py-3.5 px-3",
        render: (project) => project.numericId,
      },
      {
        key: "name",
        header: "Project Name",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3",
        render: (project) => (
          <div className="flex items-center gap-2.5">
            {renderProjectIcon(project.iconType, project.iconBg, project.iconColor)}
            <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">
              {project.name}
            </span>
          </div>
        ),
      },
      {
        key: "code",
        header: "Project Code",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "text-xs text-gray-600 font-medium whitespace-nowrap py-3.5 px-3",
        render: (project) => project.code,
      },
      {
        key: "manager",
        header: "Manager",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3",
        render: (project) => (
          <div className="flex items-center gap-2">
            <img
              src={project.manager.avatar}
              alt={project.manager.name}
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-100"
            />
            <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">
              {project.manager.name}
            </span>
          </div>
        ),
      },
      {
        key: "assistantManager",
        header: "Assistant Manager",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3",
        render: (project) => (
          <div className="flex items-center gap-2">
            <img
              src={project.assistantManager.avatar}
              alt={project.assistantManager.name}
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-100"
            />
            <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">
              {project.assistantManager.name}
            </span>
          </div>
        ),
      },
      {
        key: "teamLeads",
        header: "Team Lead(s)",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3",
        render: (project) => (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {project.teamLeads.map((lead, idx) => (
                <img
                  key={idx}
                  src={lead.avatar}
                  alt={lead.name}
                  title={lead.name}
                  className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-gray-100 shrink-0"
                />
              ))}
            </div>
            {project.extraLeadsCount ? (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                +{project.extraLeadsCount}
              </span>
            ) : null}
          </div>
        ),
      },
      {
        key: "totalMembers",
        header: "Total Members",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "text-xs text-gray-700 font-semibold py-3.5 px-3",
        render: (project) => project.totalMembers,
      },
      {
        key: "startDate",
        header: "Start Date",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "text-xs text-gray-600 whitespace-nowrap py-3.5 px-3",
        render: (project) => project.startDate,
      },
      {
        key: "status",
        header: "Status",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3 whitespace-nowrap",
        render: (project) => (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {project.status}
          </span>
        ),
      },
      {
        key: "action",
        header: "Action",
        align: "center",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3 text-center",
        className: "py-3.5 px-3 text-center",
        render: (project) => (
          <button
            type="button"
            onClick={() => handleSelectProjectForView(project)}
            className="px-3 py-1.5 text-xs font-semibold text-[#5046E5] border border-indigo-200 rounded-xl hover:bg-indigo-50/70 transition-colors cursor-pointer whitespace-nowrap"
          >
            View Team
          </button>
        ),
      },
    ],
    []
  )

  if (selectedProjectForView) {
    return (
      <div className="w-full min-h-full flex flex-col gap-4 sm:gap-5 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto pb-16">
        <ProductManagerProjectTeamView
          project={selectedProjectForView}
          onBack={handleBackFromProjectView}
        />
      </div>
    )
  }

  return (
    <div className="w-full min-h-full flex flex-col gap-4 sm:gap-5 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
            {activeTab === "chat" ? (
              <ChatTeardropText size={22} className="text-[#5046E5]" weight="bold" />
            ) : (
              <UsersThree size={22} className="text-[#5046E5]" weight="bold" />
            )}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {activeTab === "chat" ? "Team Chat" : "Teams"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeTab === "chat"
                ? "Communicate with employees, team leads, managers, and other key roles across the organization."
                : "Manage teams, team hierarchy, and team communication."}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 p-1 bg-white/80 rounded-2xl border border-gray-100 shadow-2xs self-start max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => handleTabChange("projects")}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "projects"
                  ? "bg-[#5046E5] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Briefcase size={16} weight={activeTab === "projects" ? "bold" : "regular"} />
              <span>Projects</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("tree")}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "tree"
                  ? "bg-[#5046E5] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ShareNetwork size={16} weight={activeTab === "tree" ? "bold" : "regular"} />
              <span>Team Tree</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("chat")}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "chat"
                  ? "bg-[#5046E5] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ChatTeardropText size={16} weight={activeTab === "chat" ? "bold" : "regular"} />
              <span>Chat</span>
            </button>
          </div>

          {activeTab === "projects" && (
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="self-start sm:self-auto px-4 py-2 bg-[#5046E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <UsersThree size={16} weight="bold" />
              <span>Create Group</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === "projects" && (
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0">
                <Briefcase size={22} weight="bold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-tight">
                  {MOCK_PRODUCT_STATS.totalProjects}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Total Projects</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle size={22} weight="bold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-tight">
                  {MOCK_PRODUCT_STATS.activeProjects}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Active Projects</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0">
                <UsersThree size={22} weight="bold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-tight">
                  {MOCK_PRODUCT_STATS.totalMembers}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Total Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-4 sm:p-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Projects Overview</h2>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                <div className="relative flex-1 sm:w-64">
                  <MagnifyingGlass
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handlePageChange(1)
                    }}
                    placeholder="Search by project name or code..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:border-[#5046E5] transition-colors"
                  />
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[110px]"
                  >
                    <span>{statusFilter}</span>
                    <CaretDown size={14} className="text-gray-400" />
                  </button>

                  {isStatusDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-30">
                      {["All Status", "Active", "Inactive"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setStatusFilter(status)
                            setIsStatusDropdownOpen(false)
                            handlePageChange(1)
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 cursor-pointer ${
                            statusFilter === status
                              ? "text-[#5046E5] font-semibold bg-indigo-50/50"
                              : "text-gray-700"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ReusableTable
              columns={projectColumns}
              data={paginatedProjects}
              headerBgColor="transparent"
              headerTextColor="#6B7280"
              headerRounded="rounded-none"
              tableClassName="border-collapse min-w-[950px]"
              rowHover={true}
              keyExtractor={(row) => row.id}
              emptyMessage="No projects found matching your criteria."
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span className="font-medium">
                Showing 1–{filteredProjects.length} of {filteredProjects.length} projects
              </span>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value))
                      handlePageChange(1)
                    }}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700 outline-none cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <CaretLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                          currentPage === pageNum
                            ? "bg-[#5046E5] text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <CaretRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tree" && <ProductManagerTeamTreeView />}
      {activeTab === "chat" && <ProductManagerTeamChatView initialGroup={selectedChatGroup} />}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleGroupCreated}
        onOpenGroup={(data) => {
          setSelectedChatGroup(data)
          handleTabChange("chat")
        }}
      />
    </div>
  )
}
