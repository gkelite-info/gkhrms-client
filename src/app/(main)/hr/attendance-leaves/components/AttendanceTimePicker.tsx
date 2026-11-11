"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { Clock, CaretDown } from "phosphor-react"
import { HOURS, MINUTES, parseTimeString, formatTimeString } from "./attendanceTimeUtils"

interface AttendanceTimePickerProps {
  value: string
  onChange: (newValue: string) => void
  disabled?: boolean
  ariaLabel?: string
  className?: string
  buttonClassName?: string
}

export default function AttendanceTimePicker({
  value,
  onChange,
  disabled = false,
  ariaLabel = "Select time",
  className = "relative inline-block",
  buttonClassName = "",
}: AttendanceTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLDivElement>(null)
  const minutesRef = useRef<HTMLDivElement>(null)

  const { hour, minute, period } = parseTimeString(value)
  const displayValue = value && value !== "-" ? value : formatTimeString(hour, minute, period)

  useEffect(() => { setMounted(true) }, [])

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const popoverHeight = 220
    const spaceBelow = window.innerHeight - rect.bottom
    const shouldOpenUp = spaceBelow < popoverHeight && rect.top > popoverHeight
    const top = shouldOpenUp ? rect.top - popoverHeight - 6 : rect.bottom + 6
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - 228))
    setCoords({ top, left })
  }, [])

  const handleToggle = () => {
    if (disabled) return
    if (!isOpen) updatePosition()
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false) }
    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("keydown", handleKey)
    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleKey)
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen, updatePosition])

  useEffect(() => {
    if (!isOpen) return
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
      const el = ref.current?.querySelector<HTMLElement>("[data-selected='true']")
      if (el && ref.current) ref.current.scrollTop = el.offsetTop - ref.current.offsetTop - 36
    }
    scrollTo(hoursRef)
    scrollTo(minutesRef)
  }, [isOpen])

  const defaultBtn = `h-8 px-2.5 rounded-lg border transition-all flex items-center justify-between gap-1.5 w-[114px] bg-white cursor-pointer shadow-2xs select-none ${
    isOpen ? "border-[#5B50EC] ring-1 ring-[#5B50EC]/30 text-[#5B50EC]" : "border-gray-200 hover:border-[#5B50EC] text-gray-800 hover:bg-gray-50/50"
  }`
  const customBtn = `border transition-all flex items-center justify-between gap-1.5 cursor-pointer shadow-2xs select-none ${
    isOpen ? "border-[#5B50EC] ring-1 ring-[#5B50EC]/30 text-[#5B50EC]" : "border-gray-200 hover:border-[#5B50EC]"
  } ${buttonClassName}`

  return (
    <div className={className} ref={containerRef} aria-label={ariaLabel}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`${buttonClassName ? customBtn : defaultBtn} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <Clock size={13} weight="bold" className={isOpen ? "text-[#5B50EC]" : "text-gray-400"} />
          <span className="text-xs font-semibold tracking-tight truncate">{displayValue}</span>
        </div>
        <CaretDown size={11} weight="bold" className={`text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && mounted && createPortal(
        <div
          ref={popoverRef}
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          className="fixed z-[99999] bg-white border border-gray-100 rounded-2xl shadow-2xl p-3 w-[218px] animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Hour</span>
              <div ref={hoursRef} className="h-36 overflow-y-auto w-full flex flex-col gap-1 pr-0.5 custom-scrollbar">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    data-selected={h === hour}
                    onClick={() => onChange(formatTimeString(h, minute, period))}
                    className={`w-full py-1.5 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer ${
                      h === hour ? "bg-[#5B50EC] text-white shadow-2xs font-bold" : "text-gray-700 hover:bg-[#F3F2FD] hover:text-[#5B50EC]"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Min</span>
              <div ref={minutesRef} className="h-36 overflow-y-auto w-full flex flex-col gap-1 pr-0.5 custom-scrollbar">
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-selected={m === minute}
                    onClick={() => onChange(formatTimeString(hour, m, period))}
                    className={`w-full py-1.5 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer ${
                      m === minute ? "bg-[#5B50EC] text-white shadow-2xs font-bold" : "text-gray-700 hover:bg-[#F3F2FD] hover:text-[#5B50EC]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Period</span>
              <div className="flex flex-col gap-2 w-full pt-1">
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onChange(formatTimeString(hour, minute, p))}
                    className={`w-full py-2.5 text-xs font-bold rounded-xl text-center transition-all cursor-pointer border ${
                      period === p
                        ? "bg-[#5B50EC] text-white border-[#5B50EC] shadow-xs"
                        : "bg-gray-50/80 text-gray-700 border-gray-200 hover:bg-[#F3F2FD] hover:text-[#5B50EC] hover:border-[#DDD9FD]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#5B50EC] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
              <span>{displayValue}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-xs font-semibold bg-[#5B50EC] text-white hover:bg-[#4B40DC] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
