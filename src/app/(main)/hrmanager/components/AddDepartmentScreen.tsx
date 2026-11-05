"use client"

import { useState, useRef, useEffect } from "react"
import { Users, Layers, ChevronDown } from "lucide-react"
import { DepartmentRecord } from "../types"

interface AddDepartmentScreenProps {
  onCancel: () => void
  onSave: (newDept: DepartmentRecord) => void
  onTabChange: (tab: "users" | "departments") => void
  departmentHeads?: string[]
}

const defaultHeads = [
  "Priya Sharma",
  "Ravi Kumar",
  "Neha Patel",
  "Sneha Rao",
  "Vikram Reddy",
  "Arjun Mehta",
  "Ananya Sen",
  "Rajesh Nair",
  "Meenakshi Sundaram",
  "Daniel Dsouza",
  "Suresh Raina",
  "Tara Alva",
]

export default function AddDepartmentScreen({
  onCancel,
  onSave,
  onTabChange,
  departmentHeads = defaultHeads,
}: AddDepartmentScreenProps) {
  const [name, setName] = useState("Design")
  const [code, setCode] = useState("DES")
  const [departmentHead, setDepartmentHead] = useState("Priya Sharma")
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [isHeadDropdownOpen, setIsHeadDropdownOpen] = useState(false)
  const [error, setError] = useState("")

  const statusRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false)
      }
      if (
        headRef.current &&
        !headRef.current.contains(event.target as Node)
      ) {
        setIsHeadDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter a department name.")
      return
    }

    const generatedCode =
      code.trim().toUpperCase() ||
      name.trim().substring(0, 3).toUpperCase()

    const newDept: DepartmentRecord = {
      id: `dept-${Date.now()}`,
      name: name.trim(),
      code: generatedCode,
      departmentHead: departmentHead || "Unassigned",
      employees: 0,
      designations: 1,
      status,
    }

    onSave(newDept)
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Add Department
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Create or update department details.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange("users")}
          className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span>User Registration</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("departments")}
          className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 bg-[#4F46E5] text-white shadow-sm shadow-indigo-200 transition-all cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          <span>Departments</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-xl border border-rose-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-white space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Department Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                placeholder="Design"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Department Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="DES"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Department Head <span className="text-rose-500">*</span>
              </label>
              <div ref={headRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsHeadDropdownOpen((prev) => !prev)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] cursor-pointer transition-all"
                >
                  <span>{departmentHead}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
                {isHeadDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1">
                    {departmentHeads.map((head) => (
                      <button
                        key={head}
                        type="button"
                        onClick={() => {
                          setDepartmentHead(head)
                          setIsHeadDropdownOpen(false)
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                          head === departmentHead
                            ? "bg-indigo-50/50 text-[#4F46E5] font-semibold"
                            : "text-slate-700"
                        }`}
                      >
                        {head}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Status <span className="text-rose-500">*</span>
              </label>
              <div ref={statusRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    <span>{status}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("Active")
                        setIsStatusDropdownOpen(false)
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                        status === "Active"
                          ? "bg-indigo-50/50 text-[#4F46E5] font-semibold"
                          : "text-slate-700"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>Active</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("Inactive")
                        setIsStatusDropdownOpen(false)
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                        status === "Inactive"
                          ? "bg-indigo-50/50 text-[#4F46E5] font-semibold"
                          : "text-slate-700"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>Inactive</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
          >
            Save Department
          </button>
        </div>
      </form>
    </div>
  )
}
