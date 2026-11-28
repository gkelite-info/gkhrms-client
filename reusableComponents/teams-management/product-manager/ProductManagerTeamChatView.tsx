"use client"

import { useState, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  MagnifyingGlass,
  UsersThree,
  ChatTeardropText,
  Info,
  Paperclip,
  PaperPlaneRight,
  Checks,
  DownloadSimple,
  CaretDown,
  CaretRight,
  ShieldCheck,
  DotsThreeVertical,
  ArrowsDownUp,
  Smiley,
  Camera,
  UserPlus,
  Bell,
  PushPin,
  Archive,
  Kanban,
} from "phosphor-react"
import ReusablePagination from "../../ReusablePagination"
import { CreateGroupData } from "./CreateGroupModal"

interface ChatMessage {
  id: string
  senderName: string
  senderRole?: string
  senderAvatar: string
  isAdmin?: boolean
  text?: string
  timestamp: string
  isOutgoing: boolean
  attachment?: {
    name: string
    size: string
    type: "pdf" | "image" | "file"
  }
}

interface ChatConversationItem {
  id: string
  name: string
  isGroup: boolean
  memberCount?: number
  adminCount?: number
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
  role?: string
}

interface GroupMemberItem {
  id: string
  name: string
  email: string
  avatar: string
  role: "Admin" | "Member"
  designation: string
  status: "Active" | "Inactive"
}

interface SharedFileItem {
  id: string
  name: string
  extension: "pdf" | "png" | "pptx" | "xlsx" | "docx" | "zip"
  badgeText: "PDF" | "IMG" | "PPT" | "XLS" | "DOC" | "ZIP"
  badgeBg: string
  badgeTextCol: string
  sharedBy: {
    name: string
    avatar: string
  }
  date: string
  size: string
}

interface ProductManagerTeamChatViewProps {
  initialGroup?: CreateGroupData | null
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: "m-1",
    senderName: "Priya Shah",
    isAdmin: true,
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    text: "Good morning, team! The updated design mockups for the Owner Portal are ready for review. It includes the latest changes based on the feedback.",
    timestamp: "10:02 AM",
    isOutgoing: false,
  },
  {
    id: "m-2",
    senderName: "Product Manager",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    text: "Thanks, Priya. Please share the files here so we can go through them.",
    timestamp: "10:18 AM",
    isOutgoing: true,
  },
  {
    id: "m-3",
    senderName: "Rohan Malhotra",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    text: "Here are the updated design screens along with the change summary.",
    timestamp: "10:45 AM",
    isOutgoing: false,
    attachment: {
      name: "OwnerPortal_Design_v2.pdf",
      size: "4.2 MB",
      type: "pdf",
    },
  },
  {
    id: "m-4",
    senderName: "Sneha Rao",
    senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    text: "The flow looks good. I've added a few comments on the file for minor updates.",
    timestamp: "11:10 AM",
    isOutgoing: false,
  },
  {
    id: "m-5",
    senderName: "Product Manager",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    text: "Perfect! I'll review the comments and update it by EOD.",
    timestamp: "11:24 AM",
    isOutgoing: true,
  },
]

const DEFAULT_CONVERSATIONS: ChatConversationItem[] = [
  {
    id: "conv-group-1",
    name: "Product Design Team",
    isGroup: true,
    memberCount: 12,
    adminCount: 2,
    lastMessage: "Priya: The updated design mockups ...",
    lastMessageTime: "11:24 AM",
    unreadCount: 3,
  },
  {
    id: "conv-priya",
    name: "Priya Shah",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    lastMessage: "The updated hiring plan for Q2 is ready ...",
    lastMessageTime: "11:24 AM",
    unreadCount: 2,
    role: "Lead Designer",
  },
  {
    id: "conv-sneha",
    name: "Sneha Rao",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    lastMessage: "Onboarding for the new joiners is on track.",
    lastMessageTime: "10:47 AM",
    unreadCount: 1,
    role: "HR Manager",
  },
  {
    id: "conv-ravi",
    name: "Ravi Kumar",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastMessage: "The Q3 budget summary has been shared.",
    lastMessageTime: "Yesterday",
    role: "Finance Manager",
  },
  {
    id: "conv-anjali",
    name: "Anjali Mehta",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastMessage: "Product release v2.4 is ready for final ...",
    lastMessageTime: "Yesterday",
    role: "Product Manager",
  },
  {
    id: "conv-rohan",
    name: "Rohan Gupta",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastMessage: "The system maintenance is scheduled ...",
    lastMessageTime: "Jan 20",
    role: "Tech Admin",
  },
  {
    id: "conv-meera",
    name: "Meera Das",
    isGroup: false,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    lastMessage: "Sprint goals for this week are aligned.",
    lastMessageTime: "Jan 18",
    role: "Frontend Engineer",
  },
]

