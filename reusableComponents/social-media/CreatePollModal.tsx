"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartBar, X, Check } from "phosphor-react"
import ReusableDropdown from "../ReusableDropdown"
import ReusableDateFilter from "../ReusableDateFilter"
import { SocialPost, SOCIAL_AUDIENCE_OPTIONS, SocialPollOption } from "./types"
import SocialMediaPollOptionsEditor from "./SocialMediaPollOptionsEditor"

interface CreatePollModalProps {
  isOpen: boolean
  onClose: () => void
  onPollCreated?: (newPost: SocialPost) => void
  pollToEdit?: SocialPost | null
  onPollUpdated?: (updatedPost: SocialPost) => void
}

export default function CreatePollModal({
  isOpen,
  onClose,
  onPollCreated,
  pollToEdit,
  onPollUpdated,
}: CreatePollModalProps) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState<string[]>(["", "", ""])
  const [audience, setAudience] = useState("all")
  const [closeDate, setCloseDate] = useState<string>("20 Nov 2026")

  useEffect(() => {
    if (isOpen) {
      if (pollToEdit?.pollData) {
        setQuestion(pollToEdit.pollData.question)
        setOptions(pollToEdit.pollData.options.map((o) => o.text))
        setCloseDate(pollToEdit.pollData.endDate || "20 Nov 2026")
      } else {
        setQuestion("")
        setOptions(["", "", ""])
        setCloseDate("20 Nov 2026")
      }
    }
  }, [isOpen, pollToEdit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valid = options.filter((o) => o.trim().length > 0)
    if (!question.trim() || valid.length < 2) return

    const pollOptions: SocialPollOption[] = valid.map((txt, i) => ({
      id: `opt_${i + 1}`, text: txt.trim(), votes: pollToEdit?.pollData?.options[i]?.votes || 0,
    }))

    if (pollToEdit) {
      onPollUpdated?.({
        ...pollToEdit,
        pollData: {
          question: question.trim(),
          options: pollOptions,
          totalVotes: pollToEdit.pollData?.totalVotes || 0,
          endDate: closeDate,
        },
      })
    } else {
      onPollCreated?.({
        id: `poll_${Date.now()}`,
        authorName: "Alexander",
        authorInitials: "AL",
        authorRole: "Team Lead",
        category: "general",
        categoryBadge: "Live Poll",
        timestamp: "Just now",
        content: "",
        pollData: { question: question.trim(), options: pollOptions, totalVotes: 0, endDate: closeDate },
        likesCount: 0,
        commentsCount: 0,
        isCurrentUserPost: true,
        comments: [],
      })
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-[540px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[92vh]"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                  <ChartBar size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {pollToEdit ? "Edit Poll" : "Create Poll"}
                  </h3>
                  <p className="text-xs text-gray-500">Get opinions, run a quick survey, or make a decision</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Poll Question <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.slice(0, 200))}
                  placeholder="Ask a question to your team..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#5B50EC] focus:ring-2 focus:ring-[#5B50EC]/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400"
                  required
                />
                <span className="text-[11px] text-gray-400 text-right self-end font-medium">{question.length}/200</span>
              </div>

              <SocialMediaPollOptionsEditor
                options={options}
                onChangeOption={(idx, val) => setOptions((prev) => prev.map((opt, i) => (i === idx ? val : opt)))}
                onAddOption={() => setOptions((prev) => (prev.length < 6 ? [...prev, ""] : prev))}
                onRemoveOption={(idx) => setOptions((prev) => (prev.length > 2 ? prev.filter((_, i) => i !== idx) : prev))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Audience <span className="text-rose-500">*</span></label>
                  <ReusableDropdown
                    value={audience}
                    options={SOCIAL_AUDIENCE_OPTIONS}
                    onChange={(val) => setAudience(val)}
                    align="full"
                    buttonClassName="w-full text-xs font-medium py-2.5 px-3 bg-white rounded-xl border border-gray-200 hover:border-[#5B50EC]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Close Poll On (Date Only) <span className="text-rose-500">*</span></label>
                  <ReusableDateFilter
                    modes={["date"]}
                    value={closeDate}
                    onChange={(val: any) => {
                      if (typeof val === "string") setCloseDate(val)
                      else if (val?.label) setCloseDate(val.label)
                      else if (val?.selectedDate) setCloseDate(val.selectedDate)
                    }}
                    title="Close Poll Date"
                    subtitle="Select the date when voting closes"
                    hideTabsIfSingle={true}
                    className="w-full"
                    buttonClassName="w-full h-[40px] px-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#5B50EC] transition-all text-xs text-gray-900 font-medium flex items-center justify-between cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!question.trim() || options.filter((o) => o.trim()).length < 2}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5B50EC] hover:bg-[#483ece] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-[#5B50EC]/20"
                >
                  <Check size={15} weight="bold" />
                  <span>{pollToEdit ? "Save Changes" : "Create Poll"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
