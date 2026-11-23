"use client"

import {  useState  } from "react";
import { ArrowLeft, ArrowUp, CaretDown, Star } from "phosphor-react"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

interface PerformanceRow {
  month: string
  score: string
  feedback: string
  comments: string
}

const performanceTableData: PerformanceRow[] = [
  { month: "January 2025", score: "4.0/5", feedback: "Good start to the year.", comments: "Nice progress." },
  { month: "February 2025", score: "3.8/5", feedback: "Creative work", comments: "Clear communication." },
  { month: "March 2025", score: "3.2/5", feedback: "Excellent design output.", comments: "Focus on consistency." },
  { month: "April 2025", score: "4.5/5", feedback: "Great teamwork.", comments: "Try new ideas." },
  { month: "May 2025", score: "4.6/5", feedback: "Wireframes need refining.", comments: "Focus on consistency." },
  { month: "June 2025", score: "4.6/5", feedback: "Good start to the year.", comments: "Nice progress." },
  { month: "July 2025", score: "4.8/5", feedback: "Creative work", comments: "Clear communication." },
  { month: "August 2025", score: "4.8/5", feedback: "Excellent design output.", comments: "Focus on consistency." },
  { month: "September 2025", score: "4.5/5", feedback: "Great teamwork.", comments: "Try new ideas." },
  { month: "October 2025", score: "4.5/5", feedback: "Wireframes need refining.", comments: "Focus on consistency." },
  { month: "November 2025", score: "3.3/5", feedback: "Great teamwork.", comments: "Try new ideas." },
  { month: "December 2025", score: "3.4/5", feedback: "Wireframes need refining.", comments: "Focus on consistency." },
]

const skills = [
  { name: "Design Quality", percent: 90 },
  { name: "Creativity", percent: 80 },
  { name: "Timeliness", percent: 70 },
  { name: "Collaboration", percent: 85 },
]

