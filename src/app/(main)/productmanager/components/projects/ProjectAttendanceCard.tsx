"use client"

import React from "react"
import { ArrowRight } from "phosphor-react"
import { ReusableAvatar } from "@/components/reusableComponents"
import { ProjectAttendanceSummary } from "../../data/projectsAttendanceData"
import AttendanceRing from "./AttendanceRing"

interface ProjectAttendanceCardProps {
  project: ProjectAttendanceSummary
  onView: (projectId: string) => void
}

const STATUS_CONFIG: Record<string, { bg: string; dot: string }> = {
  Active: { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", dot: "bg-emerald-500" },
  Inactive: { bg: "bg-rose-50 text-rose-600 border-rose-100", dot: "bg-rose-500" },
  Completed: { bg: "bg-blue-50 text-blue-600 border-blue-100", dot: "bg-blue-500" },
  "On Hold": { bg: "bg-amber-50 text-amber-600 border-amber-100", dot: "bg-amber-500" },
}

export default function ProjectAttendanceCard({
  project,
  onView,
}: ProjectAttendanceCardProps) {
  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.Active

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:border-gray-200 transition-all duration-200 min-w-0">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-10 h-10 rounded-2xl object-contain bg-[#EEF2FF] p-1.5 shrink-0 shadow-2xs border border-[#5B50EC]/10"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {project.code}
              </div>
            )}
            <h3 className="text-base font-bold text-gray-900 truncate">
              {project.name}
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 border ${statusCfg.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {project.status}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-2.5 border-t border-gray-50">
          <ReusableAvatar
            src={project.manager.avatar || null}
            name={project.manager.name}
            alt={project.manager.name}
            size={40}
            shape="circle"
            fallbackType="icon"
            bgColor="#F1F0FD"
            textColor="#5B50EC"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-gray-900 leading-tight truncate">
              {project.manager.name}
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5">
              Project Manager
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50/80 border border-gray-100/80">
            <span className="text-[11px] text-gray-500 font-medium">Team Leads</span>
            <span className="text-xs font-bold text-gray-900">{project.teamLeadsCount}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50/80 border border-gray-100/80">
            <span className="text-[11px] text-gray-500 font-medium">Total Members</span>
            <span className="text-xs font-bold text-gray-900">{project.totalMembers}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center bg-[#F9FAFB] rounded-2xl p-2.5 border border-gray-100/80 text-center gap-1">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-gray-900">
                {project.present}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              Present
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-gray-200/60">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="text-xs font-bold text-gray-900">
                {project.absent}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              Absent
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-gray-200/60">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-gray-900">
                {project.onLeave}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              On Leave
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-gray-200/60">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-gray-900">
                {project.wfh}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              WFH
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2.5">
          <AttendanceRing percentage={project.attendancePercentage} />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium leading-none">
              Attendance %
            </span>
            <span className="text-sm font-extrabold text-gray-900 mt-0.5">
              {project.attendancePercentage}%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onView(project.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-[#5B50EC] hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs group active:scale-95"
        >
          <span>View</span>
          <ArrowRight
            size={13}
            weight="bold"
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  )
}
