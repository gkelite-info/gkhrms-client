import { HrAttendanceRecord } from "../data/hrAttendanceData"

export interface RowEditFormState {
  status: HrAttendanceRecord["status"]
  checkIn: string
  checkOut: string
  workingHours: string
}

export interface HrAttendanceColumnsOptions {
  onViewRecord: (record: HrAttendanceRecord) => void
  onStartEdit: (record: HrAttendanceRecord) => void
  onSaveEdit: (record: HrAttendanceRecord) => void
  onCancelEdit: () => void
  editingRowId: string | null
  editForm: RowEditFormState | null
  onEditFormChange: (form: RowEditFormState) => void
  selectedIds: string[]
  onToggleSelectRow: (id: string) => void
  onToggleSelectAll: () => void
  isAllSelected: boolean
  isSomeSelected: boolean
}

export const STATUS_OPTIONS = [
  { label: "Present", value: "Present" },
  { label: "Late", value: "Late" },
  { label: "Absent", value: "Absent" },
  { label: "On Leave", value: "On Leave" },
  { label: "Work From Home", value: "Work From Home" },
]

export function getStatusBadge(status: HrAttendanceRecord["status"]) {
  switch (status) {
    case "Present":
      return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60", dot: "bg-emerald-500" }
    case "Late":
      return { bg: "bg-amber-50 text-amber-700 border-amber-200/60", dot: "bg-amber-500" }
    case "Absent":
      return { bg: "bg-rose-50 text-rose-700 border-rose-200/60", dot: "bg-rose-500" }
    case "On Leave":
      return { bg: "bg-amber-50 text-amber-700 border-amber-200/60", dot: "bg-amber-500" }
    case "Work From Home":
      return { bg: "bg-[#EEF2FF] text-[#5B50EC] border-[#DDD9FD]", dot: "bg-[#5B50EC]" }
    case "Not Marked":
      return { bg: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" }
    default:
      return { bg: "bg-gray-50 text-gray-700 border-gray-200", dot: "bg-gray-400" }
  }
}

