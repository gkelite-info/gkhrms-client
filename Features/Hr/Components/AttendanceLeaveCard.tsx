"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useAttendanceLeavsUserTableData } from "../data/AttendanceLeaveUser.data"
import { useAttendaceLeavsHook } from "../hooks/AttendanceLeaves.hook"
import Table from "../../../utils/Table/Table"
import DashboardAttendanceTracker from "../../../utils/DashboardAttendanceTracker"
import ModalLayout from "../../../Layouts/ModalLayout"
import AttendanceModal from "../modals/deactivatedusers"

const AttendanceLeaveCard = ({ styles = "lg:w-1/2" }: { styles?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { column } = useAttendanceLeavsUserTableData()
  const { attendanceUser } = useAttendaceLeavsHook()

  const modalParam = searchParams?.get("modal")?.toLowerCase()
  const isAttendanceModalOpen = modalParam === "attendance" || modalParam === "attendance-leave"
  const [open, setOpen] = useState(isAttendanceModalOpen)

  useEffect(() => {
    setOpen(isAttendanceModalOpen)
  }, [isAttendanceModalOpen])

  const handleOpenModal = () => {
    setOpen(true)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("modal", "attendance")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setOpen(false)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.delete("modal")
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  return (
    <>
      <div
        className={`w-full bg-[#F9FAFB] shadow-xs border border-gray-100 rounded-2xl p-4 sm:p-5 items-center flex flex-col gap-4 min-w-0 ${styles}`}
      >
        <h3 className="text-[#323232] font-semibold text-center text-xs sm:text-sm">
          Attendance & leave
        </h3>
        <div className="w-full flex items-center justify-center overflow-x-auto min-w-0">
          <DashboardAttendanceTracker />
        </div>
        <div className="w-full bg-[#F4F3FF] shadow-xs rounded-xl overflow-hidden flex flex-col min-w-0">
          <div className="flex items-center justify-end px-3.5 pt-2.5">
            <button
              type="button"
              onClick={handleOpenModal}
              className="text-[#5B50EC] hover:text-[#4338CA] text-xs font-semibold cursor-pointer transition-colors"
            >
              See All
            </button>
          </div>
          <div className="w-full overflow-x-auto scrollbar-thin">
            <div className="min-w-[480px]">
              <Table
                columns={column}
                data={attendanceUser}
                bgColor="#F4F3FF"
                headerTextColor="#000"
              />
            </div>
          </div>
        </div>
      </div>

      <ModalLayout
        open={open}
        onClose={handleCloseModal}
        className="w-[95%] h-[95%]"
      >
        <AttendanceModal />
      </ModalLayout>
    </>
  )
}

export default AttendanceLeaveCard
