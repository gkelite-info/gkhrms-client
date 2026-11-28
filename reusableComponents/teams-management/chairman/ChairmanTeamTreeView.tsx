"use client"

import React, { useState } from "react"
import { Crown, Users, CaretLeft, CaretRight } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"

interface TreeNodeItem {
  id: string
  name: string
  role: string
  avatar?: string
}

const ROOT_NODE: TreeNodeItem = {
  id: "root-1",
  name: "Arjun Rao",
  role: "Chairman",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
}

const HR_BRANCH = {
  manager: {
    id: "tree-hr-1",
    name: "Sneha Rao",
    role: "HR Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  },
  member: {
    id: "tree-hr-2",
    name: "Amit Verma",
    role: "HR",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=face",
  },
}

const PRODUCT_BRANCH = {
  manager: {
    id: "tree-pm-1",
    name: "Rohit Mehta",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  },
  members: [
    {
      id: "tree-pm-2",
      name: "Kavya Nair",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "tree-pm-3",
      name: "Manish Gupta",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    },
  ],
}

const MANAGEMENT_BRANCH = {
  manager: {
    id: "tree-mgr-1",
    name: "Vikram Reddy",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
  assistantManager: {
    id: "tree-mgr-2",
    name: "Anjali Desai",
    role: "Assistant Manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
  },
  teamLead: {
    id: "tree-tl-1",
    name: "Priya Singh",
    role: "Team Lead",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face",
  },
  employees: [
    {
      id: "tree-emp-1",
      name: "Rahul Sharma",
      role: "Employee",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "tree-emp-2",
      name: "Neha Patel",
      role: "Employee",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "tree-emp-3",
      name: "Karthik Rao",
      role: "Employee",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&h=120&fit=crop&crop=face",
    },
  ],
}

const FINANCE_BRANCH = {
  manager: {
    id: "tree-fin-1",
    name: "Divya Iyer",
    role: "Finance Manager",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  },
  members: [
    {
      id: "tree-fin-2",
      name: "Suresh N",
      role: "Finance Executive",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "tree-fin-3",
      name: "Meera Das",
      role: "Accountant",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=face",
    },
  ],
}

const TECH_ADMIN_BRANCH = {
  manager: {
    id: "tree-ta-1",
    name: "Aditya Pillai",
    role: "Tech Admin",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
  },
}

export default function ChairmanTeamTreeView() {
  const [selectedId, setSelectedId] = useState<string>("tree-tl-1")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const renderCard = (
    item: TreeNodeItem,
    options?: {
      isRoot?: boolean
      isFocused?: boolean
      compact?: boolean
    }
  ) => {
    const isSelected = selectedId === item.id || options?.isFocused

    if (options?.isRoot) {
      return (
        <div
          onClick={() => setSelectedId(item.id)}
          className="relative bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white rounded-2xl px-5 py-3 shadow-xl shadow-indigo-500/20 flex items-center gap-3.5 min-w-[210px] cursor-pointer hover:scale-[1.02] transition-transform select-none"
        >
          <ReusableAvatar
            src={item.avatar}
            name={item.name}
            size={40}
            fallbackType="initials"
            shape="circle"
            className="ring-2 ring-white/50 shrink-0"
          />
          <div className="min-w-0 pr-4">
            <div className="text-sm font-bold text-white leading-tight">
              {item.name}
            </div>
            <div className="text-xs text-blue-100 font-medium mt-0.5">
              {item.role}
            </div>
          </div>
          <Crown
            size={20}
            weight="fill"
            className="text-amber-300 ml-auto shrink-0"
          />
        </div>
      )
    }

    return (
      <div
        onClick={() => setSelectedId(item.id)}
        className={`bg-white rounded-2xl transition-all p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none hover:shadow-xs ${
          options?.compact
            ? "min-w-[125px] sm:min-w-[135px] max-w-[145px]"
            : "min-w-[155px] sm:min-w-[170px] max-w-[185px]"
        } ${
          isSelected
            ? "border-2 border-[#5046E5] shadow-md shadow-indigo-500/10"
            : "border border-gray-100/90 shadow-2xs hover:border-gray-200"
        }`}
      >
        <ReusableAvatar
          src={item.avatar}
          name={item.name}
          size={34}
          fallbackType="initials"
          shape="circle"
          className="shrink-0 ring-1 ring-gray-100"
        />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-gray-900 truncate leading-tight">
            {item.name}
          </div>
          <div
            className={`text-[11px] truncate mt-0.5 ${
              isSelected && item.role === "Team Lead"
                ? "text-[#5046E5] font-semibold"
                : "text-gray-400 font-normal"
            }`}
          >
            {item.role}
          </div>
        </div>
        <div className="text-[#5046E5]/70 shrink-0 ml-auto">
          <Users size={14} weight="regular" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-white/70 rounded-3xl border border-gray-100/80 shadow-2xs p-4 sm:p-6 md:p-8 flex flex-col items-center overflow-hidden">
        <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2">
          <div className="w-max min-w-full flex flex-col items-center px-4">
            {renderCard(ROOT_NODE, { isRoot: true })}

            <div className="w-px h-8 bg-indigo-200" />

            <div className="relative flex items-start justify-center pt-6">
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-indigo-200" />

              <div className="flex items-start gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col items-center">
                  <div className="absolute -top-6 w-px h-6 bg-indigo-200" />
                  {renderCard(HR_BRANCH.manager)}
                  <div className="w-px h-8 bg-indigo-200" />
                  {renderCard(HR_BRANCH.member)}
                </div>

                <div className="flex flex-col items-center">
                  <div className="absolute -top-6 w-px h-6 bg-indigo-200" />
                  {renderCard(PRODUCT_BRANCH.manager)}
                  <div className="w-px h-6 bg-indigo-200" />
                  <div className="relative flex items-start justify-center pt-5">
                    <div className="absolute top-0 left-[26%] right-[26%] h-px bg-indigo-200" />
                    <div className="flex items-start gap-2.5">
                      {PRODUCT_BRANCH.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex flex-col items-center"
                        >
                          <div className="w-px h-5 bg-indigo-200 -mt-5" />
                          {renderCard(member, { compact: true })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="absolute -top-6 w-px h-6 bg-indigo-200" />
                  {renderCard(MANAGEMENT_BRANCH.manager)}
                  <div className="w-px h-7 bg-indigo-200" />
                  {renderCard(MANAGEMENT_BRANCH.assistantManager)}
                  <div className="w-px h-7 bg-indigo-200" />
                  {renderCard(MANAGEMENT_BRANCH.teamLead, { isFocused: true })}
                  <div className="w-px h-6 bg-indigo-200" />
                  <div className="relative flex items-start justify-center pt-5">
                    <div className="absolute top-0 left-[18%] right-[18%] h-px bg-indigo-200" />
                    <div className="flex items-start gap-2.5">
                      {MANAGEMENT_BRANCH.employees.map((emp) => (
                        <div
                          key={emp.id}
                          className="flex flex-col items-center"
                        >
                          <div className="w-px h-5 bg-indigo-200 -mt-5" />
                          {renderCard(emp, { compact: true })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="absolute -top-6 w-px h-6 bg-indigo-200" />
                  {renderCard(FINANCE_BRANCH.manager)}
                  <div className="w-px h-6 bg-indigo-200" />
                  <div className="relative flex items-start justify-center pt-5">
                    <div className="absolute top-0 left-[26%] right-[26%] h-px bg-indigo-200" />
                    <div className="flex items-start gap-2.5">
                      {FINANCE_BRANCH.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex flex-col items-center"
                        >
                          <div className="w-px h-5 bg-indigo-200 -mt-5" />
                          {renderCard(member, { compact: true })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="absolute -top-6 w-px h-6 bg-indigo-200" />
                  {renderCard(TECH_ADMIN_BRANCH.manager)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100 text-xs select-none">
          <span className="text-gray-500 font-medium">
            Showing <strong className="text-gray-800">1-6</strong> of{" "}
            <strong className="text-gray-800">24</strong> managers
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <CaretLeft size={14} weight="bold" />
            </button>

            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#5046E5] text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
              disabled={currentPage >= 4}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
