"use client"

import { useState, useMemo } from "react"
import {
  Layers,
  CheckCircle2,
  Users,
  Search,
  ChevronDown,
  Plus,
  Eye,
  Pencil,
  Ban,
  RotateCcw,
} from "lucide-react"
import { DepartmentRecord } from "../types"
import { initialMockDepartments } from "../data/mockDepartments"
import AddDepartmentModal from "./AddDepartmentModal"
import ViewDepartmentModal from "./ViewDepartmentModal"
import EditDepartmentModal from "./EditDepartmentModal"
import ReusablePagination from "../../../../../reusableComponents/ReusablePagination"

interface DepartmentsViewProps {
  onTabChange: (tab: "users" | "departments") => void
  onAddDepartmentClick?: () => void
  onViewDepartment?: (
    dept: DepartmentRecord,
    subTab?: "designations" | "employees"
  ) => void
  departments?: DepartmentRecord[]
  onAddDepartment?: (newDept: DepartmentRecord) => void
  onUpdateDepartment?: (updatedDept: DepartmentRecord) => void
  onToggleStatus?: (id: string) => void
}

export default function DepartmentsView({
  onTabChange,
  onAddDepartmentClick,
  onViewDepartment,
  departments: controlledDepartments,
  onAddDepartment: controlledOnAdd,
  onUpdateDepartment: controlledOnUpdate,
  onToggleStatus: controlledOnToggle,
}: DepartmentsViewProps) {
  const [internalDepartments, setInternalDepartments] = useState<
    DepartmentRecord[]
  >(initialMockDepartments)

  const departments = controlledDepartments ?? internalDepartments
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [headFilter, setHeadFilter] = useState("All Heads")

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedDeptForView, setSelectedDeptForView] =
    useState<DepartmentRecord | null>(null)
  const [selectedDeptForEdit, setSelectedDeptForEdit] =
    useState<DepartmentRecord | null>(null)

  const stats = useMemo(() => {
    const total = departments.length
    const active = departments.filter((d) => d.status === "Active").length
    const totalEmployees = departments.reduce(
      (sum, d) => sum + (d.employees || 0),
      0
    )

    let largest = departments[0]
    departments.forEach((d) => {
      if ((d.employees || 0) > (largest?.employees || 0)) {
        largest = d
      }
    })

    return {
      total,
      active,
      totalEmployees,
      largestName: largest ? largest.name : "Technology",
      largestCount: largest ? largest.employees : 82,
    }
  }, [departments])

  const departmentHeads = useMemo(() => {
    const heads = departments.map((d) => d.departmentHead).filter(Boolean)
    return Array.from(new Set(heads))
  }, [departments])

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch =
        search === "" ||
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.code.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "All Statuses" ||
        statusFilter === "Status" ||
        dept.status === statusFilter

      const matchesHead =
        headFilter === "All Heads" ||
        headFilter === "Department Head" ||
        dept.departmentHead === headFilter

      return matchesSearch && matchesStatus && matchesHead
    })
  }, [departments, search, statusFilter, headFilter])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / pageSize)
  )

  const paginatedDepartments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredDepartments.slice(start, start + pageSize)
  }, [filteredDepartments, currentPage, pageSize])

  const handleAddDepartment = (newDept: DepartmentRecord) => {
    if (controlledOnAdd) {
      controlledOnAdd(newDept)
    } else {
      setInternalDepartments((prev) => [newDept, ...prev])
    }
    setCurrentPage(1)
  }

  const handleUpdateDepartment = (updatedDept: DepartmentRecord) => {
    if (controlledOnUpdate) {
      controlledOnUpdate(updatedDept)
    } else {
      setInternalDepartments((prev) =>
        prev.map((d) => (d.id === updatedDept.id ? updatedDept : d))
      )
    }
  }

  const handleToggleStatus = (id: string) => {
    if (controlledOnToggle) {
      controlledOnToggle(id)
    } else {
      setInternalDepartments((prev) =>
        prev.map((d) => {
          if (d.id === id) {
            const nextStatus = d.status === "Active" ? "Inactive" : "Active"
            return { ...d, status: nextStatus }
          }
          return d
        })
      )
    }
  }

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("All Statuses")
    setHeadFilter("All Heads")
    setCurrentPage(1)
  }

  const handleView = (
    dept: DepartmentRecord,
    subTab: "designations" | "employees" = "designations"
  ) => {
    if (onViewDepartment) {
      onViewDepartment(dept, subTab)
    } else {
      setSelectedDeptForView(dept)
    }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Departments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Manage departments, department heads, and assigned employees across
          the organization.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

        <button
          type="button"
          onClick={() => {
            if (onAddDepartmentClick) {
              onAddDepartmentClick()
            } else {
              setIsAddModalOpen(true)
            }
          }}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-200 transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.total}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Total Departments
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.active}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Active Departments
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.totalEmployees}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Total Employees
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-white flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div
            className="flex flex-col min-w-0 flex-1 overflow-x-auto custom-scrollbar pb-1"
            title={`${stats.largestName} • ${stats.largestCount} Empl`}
          >
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
              Largest Department
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 leading-tight mt-0.5 whitespace-nowrap">
              {stats.largestName} • {stats.largestCount} Empl
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 min-w-[240px] bg-white rounded-2xl shadow-xs px-4 py-2.5 flex items-center gap-3 border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search Department"
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="relative flex-1 sm:w-44 bg-white rounded-2xl shadow-xs border border-white px-3 py-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
            >
              <option value="All Statuses">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:w-48 bg-white rounded-2xl shadow-xs border border-white px-3 py-2">
            <select
              value={headFilter}
              onChange={(e) => {
                setHeadFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
            >
              <option value="All Heads">Department Head</option>
              {departmentHeads.map((head) => (
                <option key={head} value={head}>
                  {head}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          {(search !== "" ||
            statusFilter !== "All Statuses" ||
            headFilter !== "All Heads") && (
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset Filters"
              className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl shadow-xs border border-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-white overflow-hidden p-3 sm:p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3.5 pl-3 font-semibold">DEPARTMENT</th>
                <th className="pb-3.5 px-3 font-semibold">CODE</th>
                <th className="pb-3.5 px-3 font-semibold">DEPARTMENT HEAD</th>
                <th className="pb-3.5 px-3 font-semibold">EMPLOYEES</th>
                <th className="pb-3.5 px-3 font-semibold">DESIGNATIONS</th>
                <th className="pb-3.5 px-3 font-semibold">STATUS</th>
                <th className="pb-3.5 pr-3 font-semibold text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedDepartments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-slate-400"
                  >
                    No departments found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedDepartments.map((dept) => {
                  const initials = dept.code.substring(0, 2).toUpperCase()

                  return (
                    <tr
                      key={dept.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="py-3.5 pl-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] font-bold text-[11px] flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleView(dept, "designations")}
                            className="font-bold text-slate-900 whitespace-nowrap hover:text-[#4F46E5] transition-colors cursor-pointer text-left"
                          >
                            {dept.name}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                        {dept.code}
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                        {dept.departmentHead}
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleView(dept, "employees")}
                          className="hover:text-[#4F46E5] font-semibold text-slate-700 transition-colors cursor-pointer"
                        >
                          {dept.employees}
                        </button>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleView(dept, "designations")}
                          className="hover:text-[#4F46E5] font-semibold text-slate-700 transition-colors cursor-pointer"
                        >
                          {dept.designations}
                        </button>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            dept.status === "Active"
                              ? "bg-[#ECFDF5] text-[#10B981]"
                              : "bg-[#FEF2F2] text-[#EF4444]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              dept.status === "Active"
                                ? "bg-[#10B981]"
                                : "bg-[#EF4444]"
                            }`}
                          />
                          {dept.status}
                        </span>
                      </td>

                      <td className="py-3.5 pr-3 whitespace-nowrap text-center">
                        <div className="inline-flex items-center justify-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleView(dept, "designations")}
                            title="View department details"
                            className="p-1 text-[#818CF8] hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-md transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedDeptForEdit(dept)}
                            title="Edit department"
                            className="p-1 text-[#818CF8] hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-md transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(dept.id)}
                            title={
                              dept.status === "Active"
                                ? "Deactivate department"
                                : "Activate department"
                            }
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              dept.status === "Active"
                                ? "text-[#818CF8] hover:text-rose-500 hover:bg-rose-50"
                                : "text-rose-400 hover:text-emerald-500 hover:bg-emerald-50"
                            }`}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDepartments.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          showPageSize={false}
          showTotalInfo={true}
          showJumpToPage={false}
        />
      </div>

      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDepartment}
      />

      <ViewDepartmentModal
        department={selectedDeptForView}
        onClose={() => setSelectedDeptForView(null)}
        onEdit={(dept) => {
          setSelectedDeptForView(null)
          setSelectedDeptForEdit(dept)
        }}
      />

      <EditDepartmentModal
        department={selectedDeptForEdit}
        isOpen={Boolean(selectedDeptForEdit)}
        onClose={() => setSelectedDeptForEdit(null)}
        onSave={handleUpdateDepartment}
      />
    </div>
  )
}
