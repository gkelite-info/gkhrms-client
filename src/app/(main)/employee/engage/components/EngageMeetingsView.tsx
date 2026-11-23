"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ArrowLeft, Plus, VideoCamera, CaretDown, X } from "phosphor-react"

export interface MeetingItem {
  id: string
  title: string
  host: string
  platform: "zoom" | "google-meet"
  statusText: string
  timeRange: string
  category: "today" | "upcoming" | "completed"
  participants: string[]
  extraParticipantsCount: number
  meetingLink?: string
}

const initialMeetings: MeetingItem[] = [
  {
    id: "m1",
    title: "Meeting Title",
    host: "Thomas",
    platform: "zoom",
    statusText: "Starts in 30 mins",
    timeRange: "9:00 PM – 3:34 PM",
    category: "today",
    participants: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 2,
    meetingLink: "https://zoom.us/j/mock123",
  },
  {
    id: "m2",
    title: "Meeting Title",
    host: "Thomas",
    platform: "google-meet",
    statusText: "Starts in 30 mins",
    timeRange: "9:00 PM – 3:34 PM",
    category: "today",
    participants: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 2,
    meetingLink: "https://meet.google.com/mock-meet",
  },
  {
    id: "m3",
    title: "Meeting Title",
    host: "Thomas",
    platform: "zoom",
    statusText: "Starts in 30 mins",
    timeRange: "9:00 PM – 3:34 PM",
    category: "today",
    participants: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 2,
    meetingLink: "https://zoom.us/j/mock456",
  },
  {
    id: "m4",
    title: "Meeting Title",
    host: "Thomas",
    platform: "google-meet",
    statusText: "Starts in 30 mins",
    timeRange: "9:00 PM – 3:34 PM",
    category: "today",
    participants: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 2,
    meetingLink: "https://meet.google.com/mock-meet2",
  },
  {
    id: "m5",
    title: "Sprint Planning",
    host: "Thomas",
    platform: "zoom",
    statusText: "Tomorrow",
    timeRange: "10:00 AM – 11:30 AM",
    category: "upcoming",
    participants: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 4,
  },
  {
    id: "m6",
    title: "Design System Review",
    host: "Sarah",
    platform: "google-meet",
    statusText: "In 2 days",
    timeRange: "2:00 PM – 3:00 PM",
    category: "upcoming",
    participants: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 1,
  },
  {
    id: "m7",
    title: "HRMS Architecture Alignment",
    host: "Thomas",
    platform: "zoom",
    statusText: "Completed yesterday",
    timeRange: "9:00 AM – 10:00 AM",
    category: "completed",
    participants: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 3,
  },
  {
    id: "m8",
    title: "Weekly Sync",
    host: "Alex",
    platform: "google-meet",
    statusText: "Completed on Oct 24",
    timeRange: "11:00 AM – 12:00 PM",
    category: "completed",
    participants: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    ],
    extraParticipantsCount: 5,
  },
]

const modalParticipantAvatars: string[] = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
]

