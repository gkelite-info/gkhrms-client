"use client"

import { useState, useEffect, useCallback, type ComponentType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "phosphor-react"

export interface ReusableSidebarItem {
  label: string
  href: string
  icon: ComponentType<{
    size?: number
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
    className?: string
  }>
  exact?: boolean
  badge?: string | number
  onClick?: () => void
}

export interface ReusableSidebarProps {
  items: ReusableSidebarItem[]
  toggleEventName?: string
  closeEventName?: string
  desktopWidthClass?: string
  drawerWidthClass?: string
  activeColorClass?: string
  inactiveColorClass?: string
  footerText?: string
  menuTitle?: string
  isItemActive?: (item: ReusableSidebarItem, pathname: string) => boolean
  className?: string
}

export default function ReusableSidebar({
  items,
  toggleEventName,
  closeEventName,
  desktopWidthClass = "w-[210px] min-w-[210px] max-w-[210px] shrink-0",
  drawerWidthClass = "w-[240px]",
  activeColorClass = "bg-[#5B50EC] text-white shadow-sm ring-1 ring-[#5B50EC]/30",
  inactiveColorClass = "text-[#4B5563] hover:text-[#5B50EC] hover:bg-[#F3F2FD]",
  footerText = "Powered by GK Elite",
  menuTitle = "Menu",
  isItemActive,
  className = "",
}: ReusableSidebarProps) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleClose = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    const handleToggle = () => setDrawerOpen((prev) => !prev)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false)
    }

    if (toggleEventName) window.addEventListener(toggleEventName, handleToggle)
    window.addEventListener("toggle-sidebar", handleToggle)
    if (closeEventName) window.addEventListener(closeEventName, handleClose)
    window.addEventListener("close-sidebar", handleClose)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      if (toggleEventName) window.removeEventListener(toggleEventName, handleToggle)
      window.removeEventListener("toggle-sidebar", handleToggle)
      if (closeEventName) window.removeEventListener(closeEventName, handleClose)
      window.removeEventListener("close-sidebar", handleClose)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleEventName, closeEventName, handleClose])

  const checkIsActive = (item: ReusableSidebarItem): boolean => {
    if (!pathname) return false
    if (isItemActive) return isItemActive(item, pathname)
    if (item.exact) return pathname === item.href
    if (
      item.href === "/" ||
      item.href === "/employee" ||
      item.href === "/teamlead" ||
      item.href === "/manager" ||
      item.href === "/hr" ||
      item.href === "/admin"
    ) {
      return pathname === item.href
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  }

  const renderNavList = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = checkIsActive(item)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (item.onClick) item.onClick()
              setDrawerOpen(false)
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 w-full min-w-0 ${
              isActive ? activeColorClass : inactiveColorClass
            }`}
          >
            <Icon
              size={19}
              weight={isActive ? "fill" : "bold"}
              className="shrink-0"
            />
            <span className="flex-1 min-w-0 text-xs font-semibold leading-snug break-words whitespace-normal text-left">
              {item.label}
            </span>
            {item.badge !== undefined && (
              <span className="ml-auto px-2 py-0.5 text-[10px] rounded-full bg-indigo-100 text-[#5B50EC] font-bold shrink-0">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-xs cursor-pointer"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 ${drawerWidthClass} bg-white py-5 shadow-2xl flex flex-col justify-between`}
            >
              <div className="flex flex-col gap-5 flex-1 min-h-0">
                <div className="flex items-center justify-between pb-3 px-5 border-b border-gray-100 shrink-0">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {menuTitle}
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar sidebar-scrollbar px-4 min-h-0">
                  {renderNavList()}
                </div>
              </div>

              <div className="pt-4 px-4 text-center shrink-0">
                <span className="text-[10px] font-semibold text-[#8C8EA6] tracking-wide">
                  {footerText}
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside
        className={`hidden lg:flex ${desktopWidthClass} bg-white h-full border-r border-gray-100 py-3.5 flex-col justify-between select-none ${className}`}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar sidebar-scrollbar px-3 flex flex-col pt-1 min-h-0">
          {renderNavList()}
        </div>

        <div className="pt-3 pb-1 px-3 text-center shrink-0">
          <span className="text-[10px] font-semibold text-[#8C8EA6] tracking-wide">
            {footerText}
          </span>
        </div>
      </aside>
    </>
  )
}
