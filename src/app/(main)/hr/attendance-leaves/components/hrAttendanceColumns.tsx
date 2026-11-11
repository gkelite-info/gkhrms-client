"use client"

import { Eye, PencilSimple, Check, X, Plus } from "phosphor-react"
import { TableColumn, ReusableAvatar, ReusableDropdown } from "@/components/reusableComponents"
import { HrAttendanceRecord } from "../data/hrAttendanceData"
import { HrAttendanceColumnsOptions, getStatusBadge, STATUS_OPTIONS } from "./hrAttendanceColumnTypes"
import AttendanceTimePicker from "./AttendanceTimePicker"
import { calculateWorkingHours } from "./attendanceTimeUtils"

export { getStatusBadge, STATUS_OPTIONS }
export type { RowEditFormState, HrAttendanceColumnsOptions } from "./hrAttendanceColumnTypes"

export function createHrAttendanceColumns({
  onViewRecord,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  editingRowId,
  editForm,
  onEditFormChange,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  isAllSelected,
  isSomeSelected,
}: HrAttendanceColumnsOptions): TableColumn<HrAttendanceRecord>[] {
  return [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(el) => { if (el) el.indeterminate = isSomeSelected }}
          onChange={onToggleSelectAll}
          className="w-4 h-4 rounded border-gray-300 text-[#5B50EC] focus:ring-[#5B50EC] cursor-pointer"
          aria-label="Select all employees on this page"
        />
      ),
      className: "w-12 text-center",
      align: "center",
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => onToggleSelectRow(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-[#5B50EC] focus:ring-[#5B50EC] cursor-pointer"
          aria-label={`Select ${row.name}`}
        />
      ),
    },
    {
      header: "Employee",
      accessor: "name",
      className: "whitespace-nowrap min-w-[170px]",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <ReusableAvatar src={row.avatar} alt={row.name} name={row.name} size="sm" fallbackType="icon" />
          <span className="font-bold text-gray-900 text-xs sm:text-sm">{row.name}</span>
        </div>
      ),
    },
    { header: "Employee ID", accessor: "employeeId", className: "text-gray-400 font-mono text-xs whitespace-nowrap" },
    { header: "Department", accessor: "department", className: "text-gray-600 font-medium text-xs whitespace-nowrap" },
    { header: "Role", accessor: "role", className: "text-gray-700 font-medium text-xs whitespace-nowrap" },
    {
      header: "Status",
      accessor: "status",
      className: "whitespace-nowrap min-w-[155px]",
      render: (row) => {
        if (row.id === editingRowId && editForm) {
          return (
            <div className="w-[145px]">
              <ReusableDropdown
                value={editForm.status}
                options={STATUS_OPTIONS}
                onChange={(val) => {
                  const isOff = val === "Absent" || val === "On Leave"
                  onEditFormChange({
                    ...editForm,
                    status: val,
                    ...(isOff ? { checkIn: "-", checkOut: "-", workingHours: "-" } : (
                      editForm.checkIn === "-" ? { checkIn: "09:00 AM", checkOut: "06:00 PM", workingHours: "9h 00m" } : {}
                    )),
                  })
                }}
                placeholder="Status"
                align="left"
                buttonClassName="h-8 px-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-800 bg-white hover:bg-gray-50 flex items-center justify-between gap-1.5 w-full shadow-2xs"
                menuClassName="z-50 min-w-[140px]"
              />
            </div>
          )
        }
        const cfg = getStatusBadge(row.status)
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {row.status}
          </span>
        )
      },
    },
    {
      header: "Check-in",
      accessor: "checkIn",
      className: "text-gray-700 font-medium text-xs whitespace-nowrap min-w-[130px]",
      render: (row) => row.id === editingRowId && editForm ? (
        <AttendanceTimePicker
          value={editForm.checkIn}
          disabled={editForm.status === "Absent" || editForm.status === "On Leave"}
          onChange={(val) => {
            const newHrs = calculateWorkingHours(val, editForm.checkOut)
            onEditFormChange({ ...editForm, checkIn: val, workingHours: newHrs !== "-" ? newHrs : editForm.workingHours })
          }}
          ariaLabel={`Check-in for ${row.name}`}
        />
      ) : <span>{row.checkIn || "-"}</span>,
    },
    {
      header: "Check-out",
      accessor: "checkOut",
      className: "text-gray-700 font-medium text-xs whitespace-nowrap min-w-[130px]",
      render: (row) => row.id === editingRowId && editForm ? (
        <AttendanceTimePicker
          value={editForm.checkOut}
          disabled={editForm.status === "Absent" || editForm.status === "On Leave"}
          onChange={(val) => {
            const newHrs = calculateWorkingHours(editForm.checkIn, val)
            onEditFormChange({ ...editForm, checkOut: val, workingHours: newHrs !== "-" ? newHrs : editForm.workingHours })
          }}
          ariaLabel={`Check-out for ${row.name}`}
        />
      ) : <span>{row.checkOut || "-"}</span>,
    },
    {
      header: "Working Hours",
      accessor: "workingHours",
      className: "text-gray-800 font-semibold text-xs whitespace-nowrap",
      render: (row) => row.id === editingRowId && editForm ? (
        <input
          type="text"
          value={editForm.workingHours}
          onChange={(e) => onEditFormChange({ ...editForm, workingHours: e.target.value })}
          className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] shadow-2xs"
          placeholder="9h 10m"
          title="Auto-calculated. Edit manually to subtract lunch/break hours."
        />
      ) : <span>{row.workingHours || "0h 00m"}</span>,
    },
    {
      header: "Action",
      key: "action",
      className: "text-center whitespace-nowrap",
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5">
          {row.id === editingRowId ? (
            <>
              <button type="button" onClick={() => onSaveEdit(row)} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs" title="Save Changes" aria-label={`Save changes for ${row.name}`}>
                <Check size={16} weight="bold" />
              </button>
              <button type="button" onClick={onCancelEdit} className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer shadow-2xs" title="Cancel Edit" aria-label="Cancel editing">
                <X size={16} weight="bold" />
              </button>
            </>
          ) : (
            <>
              {row.status === "Not Marked" ? (
                <button type="button" onClick={() => onStartEdit(row)} className="px-2.5 py-1 rounded-lg bg-[#EEF2FF] text-[#5B50EC] hover:bg-[#5B50EC] hover:text-white transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs" title="Add Attendance" aria-label={`Add attendance for ${row.name}`}>
                  <Plus size={13} weight="bold" />
                  <span>Add</span>
                </button>
              ) : (
                <button type="button" onClick={() => onStartEdit(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-[#F3F2FD] transition-colors cursor-pointer" title="Edit Attendance" aria-label={`Edit attendance for ${row.name}`}>
                  <PencilSimple size={16} weight="bold" />
                </button>
              )}
              <button type="button" onClick={() => onViewRecord(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-[#F3F2FD] transition-colors cursor-pointer" title="View Details" aria-label={`View details for ${row.name}`}>
                <Eye size={16} weight="bold" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]
}
