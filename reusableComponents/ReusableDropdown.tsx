"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDown, Check } from "phosphor-react"

export interface DropdownOption<T = string | number> {
  label: string | React.ReactNode
  value: T
  disabled?: boolean
}

export interface ReusableDropdownProps<T = string | number> {
  value: T | T[]
  options: (DropdownOption<T> | T)[]
  onChange: (value: any) => void
  onApply?: (value: T[]) => void
  selectionType?: "default" | "radio" | "checkbox"
  multiple?: boolean
  placeholder?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  align?: "left" | "right" | "full"
  dropdownHeight?: number
}

export default function ReusableDropdown<T extends string | number>({
  value,
  options,
  onChange,
  onApply,
  selectionType = "default",
  multiple = false,
  placeholder = "Select...",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  align = "right",
  dropdownHeight = 160,
}: ReusableDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const normalizedOptions: DropdownOption<T>[] = options.map((opt) =>
    typeof opt === "object" && opt !== null && "value" in opt
      ? (opt as DropdownOption<T>)
      : { label: String(opt), value: opt as T }
  )

  const [pendingSelected, setPendingSelected] = useState<T[]>(() =>
    Array.isArray(value) ? value : value !== undefined && value !== null ? [value as T] : []
  )

  useEffect(() => {
    if (multiple) {
      setPendingSelected(
        Array.isArray(value)
          ? value
          : value !== undefined && value !== null
          ? [value as T]
          : []
      )
    }
  }, [value, multiple])

  const isSelected = (val: T) =>
    Array.isArray(value) ? value.includes(val) : value === val

  const isOptionActive = (val: T) => {
    if (multiple) {
      return pendingSelected.includes(val)
    }
    return isSelected(val)
  }

  const selectedOption = normalizedOptions.find((opt) => isSelected(opt.value))

  const calculatePosition = useCallback(() => {
    if (!dropdownRef.current) return
    const rect = dropdownRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow)
  }, [dropdownHeight])

  const toggleDropdown = () => {
    if (!isOpen) {
      calculatePosition()
      if (multiple) {
        setPendingSelected(
          Array.isArray(value)
            ? [...value]
            : value !== undefined && value !== null
            ? [value as T]
            : []
        )
      }
    }
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      document.addEventListener("keydown", handleEscape)
      window.addEventListener("scroll", calculatePosition, true)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
      window.removeEventListener("scroll", calculatePosition, true)
    }
  }, [isOpen, calculatePosition])

  const handleOptionClick = (optVal: T) => {
    if (multiple) {
      setPendingSelected((prev) =>
        prev.includes(optVal)
          ? prev.filter((v) => v !== optVal)
          : [...prev, optVal]
      )
    } else {
      onChange(optVal)
      setIsOpen(false)
    }
  }

  const getTriggerLabel = () => {
    if (multiple) {
      const selectedList = Array.isArray(value) ? value : []
      if (selectedList.length === 0) return placeholder
      if (selectedList.length === 1) {
        const found = normalizedOptions.find((o) => o.value === selectedList[0])
        return found ? found.label : String(selectedList[0])
      }
      return `${selectedList.length} Roles Selected`
    }
    return selectedOption ? selectedOption.label : placeholder
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-xs ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-[#5B50EC] hover:bg-[#F9F9FE] transition-all cursor-pointer font-medium select-none shadow-xs ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{getTriggerLabel()}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#5B50EC]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: openUpward ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: openUpward ? 4 : -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 flex flex-col bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden ${
              align === "full"
                ? "left-0 right-0 w-full"
                : align === "right"
                ? "right-0 min-w-[150px]"
                : "left-0 min-w-[150px]"
            } ${openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"} ${menuClassName}`}
            role="listbox"
          >
            <div className="max-h-52 overflow-y-auto p-1.5 custom-scrollbar flex flex-col">
              {normalizedOptions.map((opt) => {
                const active = isOptionActive(opt.value)
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => handleOptionClick(opt.value)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2.5 my-0.5 select-none ${
                      active
                        ? "bg-[#F1F0FD] text-[#5B50EC] font-semibold"
                        : "text-gray-700 hover:bg-[#F9F9FE] hover:text-[#5B50EC]"
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="truncate">{opt.label}</span>

                    {selectionType === "radio" && (
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          active ? "border-[#5B50EC]" : "border-gray-300"
                        }`}
                      >
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#5B50EC]" />}
                      </span>
                    )}

                    {selectionType === "checkbox" && (
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          active ? "bg-[#5B50EC] border-[#5B50EC] text-white" : "border-gray-300 bg-white"
                        }`}
                      >
                        {active && <Check size={11} weight="bold" />}
                      </span>
                    )}

                    {selectionType === "default" && active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B50EC] flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {multiple && (
              <div className="p-2 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setPendingSelected(Array.isArray(value) ? value : [])
                    setIsOpen(false)
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPendingSelected([])}
                    className="px-2.5 py-1 text-xs font-semibold text-[#5B50EC] hover:bg-[#EEF2FF] rounded-lg transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(pendingSelected)
                      onApply?.(pendingSelected)
                      setIsOpen(false)
                    }}
                    className="px-3 py-1 bg-[#5B50EC] hover:bg-[#4a40d4] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
