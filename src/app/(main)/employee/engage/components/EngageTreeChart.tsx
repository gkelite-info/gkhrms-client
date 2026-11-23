"use client"

import React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

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

export default function EngageTreeChart() {
  return (
    <div className="w-full flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full shrink-0">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[92px]">
          <span className="text-[11px] sm:text-[13px] font-medium text-gray-500">Project Name</span>
          <h3 className="text-base sm:text-xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight truncate">
            HRMS
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[92px]">
          <span className="text-[11px] sm:text-[13px] font-medium text-gray-500">Manager</span>
          <h3 className="text-base sm:text-xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight truncate">
            Shyam Reddy
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[75px] sm:min-h-[92px]">
          <span className="text-[11px] sm:text-[13px] font-medium text-gray-500">Project Timing</span>
          <h3 className="text-base sm:text-xl font-bold text-[#1E293B] mt-0.5 sm:mt-1 tracking-tight whitespace-nowrap truncate">
            2 Months{" "}
            <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1">
              (23-09-2025)
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 w-full flex-1 min-h-0 overflow-auto scrollbar-thin [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]">
        <div className="w-max min-w-full flex justify-center p-3 sm:p-6 pb-14">
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
    </div>
  )
}
