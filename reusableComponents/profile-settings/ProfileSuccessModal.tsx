"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "phosphor-react"

interface ProfileSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  empId?: string
  userName?: string
}

export default function ProfileSuccessModal({
  isOpen,
  onClose,
  empId = "GK10234",
  userName = "Rohit Sharma",
}: ProfileSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col items-center text-center gap-4"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={16} weight="bold" />
            </button>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm mt-2">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                <Check size={28} weight="bold" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Profile Updated Successfully!
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                Your profile information has been updated and synced across GK-HRMS records.
              </p>
            </div>

            <div className="inline-flex items-center flex-wrap justify-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-emerald-700 font-bold">Live Sync</span>
              <span className="text-gray-300">•</span>
              <span>{empId}</span>
              <span className="text-gray-300">|</span>
              <span className="font-semibold text-gray-800">{userName}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 py-2.5 sm:py-3 rounded-2xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5B50EC]/20 transition-all cursor-pointer active:scale-98"
            >
              Return to directory
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

