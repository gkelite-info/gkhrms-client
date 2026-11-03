"use client"

import { useState, useMemo, useRef } from "react"
import { CaretLeft, CaretRight, ArrowLeft, ArrowRight } from "phosphor-react"
import ReusablePagination from "../../../../../../reusableComponents/ReusablePagination"

type StatusType = "purple" | "cyan" | "green" | "pink"

interface MemberCalendar {
  id: string
  name: string
  avatar: string
}

const colorStyles: Record<
  StatusType,
  { bg: string; text: string; label: string }
> = {
  purple: {
    bg: "bg-[#C5C1FF]",
    text: "text-[#2D2A5A]",
    label: "Present / Regular",
  },
  cyan: {
    bg: "bg-[#A7F3D0]",
    text: "text-[#065F46]",
    label: "Work from Home / Remote",
  },
  green: {
    bg: "bg-[#BBF7D0]",
    text: "text-[#166534]",
    label: "On Time",
  },
  pink: {
    bg: "bg-[#FECDD3]",
    text: "text-[#9F1239]",
    label: "Leave / Off / Late",
  },
}

const teamMembers: MemberCalendar[] = [
  {
    id: "sara",
    name: "Sara Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "john-doe",
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "michael",
    name: "Michael Smith",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "emily",
    name: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "davis",
    name: "Davis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "smith",
    name: "Smith",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "john",
    name: "John",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
  },
]

const augustBasePatterns: Record<string, StatusType[]> = {
  sara: [
    "purple", "purple", "purple", "purple", "purple", "cyan", "cyan", "green",
    "pink", "pink", "pink", "green", "purple", "pink", "green", "purple",
    "purple", "purple", "cyan", "green", "green", "purple", "purple", "pink",
    "pink", "green", "purple", "purple", "cyan", "cyan", "purple",
  ],
  "john-doe": [
    "pink", "pink", "pink", "pink", "pink", "pink", "pink", "pink",
    "purple", "purple", "purple", "purple", "purple", "purple", "pink", "purple",
    "purple", "green", "green", "purple", "purple", "purple", "pink", "pink",
    "purple", "purple", "cyan", "cyan", "purple", "purple", "green",
  ],
  michael: [
    "cyan", "cyan", "cyan", "cyan", "green", "green", "green", "green",
    "pink", "pink", "pink", "pink", "pink", "pink", "pink", "green",
    "green", "purple", "purple", "cyan", "cyan", "green", "pink", "pink",
    "green", "green", "purple", "purple", "cyan", "cyan", "purple",
  ],
  emily: [
    "purple", "purple", "purple", "purple", "cyan", "cyan", "cyan", "cyan",
    "green", "green", "green", "green", "green", "green", "green", "green",
    "purple", "purple", "cyan", "cyan", "green", "green", "pink", "pink",
    "purple", "purple", "green", "green", "purple", "purple", "green",
  ],
  davis: [
    "pink", "pink", "pink", "pink", "purple", "purple", "purple", "purple",
    "purple", "purple", "pink", "pink", "pink", "pink", "pink", "purple",
    "purple", "cyan", "cyan", "green", "purple", "purple", "pink", "pink",
    "green", "green", "purple", "purple", "cyan", "purple", "purple",
  ],
  smith: [
    "purple", "purple", "purple", "purple", "pink", "pink", "pink", "pink",
    "pink", "pink", "pink", "pink", "pink", "pink", "pink", "pink",
    "purple", "purple", "green", "green", "purple", "purple", "pink", "pink",
    "purple", "purple", "green", "green", "purple", "purple", "pink",
  ],
  john: [
    "green", "green", "green", "green", "cyan", "cyan", "cyan", "cyan",
    "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple",
    "green", "green", "cyan", "cyan", "purple", "purple", "pink", "pink",
    "green", "green", "purple", "purple", "cyan", "cyan", "purple",
  ],
}

function getMemberStatusForDay(
  memberId: string,
  year: number,
  monthIndex: number,
  day: number
): StatusType {
  if (year === 2025 && monthIndex === 7) {
    const arr = augustBasePatterns[memberId]
    if (arr && arr[day - 1]) return arr[day - 1]
  }

  const date = new Date(year, monthIndex, day)
  const dayOfWeek = date.getDay()

  let hash = 0
  for (let i = 0; i < memberId.length; i++) {
    hash = (hash << 5) - hash + memberId.charCodeAt(i)
  }
  const seed = Math.abs(hash + year * 31 + (monthIndex + 1) * 37 + day * 13)

  if (dayOfWeek === 0) {
    return seed % 3 === 0 ? "purple" : "pink"
  }
  if (dayOfWeek === 6) {
    return seed % 2 === 0 ? "cyan" : "pink"
  }

  const r = seed % 10
  if (r < 4) return "purple"
  if (r < 7) return "green"
  if (r < 9) return "cyan"
  return "pink"
}

