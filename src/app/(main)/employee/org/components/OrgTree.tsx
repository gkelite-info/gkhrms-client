"use client"

import React from "react"

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

export default function OrgTree() {
  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[85px] sm:min-h-[95px]">
          <span className="text-xs sm:text-sm font-medium text-gray-500">
            Project Name
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-1 tracking-tight">
            HRMS
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[85px] sm:min-h-[95px]">
          <span className="text-xs sm:text-sm font-medium text-gray-500">
            Manager
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-1 tracking-tight">
            Shyam Reddy
          </h3>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-center min-h-[85px] sm:min-h-[95px]">
          <span className="text-xs sm:text-sm font-medium text-gray-500">
            Project Timing
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-1 tracking-tight">
            2 Months{" "}
            <span className="text-base sm:text-lg font-semibold text-[#1E293B]">
              (23-09-2025)
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs border border-gray-100 w-full overflow-x-auto min-h-[500px] sm:min-h-[620px] scrollbar-hide touch-pan-x">
        <div className="sm:hidden flex items-center justify-between text-[11px] text-gray-500 mb-2 px-1">
          <span>Hierarchy Tree</span>
          <span className="text-[#8571EE] font-medium flex items-center gap-1">
            Swipe horizontally →
          </span>
        </div>

        <div className="w-[1486px] min-w-[1486px] flex flex-col items-start py-4 px-8">
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
  )
}