function PlatformIcon({
  platform,
  compact = false,
}: {
  platform: "zoom" | "google-meet"
  compact?: boolean
}) {
  if (platform === "zoom") {
    return (
      <div
        className={`${
          compact ? "w-5 h-5 text-[8px]" : "w-8 h-8 text-[10px]"
        } rounded-full bg-[#0E71EB] flex items-center justify-center shrink-0 shadow-2xs`}
      >
        <span className="text-white font-extrabold tracking-tight italic select-none">
          zoom
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${
        compact ? "w-5 h-5" : "w-8 h-8"
      } flex items-center justify-center shrink-0`}
    >
      <svg
        className={compact ? "w-4 h-4" : "w-7 h-7"}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M14 8.5V15.5L18.5 19V5L14 8.5Z" fill="#00832D" />
        <path
          d="M3.5 6.5C3.5 5.4 4.4 4.5 5.5 4.5H12C13.1 4.5 14 5.4 14 6.5V17.5C14 18.6 13.1 19.5 12 19.5H5.5C4.4 19.5 3.5 18.6 3.5 17.5V6.5Z"
          fill="#0066DA"
        />
        <path d="M3.5 6.5C3.5 5.4 4.4 4.5 5.5 4.5H12V9H3.5V6.5Z" fill="#EA4335" />
        <path
          d="M3.5 15H14V17.5C14 18.6 13.1 19.5 12 19.5H5.5C4.4 19.5 3.5 18.6 3.5 17.5V15Z"
          fill="#FFBA00"
        />
      </svg>
    </div>
  )
}

export default function EngageMeetingsView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const parseSubtabFromQuery = useCallback((param: string | null): "today" | "upcoming" | "completed" => {
    const s = (param || "").toLowerCase()
    if (s === "upcoming") return "upcoming"
    if (s === "completed") return "completed"
    return "today"
  }, [])

  const initialSubtab = parseSubtabFromQuery(searchParams?.get("subtab"))
  const initialModalOpen = searchParams?.get("modal") === "new"

  const [activeSubtab, setActiveSubtab] = useState<"today" | "upcoming" | "completed">(initialSubtab)
  const [meetings, setMeetings] = useState<MeetingItem[]>(initialMeetings)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(initialModalOpen)

  const [newTitle, setNewTitle] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("3:00 PM")
  const [newDurationStart, setNewDurationStart] = useState("3:00 PM")
  const [newDurationEnd, setNewDurationEnd] = useState("4:00 PM")
  const [newPlatform, setNewPlatform] = useState<"zoom" | "google-meet">("google-meet")
  const [newOrganizer, setNewOrganizer] = useState("Sara")
  const [attachedFilesCount, setAttachedFilesCount] = useState(2)
  const [notes, setNotes] = useState("")
  const [isPlatformMenuOpen, setIsPlatformMenuOpen] = useState(false)
  const [isOrganizerMenuOpen, setIsOrganizerMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setActiveSubtab(parseSubtabFromQuery(searchParams?.get("subtab")))
    setIsModalOpen(searchParams?.get("modal") === "new")
  }, [searchParams, parseSubtabFromQuery])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2400)
  }

  const handleSubtabChange = (subtab: "today" | "upcoming" | "completed") => {
    setActiveSubtab(subtab)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("tab", "meetings")
    if (subtab === "today") {
      params.delete("subtab")
    } else {
      params.set("subtab", subtab)
    }
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  const handleBackToHierarchy = () => {
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.delete("tab")
    params.delete("subtab")
    params.delete("modal")
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("modal", "new")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsPlatformMenuOpen(false)
    setIsOrganizerMenuOpen(false)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.delete("modal")
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault()

    const created: MeetingItem = {
      id: `m-${Date.now()}`,
      title: newTitle.trim() || "Meeting Title",
      host: newOrganizer.trim() || "Sara",
      platform: newPlatform,
      statusText: "Starts in 30 mins",
      timeRange: `${newDurationStart} – ${newDurationEnd}`,
      category: activeSubtab === "completed" ? "today" : activeSubtab,
      participants: modalParticipantAvatars,
      extraParticipantsCount: 2,
      meetingLink:
        newPlatform === "zoom" ? "https://zoom.us/j/mock" : "https://meet.google.com/mock",
    }

    setMeetings((prev) => [created, ...prev])
    setNewTitle("")
    setNotes("")
    handleCloseModal()
    showToast("Meeting scheduled successfully!")
  }

  const filteredMeetings = meetings.filter((m) => m.category === activeSubtab)

  return (
    <div className="w-full min-h-full px-3 py-3 sm:px-4 sm:pt-4 md:px-6 md:pt-4 pb-6 flex flex-col gap-4 sm:gap-5 select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleBackToHierarchy}
            className="p-1.5 text-gray-500 hover:text-[#8571EE] hover:bg-white rounded-lg transition-colors cursor-pointer"
            aria-label="Back to Engage Tree"
          >
            <ArrowLeft size={19} weight="bold" />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1F2937] tracking-tight">
            Meetings
          </h1>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 bg-white sm:bg-transparent rounded-xl px-2 py-1 sm:p-0 border border-gray-100 sm:border-none shadow-2xs sm:shadow-none">
            <button
              type="button"
              onClick={() => handleSubtabChange("today")}
              className={`text-xs sm:text-sm px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                activeSubtab === "today"
                  ? "font-bold text-[#1F2937] bg-gray-100 sm:bg-transparent"
                  : "font-medium text-gray-500 hover:text-gray-800"
              }`}
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => handleSubtabChange("upcoming")}
              className={`text-xs sm:text-sm px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                activeSubtab === "upcoming"
                  ? "font-bold text-[#1F2937] bg-gray-100 sm:bg-transparent"
                  : "font-medium text-gray-500 hover:text-gray-800"
              }`}
            >
              Upcoming
            </button>

            <button
              type="button"
              onClick={() => handleSubtabChange("completed")}
              className={`text-xs sm:text-sm px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                activeSubtab === "completed"
                  ? "font-bold text-[#1F2937] bg-gray-100 sm:bg-transparent"
                  : "font-medium text-gray-500 hover:text-gray-800"
              }`}
            >
              Completed
            </button>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8571EE] hover:bg-[#725EE8] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs shrink-0"
            aria-label="Schedule Meeting"
          >
            <Plus size={15} weight="bold" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 w-full">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow min-w-0"
          >
            <div>
              <div className="flex items-center gap-3">
                <PlatformIcon platform={meeting.platform} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#1E293B] truncate leading-snug">
                    {meeting.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal truncate mt-0.5">
                    {meeting.host}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 my-3 sm:my-3.5" />

              <div className="flex flex-col items-center text-center">
                <span className="text-[11px] text-gray-400 font-medium">
                  {meeting.statusText}
                </span>
                <p className="text-base sm:text-[17px] font-bold text-[#8571EE] mt-1 tracking-tight">
                  {meeting.timeRange}
                </p>

                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center -space-x-1.5">
                    {meeting.participants.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt="Participant"
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-white bg-gray-100 shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/alexander.png"
                        }}
                      />
                    ))}
                  </div>
                  {meeting.extraParticipantsCount > 0 && (
                    <span className="text-xs text-gray-600 font-medium ml-2">
                      +{meeting.extraParticipantsCount}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-1">
              <button
                type="button"
                onClick={() =>
                  showToast(
                    meeting.category === "completed"
                      ? "Meeting recording opened"
                      : `Joining ${meeting.platform === "zoom" ? "Zoom" : "Google Meet"}...`
                  )
                }
                className="w-full py-2 px-4 rounded-xl bg-[#8571EE] hover:bg-[#725EE8] text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-xs"
              >
                {meeting.category === "completed" ? "View Recording" : "Join Meeting"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-xs border border-gray-100 flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#8571EE]">
            <VideoCamera size={24} weight="duotone" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 mt-2">
            No meetings in this category
          </h3>
          <p className="text-xs text-gray-500 max-w-sm">
            You do not have any {activeSubtab} meetings scheduled. Click the + button
            to create one.
          </p>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-[560px] w-full p-4 sm:p-5 flex flex-col my-auto max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 shrink-0 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Add New Meeting
              </h2>
              <div className="flex items-center gap-1">
                <div className="flex items-center -space-x-1.5">
                  {modalParticipantAvatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt="Participant"
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-600 ml-1.5">
                  +2
                </span>
                <button
                  type="button"
                  onClick={() => showToast("Add participant")}
                  className="w-6 h-6 rounded-full bg-[#8571EE] hover:bg-[#725EE8] text-white flex items-center justify-center ml-2 transition-colors cursor-pointer shrink-0 shadow-2xs"
                  aria-label="Add participant"
                >
                  <Plus size={13} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 p-1 ml-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={17} weight="bold" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateMeeting} className="flex flex-col flex-1 min-h-0 pt-3">
              <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3.5 [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Meeting Title here..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-3">
                    <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-gray-800 text-center placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="3:00 PM"
                      className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-gray-800 text-center placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                      Duration
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newDurationStart}
                        onChange={(e) => setNewDurationStart(e.target.value)}
                        placeholder="3:00 PM"
                        className="w-full bg-white border border-gray-300 rounded-lg px-2 py-2 text-xs sm:text-sm text-gray-800 text-center placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
                      />
                      <input
                        type="text"
                        value={newDurationEnd}
                        onChange={(e) => setNewDurationEnd(e.target.value)}
                        placeholder="4:00 PM"
                        className="w-full bg-white border border-gray-300 rounded-lg px-2 py-2 text-xs sm:text-sm text-gray-800 text-center placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                    Select Platform
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlatformMenuOpen(!isPlatformMenuOpen)
                      setIsOrganizerMenuOpen(false)
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 flex items-center justify-between text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#8571EE] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={newPlatform} compact />
                      <span className="font-medium text-gray-800">
                        {newPlatform === "google-meet" ? "Google Meet" : "Zoom"}
                      </span>
                    </div>
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={`text-gray-500 transition-transform ${isPlatformMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isPlatformMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setNewPlatform("google-meet")
                          setIsPlatformMenuOpen(false)
                        }}
                        className="w-full px-3.5 py-2 flex items-center gap-2 hover:bg-purple-50 text-xs sm:text-sm text-gray-800 text-left cursor-pointer"
                      >
                        <PlatformIcon platform="google-meet" compact />
                        <span>Google Meet</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewPlatform("zoom")
                          setIsPlatformMenuOpen(false)
                        }}
                        className="w-full px-3.5 py-2 flex items-center gap-2 hover:bg-purple-50 text-xs sm:text-sm text-gray-800 text-left cursor-pointer"
                      >
                        <PlatformIcon platform="zoom" compact />
                        <span>Zoom</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                    Organizer
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOrganizerMenuOpen(!isOrganizerMenuOpen)
                      setIsPlatformMenuOpen(false)
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 flex items-center justify-between text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#8571EE] transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-gray-800">{newOrganizer}</span>
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={`text-gray-500 transition-transform ${isOrganizerMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOrganizerMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 overflow-hidden">
                      {["Sara", "Thomas", "Alex Johnson", "Emily Davis"].map((org) => (
                        <button
                          key={org}
                          type="button"
                          onClick={() => {
                            setNewOrganizer(org)
                            setIsOrganizerMenuOpen(false)
                          }}
                          className="w-full px-3.5 py-2 hover:bg-purple-50 text-xs sm:text-sm text-gray-800 text-left cursor-pointer"
                        >
                          {org}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                    Files
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 flex items-center justify-between text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="font-normal text-gray-700">
                      {attachedFilesCount > 0
                        ? `${attachedFilesCount} Files Attached`
                        : "2 Files Attached"}
                    </span>
                    <div className="text-gray-500 hover:text-gray-800 transition-colors p-0.5">
                      <Plus size={15} weight="bold" />
                    </div>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAttachedFilesCount(e.target.files.length)
                          showToast(`${e.target.files.length} file(s) attached`)
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors resize-none h-18 sm:h-20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3 shrink-0 border-t border-gray-100">
                <button
                  type="submit"
                  className="px-8 py-2 rounded-lg bg-[#8571EE] hover:bg-[#725EE8] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-2 rounded-lg bg-[#9CA3AF] hover:bg-[#6B7280] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
