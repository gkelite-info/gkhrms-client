"use client"

import React, { useState, useRef, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  TreeStructure,
  ListDashes,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsIn,
  ArrowsHorizontal,
  ChatCircleDots,
  CaretDown,
  CaretRight,
} from "phosphor-react"

interface TreeNodeProps {
  avatar: string
  role: string
  name: string
  status: "Present" | "Absent"
  size?: "ceo" | "csuite" | "manager" | "lead" | "ic"
}

function TreeNode({
  avatar,
  role,
  name,
  status,
  size = "manager",
}: TreeNodeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClick = () => {
    if (!name) return
    const slug = name.toLowerCase().replace(/\s+/g, "-")
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("chat", slug)
    params.set("view", "chat")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const sizeConfig = {
    ceo: {
      img: "w-11 h-11 sm:w-13 sm:h-13",
      role: "text-xs sm:text-sm font-bold",
      name: "text-[11px] sm:text-xs font-medium",
      status: "text-[10px]",
      dot: "w-1.5 h-1.5",
      maxWidth: "max-w-[120px]",
    },
    csuite: {
      img: "w-9 h-9 sm:w-10.5 sm:h-10.5",
      role: "text-[11px] sm:text-[13px] font-bold",
      name: "text-[10.5px] sm:text-xs font-medium",
      status: "text-[9.5px]",
      dot: "w-1 h-1",
      maxWidth: "max-w-[105px]",
    },
    manager: {
      img: "w-7.5 h-7.5 sm:w-8.5 sm:h-8.5",
      role: "text-[10px] sm:text-xs font-bold leading-tight",
      name: "text-[9.5px] sm:text-[10.5px] font-medium leading-tight",
      status: "text-[9px]",
      dot: "w-1 h-1",
      maxWidth: "max-w-[85px]",
    },
    lead: {
      img: "w-6.5 h-6.5 sm:w-7 sm:h-7",
      role: "text-[9.5px] sm:text-[10.5px] font-bold leading-tight",
      name: "text-[9px] sm:text-[10px] font-medium leading-tight",
      status: "text-[8.5px]",
      dot: "w-0.5 h-0.5",
      maxWidth: "max-w-[50px]",
    },
    ic: {
      img: "w-4 h-4",
      role: "",
      name: "text-[8px]",
      status: "",
      dot: "w-0.5 h-0.5",
      maxWidth: "max-w-[36px]",
    },
  }[size]

  const isAbsent = status === "Absent"
  const ringColor = isAbsent ? "ring-[#EF4444]" : "ring-[#22C55E]"

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center text-center select-none group ${
        name ? "cursor-pointer hover:opacity-90" : ""
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={avatar}
          alt={name}
          className={`${sizeConfig.img} rounded-full object-cover ring-2 ${ringColor} shadow-2xs group-hover:scale-105 transition-transform bg-gray-100`}
        />
      </div>

      {role && (
        <span
          className={`${sizeConfig.role} ${sizeConfig.maxWidth} text-[#1E293B] mt-0.5 leading-tight text-center`}
        >
          {role}
        </span>
      )}

      {name && (
        <span
          className={`${sizeConfig.name} ${sizeConfig.maxWidth} text-[#64748B] leading-tight mt-0.5 text-center`}
        >
          {name}
        </span>
      )}

      {size !== "ic" && (
        <div
          className={`flex items-center gap-1 mt-0.5 ${sizeConfig.status} font-medium ${
            isAbsent ? "text-[#EF4444]" : "text-[#10B981]"
          }`}
        >
          <span
            className={`${sizeConfig.dot} rounded-full shrink-0 ${
              isAbsent ? "bg-[#EF4444]" : "bg-[#10B981]"
            }`}
          />
          <span>{status}</span>
        </div>
      )}
    </div>
  )
}

function ICRow() {
  const ics = [
    {
      name: "Alex",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60",
    },
    {
      name: "John",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60",
    },
    {
      name: "Sara",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60",
    },
  ]

  return (
    <div className="flex flex-col items-center w-full mt-1">
      <svg className="w-[42px] h-3 pointer-events-none" viewBox="0 0 42 12">
        <line x1="21" y1="0" x2="21" y2="6" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="7" y1="6" x2="35" y2="6" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="7" y1="6" x2="7" y2="12" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="21" y1="6" x2="21" y2="12" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="35" y1="6" x2="35" y2="12" stroke="#CBD5E1" strokeWidth="1" />
      </svg>
      <div className="flex items-start justify-center w-[42px] gap-0.5">
        {ics.map((ic, i) => (
          <div key={i} className="w-[13px] flex flex-col items-center">
            <TreeNode
              avatar={ic.avatar}
              role=""
              name=""
              status="Present"
              size="ic"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface EngageDeptItem {
  id: string
  name: string
  executiveRole: string
  executiveName: string
  executiveAvatar: string
  status: "Present" | "Absent"
  offset: number
  managers: {
    role: string
    name: string
    avatar: string
    status: "Present" | "Absent"
    leads?: {
      role: string
      name: string
      avatar: string
      status: "Present" | "Absent"
      members: string[]
    }[]
  }[]
}

const engageDepartments: EngageDeptItem[] = [
  {
    id: "cto",
    name: "Engineering & Tech",
    executiveRole: "CTO",
    executiveName: "James",
    executiveAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140",
    status: "Absent",
    offset: 0,
    managers: [
      {
        role: "Engineering Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
        status: "Present",
        leads: [
          {
            role: "Team Lead",
            name: "Michael Smith",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
          {
            role: "Team Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
      {
        role: "DevOps Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        status: "Present",
        leads: [
          {
            role: "Team Lead",
            name: "Michael Smith",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
          {
            role: "Team Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
    ],
  },
  {
    id: "cfo",
    name: "Finance & Payroll",
    executiveRole: "CFO",
    executiveName: "Jay",
    executiveAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=140",
    status: "Present",
    offset: 160,
    managers: [
      {
        role: "Finance Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        status: "Present",
        leads: [
          {
            role: "Payroll Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
      {
        role: "Accounting Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
        status: "Present",
      },
    ],
  },
  {
    id: "cmo",
    name: "Marketing & Growth",
    executiveRole: "CMO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140",
    status: "Present",
    offset: 320,
    managers: [
      {
        role: "Digital Marketing",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
        status: "Present",
      },
      {
        role: "Branding Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
        status: "Present",
      },
    ],
  },
  {
    id: "chro",
    name: "People & Culture",
    executiveRole: "CHRO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140",
    status: "Present",
    offset: 480,
    managers: [
      {
        role: "Recruitment Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        status: "Present",
      },
      {
        role: "HR Ops Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
        status: "Present",
      },
    ],
  },
  {
    id: "coo",
    name: "Operations & Admin",
    executiveRole: "COO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140",
    status: "Present",
    offset: 640,
    managers: [
      {
        role: "Operations Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        status: "Present",
      },
      {
        role: "Logistics Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        status: "Present",
      },
    ],
  },
]

export default function EngageTreeChart() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const treeContainerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [activeBranch, setActiveBranch] = useState("all")
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    cto: true,
    cfo: true,
  })

  const openDirectChat = (personName: string) => {
    if (!personName) return
    const slug = personName.toLowerCase().replace(/\s+/g, "-")
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("chat", slug)
    params.set("view", "chat")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1.4, +(prev + 0.15).toFixed(2)))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.45, +(prev - 0.15).toFixed(2)))
  }

  const handleZoomReset = () => {
    setZoom(1)
  }

  const handleFitScreen = useCallback(() => {
    if (treeContainerRef.current) {
      const containerWidth = treeContainerRef.current.clientWidth - 24
      const fitRatio = Math.min(1, Math.max(0.45, +(containerWidth / 800).toFixed(2)))
      setZoom(fitRatio)
    }
  }, [])

  const scrollToBranch = (branchId: string, offset: number) => {
    setActiveBranch(branchId)
    if (treeContainerRef.current) {
      if (branchId === "all") {
        const containerWidth = treeContainerRef.current.clientWidth
        const center = Math.max(0, (800 * zoom - containerWidth) / 2)
        treeContainerRef.current.scrollTo({ left: center, behavior: "smooth" })
      } else {
        treeContainerRef.current.scrollTo({ left: offset * zoom, behavior: "smooth" })
      }
    }
  }

  const toggleDeptExpand = (id: string) => {
    setExpandedDepts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3.5 w-full shrink-0">
        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[70px] sm:min-h-[88px]">
          <span className="text-[10px] sm:text-xs font-medium text-gray-500">Project Name</span>
          <h3 className="text-sm sm:text-lg font-bold text-[#1E293B] mt-0.5 tracking-tight truncate">
            HRMS
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[70px] sm:min-h-[88px]">
          <span className="text-[10px] sm:text-xs font-medium text-gray-500">Manager</span>
          <h3 className="text-sm sm:text-lg font-bold text-[#1E293B] mt-0.5 tracking-tight truncate">
            Shyam Reddy
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[70px] sm:min-h-[88px]">
          <span className="text-[10px] sm:text-xs font-medium text-gray-500">Project Timing</span>
          <h3 className="text-sm sm:text-lg font-bold text-[#1E293B] mt-0.5 tracking-tight truncate">
            2 Months{" "}
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              (23-09-2025)
            </span>
          </h3>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-xs border border-gray-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
          <button
            type="button"
            onClick={() => scrollToBranch("all", 0)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeBranch === "all"
                ? "bg-[#8571EE] text-white shadow-2xs"
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            All Branches
          </button>
          {engageDepartments.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => scrollToBranch(d.id, d.offset)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeBranch === d.id
                  ? "bg-[#8571EE] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              {d.executiveRole}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-2 border-t lg:border-t-0 pt-1.5 lg:pt-0 border-gray-100">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("tree")}
              className={`px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === "tree"
                  ? "bg-white text-[#8571EE] shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <TreeStructure size={13} weight="bold" />
              <span className="hidden sm:inline">Visual Tree</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-white text-[#8571EE] shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ListDashes size={13} weight="bold" />
              <span className="hidden sm:inline">Team List</span>
            </button>
          </div>

          {viewMode === "tree" && (
            <div className="flex items-center gap-1 bg-gray-50 p-0.5 rounded-lg border border-gray-200/80 shrink-0">
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:bg-white hover:text-[#8571EE] transition-colors cursor-pointer"
              >
                <MagnifyingGlassMinus size={13} weight="bold" />
              </button>
              <span className="text-[10px] font-semibold text-gray-600 px-1 min-w-[32px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:bg-white hover:text-[#8571EE] transition-colors cursor-pointer"
              >
                <MagnifyingGlassPlus size={13} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleFitScreen}
                title="Fit to Screen"
                className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 hover:bg-white hover:text-[#8571EE] rounded transition-colors cursor-pointer flex items-center gap-0.5 border border-gray-200"
              >
                <ArrowsIn size={11} weight="bold" />
                <span>Fit</span>
              </button>
              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-1.5 py-0.5 text-[10px] font-semibold text-[#8571EE] hover:bg-white rounded transition-colors cursor-pointer"
                >
                  100%
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {viewMode === "tree" ? (
        <div
          ref={treeContainerRef}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 w-full flex-1 min-h-0 overflow-auto scrollbar-thin [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] touch-pan-x"
        >
          <div className="sm:hidden flex items-center justify-between text-[10px] text-gray-400 px-3 pt-2">
            <span>Tap person to chat</span>
            <span className="text-[#8571EE] flex items-center gap-1 font-medium">
              <ArrowsHorizontal size={12} />
              <span>Swipe / Zoom</span>
            </span>
          </div>

          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              width: `${800 * zoom}px`,
              minWidth: "100%",
              height: `${480 * zoom}px`,
              transition: "transform 0.15s ease-out, height 0.15s ease-out",
            }}
            className="flex justify-center p-2 sm:p-5"
          >
            <div className="w-[800px] min-w-[800px] flex flex-col items-center select-none py-2 shrink-0">
              <div className="w-full flex justify-center">
                <div className="flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160"
                    role="CEO"
                    name="Alex Johnson"
                    status="Present"
                    size="ceo"
                  />
                  <div className="w-0.5 h-2 bg-gray-300" />
                </div>
              </div>

              <svg className="w-[800px] h-3.5 pointer-events-none" viewBox="0 0 800 14">
                <line x1="80" y1="0" x2="720" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="80" y1="0" x2="80" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="240" y1="0" x2="240" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="400" y1="0" x2="400" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="560" y1="0" x2="560" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="720" y1="0" x2="720" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
              </svg>

              <div className="w-[800px] flex items-start">
                <div className="w-[160px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140"
                    role="CTO"
                    name="James"
                    status="Absent"
                    size="csuite"
                  />

                  <svg className="w-[160px] h-3.5 pointer-events-none" viewBox="0 0 160 14">
                    <line x1="80" y1="0" x2="80" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="120" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="40" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="120" y1="7" x2="120" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[160px] flex items-start justify-between">
                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100"
                        role="Engineering Manager"
                        name="John Doe"
                        status="Present"
                        size="manager"
                      />

                      <svg className="w-[80px] h-3 pointer-events-none" viewBox="0 0 80 12">
                        <line x1="40" y1="0" x2="40" y2="6" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="20" y1="6" x2="60" y2="6" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="20" y1="6" x2="20" y2="12" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="60" y1="6" x2="60" y2="12" stroke="#CBD5E1" strokeWidth="1" />
                      </svg>

                      <div className="w-[80px] flex items-start justify-between">
                        <div className="w-[40px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"
                            role="Team Lead"
                            name="Michael Smith"
                            status="Present"
                            size="lead"
                          />
                          <ICRow />
                        </div>

                        <div className="w-[40px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80"
                            role="Team Lead"
                            name="Emily Davis"
                            status="Present"
                            size="lead"
                          />
                          <ICRow />
                        </div>
                      </div>
                    </div>

                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                        role="DevOps Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="manager"
                      />

                      <svg className="w-[80px] h-3 pointer-events-none" viewBox="0 0 80 12">
                        <line x1="40" y1="0" x2="40" y2="6" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="20" y1="6" x2="60" y2="6" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="20" y1="6" x2="20" y2="12" stroke="#CBD5E1" strokeWidth="1" />
                        <line x1="60" y1="6" x2="60" y2="12" stroke="#CBD5E1" strokeWidth="1" />
                      </svg>

                      <div className="w-[80px] flex items-start justify-between">
                        <div className="w-[40px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"
                            role="Team Lead"
                            name="Michael Smith"
                            status="Present"
                            size="lead"
                          />
                          <ICRow />
                        </div>

                        <div className="w-[40px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80"
                            role="Team Lead"
                            name="Emily Davis"
                            status="Present"
                            size="lead"
                          />
                          <ICRow />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[160px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=140"
                    role="CFO"
                    name="Jay"
                    status="Present"
                    size="csuite"
                  />

                  <svg className="w-[160px] h-3.5 pointer-events-none" viewBox="0 0 160 14">
                    <line x1="80" y1="0" x2="80" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="120" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="40" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="120" y1="7" x2="120" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[160px] flex items-start justify-between">
                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                        role="Finance"
                        name="John Doe"
                        status="Present"
                        size="manager"
                      />

                      <svg className="w-[80px] h-3 pointer-events-none" viewBox="0 0 80 12">
                        <line x1="40" y1="0" x2="40" y2="12" stroke="#CBD5E1" strokeWidth="1" />
                      </svg>

                      <div className="w-[80px] flex items-center justify-center">
                        <div className="w-[48px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80"
                            role="Payroll Lead"
                            name="Emily Davis"
                            status="Present"
                            size="lead"
                          />
                          <ICRow />
                        </div>
                      </div>
                    </div>

                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
                        role="Accounting Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="manager"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[160px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140"
                    role="CMO"
                    name="Emily Davis"
                    status="Present"
                    size="csuite"
                  />

                  <svg className="w-[160px] h-3.5 pointer-events-none" viewBox="0 0 160 14">
                    <line x1="80" y1="0" x2="80" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="120" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="40" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="120" y1="7" x2="120" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[160px] flex items-start justify-between">
                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100"
                        role="Digital Market..."
                        name="John Doe"
                        status="Present"
                        size="manager"
                      />
                    </div>

                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100"
                        role="Branding Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="manager"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[160px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140"
                    role="CHRO"
                    name="Emily Davis"
                    status="Present"
                    size="csuite"
                  />

                  <svg className="w-[160px] h-3.5 pointer-events-none" viewBox="0 0 160 14">
                    <line x1="80" y1="0" x2="80" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="120" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="40" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="120" y1="7" x2="120" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[160px] flex items-start justify-between">
                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                        role="Recruitment Man..."
                        name="John Doe"
                        status="Present"
                        size="manager"
                      />
                    </div>

                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100"
                        role="HR Ops Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="manager"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[160px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140"
                    role="COO"
                    name="Emily Davis"
                    status="Present"
                    size="csuite"
                  />

                  <svg className="w-[160px] h-3.5 pointer-events-none" viewBox="0 0 160 14">
                    <line x1="80" y1="0" x2="80" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="120" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="7" x2="40" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="120" y1="7" x2="120" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[160px] flex items-start justify-between">
                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                        role="Operations Manager"
                        name="John Doe"
                        status="Present"
                        size="manager"
                      />
                    </div>

                    <div className="w-[80px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                        role="Logistics Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="manager"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160"
                alt="Alex Johnson"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1E293B]">Alex Johnson</h4>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-50 text-[#8571EE]">
                    CEO
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">Present • Executive</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openDirectChat("Alex Johnson")}
              className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-[#8571EE] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChatCircleDots size={14} weight="bold" />
              <span>Chat</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {engageDepartments.map((dept) => {
              const isExpanded = expandedDepts[dept.id] ?? false
              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex flex-col gap-2.5"
                >
                  <div
                    onClick={() => toggleDeptExpand(dept.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={dept.executiveAvatar}
                        alt={dept.executiveName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-[#1E293B] truncate">{dept.name}</h4>
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-50 text-[#8571EE]">
                            {dept.executiveRole}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate">
                          {dept.executiveName} •{" "}
                          <span className={dept.status === "Present" ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
                            {dept.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openDirectChat(dept.executiveName)
                        }}
                        className="p-1.5 text-[#8571EE] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        title={`Chat with ${dept.executiveName}`}
                      >
                        <ChatCircleDots size={16} weight="bold" />
                      </button>
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        {isExpanded ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 animate-in fade-in duration-150">
                      {dept.managers.map((mgr, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50/80 rounded-xl p-2.5 flex flex-col gap-1.5 border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={mgr.avatar}
                                alt={mgr.name}
                                className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500 shrink-0"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-[#1E293B]">{mgr.name}</h5>
                                <p className="text-[10px] text-[#8571EE] font-medium">{mgr.role}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => openDirectChat(mgr.name)}
                              className="px-2 py-0.5 text-[10px] font-semibold text-[#8571EE] bg-white rounded border border-purple-200 hover:bg-purple-50 transition-colors flex items-center gap-1"
                            >
                              <ChatCircleDots size={12} weight="bold" />
                              <span>Chat</span>
                            </button>
                          </div>

                          {mgr.leads && mgr.leads.length > 0 && (
                            <div className="pl-3 border-l-2 border-purple-200 flex flex-col gap-1.5 mt-1">
                              {mgr.leads.map((lead, lIdx) => (
                                <div key={lIdx} className="bg-white rounded-lg p-2 border border-gray-100 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={lead.avatar}
                                      alt={lead.name}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <div>
                                      <span className="text-xs font-semibold text-gray-800">{lead.name}</span>
                                      <span className="text-[10px] text-gray-400 ml-1.5">({lead.role})</span>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => openDirectChat(lead.name)}
                                    className="p-1 text-gray-400 hover:text-[#8571EE] transition-colors"
                                    title={`Chat with ${lead.name}`}
                                  >
                                    <ChatCircleDots size={14} weight="bold" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}