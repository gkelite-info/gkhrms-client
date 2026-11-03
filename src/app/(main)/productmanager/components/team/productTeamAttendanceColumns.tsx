"use client"

import React from "react"
import { TableColumn, ReusableAvatar } from "@/components/reusableComponents"
import {
  ProductTeamMember,
  MemberRole,
  AttendanceStatus,
} from "../../data/productAttendanceData"

interface CreateColumnsProps {
  onViewMember: (member: ProductTeamMember) => void
}

export function createProductTeamAttendanceColumns({
  onViewMember,
}: CreateColumnsProps): TableColumn<ProductTeamMember>[] {
  return [
    {
      key: "employee",
      header: "EMPLOYEE",
      align: "left",
      width: "220px",
      render: (row) => (
        <div className="flex items-center gap-3">
          <ReusableAvatar
            src={row.avatar || null}
            name={row.name}
            alt={row.name}
            size={36}
            shape="circle"
            fallbackType="icon"
            bgColor="#F1F0FD"
            textColor="#5B50EC"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
              {row.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "employeeId",
      header: "EMPLOYEE ID",
      align: "left",
      width: "120px",
      render: (row) => (
        <span className="text-xs font-mono font-medium text-gray-500">
          {row.employeeId}
        </span>
      ),
    },
    {
      key: "designation",
      header: "DESIGNATION",
      align: "left",
      width: "180px",
      render: (row) => (
        <span className="text-xs font-medium text-gray-700">
          {row.designation}
        </span>
      ),
    },
    {
      key: "role",
      header: "ROLE",
      align: "left",
      width: "120px",
      render: (row) => {
        const getRoleStyle = (r: MemberRole) => {
          switch (r) {
            case "Manager":
              return "bg-blue-50 text-blue-600 border-blue-100"
            case "Team Lead":
              return "bg-purple-50 text-purple-600 border-purple-100"
            case "Employee":
              return "bg-slate-100 text-slate-600 border-slate-200"
          }
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleStyle(
              row.role
            )}`}
          >
            {row.role}
          </span>
        )
      },
    },
    {
      key: "status",
      header: "STATUS",
      align: "left",
      width: "120px",
      render: (row) => {
        const getStatusStyle = (s: AttendanceStatus) => {
          switch (s) {
            case "Present":
              return "bg-emerald-50 text-emerald-600 border-emerald-100"
            case "WFH":
              return "bg-indigo-50 text-indigo-600 border-indigo-100"
            case "On Leave":
              return "bg-amber-50 text-amber-600 border-amber-100"
            case "Absent":
              return "bg-rose-50 text-rose-600 border-rose-100"
          }
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(
              row.status
            )}`}
          >
            {row.status}
          </span>
        )
      },
    },
    {
      key: "checkIn",
      header: "CHECK-IN",
      align: "left",
      width: "110px",
      render: (row) => (
        <span className="text-xs font-medium text-gray-700">{row.checkIn}</span>
      ),
    },
    {
      key: "checkOut",
      header: "CHECK-OUT",
      align: "left",
      width: "110px",
      render: (row) => (
        <span className="text-xs font-medium text-gray-700">{row.checkOut}</span>
      ),
    },
    {
      key: "workingHours",
      header: "WORKING HOURS",
      align: "left",
      width: "130px",
      render: (row) => (
        <span className="text-xs font-medium text-gray-700">{row.workingHours}</span>
      ),
    },
    {
      key: "action",
      header: "ACTION",
      align: "center",
      width: "100px",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewMember(row)}
          className="px-3.5 py-1 text-xs font-semibold text-[#5B50EC] border border-[#5B50EC]/30 rounded-lg hover:bg-[#EEF2FF] transition-all cursor-pointer active:scale-95"
        >
          View
        </button>
      ),
    },
  ]
}

