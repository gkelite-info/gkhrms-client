export interface NewJoinersStatItem {
  id: string
  label: string
  value: string
  badgeText: string
  badgeType: "increase" | "decrease" | "neutral"
  iconBg: string
  iconColor: string
}

export interface NewJoinerEmployee {
  id: string
  name: string
  initials: string
  avatarColor: string
  department: string
  designation: string
  joiningDate: string
  status: "Joined" | "Onboarding" | "Confirmed"
}

export const NEW_JOINERS_STATS: NewJoinersStatItem[] = [
  {
    id: "new_joiners",
    label: "New Joiners This Month",
    value: "34",
    badgeText: "+21%",
    badgeType: "increase",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "total_employees",
    label: "Total Employees",
    value: "2,486",
    badgeText: "+3.5%",
    badgeType: "increase",
    iconBg: "bg-blue-50",
    iconColor: "text-[#2563EB]",
  },
  {
    id: "departments_hiring",
    label: "Departments Hiring",
    value: "8",
    badgeText: "No change",
    badgeType: "neutral",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "pending_onboarding",
    label: "Pending Onboarding",
    value: "6",
    badgeText: "-2%",
    badgeType: "decrease",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
]

export const INITIAL_NEW_JOINERS_EMPLOYEES: NewJoinerEmployee[] = [
  {
    id: "EMP001",
    name: "Rahul Mehta",
    initials: "RM",
    avatarColor: "bg-blue-100 text-blue-700",
    department: "Technology",
    designation: "Software Engineer",
    joiningDate: "03 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP002",
    name: "Aisha Khan",
    initials: "AK",
    avatarColor: "bg-sky-100 text-sky-700",
    department: "Finance",
    designation: "Financial Analyst",
    joiningDate: "05 Oct 2026",
    status: "Onboarding",
  },
  {
    id: "EMP003",
    name: "Vikram Reddy",
    initials: "VR",
    avatarColor: "bg-purple-100 text-purple-700",
    department: "Operations",
    designation: "Operations Manager",
    joiningDate: "08 Oct 2026",
    status: "Confirmed",
  },
  {
    id: "EMP004",
    name: "Sneha Nair",
    initials: "SN",
    avatarColor: "bg-pink-100 text-pink-700",
    department: "Human Resources",
    designation: "HR Executive",
    joiningDate: "10 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP005",
    name: "Arjun Rao",
    initials: "AR",
    avatarColor: "bg-cyan-100 text-cyan-700",
    department: "Technology",
    designation: "DevOps Engineer",
    joiningDate: "12 Oct 2026",
    status: "Onboarding",
  },
  {
    id: "EMP006",
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "bg-indigo-100 text-indigo-700",
    department: "Marketing",
    designation: "Marketing Specialist",
    joiningDate: "15 Oct 2026",
    status: "Confirmed",
  },
  {
    id: "EMP007",
    name: "Daniel Joseph",
    initials: "DJ",
    avatarColor: "bg-amber-100 text-amber-700",
    department: "Sales",
    designation: "Sales Executive",
    joiningDate: "18 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP008",
    name: "Irfan Ali",
    initials: "IA",
    avatarColor: "bg-teal-100 text-teal-700",
    department: "Customer Success",
    designation: "Customer Success Manager",
    joiningDate: "22 Oct 2026",
    status: "Onboarding",
  },
  {
    id: "EMP009",
    name: "Meera Krishnan",
    initials: "MK",
    avatarColor: "bg-teal-100 text-teal-700",
    department: "Technology",
    designation: "Frontend Engineer",
    joiningDate: "24 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP010",
    name: "Rohan Kulkarni",
    initials: "RK",
    avatarColor: "bg-rose-100 text-rose-700",
    department: "Operations",
    designation: "Logistics Specialist",
    joiningDate: "25 Oct 2026",
    status: "Confirmed",
  },
  {
    id: "EMP011",
    name: "Ananya Deshmukh",
    initials: "AD",
    avatarColor: "bg-blue-100 text-blue-700",
    department: "Product",
    designation: "Associate Product Manager",
    joiningDate: "26 Oct 2026",
    status: "Onboarding",
  },
  {
    id: "EMP012",
    name: "Karan Johar",
    initials: "KJ",
    avatarColor: "bg-emerald-100 text-emerald-700",
    department: "Legal & Compliance",
    designation: "Compliance Associate",
    joiningDate: "27 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP013",
    name: "Tanvi Verma",
    initials: "TV",
    avatarColor: "bg-violet-100 text-violet-700",
    department: "Human Resources",
    designation: "Recruitment Coordinator",
    joiningDate: "28 Oct 2026",
    status: "Confirmed",
  },
  {
    id: "EMP014",
    name: "Siddharth Jain",
    initials: "SJ",
    avatarColor: "bg-orange-100 text-orange-700",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "29 Oct 2026",
    status: "Joined",
  },
  {
    id: "EMP015",
    name: "Divya Nambiar",
    initials: "DN",
    avatarColor: "bg-pink-100 text-pink-700",
    department: "Marketing",
    designation: "Content Strategist",
    joiningDate: "30 Oct 2026",
    status: "Onboarding",
  },
  {
    id: "EMP016",
    name: "Harish Iyer",
    initials: "HI",
    avatarColor: "bg-cyan-100 text-cyan-700",
    department: "Technology",
    designation: "QA Engineer",
    joiningDate: "31 Oct 2026",
    status: "Joined",
  },
]
