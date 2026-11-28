"use client"

import { useState, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  UsersThree,
  Briefcase,
  User,
  Crown,
  CaretDown,
  TreeStructure,
} from "phosphor-react"

export interface TreeNodeMember {
  id: string
  name: string
  role: string
  avatar: string
  department?: string
  reportingTo?: string
  membersCount?: number
  teamProject?: string
}

interface TreeBranch {
  lead: TreeNodeMember
  employees: TreeNodeMember[]
}

interface AssistantManagerNode {
  member: TreeNodeMember
  branch: TreeBranch
}

const TOP_LEADER: TreeNodeMember = {
  id: "lead-priya",
  name: "Priya Shah",
  role: "Product Manager",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  department: "Product & Engineering",
  reportingTo: "Board / Executive",
  membersCount: 17,
  teamProject: "GK Gym Life",
}

const MANAGER_NODE: TreeNodeMember = {
  id: "mgr-rohan",
  name: "Rohan Malhotra",
  role: "Manager",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  department: "Product & Engineering",
  reportingTo: "Priya Shah",
  membersCount: 16,
  teamProject: "GK Gym Life",
}

const ASSISTANT_MANAGERS: AssistantManagerNode[] = [
  {
    member: {
      id: "asst-sneha",
      name: "Sneha Rao",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      department: "Product & Engineering",
      reportingTo: "Rohan Malhotra",
      membersCount: 8,
      teamProject: "GK Gym Life",
    },
    branch: {
      lead: {
        id: "tl-karthik",
        name: "Karthik Iyer",
        role: "Team Lead",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        department: "Product & Engineering",
        reportingTo: "Sneha Rao",
        membersCount: 7,
        teamProject: "GK Gym Life",
      },
      employees: [
        {
          id: "emp-1",
          name: "Rahul Sharma",
          role: "UI Designer",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          department: "Design",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-2",
          name: "Karthik Rao",
          role: "Backend Developer",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          department: "Development",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-3",
          name: "Neha Patel",
          role: "QA Engineer",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
          department: "Quality Assurance",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-4",
          name: "Aisha Khan",
          role: "Business Analyst",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
          department: "Product",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-5",
          name: "Rajiv Mehta",
          role: "Frontend Developer",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          department: "Development",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-6",
          name: "Priya Nair",
          role: "Product Designer",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
          department: "Design",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-7",
          name: "Kunal Verma",
          role: "Data Analyst",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
          department: "Analytics",
          reportingTo: "Karthik Iyer",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
      ],
    },
  },
  {
    member: {
      id: "asst-vikram",
      name: "Vikram Singh",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      department: "Product & Engineering",
      reportingTo: "Rohan Malhotra",
      membersCount: 7,
      teamProject: "GK Gym Life",
    },
    branch: {
      lead: {
        id: "tl-neha",
        name: "Neha Verma",
        role: "Team Lead",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        department: "Product & Engineering",
        reportingTo: "Vikram Singh",
        membersCount: 6,
        teamProject: "GK Gym Life",
      },
      employees: [
        {
          id: "emp-8",
          name: "Aditi Pillai",
          role: "Product Designer",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
          department: "Design",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-9",
          name: "Divya Nair",
          role: "Full Stack Developer",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
          department: "Development",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-10",
          name: "Rohan Gupta",
          role: "QA Engineer",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          department: "Quality Assurance",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-11",
          name: "Simran Kaur",
          role: "Project Coordinator",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
          department: "Operations",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-12",
          name: "Meera Das",
          role: "UI/UX Designer",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          department: "Design",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
        {
          id: "emp-13",
          name: "Arjun Mehta",
          role: "Backend Developer",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
          department: "Development",
          reportingTo: "Neha Verma",
          membersCount: 0,
          teamProject: "GK Gym Life",
        },
      ],
    },
  },
]

export default function ProductManagerTeamTreeView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const projectsList = ["GK Gym Life", "Tekton", "HRMS Revamp", "Mobile App"]

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)

  const selectedProject = useMemo(() => {
    const p = searchParams.get("treeProject") || searchParams.get("project")
    if (!p) return "GK Gym Life"
    return projectsList.find((item) => item.toLowerCase() === p.toLowerCase()) || "GK Gym Life"
  }, [searchParams])

  const allMembers = useMemo(() => {
    const list: TreeNodeMember[] = [TOP_LEADER, MANAGER_NODE]
    ASSISTANT_MANAGERS.forEach((am) => {
      list.push(am.member)
      list.push(am.branch.lead)
      list.push(...am.branch.employees)
    })
    return list
  }, [])

  const treeMemberParam = searchParams.get("treeMember")
  const selectedMember = useMemo(() => {
    if (!treeMemberParam) return ASSISTANT_MANAGERS[1].branch.lead
    return (
      allMembers.find(
        (m) =>
          m.id.toLowerCase() === treeMemberParam.toLowerCase() ||
          m.name.toLowerCase() === treeMemberParam.toLowerCase()
      ) || ASSISTANT_MANAGERS[1].branch.lead
    )
  }, [treeMemberParam, allMembers])

  const handleSelectProject = (project: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (project === "GK Gym Life") {
      params.delete("treeProject")
      params.delete("project")
    } else {
      params.set("treeProject", project)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
    setIsProjectDropdownOpen(false)
  }

  const handleSelectMember = (member: TreeNodeMember) => {
    const params = new URLSearchParams(searchParams.toString())
    if (member.id === ASSISTANT_MANAGERS[1].branch.lead.id) {
      params.delete("treeMember")
    } else {
      params.set("treeMember", member.id)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  return (
    <div className="w-full min-h-full flex flex-col gap-4 sm:gap-5 pb-16">
      <div className="flex items-center gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100/90 shadow-2xs">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
          <TreeStructure size={22} weight="bold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Team Tree</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            View team structure and members by project.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900">Project</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-800 flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{selectedProject}</span>
              <CaretDown size={14} className="text-gray-400" />
            </button>

            {isProjectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-30">
                {projectsList.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSelectProject(p)}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 cursor-pointer ${
                      selectedProject === p
                        ? "text-[#5046E5] font-semibold bg-indigo-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 flex-1 md:max-w-3xl">
          <div className="p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <UsersThree size={16} weight="bold" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">18</span>
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Total Members
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <Briefcase size={16} weight="bold" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">1</span>
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Manager
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <UsersThree size={16} weight="bold" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">2</span>
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Assistant Managers
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
              <Crown size={16} weight="bold" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">2</span>
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Team Leads
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <User size={16} weight="bold" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">13</span>
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Employees
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="flex-1 w-full bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-6 overflow-x-auto custom-scrollbar">
          <div className="min-w-[680px] flex flex-col items-center">
            <button
              type="button"
              onClick={() => handleSelectMember(TOP_LEADER)}
              className={`p-3 rounded-2xl bg-[#EEF2FF]/80 border transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[220px] ${
                selectedMember.id === TOP_LEADER.id
                  ? "border-[#5046E5] ring-2 ring-[#5046E5]/20"
                  : "border-indigo-100"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#5046E5] text-white flex items-center justify-center shrink-0">
                <Crown size={14} weight="fill" />
              </div>
              <img
                src={TOP_LEADER.avatar}
                alt={TOP_LEADER.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
              />
              <div className="text-left min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">{TOP_LEADER.name}</h4>
                <p className="text-[11px] text-gray-500 font-medium truncate">{TOP_LEADER.role}</p>
              </div>
            </button>

            <div className="w-0.5 h-6 bg-indigo-300" />

            <button
              type="button"
              onClick={() => handleSelectMember(MANAGER_NODE)}
              className={`p-3 rounded-2xl bg-sky-50/70 border transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[200px] ${
                selectedMember.id === MANAGER_NODE.id
                  ? "border-[#5046E5] ring-2 ring-[#5046E5]/20"
                  : "border-sky-100"
              }`}
            >
              <img
                src={MANAGER_NODE.avatar}
                alt={MANAGER_NODE.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
              />
              <div className="text-left min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">{MANAGER_NODE.name}</h4>
                <p className="text-[11px] text-gray-500 font-medium truncate">{MANAGER_NODE.role}</p>
              </div>
            </button>

            <div className="w-0.5 h-6 bg-indigo-300" />

            <div className="w-full relative">
              <div className="w-[50%] mx-auto border-t-2 border-indigo-300 relative">
                <div className="absolute left-0 top-0 w-0.5 h-6 bg-indigo-300" />
                <div className="absolute right-0 top-0 w-0.5 h-6 bg-indigo-300" />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6">
                {ASSISTANT_MANAGERS.map((node) => (
                  <div key={node.member.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleSelectMember(node.member)}
                      className={`p-3 rounded-2xl bg-amber-50/70 border transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[200px] ${
                        selectedMember.id === node.member.id
                          ? "border-[#5046E5] ring-2 ring-[#5046E5]/20"
                          : "border-amber-100"
                      }`}
                    >
                      <img
                        src={node.member.avatar}
                        alt={node.member.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
                      />
                      <div className="text-left min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {node.member.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium truncate">
                          {node.member.role}
                        </p>
                      </div>
                    </button>

                    <div className="w-0.5 h-6 bg-indigo-300" />

                    <button
                      type="button"
                      onClick={() => handleSelectMember(node.branch.lead)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs min-w-[200px] ${
                        selectedMember.id === node.branch.lead.id
                          ? "border-2 border-[#5046E5] bg-white ring-2 ring-[#5046E5]/20"
                          : "bg-indigo-50/70 border border-indigo-100"
                      }`}
                    >
                      <img
                        src={node.branch.lead.avatar}
                        alt={node.branch.lead.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
                      />
                      <div className="text-left min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {node.branch.lead.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium truncate">
                          {node.branch.lead.role}
                        </p>
                      </div>
                    </button>

                    <div className="w-full flex justify-center pt-2">
                      <div className="relative pl-6 py-2 flex flex-col gap-2.5 border-l-2 border-indigo-300">
                        {node.branch.employees.map((emp) => (
                          <div key={emp.id} className="relative flex items-center">
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 border-t-2 border-indigo-300" />
                            <button
                              type="button"
                              onClick={() => handleSelectMember(emp)}
                              className={`px-3 py-1.5 rounded-full border bg-white flex items-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer min-w-[170px] ${
                                selectedMember.id === emp.id
                                  ? "border-[#5046E5] ring-1 ring-[#5046E5]"
                                  : "border-gray-100 hover:border-gray-200"
                              }`}
                            >
                              <img
                                src={emp.avatar}
                                alt={emp.name}
                                className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-gray-100"
                              />
                              <div className="text-left min-w-0">
                                <span className="text-[11px] font-bold text-gray-900 block truncate leading-tight">
                                  {emp.name}
                                </span>
                                <span className="text-[9px] text-gray-400 font-medium block truncate leading-tight">
                                  {emp.role}
                                </span>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-white rounded-3xl border border-gray-100/90 shadow-2xs p-5 sm:p-6 shrink-0 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Details</h3>

          <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-indigo-50/80 flex items-center gap-3.5 mb-5">
            <img
              src={selectedMember.avatar}
              alt={selectedMember.name}
              className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white shadow-xs"
            />
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                {selectedMember.name}
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-[#5046E5] inline-block mt-1">
                {selectedMember.role}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Name</span>
              <span className="font-bold text-gray-900">{selectedMember.name}</span>
            </div>

            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Role</span>
              <span className="font-bold text-gray-900">{selectedMember.role}</span>
            </div>

            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Team / Project</span>
              <span className="font-bold text-gray-900">
                {selectedMember.teamProject || selectedProject}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Department</span>
              <span className="font-bold text-gray-900">
                {selectedMember.department || "Product & Engineering"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Reporting To</span>
              <span className="font-bold text-gray-900">
                {selectedMember.reportingTo || "Rohan Malhotra"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 py-1">
              <span className="text-gray-400 font-medium">Members Count</span>
              <span className="font-bold text-gray-900">{selectedMember.membersCount ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