const DEFAULT_GROUP_MEMBERS: GroupMemberItem[] = [
  {
    id: "gm-1",
    name: "Priya Shah",
    email: "priya.shah@company.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Admin",
    designation: "Product Manager",
    status: "Active",
  },
  {
    id: "gm-2",
    name: "Ravi Kumar",
    email: "ravi.kumar@company.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Admin",
    designation: "Tech Lead",
    status: "Active",
  },
  {
    id: "gm-3",
    name: "Sneha Rao",
    email: "sneha.rao@company.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    role: "Member",
    designation: "UI/UX Designer",
    status: "Active",
  },
  {
    id: "gm-4",
    name: "Anjali Mehta",
    email: "anjali.mehta@company.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "Member",
    designation: "Product Designer",
    status: "Active",
  },
  {
    id: "gm-5",
    name: "Rohan Gupta",
    email: "rohan.gupta@company.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    role: "Member",
    designation: "Frontend Developer",
    status: "Active",
  },
  {
    id: "gm-6",
    name: "Meera Das",
    email: "meera.das@company.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    role: "Member",
    designation: "QA Engineer",
    status: "Active",
  },
  {
    id: "gm-7",
    name: "Vikram Singh",
    email: "vikram.singh@company.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    role: "Member",
    designation: "DevOps Engineer",
    status: "Active",
  },
  {
    id: "gm-8",
    name: "Anita Kulkarni",
    email: "anita.kulkarni@company.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    role: "Member",
    designation: "Backend Developer",
    status: "Active",
  },
  {
    id: "gm-9",
    name: "Karthik Iyer",
    email: "karthik.iyer@company.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    role: "Member",
    designation: "Full Stack Engineer",
    status: "Active",
  },
  {
    id: "gm-10",
    name: "Pooja Sharma",
    email: "pooja.sharma@company.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "Member",
    designation: "UI Designer",
    status: "Active",
  },
  {
    id: "gm-11",
    name: "Deepak Verma",
    email: "deepak.verma@company.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    role: "Member",
    designation: "Software Engineer",
    status: "Active",
  },
  {
    id: "gm-12",
    name: "Neha Joshi",
    email: "neha.joshi@company.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    role: "Member",
    designation: "Data Analyst",
    status: "Active",
  },
]

