import { AttendanceRequestItem } from "../types"

export interface ConfirmDialogState {
  isOpen: boolean
  type: "approve" | "reject"
  requestId: string
  employeeName: string
}

export function filterAttendanceRequests(
  requests: AttendanceRequestItem[],
  searchQuery: string,
  requestTypeFilter: string,
  statusFilter: string
): AttendanceRequestItem[] {
  return requests.filter((item) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const match =
        item.name.toLowerCase().includes(query) ||
        item.employeeId.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query) ||
        item.designation.toLowerCase().includes(query)
      if (!match) return false
    }
    if (requestTypeFilter !== "All Types" && item.requestType !== requestTypeFilter) return false
    if (statusFilter !== "All Statuses" && item.status !== statusFilter) return false
    return true
  })
}
