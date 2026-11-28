"use client"

import { useState, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowsLeftRight,
  Desktop,
  Archive,
  DeviceMobile,
  Briefcase,
  CalendarBlank,
  ShieldCheck,
  MagnifyingGlass,
  CaretDown,
  Eye,
  X,
  IdentificationBadge,
  Cube,
  TreeStructure,
  MapPin,
  EnvelopeSimple,
  Phone,
  User,
  UsersThree,
} from "phosphor-react"
import ReusablePagination from "../../ReusablePagination"
import ReusableTable, { TableColumn } from "@/components/reusableComponents/ReusableTable"
import { ProductProjectItem } from "./types"

export interface ProjectTeamMember {
  id: string
  numericId: number
  name: string
  avatar: string
  role: string
  designation?: string
  employeeId?: string
  department: string
  reportingTo: string
  reportingToRole?: string
  status: "Active" | "Inactive"
  employmentType?: string
  workLocation?: string
  email?: string
  phone?: string
  joiningDate?: string
}

export interface ProductManagerProjectTeamViewProps {
  project: ProductProjectItem
  onBack: () => void
}

const DEFAULT_PROJECT_MEMBERS: ProjectTeamMember[] = [
  {
    id: "mem-1",
    numericId: 1,
    name: "Rohan Malhotra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Manager",
    designation: "Product Manager",
    employeeId: "GK1001",
    department: "Product",
    reportingTo: "Priya Shah",
    reportingToRole: "Product Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "rohan.malhotra@gkelite.com",
    phone: "+91 98765 43210",
    joiningDate: "Apr 10, 2024",
  },
  {
    id: "mem-2",
    numericId: 2,
    name: "Sneha Rao",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    role: "Assistant Manager",
    designation: "Assistant Manager",
    employeeId: "GK1002",
    department: "Product",
    reportingTo: "Rohan Malhotra",
    reportingToRole: "Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "sneha.rao@gkelite.com",
    phone: "+91 98765 43211",
    joiningDate: "May 15, 2024",
  },
  {
    id: "mem-3",
    numericId: 3,
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    role: "Assistant Manager",
    designation: "Assistant Manager",
    employeeId: "GK1003",
    department: "Product",
    reportingTo: "Rohan Malhotra",
    reportingToRole: "Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "vikram.singh@gkelite.com",
    phone: "+91 98765 43212",
    joiningDate: "Jun 01, 2024",
  },
  {
    id: "mem-4",
    numericId: 4,
    name: "Karthik Iyer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    role: "Team Lead",
    designation: "Technical Team Lead",
    employeeId: "GK1004",
    department: "Development",
    reportingTo: "Sneha Rao",
    reportingToRole: "Assistant Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "karthik.iyer@gkelite.com",
    phone: "+91 98765 43213",
    joiningDate: "Jul 12, 2024",
  },
  {
    id: "mem-5",
    numericId: 5,
    name: "Neha Verma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "Team Lead",
    designation: "Frontend Team Lead",
    employeeId: "GK1005",
    department: "Development",
    reportingTo: "Vikram Singh",
    reportingToRole: "Assistant Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "neha.verma@gkelite.com",
    phone: "+91 98765 43214",
    joiningDate: "Aug 20, 2024",
  },
  {
    id: "mem-6",
    numericId: 6,
    name: "Anjali Mehta",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    role: "Senior Developer",
    designation: "Senior Frontend Developer",
    employeeId: "GK1006",
    department: "Development",
    reportingTo: "Karthik Iyer",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "anjali.mehta@gkelite.com",
    phone: "+91 98765 43215",
    joiningDate: "Sep 05, 2024",
  },
  {
    id: "mem-7",
    numericId: 7,
    name: "Arjun Verma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    role: "Frontend Developer",
    designation: "Frontend Developer",
    employeeId: "GK1007",
    department: "Development",
    reportingTo: "Karthik Iyer",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "arjun.verma@gkelite.com",
    phone: "+91 98765 43216",
    joiningDate: "Oct 10, 2024",
  },
  {
    id: "mem-8",
    numericId: 8,
    name: "Ravi Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    role: "Backend Developer",
    designation: "Senior Backend Developer",
    employeeId: "GK1008",
    department: "Development",
    reportingTo: "Neha Verma",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "ravi.kumar@gkelite.com",
    phone: "+91 98765 43217",
    joiningDate: "Nov 01, 2024",
  },
  {
    id: "mem-9",
    numericId: 9,
    name: "Pooja Sharma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    role: "UI Designer",
    designation: "UI/UX Designer",
    employeeId: "GK1009",
    department: "Design",
    reportingTo: "Sneha Rao",
    reportingToRole: "Assistant Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "pooja.sharma@gkelite.com",
    phone: "+91 98765 43218",
    joiningDate: "Dec 01, 2024",
  },
  {
    id: "mem-10",
    numericId: 10,
    name: "Meera Das",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "QA Lead",
    designation: "Quality Assurance Lead",
    employeeId: "GK1010",
    department: "Quality Assurance",
    reportingTo: "Vikram Singh",
    reportingToRole: "Assistant Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "meera.das@gkelite.com",
    phone: "+91 98765 43219",
    joiningDate: "Jan 15, 2025",
  },
  {
    id: "mem-11",
    numericId: 11,
    name: "Deepak Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Backend Developer",
    designation: "Backend Developer",
    employeeId: "GK1011",
    department: "Development",
    reportingTo: "Neha Verma",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "deepak.verma@gkelite.com",
    phone: "+91 98765 43220",
    joiningDate: "Feb 01, 2025",
  },
  {
    id: "mem-12",
    numericId: 12,
    name: "Neha Joshi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "QA Engineer",
    designation: "QA Engineer",
    employeeId: "GK1012",
    department: "Quality Assurance",
    reportingTo: "Meera Das",
    reportingToRole: "QA Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "neha.joshi@gkelite.com",
    phone: "+91 98765 43221",
    joiningDate: "Mar 10, 2025",
  },
  {
    id: "mem-13",
    numericId: 13,
    name: "Amit Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    role: "DevOps Engineer",
    designation: "Cloud DevOps Engineer",
    employeeId: "GK1013",
    department: "Development",
    reportingTo: "Karthik Iyer",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "amit.patel@gkelite.com",
    phone: "+91 98765 43222",
    joiningDate: "Apr 05, 2025",
  },
  {
    id: "mem-14",
    numericId: 14,
    name: "Sunita Roy",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    role: "Product Analyst",
    designation: "Senior Product Analyst",
    employeeId: "GK1014",
    department: "Product",
    reportingTo: "Rohan Malhotra",
    reportingToRole: "Manager",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "sunita.roy@gkelite.com",
    phone: "+91 98765 43223",
    joiningDate: "May 12, 2025",
  },
  {
    id: "mem-15",
    numericId: 15,
    name: "Rajesh Sharma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    role: "Frontend Developer",
    designation: "Frontend Developer",
    employeeId: "GK1015",
    department: "Development",
    reportingTo: "Karthik Iyer",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "rajesh.sharma@gkelite.com",
    phone: "+91 98765 43224",
    joiningDate: "Jun 18, 2025",
  },
  {
    id: "mem-16",
    numericId: 16,
    name: "Divya Nair",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    role: "UI Designer",
    designation: "Product Designer",
    employeeId: "GK1016",
    department: "Design",
    reportingTo: "Pooja Sharma",
    reportingToRole: "UI Designer",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "divya.nair@gkelite.com",
    phone: "+91 98765 43225",
    joiningDate: "Jul 22, 2025",
  },
  {
    id: "mem-17",
    numericId: 17,
    name: "Suresh Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    role: "Backend Developer",
    designation: "Backend Developer",
    employeeId: "GK1017",
    department: "Development",
    reportingTo: "Neha Verma",
    reportingToRole: "Team Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "suresh.kumar@gkelite.com",
    phone: "+91 98765 43226",
    joiningDate: "Aug 15, 2025",
  },
  {
    id: "mem-18",
    numericId: 18,
    name: "Kavita Patil",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "QA Engineer",
    designation: "QA Engineer",
    employeeId: "GK1018",
    department: "Quality Assurance",
    reportingTo: "Meera Das",
    reportingToRole: "QA Lead",
    status: "Active",
    employmentType: "Full-Time",
    workLocation: "Bengaluru",
    email: "kavita.patil@gkelite.com",
    phone: "+91 98765 43227",
    joiningDate: "Sep 20, 2025",
  },
]

