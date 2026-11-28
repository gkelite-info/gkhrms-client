"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import {
  MagnifyingGlass,
  Paperclip,
  PaperPlaneRight,
  Info,
  ArrowLeft,
  X,
  DownloadSimple,
  Checks,
  User,
  IdentificationBadge,
  BookmarkSimple,
  Buildings,
  ArrowsClockwise,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  ArrowSquareOut,
} from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import ReusableDropdown from "../../ReusableDropdown"

export interface ChairmanChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  text?: string
  timestamp: string
  isOutgoing: boolean
  attachment?: {
    name: string
    size: string
    type: "pdf" | "image" | "doc" | "sheet"
    url?: string
  }
}

export interface ChairmanChatConversation {
  id: string
  name: string
  role: string
  roleCategory: string
  avatar: string
  department: string
  team: string
  reportingTo: string
  reportingToRole?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
  isOnline: boolean
  messages: ChairmanChatMessage[]
  note?: string
}

const CHAIRMAN_USER = {
  id: "eleanor",
  name: "Eleanor Vance",
  role: "Chairman",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
}

const MOCK_SHARED_MEDIA_PHOTOS = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=80",
]

const MOCK_SHARED_DOCS = [
  { id: "d-1", name: "Q2_Hiring_Plan_v1.3.pdf", size: "2.8 MB", date: "Today, 10:45 AM" },
  { id: "d-2", name: "Q3_Budget_Summary.xlsx", size: "1.4 MB", date: "Yesterday, 4:20 PM" },
  { id: "d-3", name: "Product_Release_v2.4_Notes.pdf", size: "3.1 MB", date: "Jan 21, 2:15 PM" },
  { id: "d-4", name: "Org_Structure_Overview_2026.pdf", size: "4.5 MB", date: "Jan 18, 11:30 AM" },
  { id: "d-5", name: "Infrastructure_Audit_Report.pdf", size: "1.9 MB", date: "Jan 15, 5:10 PM" },
  { id: "d-6", name: "Sprint_Deliverables_Q1.xlsx", size: "850 KB", date: "Jan 12, 10:00 AM" },
  { id: "d-7", name: "Employee_Task_Matrix.xlsx", size: "620 KB", date: "Jan 10, 3:40 PM" },
  { id: "d-8", name: "Security_Compliance_Review.pdf", size: "2.2 MB", date: "Jan 05, 1:15 PM" },
]

const MOCK_SHARED_LINKS = [
  { id: "l-1", title: "Figma App Design System", url: "https://figma.com/file/gkhrms-app", domain: "figma.com" },
  { id: "l-2", title: "Jira Q2 Hiring Roadmap", url: "https://jira.company.com/browse/HR-2026", domain: "jira.company.com" },
  { id: "l-3", title: "Confluence Sprint Specs", url: "https://wiki.company.com/spaces/TECH", domain: "wiki.company.com" },
]

