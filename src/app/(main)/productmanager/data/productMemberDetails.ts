import { INITIAL_PRODUCT_MEMBERS } from "./productMembersData"
import { ProductMemberDetails } from "./productAttendanceTypes"

export function getProductMemberDetailsById(id: string): ProductMemberDetails | undefined {
  const member = INITIAL_PRODUCT_MEMBERS.find((m) => m.id === id || m.employeeId === id)
  if (!member) return undefined

  const isPresent = member.status === "Present" || member.status === "WFH"
  const departmentName = member.productId.replace("project-", "Project ").replace("-", " ")

  return {
    id: member.employeeId,
    employeeId: member.employeeId,
    name: member.name,
    avatar: member.avatar,
    designation: member.designation,
    department: departmentName,
    status: (isPresent ? "Present" : member.status === "On Leave" ? "On Leave" : "Late"),
    checkIn: member.checkIn !== "--" ? member.checkIn : "09:15 AM",
    checkOut: member.checkOut !== "--" ? member.checkOut : "06:15 PM",
    workingHours: member.workingHours !== "--" ? member.workingHours : "8h 45m",
    shift: member.shift || "09:00 AM - 06:00 PM",
    attendancePercentage: isPresent ? 96 : 88,
    presentDays: 22,
    leaveDays: member.status === "On Leave" ? 2 : 1,
    lateDays: member.status === "Absent" ? 1 : 0,
    monthlyTrends: [
      { month: "Mar", year: 2025, percentage: 92 },
      { month: "Apr", year: 2025, percentage: 95 },
      { month: "May", year: 2025, percentage: 94 },
      { month: "Jun", year: 2025, percentage: 96 },
      { month: "Jul", year: 2025, percentage: 95 },
      { month: "Aug", year: 2025, percentage: 96, isActive: true },
    ],
    history: [
      {
        id: "h1",
        date: "24/04/2025",
        status: (isPresent ? "Present" : member.status === "On Leave" ? "On Leave" : "Late"),
        checkIn: member.checkIn,
        checkOut: member.checkOut,
        effectiveHours: member.workingHours,
        grossHours: member.workingHours,
      },
      {
        id: "h2",
        date: "23/04/2025",
        status: "Present",
        checkIn: "09:10 AM",
        checkOut: "06:14 PM",
        effectiveHours: "9h 04m",
        grossHours: "9h 04m",
      },
      {
        id: "h3",
        date: "22/04/2025",
        status: "Present",
        checkIn: "09:05 AM",
        checkOut: "06:08 PM",
        effectiveHours: "9h 03m",
        grossHours: "9h 03m",
      },
      {
        id: "h4",
        date: "21/04/2025",
        status: "Present",
        checkIn: "09:15 AM",
        checkOut: "06:12 PM",
        effectiveHours: "8h 57m",
        grossHours: "8h 57m",
      },
      {
        id: "h5",
        date: "20/04/2025",
        status: "On Leave",
        checkIn: "--",
        checkOut: "--",
        effectiveHours: "--",
        grossHours: "--",
      },
      {
        id: "h6",
        date: "19/04/2025",
        status: "Present",
        checkIn: "09:00 AM",
        checkOut: "06:00 PM",
        effectiveHours: "9h 00m",
        grossHours: "9h 00m",
      },
    ],
  }
}

