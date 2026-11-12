"use client"

import { useState, useEffect } from "react"
import { Bell, MagnifyingGlass, Tray, List, UsersThree } from "phosphor-react"
import NotificationCount from "../../../utils/notificationCount"
import NotificationModal from "../../../utils/notificationModel"
import InboxModal from "../../../utils/inboxModal"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/Store"
import ReusableAvatar from "../../../reusableComponents/ReusableAvatar"
import EmployeeConnectDrawer from "../../../reusableComponents/social-media/EmployeeConnectDrawer"

const getSidebarEvent = (path: string) => {
  if (path.startsWith("/superadmin")) return "toggle-superadmin-sidebar"
  if (path.startsWith("/chairman")) return "toggle-chairman-sidebar"
  if (path.startsWith("/asstmanager") || path.startsWith("/assistantmanager")) return "toggle-asstmanager-sidebar"
  if (path.startsWith("/techadmin")) return "toggle-techadmin-sidebar"
  if (path.startsWith("/accountantexecutive")) return "toggle-accountantexecutive-sidebar"
  if (path.startsWith("/financeexecutive")) return "toggle-financeexecutive-sidebar"
  if (path.startsWith("/accountant") || path.startsWith("/accountantmanager")) return "toggle-accountant-sidebar"
  if (path.startsWith("/finance") || path.startsWith("/financemanager") || path.startsWith("/financemanger")) return "toggle-finance-sidebar"
  if (path.startsWith("/hrmanager")) return "toggle-hrmanager-sidebar"
  if (path.startsWith("/manager")) return "toggle-manager-sidebar"
  if (path.startsWith("/hr")) return "toggle-hr-sidebar"
  if (path.startsWith("/teamlead")) return "toggle-teamlead-sidebar"
  return "toggle-employee-sidebar"
}

export default function MainNavbarHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)
  const [showIndex, setShowIndex] = useState(false)
  const [showSocialMedia, setShowSocialMedia] = useState(false)

  const { fullname, photoURL, role } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    const handleToggle = () => setShowSocialMedia((prev) => !prev)
    window.addEventListener("toggle-social-media", handleToggle)
    return () => window.removeEventListener("toggle-social-media", handleToggle)
  }, [])

  const handleProfile = () => {
    const targetRole =
      (role && role.toLowerCase()) ||
      (pathname?.startsWith("/admin") ? "admin"
        : pathname?.startsWith("/hr") ? "hr"
        : pathname?.startsWith("/manager") ? "manager"
        : pathname?.startsWith("/teamlead") ? "teamlead"
        : pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance") || pathname?.startsWith("/financemanger") ? "financemanager"
        : pathname?.startsWith("/hrmanager") ? "hrmanager"
        : pathname?.startsWith("/accountantexecutive") ? "accountantexecutive"
        : pathname?.startsWith("/accountantmanager") || pathname?.startsWith("/accountant") ? "accountantmanager"
        : pathname?.startsWith("/techadmin") ? "techadmin"
        : pathname?.startsWith("/chairman") ? "chairman"
        : pathname?.startsWith("/asstmanager") || pathname?.startsWith("/assistantmanager") ? "asstmanager"
        : pathname?.startsWith("/superadmin") ? "superadmin"
        : pathname?.startsWith("/financeexecutive") ? "financeexecutive"
        : "employee")
    router.push(`/${targetRole}/profile`)
  }

  return (
    <>
      <header className="w-full h-[70px] flex items-center justify-between bg-white border-b border-gray-100 select-none px-2 sm:px-4 gap-2">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="w-[80px] sm:w-[108px] h-[70px] flex items-center justify-center border-r border-gray-100 pr-2 sm:pr-3">
            <img
              src="/images/gkLogoblack.png"
              alt="GK HRMS"
              className="w-full max-w-[85px] object-contain"
            />
          </div>

          {["/teamlead", "/manager", "/hr", "/employee", "/finance", "/financemanager", "/financemanger", "/financeexecutive", "/hrmanager", "/accountant", "/accountantmanager", "/accountantexecutive", "/techadmin", "/chairman", "/asstmanager", "/assistantmanager", "/superadmin"].some((p) => pathname?.startsWith(p)) && (
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent(getSidebarEvent(pathname || "")))
              }}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
            >
              <List size={20} weight="bold" />
            </button>
          )}
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-4 max-w-[500px]">
          <div className="flex items-center bg-[#C5C1FF] gap-3 h-[40px] w-full rounded-full px-3.5">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="text-[#323232] cursor-pointer flex-shrink-0"
            />
            <input
              placeholder="Search employees, Payroll, Leave, Performance"
              className="text-[#323232] font-medium placeholder:text-[#4B5563] text-xs focus:outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowSocialMedia(true)}
            className="text-[#1E1D32] p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Employee Connect"
            title="Employee Connect"
          >
            <UsersThree size={20} weight="bold" />
          </button>

          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-[#1E1D32] p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={20} weight="bold" />
            </button>
            <NotificationCount count={100} style="-top-1 -right-1" />
          </div>

          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowIndex(true)}
              className="text-[#1E1D32] p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Inbox"
            >
              <Tray size={20} weight="bold" />
            </button>
            <NotificationCount count={100} style="-top-1 -right-1" />
          </div>

          <ReusableAvatar
            src={photoURL || "/images/alexander.png"}
            name={fullname || "Alexander"}
            size={34}
            shape="circle"
            showBorder={true}
            borderColor="#E5E7EB"
            onClick={handleProfile}
            title={`${fullname || "Alexander"} - View Profile`}
            className="hover:ring-2 hover:ring-[#8570EE] transition-all cursor-pointer"
          />
        </div>
      </header>

      <NotificationModal open={showModal} onClose={() => setShowModal(false)} />
      <InboxModal open={showIndex} onClose={() => setShowIndex(false)} />
      <EmployeeConnectDrawer isOpen={showSocialMedia} onClose={() => setShowSocialMedia(false)} />
    </>
  )
}
