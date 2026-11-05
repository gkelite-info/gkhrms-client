"use client"

import { useState, useEffect } from "react"
import { X, Pencil } from "lucide-react"
import { DepartmentRecord } from "../types"

interface EditDepartmentModalProps {
  department: DepartmentRecord | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedDept: DepartmentRecord) => void
}

export default function EditDepartmentModal({
  department,
  isOpen,
  onClose,
  onSave,
}: EditDepartmentModalProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [departmentHead, setDepartmentHead] = useState("")
  const [designations, setDesignations] = useState(1)
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")

  useEffect(() => {
    if (department) {
      setName(department.name)
      setCode(department.code)
      setDepartmentHead(department.departmentHead)
      setDesignations(department.designations)
      setStatus(department.status)
    }
  }, [department])

  if (!isOpen || !department) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...department,
      name: name.trim() || department.name,
      code: code.trim().toUpperCase() || department.code,
      departmentHead: departmentHead.trim() || department.departmentHead,
      designations: Number(designations) || department.designations,
      status,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[75vh] sm:max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <Pencil className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Edit Department
              </h2>
              <p className="text-[11px] text-slate-500">
                Update information for {department.code}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Department Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Department Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Department Head
              </label>
              <input
                type="text"
                value={departmentHead}
                onChange={(e) => setDepartmentHead(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Number of Designations
              </label>
              <input
                type="number"
                min={1}
                value={designations}
                onChange={(e) => setDesignations(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-100 bg-white shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