const columns: TableColumn<PerformanceRow>[] = [
  {
    key: "month",
    header: "Month",
    accessor: "month",
    className: "text-gray-700 font-medium py-3 px-3 sm:px-4 whitespace-nowrap",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "score",
    header: "Performance Score",
    accessor: "score",
    className: "font-semibold text-gray-900 py-3 px-3 sm:px-4 whitespace-nowrap",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "feedback",
    header: "Manager Feedback",
    accessor: "feedback",
    className: "text-gray-700 py-3 px-3 sm:px-4",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "comments",
    header: "Comments",
    accessor: "comments",
    className: "text-gray-700 py-3 px-3 sm:px-4",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
]

export default function EmployeePerformanceDetail({
  onBack,
}: {
  onBack?: () => void
}) {
  const [selectedFilter, setSelectedFilter] = useState("Month")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const totalPages = Math.ceil(performanceTableData.length / pageSize)
  const paginatedData = performanceTableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const chartPoints = [
    { month: "Jan", score: 2.0, x: 50, y: 140 },
    { month: "Feb", score: 2.8, x: 115, y: 108 },
    { month: "Mar", score: 2.3, x: 180, y: 128 },
    { month: "Apr", score: 3.3, x: 245, y: 88 },
    { month: "May", score: 3.3, x: 310, y: 88 },
    { month: "Jun", score: 3.5, x: 375, y: 80 },
    { month: "Jul", score: 3.4, x: 440, y: 84 },
    { month: "Aug", score: 2.8, x: 505, y: 108 },
    { month: "Sep", score: 3.5, x: 570, y: 80 },
    { month: "Oct", score: 3.9, x: 635, y: 64 },
    { month: "Nov", score: 4.5, x: 700, y: 40 },
    { month: "Dec", score: 4.6, x: 765, y: 36 },
  ]

  const pathD = chartPoints.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`
  }, "")

  const areaD = `${pathD} L 765 180 L 50 180 Z`

  return (
    <div className="w-full max-w-full flex flex-col gap-4 sm:gap-5">
      {onBack && (
        <div className="flex items-center justify-start pb-1">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7065E6] bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl shadow-sm border border-gray-100 hover:bg-[#F3F2FD] hover:shadow transition-all duration-200 cursor-pointer focus:outline-none select-none"
          >
            <ArrowLeft size={16} weight="bold" className="text-[#7065E6]" />
            <span>Back to Overview</span>
          </button>
        </div>
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-semibold text-gray-500">Overall Rating</h4>
          <div className="flex items-center gap-2 mt-2">
            <Star size={22} weight="fill" className="text-[#F59E0B]" />
            <span className="text-2xl sm:text-3xl font-bold text-[#1F2937]">4.2 / 5</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-semibold text-gray-500">Best Month</h4>
          <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mt-1">June 2025</h3>
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-gray-600">
            <Star size={13} weight="fill" className="text-[#F59E0B]" />
            <span>4.8 / 5</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-semibold text-gray-500">Growth</h4>
          <div className="flex items-center gap-1.5 mt-2 text-[#10B981]">
            <ArrowUp size={22} weight="bold" />
            <span className="text-2xl sm:text-3xl font-bold">+12%</span>
          </div>
          <span className="text-[11px] text-gray-400 mt-0.5">vs last year</span>
        </div>
      </div>

      <div className="w-full max-w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 sm:p-5 md:p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-3 sm:pb-4">
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#1F2937]">
            Performance Score by Month
          </h3>
          <div className="relative">
            <button
              type="button"
              className="border border-gray-200 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-gray-700 bg-white flex items-center gap-1.5 sm:gap-2 hover:bg-gray-50 cursor-pointer shadow-2xs"
            >
              <span>{selectedFilter}</span>
              <CaretDown size={14} weight="bold" className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto select-none pt-2">
          <div className="min-w-[580px] sm:min-w-[700px] md:min-w-[750px] relative">
            <svg viewBox="0 0 800 200" className="w-full h-44 sm:h-52">
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <line x1="40" y1="40" x2="780" y2="40" stroke="#F1F1F5" strokeDasharray="3 3" />
              <line x1="40" y1="88" x2="780" y2="88" stroke="#F1F1F5" strokeDasharray="3 3" />
              <line x1="40" y1="136" x2="780" y2="136" stroke="#F1F1F5" strokeDasharray="3 3" />
              <line x1="40" y1="180" x2="780" y2="180" stroke="#E5E7EB" />
              <path d={areaD} fill="url(#scoreGradient)" />
              <path d={pathD} fill="none" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
              {chartPoints.map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2.5" />
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-gray-600"
                  >
                    {pt.score}
                  </text>
                </g>
              ))}
            </svg>

            <div className="flex justify-between px-6 pt-1 text-[11px] font-semibold text-gray-500">
              {chartPoints.map((pt, idx) => (
                <span key={idx} className="w-10 text-center">{pt.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 overflow-hidden">
        <ReusableTable<PerformanceRow>
          columns={columns}
          data={paginatedData}
          headerBgColor="#EAE8E4"
          headerTextColor="#1F2937"
          headerRounded="rounded-xl"
        />

        <div className="pt-3 border-t border-gray-100 mt-3">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={performanceTableData.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              setCurrentPage(1)
            }}
            pageSizeOptions={[5, 10, 15]}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] mb-3">Skill Breakdown</h3>
          <div className="flex flex-col gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-medium text-gray-700 mb-1">{skill.name}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 sm:h-3 flex-1 bg-[#EAEAEA] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#C4B5FD] transition-all duration-700"
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">
                    {skill.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 flex flex-col justify-start">
          <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] mb-3 sm:mb-4">Achievements & Recognition</h3>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
              <Star size={18} weight="fill" className="text-[#F59E0B] shrink-0" />
              <span>Star of the Month</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
              <Star size={18} weight="fill" className="text-[#F59E0B] shrink-0" />
              <span>Special Appreciation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
