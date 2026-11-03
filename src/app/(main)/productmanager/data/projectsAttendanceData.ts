export interface ProjectManagerInfo {
  name: string
  code: string
  avatar?: string | null
}

export interface ProjectAttendanceSummary {
  id: string
  name: string
  code: string
  image?: string | null
  status: "Active" | "Inactive" | "Completed" | "On Hold"
  manager: ProjectManagerInfo
  teamLeadsCount: number
  totalMembers: number
  present: number
  absent: number
  onLeave: number
  wfh: number
  attendancePercentage: number
}

export interface ProjectsOverallStats {
  totalProjects: number
  totalMembers: number
  presentToday: number
  presentPercentage: number
  absentToday: number
  absentPercentage: number
  onLeaveToday: number
  onLeavePercentage: number
  wfhToday: number
  wfhPercentage: number
}

export const INITIAL_PROJECTS_DATA: ProjectAttendanceSummary[] = [
  {
    id: "project-alpha",
    name: "Project Alpha",
    code: "PA",
    image: "/images/gkLogo.png",
    status: "Active",
    manager: { name: "Ravi Kumar", code: "RK", avatar: "/images/admin_rohan.jpg" },
    teamLeadsCount: 3,
    totalMembers: 18,
    present: 13,
    absent: 2,
    onLeave: 2,
    wfh: 1,
    attendancePercentage: 72,
  },
  {
    id: "project-nova",
    name: "Project Nova",
    code: "PN",
    image: null,
    status: "Active",
    manager: { name: "Anjali Mehta", code: "AM", avatar: "/images/shreya_raj.jpg" },
    teamLeadsCount: 2,
    totalMembers: 14,
    present: 10,
    absent: 1,
    onLeave: 2,
    wfh: 1,
    attendancePercentage: 71,
  },
  {
    id: "project-pulse",
    name: "Project Pulse",
    code: "PP",
    image: "/images/gkLogoblack.png",
    status: "Active",
    manager: { name: "Suresh N", code: "SN", avatar: "/images/shyam.jpg" },
    teamLeadsCount: 2,
    totalMembers: 16,
    present: 11,
    absent: 3,
    onLeave: 1,
    wfh: 1,
    attendancePercentage: 69,
  },
  {
    id: "project-orbit",
    name: "Project Orbit",
    code: "PO",
    image: null,
    status: "On Hold",
    manager: { name: "Priya Sharma", code: "PS", avatar: "/images/jane_smith.jpg" },
    teamLeadsCount: 2,
    totalMembers: 12,
    present: 9,
    absent: 1,
    onLeave: 1,
    wfh: 1,
    attendancePercentage: 75,
  },
  {
    id: "project-echo",
    name: "Project Echo",
    code: "PE",
    image: null,
    status: "Inactive",
    manager: { name: "Vikram Reddy", code: "VR", avatar: "/images/alexander.png" },
    teamLeadsCount: 2,
    totalMembers: 14,
    present: 10,
    absent: 2,
    onLeave: 2,
    wfh: 0,
    attendancePercentage: 71,
  },
  {
    id: "project-summit",
    name: "Project Summit",
    code: "PS",
    image: null,
    status: "Completed",
    manager: { name: "Arjun Rao", code: "AR", avatar: null },
    teamLeadsCount: 2,
    totalMembers: 12,
    present: 9,
    absent: 2,
    onLeave: 0,
    wfh: 1,
    attendancePercentage: 69,
  },
  {
    id: "project-zenith",
    name: "Project Zenith",
    code: "PZ",
    image: "/images/gkLogo.png",
    status: "Completed",
    manager: { name: "Kiran Shah", code: "KS", avatar: "/images/shreya_raj.jpg" },
    teamLeadsCount: 2,
    totalMembers: 15,
    present: 12,
    absent: 1,
    onLeave: 1,
    wfh: 1,
    attendancePercentage: 80,
  },
  {
    id: "project-quantum",
    name: "Project Quantum",
    code: "PQ",
    image: null,
    status: "On Hold",
    manager: { name: "Devika Sen", code: "DS", avatar: null },
    teamLeadsCount: 1,
    totalMembers: 10,
    present: 7,
    absent: 1,
    onLeave: 1,
    wfh: 1,
    attendancePercentage: 70,
  },
]

export const PROJECTS_OVERALL_STATS: ProjectsOverallStats = {
  totalProjects: 8,
  totalMembers: 111,
  presentToday: 81,
  presentPercentage: 73,
  absentToday: 11,
  absentPercentage: 10,
  onLeaveToday: 10,
  onLeavePercentage: 9,
  wfhToday: 9,
  wfhPercentage: 8,
}
