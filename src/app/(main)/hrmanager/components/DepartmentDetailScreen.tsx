"use client"

import { useState, useMemo } from "react"
import {
  Layers,
  Users,
  Search,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react"
import { DepartmentRecord, UserRecord, UserStatus } from "../types"
import {
  DepartmentDesignation,
  DepartmentEmployee,
  initialMockDesignations,
  initialMockDepartmentEmployees,
} from "../data/mockDepartmentDetails"
import UserDetailsModal from "./UserDetailsModal"
import EditUserModal from "./EditUserModal"

interface DepartmentDetailScreenProps {
  department: DepartmentRecord
  onBack: () => void
  initialSubTab?: "designations" | "employees"
}

export default function DepartmentDetailScreen({
  department,
  onBack,
  initialSubTab = "designations",
}: DepartmentDetailScreenProps) {
  const [activeSubTab, setActiveSubTab] = useState<"designations" | "employees">(
    initialSubTab
  )

  const [designations, setDesignations] = useState<DepartmentDesignation[]>(
    () => {
      if (initialMockDesignations[department.id]) {
        return initialMockDesignations[department.id]
      }
      return [
        {
          id: `des-${department.id}-1`,
          name: `${department.name} Lead`,
          departmentId: department.id,
          employees: 1,
          status: "Active",
        },
        {
          id: `des-${department.id}-2`,
          name: `Senior ${department.name} Specialist`,
          departmentId: department.id,
          employees: Math.max(1, Math.floor(department.employees * 0.3)),
          status: "Active",
        },
        {
          id: `des-${department.id}-3`,
          name: `${department.name} Specialist`,
          departmentId: department.id,
          employees: Math.max(1, Math.floor(department.employees * 0.5)),
          status: "Active",
        },
      ]
    }
  )

  const [employees, setEmployees] = useState<DepartmentEmployee[]>(() => {
    if (initialMockDepartmentEmployees[department.id]) {
      return initialMockDepartmentEmployees[department.id]
    }
    return [
      {
        id: `emp-${department.id}-1`,
        name: department.departmentHead,
        initials: department.departmentHead
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase(),
        employeeId: "EMP1001",
        email: `${department.departmentHead
          .toLowerCase()
          .replace(/\s+/g, ".")}@gkhrms.com`,
        phone: "+91 98765 43210",
        designation: `${department.name} Lead`,
        role: "Team Lead",
        reportingTo: "—",
        status: "Active",
        workLocation: "Hyderabad",
        joiningDate: "12 Oct 2024",
      },
    ]
  })

  const [designationSearch, setDesignationSearch] = useState("")
  const [designationStatusFilter, setDesignationStatusFilter] = useState("All Status")
  const [designationPage, setDesignationPage] = useState(1)
  const [designationPageSize, setDesignationPageSize] = useState(10)

  const [employeeSearch, setEmployeeSearch] = useState("")
  const [employeeDesignationFilter, setEmployeeDesignationFilter] = useState("All Designations")
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("All Roles")
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState("All Status")
  const [employeePage, setEmployeePage] = useState(1)
  const [employeePageSize, setEmployeePageSize] = useState(10)

  const [isAddDesignationModalOpen, setIsAddDesignationModalOpen] = useState(false)
  const [newDesignationName, setNewDesignationName] = useState("")
  const [newDesignationStatus, setNewDesignationStatus] = useState<UserStatus>("Active")

  const [editingDesignation, setEditingDesignation] = useState<DepartmentDesignation | null>(null)
  const [editDesignationName, setEditDesignationName] = useState("")
  const [editDesignationStatus, setEditDesignationStatus] = useState<UserStatus>("Active")

  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState("")
  const [newEmployeeRole, setNewEmployeeRole] = useState("Employee")
  const [newEmployeeStatus, setNewEmployeeStatus] = useState<UserStatus>("Active")

  const [selectedEmployeeForDetails, setSelectedEmployeeForDetails] = useState<UserRecord | null>(null)
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState<UserRecord | null>(null)

  const filteredDesignations = useMemo(() => {
    return designations.filter((item) => {
      const matchesSearch =
        designationSearch === "" ||
        item.name.toLowerCase().includes(designationSearch.toLowerCase())
      const matchesStatus =
        designationStatusFilter === "All Status" ||
        item.status === designationStatusFilter
      return matchesSearch && matchesStatus
    })
  }, [designations, designationSearch, designationStatusFilter])

  const totalDesignationPages = Math.max(
    1,
    Math.ceil(filteredDesignations.length / designationPageSize)
  )

  const paginatedDesignations = useMemo(() => {
    const start = (designationPage - 1) * designationPageSize
    return filteredDesignations.slice(start, start + designationPageSize)
  }, [filteredDesignations, designationPage, designationPageSize])

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        employeeSearch === "" ||
        emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(employeeSearch.toLowerCase())
      const matchesDesignation =
        employeeDesignationFilter === "All Designations" ||
        emp.designation === employeeDesignationFilter
      const matchesRole =
        employeeRoleFilter === "All Roles" || emp.role === employeeRoleFilter
      const matchesStatus =
        employeeStatusFilter === "All Status" ||
        emp.status === employeeStatusFilter
      return matchesSearch && matchesDesignation && matchesRole && matchesStatus
    })
  }, [
    employees,
    employeeSearch,
    employeeDesignationFilter,
    employeeRoleFilter,
    employeeStatusFilter,
  ])

  const totalEmployeePages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / employeePageSize)
  )

  const paginatedEmployees = useMemo(() => {
    const start = (employeePage - 1) * employeePageSize
    return filteredEmployees.slice(start, start + employeePageSize)
  }, [filteredEmployees, employeePage, employeePageSize])

  const handleCreateDesignation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDesignationName.trim()) return

    const newDes: DepartmentDesignation = {
      id: `des-${Date.now()}`,
      name: newDesignationName.trim(),
      departmentId: department.id,
      employees: 0,
      status: newDesignationStatus,
    }

    setDesignations((prev) => [newDes, ...prev])
    setNewDesignationName("")
    setNewDesignationStatus("Active")
    setIsAddDesignationModalOpen(false)
  }

  const handleSaveEditDesignation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingDesignation || !editDesignationName.trim()) return

    setDesignations((prev) =>
      prev.map((d) =>
        d.id === editingDesignation.id
          ? {
              ...d,
              name: editDesignationName.trim(),
              status: editDesignationStatus,
            }
          : d
      )
    )
    setEditingDesignation(null)
  }

  const handleDeleteDesignation = (id: string) => {
    setDesignations((prev) => prev.filter((d) => d.id !== id))
  }

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmployeeName.trim()) return

    const selectedDes =
      newEmployeeDesignation || designations[0]?.name || "Designer"

    const nextId = `EMP${1000 + employees.length + 1}`
    const initials = newEmployeeName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()

    const newEmp: DepartmentEmployee = {
      id: `emp-${Date.now()}`,
      name: newEmployeeName.trim(),
      initials,
      employeeId: nextId,
      email: `${newEmployeeName.toLowerCase().replace(/\s+/g, ".")}@gkhrms.com`,
      phone: "+91 98765 43210",
      designation: selectedDes,
      role: newEmployeeRole,
      reportingTo: department.departmentHead,
      status: newEmployeeStatus,
      workLocation: "Hyderabad",
      joiningDate: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    }

    setEmployees((prev) => [newEmp, ...prev])
    setDesignations((prev) =>
      prev.map((d) =>
        d.name === selectedDes ? { ...d, employees: d.employees + 1 } : d
      )
    )
    setNewEmployeeName("")
    setNewEmployeeDesignation("")
    setNewEmployeeRole("Employee")
    setNewEmployeeStatus("Active")
    setIsAddEmployeeModalOpen(false)
  }

  const convertToUserRecord = (emp: DepartmentEmployee): UserRecord => {
    return {
      id: emp.id,
      name: emp.name,
      initials: emp.initials,
      employeeId: emp.employeeId,
      email: emp.email,
      phone: emp.phone,
      role: emp.role,
      department: department.name,
      status: emp.status,
      createdDate: emp.joiningDate || "12 Oct 2025",
      designation: emp.designation,
      workLocation: emp.workLocation || "Hyderabad",
      joiningDate: emp.joiningDate || "12 Oct 2025",
      employmentType: "Permanent",
      reportingTo: emp.reportingTo,
      invitationStatus: "Active",
      avatarUrl: emp.avatarUrl,
    }
  }

  const handleOpenUserDetails = (emp: DepartmentEmployee) => {
    setSelectedEmployeeForDetails(convertToUserRecord(emp))
  }

  const handleOpenUserEdit = (emp: DepartmentEmployee) => {
    setSelectedEmployeeForEdit(convertToUserRecord(emp))
  }

  const handleUpdateUserRecord = (updatedUser: UserRecord) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === updatedUser.id
          ? {
              ...e,
              name: updatedUser.name,
              designation: updatedUser.designation || e.designation,
              role: updatedUser.role,
              status: updatedUser.status,
              workLocation: updatedUser.workLocation || e.workLocation,
              reportingTo: updatedUser.reportingTo || e.reportingTo,
            }
          : e
      )
    )
    setSelectedEmployeeForEdit(null)
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Departments</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {department.name} Department
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Code: <span className="text-slate-700 font-semibold">{department.code}</span>
              {"  "}•{"  "}
              Head: <span className="text-slate-700 font-semibold">{department.departmentHead}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 leading-tight block">
                {employees.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Employees
              </span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 leading-tight block">
                {designations.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Designations
              </span>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-[#ECFDF5] text-[#10B981]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>{department.status}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveSubTab("designations")}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "designations"
              ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Designations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("employees")}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "employees"
              ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Employees</span>
        </button>
      </div>

      {activeSubTab === "designations" && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Designations ({designations.length})
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Manage job titles for this department.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddDesignationModalOpen(true)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-200 transition-colors cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add Designation</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center px-3.5 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={designationSearch}
                onChange={(e) => {
                  setDesignationSearch(e.target.value)
                  setDesignationPage(1)
                }}
                placeholder="Search designation..."
                className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="relative w-full sm:w-44 bg-slate-50 rounded-xl border border-slate-100 px-3 py-2">
              <select
                value={designationStatusFilter}
                onChange={(e) => {
                  setDesignationStatusFilter(e.target.value)
                  setDesignationPage(1)
                }}
                className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-slate-400 font-semibold">#</th>
                  <th className="py-3 px-4">Designation Name</th>
                  <th className="py-3 px-4">Employees</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedDesignations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-400 font-medium"
                    >
                      No designations found.
                    </td>
                  </tr>
                ) : (
                  paginatedDesignations.map((item, index) => {
                    const rowNumber =
                      (designationPage - 1) * designationPageSize + index + 1
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-slate-400 font-medium">
                          {rowNumber}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {item.employees}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              item.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === "Active"
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                              }`}
                            />
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingDesignation(item)
                                setEditDesignationName(item.name)
                                setEditDesignationStatus(item.status)
                              }}
                              title="Edit Designation"
                              className="p-1.5 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50/60 rounded-lg transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteDesignation(item.id)}
                              title="Delete Designation"
                              className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <div className="relative">
                <select
                  value={designationPageSize}
                  onChange={(e) => {
                    setDesignationPageSize(Number(e.target.value))
                    setDesignationPage(1)
                  }}
                  className="bg-transparent border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                disabled={designationPage === 1}
                onClick={() => setDesignationPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalDesignationPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setDesignationPage(pageNum)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      designationPage === pageNum
                        ? "bg-[#4F46E5] text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={designationPage === totalDesignationPages}
                onClick={() =>
                  setDesignationPage((p) =>
                    Math.min(totalDesignationPages, p + 1)
                  )
                }
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "employees" && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Employees ({employees.length})
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                List of all employees in this department.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddEmployeeModalOpen(true)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-200 transition-colors cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px] bg-slate-50 rounded-xl border border-slate-100 flex items-center px-3.5 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={employeeSearch}
                onChange={(e) => {
                  setEmployeeSearch(e.target.value)
                  setEmployeePage(1)
                }}
                placeholder="Search employee (name or employee ID)..."
                className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="relative flex-1 sm:w-44 bg-slate-50 rounded-xl border border-slate-100 px-3 py-2">
              <select
                value={employeeDesignationFilter}
                onChange={(e) => {
                  setEmployeeDesignationFilter(e.target.value)
                  setEmployeePage(1)
                }}
                className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
              >
                <option value="All Designations">Designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="relative flex-1 sm:w-36 bg-slate-50 rounded-xl border border-slate-100 px-3 py-2">
              <select
                value={employeeRoleFilter}
                onChange={(e) => {
                  setEmployeeRoleFilter(e.target.value)
                  setEmployeePage(1)
                }}
                className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
              >
                <option value="All Roles">Role</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Employee">Employee</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="relative flex-1 sm:w-36 bg-slate-50 rounded-xl border border-slate-100 px-3 py-2">
              <select
                value={employeeStatusFilter}
                onChange={(e) => {
                  setEmployeeStatusFilter(e.target.value)
                  setEmployeePage(1)
                }}
                className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
              >
                <option value="All Status">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-slate-400 font-semibold">#</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Employee ID</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Reporting To</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-12 text-center text-slate-400 font-medium"
                    >
                      No employees found in this department.
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((emp, index) => {
                    const rowNumber =
                      (employeePage - 1) * employeePageSize + index + 1
                    return (
                      <tr
                        key={emp.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-slate-400 font-medium">
                          {rowNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {emp.avatarUrl ? (
                              <img
                                src={emp.avatarUrl}
                                alt={emp.name}
                                className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-100"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#4F46E5] font-bold text-[11px] flex items-center justify-center shrink-0 border border-indigo-100">
                                {emp.initials}
                              </div>
                            )}
                            <span className="font-bold text-slate-900">
                              {emp.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-600">
                          {emp.employeeId}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {emp.designation}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              emp.role === "Team Lead"
                                ? "bg-indigo-50 text-[#4F46E5]"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {emp.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {emp.reportingTo}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              emp.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                emp.status === "Active"
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                              }`}
                            />
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenUserDetails(emp)}
                              title="View Employee Details"
                              className="p-1.5 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50/60 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenUserEdit(emp)}
                              title="Edit Employee"
                              className="p-1.5 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50/60 rounded-lg transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              title="More Options"
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
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

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <div className="relative">
                <select
                  value={employeePageSize}
                  onChange={(e) => {
                    setEmployeePageSize(Number(e.target.value))
                    setEmployeePage(1)
                  }}
                  className="bg-transparent border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                disabled={employeePage === 1}
                onClick={() => setEmployeePage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalEmployeePages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setEmployeePage(pageNum)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      employeePage === pageNum
                        ? "bg-[#4F46E5] text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={employeePage === totalEmployeePages}
                onClick={() =>
                  setEmployeePage((p) => Math.min(totalEmployeePages, p + 1))
                }
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddDesignationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Add New Designation
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDesignationModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateDesignation} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Designation Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDesignationName}
                  onChange={(e) => setNewDesignationName(e.target.value)}
                  placeholder="e.g. Lead Product Designer"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={newDesignationStatus}
                    onChange={(e) =>
                      setNewDesignationStatus(e.target.value as UserStatus)
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer pr-8"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddDesignationModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold cursor-pointer shadow-sm shadow-indigo-200"
                >
                  Save Designation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingDesignation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Edit Designation
              </h3>
              <button
                type="button"
                onClick={() => setEditingDesignation(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveEditDesignation} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Designation Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editDesignationName}
                  onChange={(e) => setEditDesignationName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={editDesignationStatus}
                    onChange={(e) =>
                      setEditDesignationStatus(e.target.value as UserStatus)
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer pr-8"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingDesignation(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold cursor-pointer shadow-sm shadow-indigo-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Add Employee to {department.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddEmployeeModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  placeholder="e.g. Tanya Sen"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Designation <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={newEmployeeDesignation}
                    onChange={(e) => setNewEmployeeDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer pr-8"
                  >
                    <option value="">Select Designation</option>
                    {designations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={newEmployeeRole}
                      onChange={(e) => setNewEmployeeRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer pr-8"
                    >
                      <option value="Employee">Employee</option>
                      <option value="Team Lead">Team Lead</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={newEmployeeStatus}
                      onChange={(e) =>
                        setNewEmployeeStatus(e.target.value as UserStatus)
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] appearance-none cursor-pointer pr-8"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold cursor-pointer shadow-sm shadow-indigo-200"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <UserDetailsModal
        user={selectedEmployeeForDetails}
        onClose={() => setSelectedEmployeeForDetails(null)}
        onEdit={(usr) => {
          setSelectedEmployeeForDetails(null)
          setSelectedEmployeeForEdit(usr)
        }}
      />

      <EditUserModal
        user={selectedEmployeeForEdit}
        isOpen={Boolean(selectedEmployeeForEdit)}
        onClose={() => setSelectedEmployeeForEdit(null)}
        onSave={handleUpdateUserRecord}
      />
    </div>
  )
}

