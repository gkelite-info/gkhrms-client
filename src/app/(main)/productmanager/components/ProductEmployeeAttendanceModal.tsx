"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, CalendarBlank, Briefcase, CheckCircle, XCircle, MinusCircle, House } from "phosphor-react"
import { ReusableAvatar } from "@/components/reusableComponents"
import { ProductTeamMember, PRODUCT_LIST } from "../data/productAttendanceData"

interface ProductEmployeeAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  member: ProductTeamMember | null
}

export default function ProductEmployeeAttendanceModal({
  isOpen,
  onClose,
  member,
}: ProductEmployeeAttendanceModalProps) {
  if (!isOpen || !member) return null

  const product = PRODUCT_LIST.find((p) => p.id === member.productId)

  const getStatusBadge = (status: ProductTeamMember["status"]) => {
    switch (status) {
      case "Present":
        return {
          icon: CheckCircle,
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        }
      case "WFH":
        return {
          icon: House,
          className: "bg-indigo-50 text-indigo-700 border-indigo-200",
        }
      case "On Leave":
        return {
          icon: MinusCircle,
          className: "bg-amber-50 text-amber-700 border-amber-200",
        }
      case "Absent":
        return {
          icon: XCircle,
          className: "bg-rose-50 text-rose-700 border-rose-200",
        }
    }
  }

  const badge = getStatusBadge(member.status)
  const StatusIcon = badge.icon

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
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col my-auto max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Attendance Details
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center gap-3.5 pb-1 border-b border-gray-100">
              <ReusableAvatar
                src={member.avatar || null}
                name={member.name}
                alt={member.name}
                size={48}
                shape="circle"
                fallbackType="icon"
                bgColor="#F1F0FD"
                textColor="#5B50EC"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {member.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.className}`}
                  >
                    <StatusIcon size={12} weight="bold" />
                    <span>{member.status}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-0.5">
                  <span className="font-mono text-gray-400">{member.employeeId}</span>
                  <span>•</span>
                  <span>{member.designation}</span>
                  <span>•</span>
                  <span className="text-[#5B50EC] font-semibold">{member.role}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Date</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <CalendarBlank size={14} className="text-gray-400" />
                  {member.date}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Product / Project</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-gray-400" />
                  {product?.name || "Product A"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Check-in Time</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {member.checkIn}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Check-out Time</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {member.checkOut}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Working Hours</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center gap-1">
                  <Clock size={14} />
                  {member.workingHours}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400">Shift Timings</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {member.shift || "09:00 AM - 06:00 PM"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 bg-gray-50/60 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

