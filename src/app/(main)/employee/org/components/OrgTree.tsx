"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import {
  TreeStructure,
  ListDashes,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsIn,
  ArrowsHorizontal,
  CaretDown,
  CaretRight,
  User,
} from "phosphor-react"

interface TreeNodeProps {
  avatar: string
  role: string
  name: string
  status: "Present" | "Absent"
  size?: "xl" | "lg" | "md" | "sm" | "xs"
}

function TreeNode({
  avatar,
  role,
  name,
  status,
  size = "md",
}: TreeNodeProps) {
  const sizeConfig = {
    xl: {
      img: "w-14 h-14",
      role: "text-sm font-bold",
      name: "text-xs font-medium",
      status: "text-[10px]",
      dot: "w-1.5 h-1.5",
      maxWidth: "max-w-[140px]",
    },
    lg: {
      img: "w-12 h-12",
      role: "text-xs font-bold",
      name: "text-[11px] font-medium",
      status: "text-[10px]",
      dot: "w-1.5 h-1.5",
      maxWidth: "max-w-[120px]",
    },
    md: {
      img: "w-9 h-9",
      role: "text-[11px] font-bold",
      name: "text-[10px] font-medium",
      status: "text-[9px]",
      dot: "w-1 h-1",
      maxWidth: "max-w-[110px]",
    },
    sm: {
      img: "w-7 h-7",
      role: "text-[9px] font-bold",
      name: "text-[8px] font-medium",
      status: "text-[8px]",
      dot: "w-1 h-1",
      maxWidth: "max-w-[95px]",
    },
    xs: {
      img: "w-5 h-5",
      role: "text-[7px] font-bold",
      name: "text-[7px]",
      status: "text-[7px]",
      dot: "w-1 h-1",
      maxWidth: "max-w-[40px]",
    },
  }[size]

  return (
    <div className="flex flex-col items-center text-center select-none group">
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className={`${sizeConfig.img} rounded-full object-cover ring-2 ring-[#22C55E] shadow-xs group-hover:scale-105 transition-transform bg-gray-100`}
        />
      </div>
      {role && (
        <span
          className={`${sizeConfig.role} ${sizeConfig.maxWidth} text-[#1E293B] mt-1 leading-tight text-center`}
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
      <div
        className={`flex items-center gap-1 mt-0.5 ${sizeConfig.status} font-medium ${
          status === "Present" ? "text-[#10B981]" : "text-[#EF4444]"
        }`}
      >
        <span
          className={`${sizeConfig.dot} rounded-full shrink-0 ${
            status === "Present" ? "bg-[#10B981]" : "bg-[#EF4444]"
          }`}
        />
        <span>{status}</span>
      </div>
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
    <div className="flex flex-col items-center w-full mt-0.5">
      <svg className="w-[105px] h-3.5 pointer-events-none" viewBox="0 0 105 14">
        <line x1="52.5" y1="0" x2="52.5" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="17.5" y1="7" x2="87.5" y2="7" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="17.5" y1="7" x2="17.5" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="52.5" y1="7" x2="52.5" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="87.5" y1="7" x2="87.5" y2="14" stroke="#CBD5E1" strokeWidth="1.5" />
      </svg>
      <div className="flex items-start justify-center w-[105px]">
        <div className="w-[35px] flex flex-col items-center">
          <TreeNode
            avatar={ics[0].avatar}
            role=""
            name={ics[0].name}
            status="Present"
            size="xs"
          />
        </div>

        <div className="w-[35px] flex flex-col items-center">
          <TreeNode
            avatar={ics[1].avatar}
            role=""
            name={ics[1].name}
            status="Present"
            size="xs"
          />
        </div>

        <div className="w-[35px] flex flex-col items-center">
          <TreeNode
            avatar={ics[2].avatar}
            role=""
            name={ics[2].name}
            status="Present"
            size="xs"
          />
        </div>
      </div>
    </div>
  )
}

interface DepartmentListItem {
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

const departmentsData: DepartmentListItem[] = [
  {
    id: "cto",
    name: "Technology & Engineering",
    executiveRole: "CTO",
    executiveName: "James",
    executiveAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140",
    status: "Absent",
    offset: 0,
    managers: [
      {
        role: "Engineering Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
        status: "Present",
        leads: [
          {
            role: "Team Lead",
            name: "Michael Smith",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
          {
            role: "Team Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
      {
        role: "DevOps Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
        status: "Present",
        leads: [
          {
            role: "Team Lead",
            name: "Michael Smith",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
          {
            role: "Team Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
    ],
  },
  {
    id: "cfo",
    name: "Finance & Accounting",
    executiveRole: "CFO",
    executiveName: "Jay",
    executiveAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140",
    status: "Present",
    offset: 440,
    managers: [
      {
        role: "Finance Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
        status: "Present",
      },
      {
        role: "Accounting Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
        status: "Present",
        leads: [
          {
            role: "Payroll Lead",
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            status: "Present",
            members: ["Alex", "John", "Sara"],
          },
        ],
      },
    ],
  },
  {
    id: "cmo",
    name: "Marketing & Communications",
    executiveRole: "CMO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140",
    status: "Present",
    offset: 700,
    managers: [
      {
        role: "Digital Marketing Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
        status: "Present",
      },
      {
        role: "Branding Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
        status: "Present",
      },
    ],
  },
  {
    id: "chro",
    name: "Human Resources",
    executiveRole: "CHRO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140",
    status: "Present",
    offset: 930,
    managers: [
      {
        role: "Recruitment Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
        status: "Present",
      },
      {
        role: "HR Ops Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
        status: "Present",
      },
    ],
  },
  {
    id: "coo",
    name: "Operations & Logistics",
    executiveRole: "COO",
    executiveName: "Emily Davis",
    executiveAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140",
    status: "Present",
    offset: 1160,
    managers: [
      {
        role: "Operations Manager",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
        status: "Present",
      },
      {
        role: "Logistics Manager",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
        status: "Present",
      },
    ],
  },
]

export default function OrgTree() {
  const treeContainerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [activeBranch, setActiveBranch] = useState("all")
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    cto: true,
    cfo: true,
  })

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
      const containerWidth = treeContainerRef.current.clientWidth - 32
      const fitRatio = Math.min(1, Math.max(0.45, +(containerWidth / 1486).toFixed(2)))
      setZoom(fitRatio)
    }
  }, [])

  const scrollToBranch = (branchId: string, offset: number) => {
    setActiveBranch(branchId)
    if (treeContainerRef.current) {
      if (branchId === "all") {
        const containerWidth = treeContainerRef.current.clientWidth
        const center = Math.max(0, (1486 * zoom - containerWidth) / 2)
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
    <div className="w-full flex flex-col gap-3 sm:gap-4 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[95px]">
          <span className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-500">
            Project Name
          </span>
          <h3 className="text-lg sm:text-2xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight truncate">
            HRMS
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[95px]">
          <span className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-500">
            Manager
          </span>
          <h3 className="text-lg sm:text-2xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight truncate">
            Shyam Reddy
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[95px]">
          <span className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-500">
            Project Timing
          </span>
          <h3 className="text-lg sm:text-2xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight truncate">
            2 Months{" "}
            <span className="text-xs sm:text-base font-semibold text-[#64748B]">
              (23-09-2025)
            </span>
          </h3>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xs border border-gray-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
          <button
            type="button"
            onClick={() => scrollToBranch("all", 0)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeBranch === "all"
                ? "bg-[#8571EE] text-white shadow-2xs"
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            All Branches
          </button>
          {departmentsData.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => scrollToBranch(d.id, d.offset)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeBranch === d.id
                  ? "bg-[#8571EE] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              {d.executiveRole}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-2 border-t lg:border-t-0 pt-2 lg:pt-0 border-gray-100">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("tree")}
              title="Interactive Visual Tree"
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === "tree"
                  ? "bg-white text-[#8571EE] shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <TreeStructure size={14} weight="bold" />
              <span className="hidden sm:inline">Visual Tree</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              title="Department Card List"
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-white text-[#8571EE] shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ListDashes size={14} weight="bold" />
              <span className="hidden sm:inline">Department Cards</span>
            </button>
          </div>

          {viewMode === "tree" && (
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200/80">
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:text-[#8571EE] transition-colors cursor-pointer"
              >
                <MagnifyingGlassMinus size={15} weight="bold" />
              </button>
              <span className="text-[11px] font-semibold text-gray-600 px-1.5 min-w-[36px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:text-[#8571EE] transition-colors cursor-pointer"
              >
                <MagnifyingGlassPlus size={15} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleFitScreen}
                title="Fit to Screen"
                className="px-2 py-1 text-[11px] font-semibold text-gray-600 hover:bg-white hover:text-[#8571EE] rounded-md transition-colors cursor-pointer flex items-center gap-1 border border-gray-200"
              >
                <ArrowsIn size={12} weight="bold" />
                <span>Fit</span>
              </button>
              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-[11px] font-semibold text-[#8571EE] hover:bg-white rounded-md transition-colors cursor-pointer"
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
          className="bg-white rounded-xl sm:rounded-3xl p-3 sm:p-6 md:p-8 shadow-xs border border-gray-100 w-full overflow-x-auto min-h-[480px] sm:min-h-[620px] scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent touch-pan-x"
        >
          <div className="sm:hidden flex items-center justify-between text-[11px] text-gray-500 mb-2 px-1">
            <span>Hierarchy Canvas</span>
            <span className="text-[#8571EE] font-medium flex items-center gap-1">
              <ArrowsHorizontal size={13} />
              <span>Swipe or Zoom to explore</span>
            </span>
          </div>

          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: `${1486 * zoom}px`,
              height: `${620 * zoom}px`,
              transition: "transform 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out",
            }}
            className="relative"
          >
            <div className="w-[1486px] min-w-[1486px] flex flex-col items-start py-4 px-8 select-none">
              <div className="w-full flex justify-center mb-0" style={{ paddingLeft: "115px" }}>
                <div className="flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160"
                    role="CEO"
                    name="Alex Johnson"
                    status="Present"
                    size="xl"
                  />
                  <div className="w-0.5 h-7 bg-gray-300" />
                </div>
              </div>

              <svg className="w-[1486px] h-7 pointer-events-none" viewBox="0 0 1486 28">
                <line x1="230" y1="0" x2="1371" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="230" y1="0" x2="230" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="604" y1="0" x2="604" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="863" y1="0" x2="863" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="1117" y1="0" x2="1117" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="1371" y1="0" x2="1371" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
              </svg>

              <div className="w-[1486px] flex items-start gap-6">
                <div className="w-[460px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140"
                    role="CTO"
                    name="James"
                    status="Absent"
                    size="lg"
                  />

                  <svg className="w-[460px] h-6 pointer-events-none" viewBox="0 0 460 24">
                    <line x1="230" y1="0" x2="230" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="110" y1="12" x2="350" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="110" y1="12" x2="110" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="350" y1="12" x2="350" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[460px] flex items-start justify-between">
                    <div className="w-[220px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120"
                        role="Engineering Manager"
                        name="John Doe"
                        status="Present"
                        size="md"
                      />

                      <svg className="w-[220px] h-5 pointer-events-none" viewBox="0 0 220 20">
                        <line x1="110" y1="0" x2="110" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="52.5" y1="10" x2="167.5" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="52.5" y1="10" x2="52.5" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="167.5" y1="10" x2="167.5" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>

                      <div className="w-[220px] flex items-start justify-between">
                        <div className="w-[105px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
                            role="Team Lead"
                            name="Michael Smith"
                            status="Present"
                            size="sm"
                          />
                          <ICRow />
                        </div>

                        <div className="w-[105px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                            role="Team Lead"
                            name="Emily Davis"
                            status="Present"
                            size="sm"
                          />
                          <ICRow />
                        </div>
                      </div>
                    </div>

                    <div className="w-[220px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120"
                        role="DevOps Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="md"
                      />

                      <svg className="w-[220px] h-5 pointer-events-none" viewBox="0 0 220 20">
                        <line x1="110" y1="0" x2="110" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="52.5" y1="10" x2="167.5" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="52.5" y1="10" x2="52.5" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="167.5" y1="10" x2="167.5" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>

                      <div className="w-[220px] flex items-start justify-between">
                        <div className="w-[105px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
                            role="Team Lead"
                            name="Michael Smith"
                            status="Present"
                            size="sm"
                          />
                          <ICRow />
                        </div>

                        <div className="w-[105px] shrink-0 flex flex-col items-center">
                          <TreeNode
                            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                            role="Team Lead"
                            name="Emily Davis"
                            status="Present"
                            size="sm"
                          />
                          <ICRow />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[240px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140"
                    role="CFO"
                    name="Jay"
                    status="Present"
                    size="lg"
                  />

                  <svg className="w-[240px] h-6 pointer-events-none" viewBox="0 0 240 24">
                    <line x1="120" y1="0" x2="120" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="55" y1="12" x2="185" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="55" y1="12" x2="55" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="185" y1="12" x2="185" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[240px] flex items-start justify-between">
                    <div className="w-[110px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120"
                        role="Finance"
                        name="John Doe"
                        status="Present"
                        size="md"
                      />
                    </div>

                    <div className="w-[110px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120"
                        role="Accounting Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="md"
                      />

                      <div className="w-0.5 h-4 bg-gray-300 mt-1" />

                      <div className="w-[105px] flex flex-col items-center">
                        <TreeNode
                          avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                          role="Payroll Lead"
                          name="Emily Davis"
                          status="Present"
                          size="sm"
                        />
                        <ICRow />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[230px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140"
                    role="CMO"
                    name="Emily Davis"
                    status="Present"
                    size="lg"
                  />

                  <svg className="w-[230px] h-6 pointer-events-none" viewBox="0 0 230 24">
                    <line x1="115" y1="0" x2="115" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="177.5" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="52.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="177.5" y1="12" x2="177.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[230px] flex items-start justify-between">
                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120"
                        role="Digital Marketing..."
                        name="John Doe"
                        status="Present"
                        size="md"
                      />
                    </div>

                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120"
                        role="Branding Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="md"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[230px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140"
                    role="CHRO"
                    name="Emily Davis"
                    status="Present"
                    size="lg"
                  />

                  <svg className="w-[230px] h-6 pointer-events-none" viewBox="0 0 230 24">
                    <line x1="115" y1="0" x2="115" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="177.5" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="52.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="177.5" y1="12" x2="177.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[230px] flex items-start justify-between">
                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120"
                        role="Recruitment Man..."
                        name="John Doe"
                        status="Present"
                        size="md"
                      />
                    </div>

                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120"
                        role="HR Ops Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="md"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[230px] shrink-0 flex flex-col items-center">
                  <TreeNode
                    avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140"
                    role="COO"
                    name="Emily Davis"
                    status="Present"
                    size="lg"
                  />

                  <svg className="w-[230px] h-6 pointer-events-none" viewBox="0 0 230 24">
                    <line x1="115" y1="0" x2="115" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="177.5" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="52.5" y1="12" x2="52.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="177.5" y1="12" x2="177.5" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
                  </svg>

                  <div className="w-[230px] flex items-start justify-between">
                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120"
                        role="Operations Manager"
                        name="John Doe"
                        status="Present"
                        size="md"
                      />
                    </div>

                    <div className="w-[105px] shrink-0 flex flex-col items-center">
                      <TreeNode
                        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120"
                        role="Logistics Manager"
                        name="Sarah Johnson"
                        status="Present"
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160"
                alt="Alex Johnson"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-[#1E293B]">Alex Johnson</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#8571EE] border border-purple-100">
                    CEO
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Present • Chief Executive Office</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
            {departmentsData.map((dept) => {
              const isExpanded = expandedDepts[dept.id] ?? false
              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => toggleDeptExpand(dept.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={dept.executiveAvatar}
                        alt={dept.executiveName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1E293B] truncate">{dept.name}</h4>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-50 text-[#8571EE]">
                            {dept.executiveRole}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          Lead: {dept.executiveName} •{" "}
                          <span className={dept.status === "Present" ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
                            {dept.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {isExpanded ? <CaretDown size={18} weight="bold" /> : <CaretRight size={18} weight="bold" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-100 animate-in fade-in duration-150">
                      {dept.managers.map((mgr, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50/70 rounded-xl p-3 flex flex-col gap-2 border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={mgr.avatar}
                                alt={mgr.name}
                                className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500 shrink-0"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-[#1E293B]">{mgr.name}</h5>
                                <p className="text-[11px] text-[#8571EE] font-medium">{mgr.role}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-medium text-emerald-600 bg-white px-2 py-0.5 rounded-md border border-emerald-100">
                              {mgr.status}
                            </span>
                          </div>

                          {mgr.leads && mgr.leads.length > 0 && (
                            <div className="pl-4 border-l-2 border-purple-200 flex flex-col gap-2 mt-1">
                              {mgr.leads.map((lead, lIdx) => (
                                <div key={lIdx} className="bg-white rounded-lg p-2.5 border border-gray-100">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={lead.avatar}
                                        alt={lead.name}
                                        className="w-6 h-6 rounded-full object-cover"
                                      />
                                      <span className="text-xs font-semibold text-gray-800">{lead.name}</span>
                                      <span className="text-[10px] text-gray-400">({lead.role})</span>
                                    </div>
                                    <span className="text-[9px] font-medium text-emerald-600">Present</span>
                                  </div>

                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-[10px] text-gray-400">Developers:</span>
                                    <div className="flex items-center gap-1">
                                      {lead.members.map((m, mIdx) => (
                                        <span
                                          key={mIdx}
                                          className="text-[10px] font-medium bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
                                        >
                                          {m}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
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