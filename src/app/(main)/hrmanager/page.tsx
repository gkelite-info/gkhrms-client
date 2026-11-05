"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import {
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  Search,
  ChevronDown,
  Plus,
  Eye,
  Pencil,
  Ban,
  Building2,
  RotateCcw,
} from "lucide-react"
import { initialMockUsers } from "./data/mockUsers"
import { initialMockDepartments } from "./data/mockDepartments"
import { DepartmentRecord, UserRecord, FilterState } from "./types"
import UserDetailsModal from "./components/UserDetailsModal"
import EditUserModal from "./components/EditUserModal"
import DepartmentsView from "./components/DepartmentsView"
import RegisterUserScreen from "./components/RegisterUserScreen"
import AddDepartmentScreen from "./components/AddDepartmentScreen"
import DepartmentDetailScreen from "./components/DepartmentDetailScreen"
import ReusablePagination from "../../../../reusableComponents/ReusablePagination"

function HrManagerContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const action = searchParams.get("action")
  const activeTab =
    (searchParams.get("tab") as "users" | "departments") || "users"
  const deptId =
    searchParams.get("deptId") || searchParams.get("departmentId")
  const subTab =
    (searchParams.get("subtab") as "designations" | "employees") || "designations"
  const pageParam = parseInt(searchParams.get("page") || "1", 10)
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

  const [users, setUsers] = useState<UserRecord[]>(initialMockUsers)
  const [departments, setDepartments] = useState<DepartmentRecord[]>(
    initialMockDepartments
  )
  const [pageSize, setPageSize] = useState(10)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "All Roles",
    status: "All Statuses",
    department: "All Departments",
  })

  const [selectedUserForDetails, setSelectedUserForDetails] =
    useState<UserRecord | null>(null)
  const [selectedUserForEdit, setSelectedUserForEdit] =
    useState<UserRecord | null>(null)

  const stats = useMemo(() => {
    const total = users.length
    const active = users.filter((u) => u.status === "Active").length
    const inactive = users.filter((u) => u.status === "Inactive").length
    const registeredToday = users.filter((u) => {
      const today = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date())
      return u.createdDate === today || u.createdDate.includes("Nov 2026")
    }).length

    return {
      total,
      active,
      inactive,
      registeredToday: registeredToday > 0 ? registeredToday : 3,
    }
  }, [users])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        filters.search === "" ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.employeeId.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase())

      const matchesRole =
        filters.role === "All Roles" || user.role === filters.role

      const matchesStatus =
        filters.status === "All Statuses" || user.status === filters.status

      const matchesDepartment =
        filters.department === "All Departments" ||
        user.department === filters.department

      return matchesSearch && matchesRole && matchesStatus && matchesDepartment
    })
  }, [users, filters])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredUsers.slice(start, start + pageSize)
  }, [filteredUsers, currentPage, pageSize])

  const nextEmployeeId = useMemo(() => {
    return `EMP-${1000 + users.length + 1}`
  }, [users.length])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleTabChange = (tab: "users" | "departments") => {
    const params = new URLSearchParams(searchParams.toString())
    if (tab === "departments") {
      params.set("tab", "departments")
    } else {
      params.delete("tab")
    }
    params.delete("action")
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleOpenRegister = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("action", "register")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCancelRegister = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("action")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleRegisterUser = (newUser: UserRecord) => {
    setUsers((prev) => [newUser, ...prev])
  }

  const handleViewRegisteredUser = (user: UserRecord) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("action")
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
    setSelectedUserForDetails(user)
  }

  const handleUpdateUser = (updatedUser: UserRecord) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    )
  }

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Inactive" : "Active"
          return { ...u, status: nextStatus }
        }
        return u
      })
    )
  }

  const handleResetFilters = () => {
    setFilters({
      search: "",
      role: "All Roles",
      status: "All Statuses",
      department: "All Departments",
    })
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleOpenAddDepartment = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "departments")
    params.set("action", "add-department")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCancelAddDepartment = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("action")
    params.set("tab", "departments")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSaveDepartment = (newDept: DepartmentRecord) => {
    setDepartments((prev) => [newDept, ...prev])
    const params = new URLSearchParams(searchParams.toString())
    params.delete("action")
    params.set("tab", "departments")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleUpdateDepartment = (updatedDept: DepartmentRecord) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === updatedDept.id ? updatedDept : d))
    )
  }

  const handleToggleDepartmentStatus = (id: string) => {
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextStatus = d.status === "Active" ? "Inactive" : "Active"
          return { ...d, status: nextStatus }
        }
        return d
      })
    )
  }

  const handleViewDepartment = (
    dept: DepartmentRecord,
    targetSubTab: "designations" | "employees" = "designations"
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "departments")
    params.set("deptId", dept.id)
    params.set("subtab", targetSubTab)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleBackToDepartments = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("deptId")
    params.delete("departmentId")
    params.delete("subtab")
    params.set("tab", "departments")
    router.push(`${pathname}?${params.toString()}`)
  }

  if (activeTab === "departments" && deptId) {
    const selectedDept =
      departments.find((d) => d.id === deptId) ||
      initialMockDepartments.find((d) => d.id === deptId) ||
      departments[0]

    return (
      <DepartmentDetailScreen
        department={selectedDept}
        initialSubTab={subTab}
        onBack={handleBackToDepartments}
      />
    )
  }

  if (
    action === "add-department" ||
    (activeTab === "departments" && (action === "register" || action === "add"))
  ) {
    const departmentHeadsList = Array.from(
      new Set(departments.map((d) => d.departmentHead).filter(Boolean))
    )
    return (
      <AddDepartmentScreen
        onCancel={handleCancelAddDepartment}
        onSave={handleSaveDepartment}
        onTabChange={handleTabChange}
        departmentHeads={departmentHeadsList}
      />
    )
  }

  if (action === "register") {
    return (
      <RegisterUserScreen
        onCancel={handleCancelRegister}
        onRegister={handleRegisterUser}
        onViewRegisteredUser={handleViewRegisteredUser}
        nextEmployeeId={nextEmployeeId}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    )
  }

  if (activeTab === "departments") {
    return (
      <DepartmentsView
        onTabChange={handleTabChange}
        departments={departments}
        onAddDepartment={handleSaveDepartment}
        onUpdateDepartment={handleUpdateDepartment}
        onToggleStatus={handleToggleDepartmentStatus}
        onAddDepartmentClick={handleOpenAddDepartment}
        onViewDepartment={handleViewDepartment}
      />
    )
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Registered Users
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Manage users created by HR across different roles.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleTabChange("users")}
            className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 bg-[#4F46E5] text-white shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>User Registration</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("departments")}
            className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Departments</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleOpenRegister}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-200 transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Register User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.total}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Total Users
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
            <span className="text-xs text-slate-500 font-medium">Active</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.inactive}
            </span>
            <span className="text-xs text-slate-500 font-medium">Inactive</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {stats.registeredToday}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Registered Today
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 min-w-[240px] bg-white rounded-2xl shadow-xs px-4 py-2.5 flex items-center gap-3 border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, search: e.target.value }))
              handlePageChange(1)
            }}
            placeholder="Search by name, employee ID or email..."
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="relative flex-1 sm:w-44 bg-white rounded-2xl shadow-xs border border-white px-3 py-2">
            <select
              value={filters.role}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, role: e.target.value }))
                handlePageChange(1)
              }}
              className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
            >
              <option value="All Roles">All Roles</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Employee">Employee</option>
              <option value="Finance">Finance</option>
              <option value="Accountant">Accountant</option>
              <option value="Finance Executive">Finance Executive</option>
              <option value="Tech Admin">Tech Admin</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:w-40 bg-white rounded-2xl shadow-xs border border-white px-3 py-2">
            <select
              value={filters.status}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, status: e.target.value }))
                handlePageChange(1)
              }}
              className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:w-44 bg-white rounded-2xl shadow-xs border border-white px-3 py-2">
            <select
              value={filters.department}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
                handlePageChange(1)
              }}
              className="w-full bg-transparent text-xs text-slate-700 font-medium focus:outline-none pr-6 cursor-pointer appearance-none"
            >
              <option value="All Departments">All Departments</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Product">Product</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          {(filters.search !== "" ||
            filters.role !== "All Roles" ||
            filters.status !== "All Statuses" ||
            filters.department !== "All Departments") && (
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
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-700">
                <th className="pb-3.5 pl-3 font-semibold">Name</th>
                <th className="pb-3.5 px-3 font-semibold">Employee ID</th>
                <th className="pb-3.5 px-3 font-semibold">Email</th>
                <th className="pb-3.5 px-3 font-semibold">Phone</th>
                <th className="pb-3.5 px-3 font-semibold">Role</th>
                <th className="pb-3.5 px-3 font-semibold">Department</th>
                <th className="pb-3.5 px-3 font-semibold">Status</th>
                <th className="pb-3.5 px-3 font-semibold">Created Date</th>
                <th className="pb-3.5 pr-3 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-12 text-center text-slate-400"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    <td className="py-3 pl-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] font-bold text-[11px] flex items-center justify-center shrink-0">
                          {user.initials}
                        </div>
                        <span className="font-bold text-slate-900 whitespace-nowrap">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {user.employeeId}
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {user.phone}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EEF2FF] text-[#4F46E5]">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {user.department}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-[#ECFDF5] text-[#10B981]"
                            : "bg-[#FEF2F2] text-[#EF4444]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "Active"
                              ? "bg-[#10B981]"
                              : "bg-[#EF4444]"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {user.createdDate}
                    </td>

                    <td className="py-3 pr-3 whitespace-nowrap text-center">
                      <div className="inline-flex items-center justify-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedUserForDetails(user)}
                          title="View user details"
                          className="p-1 text-[#818CF8] hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-md transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedUserForEdit(user)}
                          title="Edit user"
                          className="p-1 text-[#818CF8] hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-md transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(user.id)}
                          title={
                            user.status === "Active"
                              ? "Deactivate user"
                              : "Activate user"
                          }
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            user.status === "Active"
                              ? "text-[#818CF8] hover:text-rose-500 hover:bg-rose-50"
                              : "text-rose-400 hover:text-emerald-500 hover:bg-emerald-50"
                          }`}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={true}
        />
      </div>

      <UserDetailsModal
        user={selectedUserForDetails}
        onClose={() => setSelectedUserForDetails(null)}
        onEdit={(user) => {
          setSelectedUserForDetails(null)
          setSelectedUserForEdit(user)
        }}
      />

      <EditUserModal
        user={selectedUserForEdit}
        isOpen={Boolean(selectedUserForEdit)}
        onClose={() => setSelectedUserForEdit(null)}
        onSave={handleUpdateUser}
      />
    </div>
  )
}

export default function HrManagerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-96 flex items-center justify-center text-xs text-slate-400">
          Loading...
        </div>
      }
    >
      <HrManagerContent />
    </Suspense>
  )
}
