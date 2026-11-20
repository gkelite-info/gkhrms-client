"use client"

import { useState } from "react"
import { Plus, ChevronDown, Eye, Pencil, Ban, Mail } from "lucide-react"
import {
  INITIAL_REGISTERED_USERS,
  RegisteredUser,
} from "./UserRegistrationData"
import RegisterUserModal from "./RegisterUserModal"
import HRManagerDetailsModal from "./HRManagerDetailsModal"
import ReusablePagination from "../../../../../../reusableComponents/ReusablePagination"

interface UserRegistrationTableProps {
  users?: RegisteredUser[]
  onOpenRegister?: () => void
  onUpdateUser?: (user: RegisteredUser) => void
}

export default function UserRegistrationTable({
  users: propUsers,
  onOpenRegister,
  onUpdateUser,
}: UserRegistrationTableProps = {}) {
  const [localUsers, setLocalUsers] = useState<RegisteredUser[]>(
    INITIAL_REGISTERED_USERS
  )
  const users = propUsers || localUsers

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleOpenRegister = () => {
    if (onOpenRegister) {
      onOpenRegister()
    } else {
      setIsModalOpen(true)
    }
  }

  const handleAddUser = (newUser: RegisteredUser) => {
    setLocalUsers((prev) => [
      ...prev,
      { ...newUser, id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1 },
    ])
  }

  const handleUpdate = (updated: RegisteredUser) => {
    setLocalUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    )
    setSelectedUser(updated)
    if (onUpdateUser) {
      onUpdateUser(updated)
    }
  }

  const handleToggleStatus = (userId: number) => {
    setLocalUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    )
  }

  const totalItems = users.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize)

  return (
    <>
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Registered Users
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              List of HR Managers and Managers registered under your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenRegister}
            className="h-9 px-4 bg-[#5B50E5] hover:bg-[#4E44D4] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Register User</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 w-10">#</th>
                <th className="py-3 px-3 whitespace-nowrap">Name</th>
                <th className="py-3 px-3 whitespace-nowrap">Employee ID</th>
                <th className="py-3 px-3 whitespace-nowrap">Email</th>
                <th className="py-3 px-3 whitespace-nowrap">Phone</th>
                <th className="py-3 px-3 whitespace-nowrap">Role</th>
                <th className="py-3 px-3 whitespace-nowrap">Department / Function</th>
                <th className="py-3 px-3 whitespace-nowrap">Status</th>
                <th className="py-3 px-3 whitespace-nowrap">Created Date</th>
                <th className="py-3 px-3 whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3.5 px-3 text-slate-400 font-medium">
                    {startIndex + idx + 1}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${user.avatarColor}`}
                      >
                        {user.initials}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                    {user.employeeId}
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.email}
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.phone}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.role === "HR Manager"
                          ? "bg-purple-50 text-[#5B50E5] border-purple-200/50"
                          : "bg-sky-50 text-sky-700 border-sky-200/50"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.department}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                          : user.status === "Invited"
                          ? "bg-amber-50 text-amber-700 border-amber-200/50"
                          : "bg-slate-50 text-slate-600 border-slate-200/50"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : user.status === "Invited"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        }`}
                      />
                      <span>{user.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.createdDate}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2.5 text-slate-400">
                      <button
                        type="button"
                        title="View Details"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDetailsOpen(true)
                        }}
                        className="hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit User"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDetailsOpen(true)
                        }}
                        className="hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title={user.status === "Active" ? "Deactivate User" : "Activate User"}
                        onClick={() => handleToggleStatus(user.id)}
                        className="hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Resend Invitation"
                        className="hover:text-[#5B50E5] transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          pageSizeOptions={[6, 10, 20, 50]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={totalPages > 1}
          className="pt-3 border-t border-slate-100"
        />
      </div>

      <RegisterUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
        defaultRole="HR Manager"
      />

      <HRManagerDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        user={selectedUser}
        onUpdateUser={handleUpdate}
      />
    </>
  )
}
