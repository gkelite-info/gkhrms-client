"use client"

import React, { useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { UsersThree, User } from "phosphor-react"

export interface TeamLeadTreeNodeMember {
  id: string
  name: string
  role: string
  avatar: string
  team: string
  department: string
  reportingTo: string
  membersCount: number
  email: string
  phone: string
}

const TREE_MANAGER: TeamLeadTreeNodeMember = {
  id: "mgr-anjali",
  name: "Anjali Mehta",
  role: "Manager",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  team: "Product & Design",
  department: "Product & Engineering",
  reportingTo: "Board / Leadership",
  membersCount: 7,
  email: "anjali.mehta@gkhrms.com",
  phone: "+91 98765 43209",
}

const TREE_TEAM_LEAD: TeamLeadTreeNodeMember = {
  id: "tl-rajiv",
  name: "Rajiv Sharma",
  role: "Team Lead",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  team: "Design Team",
  department: "Product & Engineering",
  reportingTo: "Anjali Mehta (Manager)",
  membersCount: 6,
  email: "rajiv.sharma@gkhrms.com",
  phone: "+91 98765 43210",
}

const TREE_EMPLOYEES: TeamLeadTreeNodeMember[] = [
  {
    id: "emp-priya",
    name: "Priya Nair",
    role: "UI Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "priya.nair@gkhrms.com",
    phone: "+91 98765 43211",
  },
  {
    id: "emp-karthik",
    name: "Karthik Rao",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "karthik.rao@gkhrms.com",
    phone: "+91 98765 43212",
  },
  {
    id: "emp-aisha",
    name: "Aisha Khan",
    role: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "aisha.khan@gkhrms.com",
    phone: "+91 98765 43213",
  },
  {
    id: "emp-rahul",
    name: "Rahul Sharma",
    role: "UI Designer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "rahul.sharma@gkhrms.com",
    phone: "+91 98765 43214",
  },
  {
    id: "emp-neha",
    name: "Neha Patel",
    role: "Business Analyst",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "neha.patel@gkhrms.com",
    phone: "+91 98765 43215",
  },
  {
    id: "emp-rohit",
    name: "Rohit Kumar",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    team: "Design Team",
    department: "Product & Engineering",
    reportingTo: "Rajiv Sharma (Team Lead)",
    membersCount: 0,
    email: "rohit.kumar@gkhrms.com",
    phone: "+91 98765 43216",
  },
]

export default function TeamLeadTeamTreeView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const treeMemberParam = searchParams.get("treeMember")
  const selectedMember = useMemo(() => {
    if (!treeMemberParam) return TREE_TEAM_LEAD
    const allMembers = [TREE_MANAGER, TREE_TEAM_LEAD, ...TREE_EMPLOYEES]
    return (
      allMembers.find(
        (m) =>
          m.id === treeMemberParam ||
          m.name.toLowerCase() === treeMemberParam.toLowerCase()
      ) || TREE_TEAM_LEAD
    )
  }, [treeMemberParam])

  const handleSelectMember = (member: TeamLeadTreeNodeMember) => {
    const params = new URLSearchParams(searchParams.toString())
    if (member.id === TREE_TEAM_LEAD.id) {
      params.delete("treeMember")
    } else {
      params.set("treeMember", member.id)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-xs border border-gray-100/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <UsersThree size={14} className="text-[#5046E5]" weight="bold" />
            <span className="text-[11px] font-medium truncate">Total Members</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">8</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-xs border border-gray-100/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <User size={14} className="text-[#5046E5]" weight="bold" />
            <span className="text-[11px] font-medium truncate">Manager</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">1</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-xs border border-gray-100/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <UsersThree size={14} className="text-[#5046E5]" weight="bold" />
            <span className="text-[11px] font-medium truncate">Team Lead</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">1</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-xs border border-gray-100/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <UsersThree size={14} className="text-[#5046E5]" weight="bold" />
            <span className="text-[11px] font-medium truncate">Employees</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">6</p>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100/90 shadow-2xs p-5 sm:p-6 overflow-x-auto custom-scrollbar flex flex-col items-center justify-center min-h-[480px]">
          <div className="min-w-[620px] flex flex-col items-center">
            <button
              type="button"
              onClick={() => handleSelectMember(TREE_MANAGER)}
              className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[210px] ${
                selectedMember.id === TREE_MANAGER.id
                  ? "border-2 border-[#5046E5] bg-white ring-2 ring-[#5046E5]/15"
                  : "bg-[#F8F9FE] border border-gray-100 hover:border-gray-200"
              }`}
            >
              <img
                src={TREE_MANAGER.avatar}
                alt={TREE_MANAGER.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
              />
              <div className="text-left min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {TREE_MANAGER.name}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium truncate">
                  {TREE_MANAGER.role}
                </p>
              </div>
            </button>

            <div className="w-0.5 h-6 bg-indigo-300" />

            <button
              type="button"
              onClick={() => handleSelectMember(TREE_TEAM_LEAD)}
              className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[210px] ${
                selectedMember.id === TREE_TEAM_LEAD.id
                  ? "border-2 border-[#5046E5] bg-white ring-2 ring-[#5046E5]/15"
                  : "bg-white border border-gray-100 hover:border-gray-200"
              }`}
            >
              <img
                src={TREE_TEAM_LEAD.avatar}
                alt={TREE_TEAM_LEAD.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
              />
              <div className="text-left min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {TREE_TEAM_LEAD.name}
                </h4>
                <p className="text-[11px] text-[#5046E5] font-semibold truncate">
                  {TREE_TEAM_LEAD.role}
                </p>
              </div>
            </button>

            <div className="w-0.5 h-6 bg-indigo-300" />

            <div className="w-full relative">
              <div className="w-[84%] mx-auto border-t-2 border-indigo-300" />

              <div className="grid grid-cols-6 gap-2.5 pt-0">
                {TREE_EMPLOYEES.map((emp) => (
                  <div key={emp.id} className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-indigo-300" />
                    <button
                      type="button"
                      onClick={() => handleSelectMember(emp)}
                      className={`w-full p-2.5 rounded-2xl transition-all cursor-pointer flex flex-col items-center text-center shadow-2xs hover:shadow-xs ${
                        selectedMember.id === emp.id
                          ? "border-2 border-[#5046E5] bg-white ring-2 ring-[#5046E5]/15"
                          : "bg-white border border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shrink-0 mb-1.5"
                      />
                      <h5 className="text-[11px] font-bold text-gray-900 leading-snug truncate w-full">
                        {emp.name}
                      </h5>
                      <span className="text-[10px] text-gray-500 font-medium truncate w-full mt-0.5">
                        {emp.role}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-100/90 shadow-2xs p-5 sm:p-6 shrink-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white shadow-xs"
              />
              <div className="min-w-0">
                <h4 className="text-base font-bold text-gray-900 leading-tight truncate">
                  {selectedMember.name}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2FF] text-[#5046E5] inline-block mt-1">
                  {selectedMember.role}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Name:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Role:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.role}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Team:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.team}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Department:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.department}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Reporting To:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.reportingTo}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Members Count:</span>
                <span className="text-gray-900 font-medium text-right">
                  {selectedMember.membersCount}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Email:</span>
                <span className="text-gray-900 font-medium text-right truncate">
                  {selectedMember.email}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[#4F46E5] font-semibold text-[11px]">Phone:</span>
                <span className="text-gray-900 font-medium text-right">
                  {selectedMember.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