const INITIAL_CONVERSATIONS: ChairmanChatConversation[] = [
  {
    id: "c-priya",
    name: "Priya Shah",
    role: "HR Manager",
    roleCategory: "Managers",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    department: "Human Resources (HR)",
    team: "People Operations Team",
    reportingTo: "Chairman",
    reportingToRole: "Chairman",
    lastMessage: "The updated hiring plan for Q2 is ready for your...",
    lastMessageTime: "11:24 AM",
    unreadCount: 2,
    isOnline: true,
    note: "The updated hiring plan for Q2 is ready for your review.",
    messages: [
      {
        id: "msg-p1",
        senderId: "priya",
        senderName: "Priya Shah",
        senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        text: "Good morning, Chairman. The updated hiring plan for Q2 is ready for your review. It includes role-wise openings, timelines, and budget estimates.",
        timestamp: "10:02 AM",
        isOutgoing: false,
      },
      {
        id: "msg-p2",
        senderId: "eleanor",
        senderName: "Eleanor Vance",
        senderAvatar: CHAIRMAN_USER.avatar,
        text: "Thanks, Priya. Please share the plan and highlight any critical hiring needs or risks we should be aware of.",
        timestamp: "10:18 AM",
        isOutgoing: true,
      },
      {
        id: "msg-p3",
        senderId: "priya",
        senderName: "Priya Shah",
        senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        text: "Here is the updated hiring plan for Q2, along with a brief summary of key highlights.",
        timestamp: "10:45 AM",
        isOutgoing: false,
        attachment: {
          name: "Q2_Hiring_Plan_v1.3.pdf",
          size: "2.8 MB",
          type: "pdf",
          url: "#",
        },
      },
      {
        id: "msg-p4",
        senderId: "eleanor",
        senderName: "Eleanor Vance",
        senderAvatar: CHAIRMAN_USER.avatar,
        text: "Perfect. The plan looks comprehensive. Let's proceed with the proposed timelines. Please also keep me updated on the shortlist for the leadership roles.",
        timestamp: "11:24 AM",
        isOutgoing: true,
      },
    ],
  },
  {
    id: "c-sneha",
    name: "Sneha Rao",
    role: "HR Manager",
    roleCategory: "Managers",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    department: "Human Resources",
    team: "Talent & Onboarding",
    reportingTo: "Chairman",
    reportingToRole: "Chairman",
    lastMessage: "Onboarding for the new joiners is on track.",
    lastMessageTime: "10:47 AM",
    unreadCount: 1,
    isOnline: true,
    note: "Onboarding for the new joiners is on track.",
    messages: [
      {
        id: "msg-s1",
        senderId: "sneha",
        senderName: "Sneha Rao",
        senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
        text: "Onboarding for the new joiners is on track. All background checks have been completed successfully.",
        timestamp: "10:47 AM",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "c-ravi",
    name: "Ravi Kumar",
    role: "Finance Manager",
    roleCategory: "Finance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    department: "Finance & Accounts",
    team: "Financial Planning",
    reportingTo: "Chairman",
    reportingToRole: "Chairman",
    lastMessage: "The Q3 budget summary has been shared.",
    lastMessageTime: "Yesterday",
    isOnline: false,
    note: "The Q3 budget summary has been shared.",
    messages: [
      {
        id: "msg-r1",
        senderId: "ravi",
        senderName: "Ravi Kumar",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        text: "The Q3 budget summary has been shared. Revenue projections exceed target by 12%.",
        timestamp: "Yesterday",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "c-anjali",
    name: "Anjali Mehta",
    role: "Product Manager",
    roleCategory: "Product Managers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    department: "Product",
    team: "Core Platform",
    reportingTo: "Priya Shah",
    reportingToRole: "Manager",
    lastMessage: "Product release v2.4 is ready for final review.",
    lastMessageTime: "Yesterday",
    isOnline: true,
    note: "Product release v2.4 is ready for final review.",
    messages: [
      {
        id: "msg-a1",
        senderId: "anjali",
        senderName: "Anjali Mehta",
        senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        text: "Product release v2.4 is ready for final review.",
        timestamp: "Yesterday",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "c-rohan",
    name: "Rohan Gupta",
    role: "Tech Admin",
    roleCategory: "Tech Admins",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    department: "Technology",
    team: "IT Infrastructure",
    reportingTo: "Amit Desai",
    reportingToRole: "Manager",
    lastMessage: "The system maintenance is scheduled for Saturday.",
    lastMessageTime: "Jan 20",
    isOnline: false,
    note: "The system maintenance is scheduled for Saturday.",
    messages: [
      {
        id: "msg-rg1",
        senderId: "rohan",
        senderName: "Rohan Gupta",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        text: "The system maintenance is scheduled for Saturday.",
        timestamp: "Jan 20",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "c-meera",
    name: "Meera Das",
    role: "Team Lead",
    roleCategory: "Team Leads",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    department: "Engineering",
    team: "Mobile Apps",
    reportingTo: "Ravi Kumar",
    reportingToRole: "Manager",
    lastMessage: "Sprint goals for this week are aligned.",
    lastMessageTime: "Jan 18",
    isOnline: true,
    note: "Sprint goals for this week are aligned.",
    messages: [
      {
        id: "msg-m1",
        senderId: "meera",
        senderName: "Meera Das",
        senderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        text: "Sprint goals for this week are aligned.",
        timestamp: "Jan 18",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "c-aisha",
    name: "Aisha Khan",
    role: "Team Lead",
    roleCategory: "Team Leads",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    department: "Product & Engineering",
    team: "GK Gym Life",
    reportingTo: "Ravi Kumar",
    reportingToRole: "Manager",
    lastMessage: "The Q3 budget summary has been shared.",
    lastMessageTime: "Yesterday",
    isOnline: true,
    note: "The Q3 budget summary has been shared.",
    messages: [
      {
        id: "msg-ak1",
        senderId: "aisha",
        senderName: "Aisha Khan",
        senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        text: "The Q3 budget summary has been shared.",
        timestamp: "Yesterday",
        isOutgoing: false,
      },
    ],
  },
]

const QUICK_ROLES = [
  "Managers",
  "Finance",
  "Team Leads",
  "Employees",
  "Tech Admins",
  "HR",
  "Product Managers",
  "Accountants",
]

const ROLE_OPTIONS = [
  "All Roles",
  "Managers",
  "Finance",
  "Team Leads",
  "Employees",
  "Tech Admins",
  "HR",
  "Product Managers",
  "Accountants",
]

const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Human Resources",
  "Finance",
  "Product",
  "Technology",
  "Operations",
]

const TEAM_OPTIONS = [
  "All Teams",
  "People Operations Team",
  "GK Gym Life",
  "Core Platform",
  "IT Infrastructure",
  "Mobile Apps",
]

interface ChairmanTeamChatViewProps {
  initialChatId?: string | null
  onChatChange?: (chatId: string) => void
}

export default function ChairmanTeamChatView({
  initialChatId,
  onChatChange,
}: ChairmanTeamChatViewProps) {
  const [conversations, setConversations] =
    useState<ChairmanChatConversation[]>(INITIAL_CONVERSATIONS)
  const [selectedId, setSelectedId] = useState<string>(
    initialChatId || "c-priya"
  )
  const [activeQuickRole, setActiveQuickRole] = useState<string>("Managers")
  const [selectedRole, setSelectedRole] = useState<string>("All Roles")
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("All Departments")
  const [selectedTeam, setSelectedTeam] = useState<string>("All Teams")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [inputText, setInputText] = useState<string>("")
  const [isContactInfoOpen, setIsContactInfoOpen] = useState<boolean>(false)
  const [activeMediaTab, setActiveMediaTab] = useState<
    "media" | "docs" | "links"
  >("media")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialChatId && initialChatId !== selectedId) {
      setSelectedId(initialChatId)
    }
  }, [initialChatId, selectedId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedId, conversations])

  const activeConversation = useMemo(() => {
    return (
      conversations.find((c) => c.id === selectedId) || conversations[0]
    )
  }, [conversations, selectedId])

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (
        selectedRole !== "All Roles" &&
        c.roleCategory.toLowerCase() !== selectedRole.toLowerCase() &&
        !c.role.toLowerCase().includes(selectedRole.toLowerCase())
      ) {
        return false
      }
      if (
        selectedDepartment !== "All Departments" &&
        !c.department.toLowerCase().includes(selectedDepartment.toLowerCase())
      ) {
        return false
      }
      if (
        selectedTeam !== "All Teams" &&
        !c.team.toLowerCase().includes(selectedTeam.toLowerCase())
      ) {
        return false
      }
      if (
        activeQuickRole &&
        c.roleCategory.toLowerCase() !== activeQuickRole.toLowerCase() &&
        !c.role.toLowerCase().includes(activeQuickRole.toLowerCase())
      ) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = c.name.toLowerCase().includes(q)
        const matchesRole = c.role.toLowerCase().includes(q)
        const matchesTeam = c.team.toLowerCase().includes(q)
        if (!matchesName && !matchesRole && !matchesTeam) return false
      }
      return true
    })
  }, [
    conversations,
    selectedRole,
    selectedDepartment,
    selectedTeam,
    activeQuickRole,
    searchQuery,
  ])

  const handleSelectConversation = (conv: ChairmanChatConversation) => {
    setSelectedId(conv.id)
    onChatChange?.(conv.id)
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    )
  }

  const handleQuickFilterClick = (role: string) => {
    setActiveQuickRole((prev) => (prev === role ? "" : role))
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const nowStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date())

    const newMsg: ChairmanChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: CHAIRMAN_USER.id,
      senderName: CHAIRMAN_USER.name,
      senderAvatar: CHAIRMAN_USER.avatar,
      text: inputText.trim(),
      timestamp: nowStr,
      isOutgoing: true,
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              lastMessage: inputText.trim(),
              lastMessageTime: nowStr,
              messages: [...c.messages, newMsg],
            }
          : c
      )
    )

    setInputText("")
  }

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch gap-4 select-none min-h-[620px] lg:h-[calc(100vh-230px)]">
      <div className="w-full lg:w-[360px] xl:w-[380px] bg-white rounded-3xl border border-gray-100 shadow-2xs p-4 sm:p-5 flex flex-col gap-4 shrink-0">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Filter Chats
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-medium">Role</span>
              <ReusableDropdown
                value={selectedRole}
                options={ROLE_OPTIONS}
                onChange={(val) => setSelectedRole(String(val))}
                buttonClassName="py-1.5 px-2 text-[11px] font-medium rounded-xl border-gray-200"
                align="left"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-medium">
                Department
              </span>
              <ReusableDropdown
                value={selectedDepartment}
                options={DEPARTMENT_OPTIONS}
                onChange={(val) => setSelectedDepartment(String(val))}
                buttonClassName="py-1.5 px-2 text-[11px] font-medium rounded-xl border-gray-200"
                align="left"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-medium">Team</span>
              <ReusableDropdown
                value={selectedTeam}
                options={TEAM_OPTIONS}
                onChange={(val) => setSelectedTeam(String(val))}
                buttonClassName="py-1.5 px-2 text-[11px] font-medium rounded-xl border-gray-200"
                align="left"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employee, role, or team..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#5046E5] placeholder-gray-400 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Quick Filters (Roles)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ROLES.map((role) => {
              const isActive = activeQuickRole === role
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickFilterClick(role)}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#5046E5] font-semibold border border-indigo-200 shadow-2xs"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200/80 hover:bg-gray-50 font-medium"
                  }`}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0 pt-2 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Conversations ({filteredConversations.length})
          </span>
          <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1 pr-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                No matching conversations found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedId
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => handleSelectConversation(conv)}
                    className={`w-full p-2.5 rounded-2xl flex items-center gap-3 transition-all text-left cursor-pointer border ${
                      isSelected
                        ? "bg-[#F5F4FE] border-[#E0DCFE] shadow-2xs"
                        : "bg-white border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <ReusableAvatar
                      src={conv.avatar}
                      name={conv.name}
                      size={40}
                      shape="circle"
                      fallbackType="initials"
                      status={conv.isOnline ? "online" : undefined}
                      className="shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs font-bold text-gray-900 truncate">
                            {conv.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5046E5] shrink-0">
                            {conv.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 font-normal truncate block mt-1">
                        {conv.lastMessage}
                      </span>
                    </div>

                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="w-4.5 h-4.5 rounded-full bg-[#5046E5] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </button>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-2xs flex flex-col overflow-hidden min-h-[500px]">
        {isContactInfoOpen ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactInfoOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                  title="Back to conversation"
                >
                  <ArrowLeft size={18} weight="bold" />
                </button>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    Contact info
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {activeConversation.note ||
                      activeConversation.lastMessage}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContactInfoOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3.5 bg-white">
                    <ReusableAvatar
                      src={activeConversation.avatar}
                      name={activeConversation.name}
                      size={48}
                      shape="circle"
                      fallbackType="initials"
                      status={
                        activeConversation.isOnline ? "online" : undefined
                      }
                      className="shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">
                          {activeConversation.name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5046E5]">
                          {activeConversation.role}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 block mt-0.5">
                        {activeConversation.team}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col divide-y divide-gray-100 text-xs sm:text-sm bg-white">
                    <div className="py-2.5 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <User size={15} />
                        <span className="text-gray-500 font-medium">Name</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {activeConversation.name}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <IdentificationBadge size={15} />
                        <span className="text-gray-500 font-medium">Role</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {activeConversation.role}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <BookmarkSimple size={15} />
                        <span className="text-gray-500 font-medium">
                          Team / Project
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {activeConversation.team}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Buildings size={15} />
                        <span className="text-gray-500 font-medium">
                          Department
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 text-right">
                        {activeConversation.department}
                      </span>
                    </div>

                    <div className="py-2.5 last:pb-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <ArrowsClockwise size={15} />
                        <span className="text-gray-500 font-medium">
                          Reporting To
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-900 block">
                          {activeConversation.reportingTo}
                        </span>
                        {activeConversation.reportingToRole && (
                          <span className="text-[11px] text-gray-400">
                            ({activeConversation.reportingToRole})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col gap-4 bg-white">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("media")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        activeMediaTab === "media"
                          ? "bg-[#EEF2FF] text-[#5046E5]"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <ImageIcon size={14} weight="bold" />
                      <span>Media (6)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("docs")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        activeMediaTab === "docs"
                          ? "bg-[#EEF2FF] text-[#5046E5]"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <FileText size={14} weight="bold" />
                      <span>Docs (8)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("links")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        activeMediaTab === "links"
                          ? "bg-[#EEF2FF] text-[#5046E5]"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <LinkIcon size={14} weight="bold" />
                      <span>Links (3)</span>
                    </button>
                  </div>

                  {activeMediaTab === "media" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {MOCK_SHARED_MEDIA_PHOTOS.map((src, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-xl overflow-hidden bg-gray-100 group relative cursor-pointer"
                        >
                          <img
                            src={src}
                            alt={`Shared media ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeMediaTab === "docs" && (
                    <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      {MOCK_SHARED_DOCS.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-2.5 rounded-xl border border-gray-100 flex items-center justify-between gap-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                              PDF
                            </span>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-gray-800 truncate block">
                                {doc.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {doc.size} • {doc.date}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                            title="Download"
                          >
                            <DownloadSimple size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeMediaTab === "links" && (
                    <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      {MOCK_SHARED_LINKS.map((link) => (
                        <div
                          key={link.id}
                          className="p-2.5 rounded-xl border border-gray-100 flex items-center justify-between gap-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5046E5] flex items-center justify-center shrink-0">
                              <LinkIcon size={16} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-gray-800 truncate block">
                                {link.title}
                              </span>
                              <span className="text-[10px] text-gray-400 truncate block">
                                {link.domain}
                              </span>
                            </div>
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#5046E5] hover:bg-indigo-50 transition-colors shrink-0"
                          >
                            <ArrowSquareOut size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <ReusableAvatar
                  src={activeConversation.avatar}
                  name={activeConversation.name}
                  size={42}
                  shape="circle"
                  fallbackType="initials"
                  status={activeConversation.isOnline ? "online" : undefined}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-900 leading-tight">
                      {activeConversation.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5046E5]">
                      {activeConversation.role}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-normal truncate block mt-0.5">
                    {activeConversation.department} • {activeConversation.team}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsContactInfoOpen(true)}
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#5046E5] hover:border-[#5046E5] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="View contact info"
              >
                <Info size={16} />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-gray-50/30">
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-medium">
                  Today
                </span>
              </div>

              {activeConversation.messages.map((msg) => {
                if (msg.isOutgoing) {
                  return (
                    <div
                      key={msg.id}
                      className="flex items-end justify-end gap-2.5 self-end max-w-xl"
                    >
                      <div className="flex flex-col items-end">
                        <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#EEF2FF] text-gray-800 text-xs sm:text-sm leading-relaxed shadow-2xs">
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                          <span>{msg.timestamp}</span>
                          <Checks size={14} className="text-sky-500" />
                        </div>
                      </div>
                      <ReusableAvatar
                        src={CHAIRMAN_USER.avatar}
                        name={CHAIRMAN_USER.name}
                        size={32}
                        shape="circle"
                        fallbackType="initials"
                        className="shrink-0 mb-4"
                      />
                    </div>
                  )
                }

                return (
                  <div
                    key={msg.id}
                    className="flex items-start gap-2.5 self-start max-w-xl"
                  >
                    <ReusableAvatar
                      src={activeConversation.avatar}
                      name={activeConversation.name}
                      size={32}
                      shape="circle"
                      fallbackType="initials"
                      className="shrink-0 mt-0.5"
                    />
                    <div className="flex flex-col items-start min-w-0">
                      <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white text-gray-800 text-xs sm:text-sm leading-relaxed shadow-2xs border border-gray-100 flex flex-col gap-2.5">
                        {msg.attachment && (
                          <div className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 w-full">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                                PDF
                              </span>
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-gray-800 block truncate">
                                  {msg.attachment.name}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {msg.attachment.size}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                              title="Download attachment"
                            >
                              <DownloadSimple size={16} />
                            </button>
                          </div>
                        )}
                        {msg.text && <span>{msg.text}</span>}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <button
                type="button"
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                title="Attach file"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-w-0 py-2.5 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5046E5] transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
