export interface PresentTodayStatItem {
  id: string
  label: string
  value: string
  badgeText: string
  badgeType: "increase" | "decrease" | "percentage"
  iconBg: string
  iconColor: string
}

export interface PresentTodayEmployee {
  id: string
  name: string
  initials: string
  avatarColor: string
  department: string
  designation: string
  employmentType: "Permanent" | "Contract" | "Probation"
  joinDate: string
  status: "Present" | "Absent" | "On Leave"
}

export const PRESENT_TODAY_STATS: PresentTodayStatItem[] = [
  {
    id: "present_today",
    label: "Present Today",
    value: "2,274",
    badgeText: "91.5%",
    badgeType: "percentage",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "total_employees",
    label: "Total Employees",
    value: "2,486",
    badgeText: "3.5%",
    badgeType: "increase",
    iconBg: "bg-purple-50",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "absent_today",
    label: "Absent Today",
    value: "212",
    badgeText: "-8.5%",
    badgeType: "decrease",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "attendance_rate",
    label: "Attendance Rate",
    value: "91.5%",
    badgeText: "4.2%",
    badgeType: "increase",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
]

export const INITIAL_PRESENT_TODAY_EMPLOYEES: PresentTodayEmployee[] = [
  {
    id: "EMP001",
    name: "Rajiv Sharma",
    initials: "RS",
    avatarColor: "bg-blue-100 text-blue-700",
    department: "Executive Office",
    designation: "Chief Executive Officer",
    employmentType: "Permanent",
    joinDate: "10 Jan 2022",
    status: "Present",
  },
  {
    id: "EMP002",
    name: "Aisha Patel",
    initials: "AP",
    avatarColor: "bg-sky-100 text-sky-700",
    department: "Finance",
    designation: "Chief Financial Officer",
    employmentType: "Permanent",
    joinDate: "15 Mar 2022",
    status: "Present",
  },
  {
    id: "EMP003",
    name: "Vikram Kapoor",
    initials: "VK",
    avatarColor: "bg-purple-100 text-purple-700",
    department: "Operations",
    designation: "Senior Vice President",
    employmentType: "Permanent",
    joinDate: "01 Jun 2021",
    status: "Present",
  },
  {
    id: "EMP004",
    name: "Sneha Nair",
    initials: "SN",
    avatarColor: "bg-pink-100 text-pink-700",
    department: "Human Resources",
    designation: "VP - Human Resources",
    employmentType: "Permanent",
    joinDate: "12 Aug 2022",
    status: "Present",
  },
  {
    id: "EMP005",
    name: "Arjun Rao",
    initials: "AR",
    avatarColor: "bg-cyan-100 text-cyan-700",
    department: "Technology",
    designation: "Director - Engineering",
    employmentType: "Permanent",
    joinDate: "03 Feb 2021",
    status: "Present",
  },
  {
    id: "EMP006",
    name: "Priya Khanna",
    initials: "PK",
    avatarColor: "bg-fuchsia-100 text-fuchsia-700",
    department: "Marketing",
    designation: "Director - Marketing",
    employmentType: "Permanent",
    joinDate: "21 Sep 2021",
    status: "Present",
  },
  {
    id: "EMP007",
    name: "Daniel Mathews",
    initials: "DM",
    avatarColor: "bg-amber-100 text-amber-700",
    department: "Sales",
    designation: "Regional Manager",
    employmentType: "Permanent",
    joinDate: "17 Jan 2022",
    status: "Present",
  },
  {
    id: "EMP008",
    name: "Irfan Khan",
    initials: "IK",
    avatarColor: "bg-indigo-100 text-indigo-700",
    department: "Customer Success",
    designation: "Manager - Customer Success",
    employmentType: "Contract",
    joinDate: "10 Apr 2023",
    status: "Present",
  },
  {
    id: "EMP009",
    name: "Meera Krishnan",
    initials: "MK",
    avatarColor: "bg-teal-100 text-teal-700",
    department: "Technology",
    designation: "Lead Architect",
    employmentType: "Permanent",
    joinDate: "14 Jul 2021",
    status: "Present",
  },
  {
    id: "EMP010",
    name: "Rohan Kulkarni",
    initials: "RK",
    avatarColor: "bg-rose-100 text-rose-700",
    department: "Operations",
    designation: "Operations Lead",
    employmentType: "Permanent",
    joinDate: "05 Nov 2021",
    status: "Present",
  },
  {
    id: "EMP011",
    name: "Ananya Deshmukh",
    initials: "AD",
    avatarColor: "bg-blue-100 text-blue-700",
    department: "Product",
    designation: "Principal Product Manager",
    employmentType: "Permanent",
    joinDate: "22 Feb 2022",
    status: "Present",
  },
  {
    id: "EMP012",
    name: "Karan Johar",
    initials: "KJ",
    avatarColor: "bg-emerald-100 text-emerald-700",
    department: "Legal & Compliance",
    designation: "Legal Counsel",
    employmentType: "Permanent",
    joinDate: "08 Sep 2022",
    status: "Present",
  },
  {
    id: "EMP013",
    name: "Tanvi Verma",
    initials: "TV",
    avatarColor: "bg-violet-100 text-violet-700",
    department: "Human Resources",
    designation: "Talent Acquisition Lead",
    employmentType: "Permanent",
    joinDate: "19 Jan 2023",
    status: "Present",
  },
  {
    id: "EMP014",
    name: "Siddharth Jain",
    initials: "SJ",
    avatarColor: "bg-orange-100 text-orange-700",
    department: "Finance",
    designation: "Finance Controller",
    employmentType: "Permanent",
    joinDate: "11 May 2021",
    status: "Present",
  },
  {
    id: "EMP015",
    name: "Divya Nambiar",
    initials: "DN",
    avatarColor: "bg-pink-100 text-pink-700",
    department: "Marketing",
    designation: "Brand Strategist",
    employmentType: "Permanent",
    joinDate: "30 Oct 2022",
    status: "Present",
  },
  {
    id: "EMP016",
    name: "Harish Iyer",
    initials: "HI",
    avatarColor: "bg-cyan-100 text-cyan-700",
    department: "Technology",
    designation: "DevOps Lead",
    employmentType: "Permanent",
    joinDate: "16 Jun 2023",
    status: "Present",
  },
]