const DEFAULT_SHARED_FILES: SharedFileItem[] = [
  {
    id: "f-1",
    name: "OwnerPortal_Design_v2.pdf",
    extension: "pdf",
    badgeText: "PDF",
    badgeBg: "bg-red-50 border border-red-100",
    badgeTextCol: "text-red-500",
    sharedBy: {
      name: "Priya Shah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    date: "Today, 10:45 AM",
    size: "4.2 MB",
  },
  {
    id: "f-2",
    name: "Dashboard_Mockup.png",
    extension: "png",
    badgeText: "IMG",
    badgeBg: "bg-sky-50 border border-sky-100",
    badgeTextCol: "text-sky-500",
    sharedBy: {
      name: "Rohan Malhotra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Today, 09:30 AM",
    size: "1.8 MB",
  },
  {
    id: "f-3",
    name: "Design_Review_Q2.pptx",
    extension: "pptx",
    badgeText: "PPT",
    badgeBg: "bg-amber-50 border border-amber-100",
    badgeTextCol: "text-amber-500",
    sharedBy: {
      name: "Sneha Rao",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    },
    date: "Yesterday, 04:20 PM",
    size: "5.6 MB",
  },
  {
    id: "f-4",
    name: "Feature_Plan.xlsx",
    extension: "xlsx",
    badgeText: "XLS",
    badgeBg: "bg-emerald-50 border border-emerald-100",
    badgeTextCol: "text-emerald-500",
    sharedBy: {
      name: "Ravi Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Yesterday, 11:10 AM",
    size: "1.1 MB",
  },
  {
    id: "f-5",
    name: "Feature_Plan.xlsx",
    extension: "xlsx",
    badgeText: "XLS",
    badgeBg: "bg-emerald-50 border border-emerald-100",
    badgeTextCol: "text-emerald-500",
    sharedBy: {
      name: "Ravi Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Yesterday, 11:10 AM",
    size: "1.1 MB",
  },
  {
    id: "f-6",
    name: "Meeting_Notes.docx",
    extension: "docx",
    badgeText: "DOC",
    badgeBg: "bg-blue-50 border border-blue-100",
    badgeTextCol: "text-blue-500",
    sharedBy: {
      name: "Anjali Mehta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    date: "Jan 20, 02:35 PM",
    size: "452 KB",
  },
  {
    id: "f-7",
    name: "UI_Assets.zip",
    extension: "zip",
    badgeText: "ZIP",
    badgeBg: "bg-purple-50 border border-purple-100",
    badgeTextCol: "text-purple-500",
    sharedBy: {
      name: "Meera Das",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    },
    date: "Jan 18, 05:00 PM",
    size: "12.8 MB",
  },
  {
    id: "f-8",
    name: "Meeting_Notes.docx",
    extension: "docx",
    badgeText: "DOC",
    badgeBg: "bg-blue-50 border border-blue-100",
    badgeTextCol: "text-blue-500",
    sharedBy: {
      name: "Anjali Mehta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    date: "Jan 20, 02:35 PM",
    size: "452 KB",
  },
  {
    id: "f-9",
    name: "UI_Assets.zip",
    extension: "zip",
    badgeText: "ZIP",
    badgeBg: "bg-purple-50 border border-purple-100",
    badgeTextCol: "text-purple-500",
    sharedBy: {
      name: "Meera Das",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    },
    date: "Jan 18, 05:00 PM",
    size: "12.8 MB",
  },
]

export default function ProductManagerTeamChatView({
  initialGroup,
}: ProductManagerTeamChatViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [conversations, setConversations] = useState<ChatConversationItem[]>(() => {
    if (initialGroup) {
      const customGroup: ChatConversationItem = {
        id: `conv-group-${Date.now()}`,
        name: initialGroup.groupName || "Product Design Team",
        isGroup: true,
        memberCount: initialGroup.members.length || 12,
        adminCount: initialGroup.admins.length || 2,
        avatar: initialGroup.groupPhoto || undefined,
        lastMessage: "Priya: The updated design mockups ...",
        lastMessageTime: "11:24 AM",
        unreadCount: 3,
      }
      return [customGroup, ...DEFAULT_CONVERSATIONS.filter((c) => c.name !== customGroup.name)]
    }
    return DEFAULT_CONVERSATIONS
  })

  const chatIdParam = searchParams.get("chatId")
  const selectedConversationId = useMemo(() => {
    if (!chatIdParam) return conversations[0]?.id || "conv-group-1"
    const found = conversations.find(
      (c) =>
        c.id.toLowerCase() === chatIdParam.toLowerCase() ||
        c.name.toLowerCase() === chatIdParam.toLowerCase()
    )
    return found ? found.id : conversations[0]?.id || "conv-group-1"
  }, [chatIdParam, conversations])

  const chatTabParam = searchParams.get("chatTab")
  const activeChatTab: "Chat" | "Members" | "Shared Files" | "Group Settings" = useMemo(() => {
    if (chatTabParam === "members") return "Members"
    if (chatTabParam === "files") return "Shared Files"
    if (chatTabParam === "settings") return "Group Settings"
    return "Chat"
  }, [chatTabParam])

  const [activeFilter, setActiveFilter] = useState<"All" | "Groups" | "Direct Messages">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [chatTypeFilter, setChatTypeFilter] = useState("All Chats")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [teamFilter, setTeamFilter] = useState("All Teams")
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES)
  const [inputMessage, setInputMessage] = useState("")

  const [groupMembers, setGroupMembers] = useState<GroupMemberItem[]>(DEFAULT_GROUP_MEMBERS)
  const [membersFilter, setMembersFilter] = useState<"all" | "admins" | "active" | "inactive">("all")
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

  const chatPageParam = searchParams.get("chatPage")
  const membersCurrentPage = useMemo(() => {
    const p = parseInt(chatPageParam || "1", 10)
    return isNaN(p) || p < 1 ? 1 : p
  }, [chatPageParam])

  const [membersPageSize, setMembersPageSize] = useState(6)

  const [sharedFiles, setSharedFiles] = useState<SharedFileItem[]>(DEFAULT_SHARED_FILES)
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])

  const [settingsGroupName, setSettingsGroupName] = useState("Product Design Team")
  const [settingsSendPermission, setSettingsSendPermission] = useState<"everyone" | "admins">("everyone")
  const [settingsAddPermission, setSettingsAddPermission] = useState<"everyone" | "admins">("admins")
  const [isMuted, setIsMuted] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isArchived, setIsArchived] = useState(false)

  const handleChatTabChange = (tabName: "Chat" | "Members" | "Shared Files" | "Group Settings") => {
    const params = new URLSearchParams(searchParams.toString())
    const keyMap: Record<string, string> = {
      Chat: "chat",
      Members: "members",
      "Shared Files": "files",
      "Group Settings": "settings",
    }
    const val = keyMap[tabName] || "chat"
    if (val === "chat") {
      params.delete("chatTab")
    } else {
      params.set("chatTab", val)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handleSelectConversation = (convId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (convId === DEFAULT_CONVERSATIONS[0].id) {
      params.delete("chatId")
    } else {
      params.set("chatId", convId)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handleMembersPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPage > 1) {
      params.set("chatPage", String(newPage))
    } else {
      params.delete("chatPage")
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const activeConversation = conversations.find((c) => c.id === selectedConversationId) || conversations[0]

  const filteredConversations = conversations.filter((c) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Groups" && c.isGroup) ||
      (activeFilter === "Direct Messages" && !c.isGroup)
    return matchesSearch && matchesFilter
  })

  const filteredMembers = groupMembers.filter((m) => {
    if (membersFilter === "admins") return m.role === "Admin"
    if (membersFilter === "active") return m.status === "Active"
    if (membersFilter === "inactive") return m.status === "Inactive"
    return true
  })

  const membersTotalPages = Math.max(1, Math.ceil(filteredMembers.length / membersPageSize))
  const paginatedMembers = filteredMembers.slice(
    (membersCurrentPage - 1) * membersPageSize,
    membersCurrentPage * membersPageSize
  )

  const handleFilterChange = (filter: "all" | "admins" | "active" | "inactive") => {
    setMembersFilter(filter)
    handleMembersPageChange(1)
  }

  const handleSelectAllMembers = (checked: boolean) => {
    if (checked) {
      setSelectedMemberIds(filteredMembers.map((m) => m.id))
    } else {
      setSelectedMemberIds([])
    }
  }

  const handleToggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAllFiles = (checked: boolean) => {
    if (checked) {
      setSelectedFileIds(sharedFiles.map((f) => f.id))
    } else {
      setSelectedFileIds([])
    }
  }

  const handleToggleFile = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: "Product Manager",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOutgoing: true,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputMessage("")
  }

  const totalMembersCount = groupMembers.length
  const totalAdminsCount = groupMembers.filter((m) => m.role === "Admin").length
  const totalActiveCount = groupMembers.filter((m) => m.status === "Active").length
  const totalInactiveCount = groupMembers.filter((m) => m.status === "Inactive").length

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch min-h-[600px] lg:h-[calc(100vh-210px)] pb-4">
      <div className="w-full lg:w-80 xl:w-88 bg-white rounded-3xl border border-gray-100 shadow-2xs p-4 sm:p-5 flex flex-col gap-4 shrink-0 h-[400px] lg:h-full overflow-hidden">
        <div className="flex flex-col gap-2.5 shrink-0">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            FILTER CHATS
          </span>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-gray-500 font-semibold block mb-1">
                Chat Type
              </span>
              <button
                type="button"
                className="w-full px-2 py-1.5 rounded-xl border border-gray-200 text-[11px] text-gray-700 font-semibold flex items-center justify-between bg-white hover:bg-gray-50 cursor-pointer"
              >
                <span className="truncate">{chatTypeFilter}</span>
                <CaretDown size={11} className="text-gray-400 shrink-0 ml-1" />
              </button>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 font-semibold block mb-1">
                Department
              </span>
              <button
                type="button"
                className="w-full px-2 py-1.5 rounded-xl border border-gray-200 text-[11px] text-gray-700 font-semibold flex items-center justify-between bg-white hover:bg-gray-50 cursor-pointer"
              >
                <span className="truncate">{departmentFilter}</span>
                <CaretDown size={11} className="text-gray-400 shrink-0 ml-1" />
              </button>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 font-semibold block mb-1">
                Team
              </span>
              <button
                type="button"
                className="w-full px-2 py-1.5 rounded-xl border border-gray-200 text-[11px] text-gray-700 font-semibold flex items-center justify-between bg-white hover:bg-gray-50 cursor-pointer"
              >
                <span className="truncate">{teamFilter}</span>
                <CaretDown size={11} className="text-gray-400 shrink-0 ml-1" />
              </button>
            </div>
          </div>

          <div className="relative mt-1">
            <MagnifyingGlass
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search group or person..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 outline-none focus:border-[#5046E5]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            QUICK FILTERS
          </span>
          <div className="flex items-center gap-1.5">
            {(["All", "Groups", "Direct Messages"] as const).map((filter) => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5046E5] text-white shadow-xs"
                      : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600"
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 border-t border-gray-100 flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between py-1 shrink-0">
            <span className="text-xs font-bold text-gray-900">
              CHATS ({filteredConversations.length})
            </span>
            <button
              type="button"
              className="text-xs text-gray-500 font-semibold flex items-center gap-1 hover:text-gray-800 cursor-pointer"
            >
              <span>Recent</span>
              <CaretDown size={12} />
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto custom-scrollbar flex-1 min-h-0 pr-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedConversationId
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`p-2.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#EEF2FF]/70 border-[#C7D2FE] shadow-2xs"
                      : "bg-white border-transparent hover:bg-gray-50/80"
                  }`}
                >
                  {conv.isGroup ? (
                    <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                      <UsersThree size={20} weight="bold" />
                    </div>
                  ) : (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {conv.name}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold shrink-0 ${
                          conv.unreadCount ? "text-[#5046E5]" : "text-gray-400"
                        }`}
                      >
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-[11px] text-gray-500 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount ? (
                        <span className="w-4 h-4 rounded-full bg-[#5046E5] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full bg-white rounded-3xl border border-gray-100 shadow-2xs flex flex-col overflow-hidden min-h-[550px] lg:min-h-0 h-full">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                <UsersThree size={22} weight="bold" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {activeConversation.name}
                  </h3>
                  {activeConversation.isGroup && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#5046E5]">
                      Group
                    </span>
                  )}
                </div>

                {activeConversation.isGroup ? (
                  <div className="flex items-center gap-2.5 text-xs text-gray-500 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <UsersThree size={13} className="text-[#5046E5]" weight="bold" />
                      {activeConversation.memberCount || 12} Members
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <UsersThree size={13} className="text-[#5046E5]" weight="bold" />
                      {activeConversation.adminCount || 2} Admins
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeConversation.role || "Team Member"}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Info size={18} />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-gray-100 text-xs font-semibold overflow-x-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => handleChatTabChange("Chat")}
              className={`pb-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeChatTab === "Chat"
                  ? "border-b-2 border-[#5046E5] text-[#5046E5]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              onClick={() => handleChatTabChange("Members")}
              className={`pb-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeChatTab === "Members"
                  ? "border-b-2 border-[#5046E5] text-[#5046E5]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Members ({activeConversation.memberCount || 12})
            </button>
            <button
              type="button"
              onClick={() => handleChatTabChange("Shared Files")}
              className={`pb-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeChatTab === "Shared Files"
                  ? "border-b-2 border-[#5046E5] text-[#5046E5]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Shared Files
            </button>
            <button
              type="button"
              onClick={() => handleChatTabChange("Group Settings")}
              className={`pb-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeChatTab === "Group Settings"
                  ? "border-b-2 border-[#5046E5] text-[#5046E5]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Group Settings
            </button>
          </div>
        </div>

        {activeChatTab === "Members" ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white">
            <div className="p-4 sm:p-5 pb-3 flex items-center justify-between gap-3 border-b border-gray-100 flex-wrap shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleFilterChange("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    membersFilter === "all"
                      ? "bg-[#5046E5] text-white shadow-xs"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  All Members ({totalMembersCount})
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange("admins")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    membersFilter === "admins"
                      ? "bg-[#5046E5] text-white shadow-xs"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  Admins ({totalAdminsCount})
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange("active")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    membersFilter === "active"
                      ? "bg-[#5046E5] text-white shadow-xs"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  Active ({totalActiveCount})
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange("inactive")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    membersFilter === "inactive"
                      ? "bg-[#5046E5] text-white shadow-xs"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  Inactive ({totalInactiveCount})
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-800">
                    <th className="w-12 py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={
                          filteredMembers.length > 0 &&
                          selectedMemberIds.length === filteredMembers.length
                        }
                        onChange={(e) => handleSelectAllMembers(e.target.checked)}
                        className="rounded border-gray-300 text-[#5046E5] focus:ring-[#5046E5] cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Designation</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/70 text-xs">
                  {paginatedMembers.map((member) => {
                    const isSelected = selectedMemberIds.includes(member.id)
                    return (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleMember(member.id)}
                            className="rounded border-gray-300 text-[#5046E5] focus:ring-[#5046E5] cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 leading-tight">
                                {member.name}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {member.role === "Admin" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5046E5] border border-indigo-100/60">
                              <ShieldCheck size={13} weight="bold" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                              Member
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          {member.designation}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mx-auto"
                          >
                            <DotsThreeVertical size={16} weight="bold" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 px-4 border-t border-gray-100 bg-white shrink-0">
              <ReusablePagination
                currentPage={membersCurrentPage}
                totalPages={membersTotalPages}
                totalItems={filteredMembers.length}
                pageSize={membersPageSize}
                onPageChange={handleMembersPageChange}
                onPageSizeChange={(size) => {
                  setMembersPageSize(size)
                  handleMembersPageChange(1)
                }}
                pageSizeOptions={[5, 6, 10, 20]}
                itemLabel="members"
              />
            </div>
          </div>
        ) : activeChatTab === "Shared Files" ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white">
            <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-800">
                    <th className="w-12 py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={
                          sharedFiles.length > 0 &&
                          selectedFileIds.length === sharedFiles.length
                        }
                        onChange={(e) => handleSelectAllFiles(e.target.checked)}
                        className="rounded border-gray-300 text-[#5046E5] focus:ring-[#5046E5] cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center gap-1.5 cursor-pointer">
                        <span>NAME</span>
                        <ArrowsDownUp size={12} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">SHARED BY</th>
                    <th className="py-3 px-4">
                      <div className="flex items-center gap-1.5 cursor-pointer">
                        <span>DATE</span>
                        <ArrowsDownUp size={12} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">SIZE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/70 text-xs">
                  {sharedFiles.map((file) => {
                    const isSelected = selectedFileIds.includes(file.id)
                    return (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleFile(file.id)}
                            className="rounded border-gray-300 text-[#5046E5] focus:ring-[#5046E5] cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${file.badgeBg} ${file.badgeTextCol}`}
                            >
                              {file.badgeText}
                            </span>
                            <span className="font-semibold text-gray-900 truncate">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={file.sharedBy.avatar}
                              alt={file.sharedBy.name}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                            <span className="text-gray-700 font-medium">
                              {file.sharedBy.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 font-medium">
                          {file.date}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 font-medium">
                          {file.size}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3.5 sm:p-4 border-t border-gray-100 bg-white flex items-center gap-2.5 shrink-0"
            >
              <button
                type="button"
                className="w-9 h-9 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Smiley size={18} />
              </button>

              <button
                type="button"
                className="w-9 h-9 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Type a message to ${activeConversation.name}...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#5046E5] placeholder:text-gray-400 text-gray-900"
              />

              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </form>
          </div>
        ) : activeChatTab === "Group Settings" ? (
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4 bg-white">
            <div className="rounded-2xl border border-gray-100 p-4 sm:p-5 bg-white shadow-2xs">
              <span className="text-xs font-bold text-gray-900 block mb-3.5">
                Group Information
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center">
                    <UsersThree size={24} weight="bold" />
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#5046E5] text-white flex items-center justify-center shadow-xs hover:bg-[#4338CA] transition-colors cursor-pointer"
                  >
                    <Camera size={11} weight="fill" />
                  </button>
                </div>

                <div className="flex-1 w-full">
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    value={settingsGroupName}
                    onChange={(e) => setSettingsGroupName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-[#5046E5]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4 sm:p-5 bg-white shadow-2xs">
              <div className="flex items-start gap-2.5 mb-3">
                <UsersThree size={18} className="text-[#5046E5] mt-0.5 shrink-0" weight="bold" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Group Roles</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                    Manage group admins and member roles.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-100/60 transition-colors">
                <span className="text-xs font-semibold text-gray-800">Admins (2)</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                      alt="Priya Shah"
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                      alt="Ravi Kumar"
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <CaretRight size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4 sm:p-5 bg-white shadow-2xs">
              <div className="flex items-start gap-2.5 mb-3.5">
                <ShieldCheck size={18} className="text-[#5046E5] mt-0.5 shrink-0" weight="bold" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">
                    Group Permissions
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                    Control what members can do in this group.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <ChatTeardropText size={15} className="text-gray-500" />
                    <span>Who can send messages?</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-700">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="settingsSendPerm"
                        value="everyone"
                        checked={settingsSendPermission === "everyone"}
                        onChange={() => setSettingsSendPermission("everyone")}
                        className="accent-[#5046E5] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Everyone</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="settingsSendPerm"
                        value="admins"
                        checked={settingsSendPermission === "admins"}
                        onChange={() => setSettingsSendPermission("admins")}
                        className="accent-[#5046E5] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Admins Only</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <UserPlus size={15} className="text-gray-500" />
                    <span>Who can add members?</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-700">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="settingsAddPerm"
                        value="everyone"
                        checked={settingsAddPermission === "everyone"}
                        onChange={() => setSettingsAddPermission("everyone")}
                        className="accent-[#5046E5] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Everyone</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="settingsAddPerm"
                        value="admins"
                        checked={settingsAddPermission === "admins"}
                        onChange={() => setSettingsAddPermission("admins")}
                        className="accent-[#5046E5] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Admins Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4 sm:p-5 bg-white shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Kanban size={18} className="text-[#5046E5] shrink-0" weight="bold" />
                <h4 className="text-xs font-bold text-gray-900 leading-tight">
                  Additional Settings
                </h4>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <Bell size={15} className="text-gray-500" />
                    <span>Mute notifications for this group</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                      isMuted ? "bg-[#5046E5]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        isMuted ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <PushPin size={15} className="text-gray-500" />
                    <span>Pin this group to the top of chat list</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPinned(!isPinned)}
                    className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                      isPinned ? "bg-[#5046E5]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        isPinned ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <Archive size={15} className="text-gray-500" />
                    <span>Archive group (hide from active chats)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsArchived(!isArchived)}
                    className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                      isArchived ? "bg-[#5046E5]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        isArchived ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4 bg-gray-50/40">
              <div className="flex justify-center">
                <span className="px-3.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold">
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                if (msg.isOutgoing) {
                  return (
                    <div key={msg.id} className="flex justify-end items-end gap-2.5">
                      <div className="flex flex-col items-end max-w-lg">
                        <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#EEF2FF] border border-[#C7D2FE]/70 text-xs sm:text-sm text-gray-900 leading-relaxed shadow-2xs">
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-medium">
                          <span>{msg.timestamp}</span>
                          <Checks size={14} className="text-[#5046E5]" weight="bold" />
                        </div>
                      </div>
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-4"
                      />
                    </div>
                  )
                }

                return (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                    />

                    <div className="flex flex-col items-start max-w-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold text-gray-900">
                          {msg.senderName}
                        </span>
                        {msg.isAdmin && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-[#5046E5]">
                            Admin
                          </span>
                        )}
                      </div>

                      {msg.attachment ? (
                        <div className="w-full p-3.5 rounded-2xl rounded-tl-xs bg-white border border-gray-200/90 shadow-2xs space-y-2.5">
                          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="px-2 py-1 rounded bg-red-100 text-red-600 font-bold text-[10px] uppercase shrink-0">
                                PDF
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-900 truncate">
                                  {msg.attachment.name}
                                </p>
                                <span className="text-[10px] text-gray-400 block mt-0.5">
                                  {msg.attachment.size}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="w-7 h-7 rounded-lg hover:bg-gray-200/60 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer shrink-0"
                            >
                              <DownloadSimple size={16} />
                            </button>
                          </div>

                          {msg.text && (
                            <p className="text-xs text-gray-800 leading-relaxed">
                              {msg.text}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-gray-200/90 text-xs sm:text-sm text-gray-800 leading-relaxed shadow-2xs">
                          {msg.text}
                        </div>
                      )}

                      <span className="text-[10px] text-gray-400 font-medium mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-3.5 sm:p-4 border-t border-gray-100 bg-white flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                className="w-9 h-9 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#5046E5] placeholder:text-gray-400 text-gray-900"
              />

              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
