"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Clock,
  SignOut,
  ChartBar,
  CalendarBlank,
  ChatCircleText,
} from "phosphor-react"
import { HrExceptionItem, ExceptionType } from "./hrExceptionData"
import { ReusableAvatar, ReusableDropdown } from "@/components/reusableComponents"

interface HrExceptionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  item: HrExceptionItem | null
  onRegularize: (id: string, correctedTime: string, reason: string) => void
}

export default function HrExceptionDetailsModal({
  isOpen,
  onClose,
  item,
  onRegularize,
}: HrExceptionDetailsModalProps) {
  const [correctedTime, setCorrectedTime] = useState("09:35 AM")
  const [remarks, setRemarks] = useState("Traffic")

  useEffect(() => {
    if (item) {
      setCorrectedTime(item.expectedCheckIn || "09:30 AM")
      setRemarks("Approved per employee explanation and verified transit notice.")
    }
  }, [item])

  if (!isOpen || !item) return null

  const getBadgeConfig = (type: ExceptionType) => {
    switch (type) {
      case "Late Check-in":
        return {
          icon: Clock,
          bg: "bg-[#FFF1F2]",
          text: "text-[#EF4444]",
          border: "border-rose-100",
        }
      case "Missed Check-out":
        return {
          icon: SignOut,
          bg: "bg-[#FFFBEB]",
          text: "text-[#F59E0B]",
          border: "border-amber-100",
        }
      case "Low Working Hours":
        return {
          icon: ChartBar,
          bg: "bg-[#EFF6FF]",
          text: "text-[#3B82F6]",
          border: "border-blue-100",
        }
      case "Repeated Absences":
        return {
          icon: CalendarBlank,
          bg: "bg-[#FAF5FF]",
          text: "text-[#A855F7]",
          border: "border-purple-100",
        }
    }
  }

  const badge = getBadgeConfig(item.exceptionType)

  const timeOptions = [
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:35 AM",
    "09:45 AM",
    "10:00 AM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegularize(item.id, correctedTime, remarks)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
        >
          <div className="flex items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 border-b border-gray-50">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Exception Details
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto max-h-[calc(88vh-110px)] custom-scrollbar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-0.5">
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <ReusableAvatar
                  src={item.avatar}
                  name={item.name}
                  alt={item.name}
                  size={48}
                  shape="circle"
                  fallbackType="icon"
                  bgColor="#F1F0FD"
                  textColor="#5B50EC"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-0.5 flex-wrap">
                    <span>{item.employeeId}</span>
                    <span className="text-gray-300">•</span>
                    <span>{item.designation}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-normal mt-0.5 flex-wrap">
                    <span>{item.department}</span>
                    <span className="text-gray-300">•</span>
                    <span>{item.team}</span>
                  </div>
                </div>
              </div>

              <div className="self-start sm:self-auto shrink-0 pl-[60px] sm:pl-0 flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                >
                  <span>{item.exceptionType}</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${
                    item.status === "Regularized"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === "Regularized" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <span>{item.status}</span>
                </span>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl bg-gray-50/60 p-3.5 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                  Date
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
                  {item.date}
                </span>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  {item.day === "Mon" ? "Monday" : item.day}
                </span>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                  Actual Check-in
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
                  {item.checkInTime}
                </span>
                {item.checkInSubtitle && (
                  <span className="text-xs text-rose-500 font-semibold break-words mt-0.5">
                    {item.checkInSubtitle}
                  </span>
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                  Expected Check-in
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
                  {item.expectedCheckIn}
                </span>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                  Working Hours
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
                  {item.workingHours}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <ChatCircleText size={15} weight="bold" className="text-[#5B50EC]" />
                Reason for Exception
              </span>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-medium leading-relaxed whitespace-pre-wrap break-words max-h-48 overflow-y-auto custom-scrollbar">
                {item.reason || "No explanation submitted by employee."}
              </div>
            </div>

            <form id="regularize-form" onSubmit={handleSubmit} className="flex flex-col gap-3 pt-1 border-t border-gray-100">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                Regularize Attendance
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Corrected Check-In Time
                  </label>
                  <ReusableDropdown
                    value={correctedTime}
                    options={timeOptions}
                    onChange={(val) => setCorrectedTime(String(val))}
                    align="left"
                    placeholder="Select Time"
                    className="w-full"
                    buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50 flex items-center justify-between"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Resolution Note
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter approval remarks..."
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="p-3.5 sm:p-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="regularize-form"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#5B50EC] hover:bg-[#4d42df] shadow-xs transition-colors cursor-pointer"
            >
              Regularize
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