export default function ProductManagerProjectTeamView({
  project,
  onBack,
}: ProductManagerProjectTeamViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5)

  const memberParam = searchParams.get("member")
  const selectedMemberForModal = useMemo(() => {
    if (!memberParam) return null
    return (
      DEFAULT_PROJECT_MEMBERS.find(
        (m) =>
          m.employeeId?.toLowerCase() === memberParam.toLowerCase() ||
          m.id.toLowerCase() === memberParam.toLowerCase()
      ) || null
    )
  }, [memberParam])

  const pageParam = searchParams.get("page")
  const currentPage = useMemo(() => {
    const p = parseInt(pageParam || "1", 10)
    return isNaN(p) || p < 1 ? 1 : p
  }, [pageParam])

  const handleOpenMemberModal = (member: ProjectTeamMember) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("member", member.employeeId || member.id)
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handleCloseMemberModal = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("member")
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPage > 1) {
      params.set("page", String(newPage))
    } else {
      params.delete("page")
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  const availableRoles = useMemo(() => {
    const rolesSet = new Set<string>()
    DEFAULT_PROJECT_MEMBERS.forEach((m) => rolesSet.add(m.role))
    return ["All Roles", ...Array.from(rolesSet)]
  }, [])

  const filteredMembers = useMemo(() => {
    return DEFAULT_PROJECT_MEMBERS.filter((member) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        member.reportingTo.toLowerCase().includes(q)

      const matchesRole = roleFilter === "All Roles" || member.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [searchQuery, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize))
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderIcon = () => {
    if (project.iconType === "desktop") return <Desktop size={20} weight="bold" />
    if (project.iconType === "archive") return <Archive size={20} weight="bold" />
    if (project.iconType === "mobile") return <DeviceMobile size={20} weight="bold" />
    return <ArrowsLeftRight size={20} weight="bold" />
  }

  const getRoleBadgeClasses = (role: string) => {
    if (role === "Manager") {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (role.includes("Assistant Manager")) {
      return "bg-sky-50 text-sky-600"
    }
    if (role.includes("Lead")) {
      return "bg-amber-50 text-amber-600"
    }
    return "bg-indigo-50/70 text-indigo-700"
  }

  const columns: TableColumn<ProjectTeamMember>[] = useMemo(
    () => [
      {
        key: "numericId",
        header: "#",
        width: "48px",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "text-xs text-gray-500 font-medium py-3.5 px-3",
        render: (member) => member.numericId,
      },
      {
        key: "name",
        header: "EMPLOYEE NAME",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3",
        render: (member) => (
          <div className="flex items-center gap-2.5">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-gray-100"
            />
            <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">
              {member.name}
            </span>
          </div>
        ),
      },
      {
        key: "role",
        header: "ROLE",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3 whitespace-nowrap",
        render: (member) => (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClasses(
              member.role
            )}`}
          >
            {member.role}
          </span>
        ),
      },
      {
        key: "department",
        header: "DEPARTMENT",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3 text-xs text-gray-600 font-medium whitespace-nowrap",
        render: (member) => member.department,
      },
      {
        key: "reportingTo",
        header: "REPORTING TO",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3 text-xs text-gray-700 font-medium whitespace-nowrap",
        render: (member) => member.reportingTo,
      },
      {
        key: "status",
        header: "STATUS",
        align: "left",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3",
        className: "py-3.5 px-3 whitespace-nowrap",
        render: (member) => (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {member.status}
          </span>
        ),
      },
      {
        key: "action",
        header: "ACTION",
        align: "center",
        headerClassName: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3 text-center",
        className: "py-3.5 px-3 text-center whitespace-nowrap",
        render: (member) => (
          <button
            type="button"
            onClick={() => handleOpenMemberModal(member)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5046E5] border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <Eye size={15} />
            <span>View Details</span>
          </button>
        ),
      },
    ],
    []
  )

  return (
    <div className="w-full min-h-full flex flex-col gap-4 sm:gap-5 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100/90 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
                {project.name}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {project.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-4 flex-wrap">
              <span>Project Code: {project.code}</span>
              <span>Start Date: {project.startDate}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="self-start sm:self-auto px-4 py-2 border border-indigo-200 text-[#5046E5] hover:bg-indigo-50 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-2xs"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Projects</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-5 sm:p-6 flex flex-col gap-4">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
          Project Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              {renderIcon()}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-gray-400 font-medium block">
                Project Name
              </span>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {project.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <Briefcase size={20} weight="bold" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-gray-400 font-medium block">
                Project Code
              </span>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {project.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <CalendarBlank size={20} weight="bold" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-gray-400 font-medium block">
                Start Date
              </span>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {project.startDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} weight="bold" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-gray-400 font-medium block">
                Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Team Members ({filteredMembers.length})
          </h3>

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
                placeholder="Search by employee name or role..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:border-[#5046E5] transition-colors"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center justify-between gap-2 px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[110px]"
              >
                <span>{roleFilter}</span>
                <CaretDown size={14} className="text-gray-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-30 max-h-60 overflow-y-auto custom-scrollbar">
                  {availableRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setRoleFilter(role)
                        setIsRoleDropdownOpen(false)
                        handlePageChange(1)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 cursor-pointer ${
                        roleFilter === role
                          ? "text-[#5046E5] font-semibold bg-indigo-50/50"
                          : "text-gray-700"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <ReusableTable
          columns={columns}
          data={paginatedMembers}
          headerBgColor="transparent"
          headerTextColor="#6B7280"
          headerRounded="rounded-none"
          tableClassName="border-collapse min-w-[850px]"
          rowHover={true}
          keyExtractor={(row) => row.id}
          emptyMessage="No team members found matching your criteria."
        />

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredMembers.length}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            handlePageChange(1)
          }}
          pageSizeOptions={[5, 10, 20]}
          itemLabel="members"
          showJumpToPage={false}
        />
      </div>

      {selectedMemberForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={handleCloseMemberModal}
          />
          <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-gray-100/80">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Employee Details
              </h3>
              <button
                type="button"
                onClick={handleCloseMemberModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FE] border border-indigo-50/80 flex items-center gap-4">
                <img
                  src={selectedMemberForModal.avatar}
                  alt={selectedMemberForModal.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-white shadow-xs"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      {selectedMemberForModal.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {selectedMemberForModal.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {selectedMemberForModal.role}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <IdentificationBadge size={14} className="text-gray-400" />
                      <span>Employee ID:</span>
                      <strong className="text-gray-900 font-semibold">
                        {selectedMemberForModal.employeeId || "GK1001"}
                      </strong>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-gray-400" />
                      <span>Role:</span>
                      <strong className="text-gray-900 font-semibold">
                        {selectedMemberForModal.designation || selectedMemberForModal.role}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FE]/70 border border-gray-100 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                    <UsersThree size={18} weight="bold" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                      Team / Project
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block mt-0.5">
                      {project.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
                    <Cube size={18} weight="bold" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                      Status
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5">
                      {selectedMemberForModal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1 text-xs">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <TreeStructure size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Department / Function
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Assigned Project
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {project.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <User size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Reporting To
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.reportingTo}{" "}
                        <span className="text-gray-400 font-normal">
                          ({selectedMemberForModal.reportingToRole || "Manager"})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Employment Type
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.employmentType || "Full-Time"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Work Location
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.workLocation || "Bengaluru"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <EnvelopeSimple size={15} weight="bold" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Email
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 block mt-0.5 truncate">
                        {selectedMemberForModal.email || `${selectedMemberForModal.name.toLowerCase().replace(" ", ".")}@gkelite.com`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Phone
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.phone || "+91 98765 43210"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 mt-0.5">
                      <CalendarBlank size={15} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Joining Date
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5">
                        {selectedMemberForModal.joiningDate || "Apr 10, 2024"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 flex justify-end bg-white">
              <button
                type="button"
                onClick={handleCloseMemberModal}
                className="px-5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