export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date(2025, 7, 1))
  const [hoveredCell, setHoveredCell] = useState<{
    member: string
    day: number
    monthName: string
    year: number
    status: string
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(7)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const totalPages = Math.ceil(teamMembers.length / pageSize)
  const paginatedMembers = useMemo(() => {
    return teamMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }, [currentPage, pageSize])

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate()
  }, [year, month])

  const monthDays = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const d = new Date(year, month, day)
      const weekDay = d
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase()
      return { day, weekDay }
    })
  }, [year, month, daysInMonth])

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const scrollCalendar = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Team Calendar
        </h2>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <span className="text-[11px] text-gray-400 mr-1">
            Scroll {daysInMonth} days
          </span>
          <button
            type="button"
            onClick={() => scrollCalendar("left")}
            className="p-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Scroll Left"
          >
            <ArrowLeft size={13} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => scrollCalendar("right")}
            className="p-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            title="Scroll Right"
          >
            <ArrowRight size={13} weight="bold" />
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100 relative">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-3 scrollbar-thin"
        >
          <div className="w-max min-w-full">
            <div className="flex items-center pb-3 border-b border-gray-100">
              <div className="w-[185px] min-w-[185px] shrink-0 sticky left-0 bg-white z-20 pr-3 border-r border-gray-100 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.03)]">
                <div className="inline-flex items-center gap-2 bg-[#C5C1FF] hover:bg-[#b8b3ff] transition-colors rounded-lg px-3 py-1.5 shadow-xs select-none">
                  <button
                    onClick={handlePrevMonth}
                    type="button"
                    className="text-gray-800 hover:text-black cursor-pointer transition-transform active:scale-95 p-0.5"
                    aria-label="Previous Month"
                  >
                    <CaretLeft size={14} weight="bold" />
                  </button>
                  <span className="text-xs font-bold text-gray-900 min-w-[70px] text-center whitespace-nowrap">
                    {monthLabel}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    type="button"
                    className="text-gray-800 hover:text-black cursor-pointer transition-transform active:scale-95 p-0.5"
                    aria-label="Next Month"
                  >
                    <CaretRight size={14} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 pl-3">
                {monthDays.map((md) => (
                  <div
                    key={md.day}
                    className="w-8 sm:w-8.5 text-center text-[10px] sm:text-[11px] font-bold text-gray-600 tracking-wider select-none uppercase shrink-0"
                  >
                    {md.weekDay}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col divide-y divide-gray-50 pt-2">
              {paginatedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center py-2.5 hover:bg-gray-50/50 rounded-xl transition-colors group"
                >
                  <div className="w-[185px] min-w-[185px] shrink-0 flex items-center gap-3 sticky left-0 bg-white z-10 pr-3 border-r border-gray-100 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.03)] group-hover:bg-gray-50/80 transition-colors">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-purple-100 shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                      {member.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 pl-3">
                    {monthDays.map(({ day }) => {
                      const status = getMemberStatusForDay(
                        member.id,
                        year,
                        month,
                        day
                      )
                      const config = colorStyles[status]

                      return (
                        <div
                          key={day}
                          className="w-8 sm:w-8.5 flex justify-center items-center shrink-0"
                          onMouseEnter={() =>
                            setHoveredCell({
                              member: member.name,
                              day,
                              monthName: monthLabel.split(" ")[0],
                              year,
                              status: config.label,
                            })
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${config.bg} ${config.text} flex items-center justify-center text-xs font-bold select-none cursor-pointer hover:scale-110 shadow-xs transition-transform duration-150`}
                          >
                            {day}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 select-none min-h-[38px]">
          <div className="flex items-center min-h-[28px]">
            {hoveredCell ? (
              <div className="bg-gray-900 text-white text-[11px] py-1 px-3 rounded-lg shadow-xs flex items-center gap-2 animate-in fade-in duration-150">
                <span className="font-semibold">{hoveredCell.member}</span>
                <span className="text-gray-400">•</span>
                <span>
                  {hoveredCell.monthName} {hoveredCell.day}, {hoveredCell.year}:{" "}
                  <span className="text-purple-300 font-medium">
                    {hoveredCell.status}
                  </span>
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-gray-400 italic">
                Hover over any date to view attendance detail
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C5C1FF]" />
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#BBF7D0]" />
              <span>On Time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#A7F3D0]" />
              <span>Work from Home / Remote</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FECDD3]" />
              <span>Leave / Off / Late</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={teamMembers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize: number) => {
              setPageSize(newSize)
              setCurrentPage(1)
            }}
            pageSizeOptions={[3, 5, 7, 10]}
          />
        </div>
      </div>
    </div>
  )
}
