"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, WarningCircle, Info } from "phosphor-react"

export type ConfirmationType = "danger" | "success" | "warning" | "info"

export interface ReusableConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  type?: ConfirmationType
  isLoading?: boolean
}

const TYPE_CONFIG = {
  danger: {
    icon: X,
    ring: "ring-red-500/20",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
    confirmBg:
      "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-[0_4px_14px_0_rgba(239,68,68,0.4)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)]",
  },
  success: {
    icon: Check,
    ring: "ring-emerald-500/20",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    confirmBg:
      "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_4px_14px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)]",
  },
  warning: {
    icon: WarningCircle,
    ring: "ring-amber-500/20",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    confirmBg:
      "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-[0_4px_14px_0_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)]",
  },
  info: {
    icon: Info,
    ring: "ring-[#5B50EC]/20",
    iconBg: "bg-gradient-to-br from-[#5B50EC] to-[#4338CA]",
    confirmBg:
      "bg-gradient-to-r from-[#5B50EC] to-[#4338CA] hover:from-[#4a40d4] hover:to-[#3730A3] shadow-[0_4px_14px_0_rgba(91,80,236,0.4)] hover:shadow-[0_6px_20px_rgba(91,80,236,0.5)]",
  },
} as const

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const fadeUp: any = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

export default function ReusableConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
  isLoading = false,
}: ReusableConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, isLoading, onClose])

  const config = TYPE_CONFIG[type] || TYPE_CONFIG.info
  const IconComponent = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !isLoading && onClose()}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-[400px] bg-white rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3)] overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center text-center px-7 pt-8 pb-7"
            >
              <motion.div variants={fadeUp}>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: 0.08,
                  }}
                  className={`w-[72px] h-[72px] rounded-full ${config.iconBg} text-white flex items-center justify-center ring-[10px] ${config.ring} mb-5`}
                >
                  <IconComponent size={32} weight="bold" />
                </motion.div>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold text-gray-900 leading-tight mb-2"
              >
                {title}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-sm text-gray-500 leading-relaxed max-w-[300px] mb-6"
              >
                {description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-3 w-full">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onClose}
                  className="flex-1 h-12 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-semibold transition-all duration-200 hover:bg-gray-100 hover:border-gray-300 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onConfirm}
                  className={`flex-1 h-12 rounded-2xl text-white text-sm font-semibold transition-all duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${config.confirmBg}`}
                >
                  {isLoading ? "Processing..." : confirmText}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
