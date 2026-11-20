export interface ChairmanDepartment {
  id: string
  name: string
  headName: string
  headInitials: string
  headAvatarColor: string
  employees: number
  openPositions: number
  status: "Active" | "Inactive"
}

export interface ActiveDepartmentsStatItem {
  id: string
  label: string
  value: string
  subtext?: string
  badgeText?: string
  badgeType?: "increase" | "neutral"
  iconBg: string
  iconColor: string
}

export const ACTIVE_DEPARTMENTS_STATS: ActiveDepartmentsStatItem[] = [
  {
    id: "active_departments",
    label: "Active Departments",
    value: "18",
    subtext: "No change",
    badgeType: "neutral",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "total_employees",
    label: "Total Employees",
    value: "2,486",
    badgeText: "+3.5%",
    badgeType: "increase",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "largest_department",
    label: "Largest Department",
    value: "Technology",
    subtext: "642 Employees",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "open_positions",
    label: "Open Positions",
    value: "56",
    badgeText: "+21%",
    badgeType: "increase",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
]

export const INITIAL_CHAIRMAN_DEPARTMENTS: ChairmanDepartment[] = [
  {
    id: "dept-1",
    name: "Executive Office",
    headName: "Rajiv Sharma",
    headInitials: "RS",
    headAvatarColor: "bg-blue-100 text-blue-700",
    employees: 24,
    openPositions: 1,
    status: "Active",
  },
  {
    id: "dept-2",
    name: "Finance",
    headName: "Aisha Patel",
    headInitials: "AP",
    headAvatarColor: "bg-sky-100 text-sky-700",
    employees: 286,
    openPositions: 3,
    status: "Active",
  },
  {
    id: "dept-3",
    name: "Operations",
    headName: "Vikram Kapoor",
    headInitials: "VK",
    headAvatarColor: "bg-purple-100 text-purple-700",
    employees: 428,
    openPositions: 8,
    status: "Active",
  },
  {
    id: "dept-4",
    name: "Human Resources",
    headName: "Sneha Nair",
    headInitials: "SN",
    headAvatarColor: "bg-pink-100 text-pink-700",
    employees: 214,
    openPositions: 4,
    status: "Active",
  },
  {
    id: "dept-5",
    name: "Technology",
    headName: "Arjun Rao",
    headInitials: "AR",
    headAvatarColor: "bg-cyan-100 text-cyan-700",
    employees: 642,
    openPositions: 12,
    status: "Active",
  },
  {
    id: "dept-6",
    name: "Marketing",
    headName: "Priya Khanna",
    headInitials: "PK",
    headAvatarColor: "bg-fuchsia-100 text-fuchsia-700",
    employees: 188,
    openPositions: 5,
    status: "Active",
  },
  {
    id: "dept-7",
    name: "Sales",
    headName: "Daniel Mathews",
    headInitials: "DM",
    headAvatarColor: "bg-amber-100 text-amber-700",
    employees: 362,
    openPositions: 10,
    status: "Active",
  },
  {
    id: "dept-8",
    name: "Customer Success",
    headName: "Irfan Khan",
    headInitials: "IK",
    headAvatarColor: "bg-indigo-100 text-indigo-700",
    employees: 168,
    openPositions: 9,
    status: "Active",
  },
  {
    id: "dept-9",
    name: "Product Management",
    headName: "Ananya Deshmukh",
    headInitials: "AD",
    headAvatarColor: "bg-teal-100 text-teal-700",
    employees: 188,
    openPositions: 4,
    status: "Active",
  },
  {
    id: "dept-10",
    name: "Legal & Compliance",
    headName: "Karan Johar",
    headInitials: "KJ",
    headAvatarColor: "bg-rose-100 text-rose-700",
    employees: 98,
    openPositions: 0,
    status: "Active",
  },
  {
    id: "dept-11",
    name: "Quality Assurance",
    headName: "Tanvi Verma",
    headInitials: "TV",
    headAvatarColor: "bg-emerald-100 text-emerald-700",
    employees: 132,
    openPositions: 2,
    status: "Active",
  },
  {
    id: "dept-12",
    name: "Design & UX",
    headName: "Meera Krishnan",
    headInitials: "MK",
    headAvatarColor: "bg-blue-100 text-blue-700",
    employees: 76,
    openPositions: 1,
    status: "Active",
  },
  {
    id: "dept-13",
    name: "DevOps & Cloud",
    headName: "Harish Iyer",
    headInitials: "HI",
    headAvatarColor: "bg-purple-100 text-purple-700",
    employees: 84,
    openPositions: 2,
    status: "Active",
  },
  {
    id: "dept-14",
    name: "Data Analytics",
    headName: "Siddharth Jain",
    headInitials: "SJ",
    headAvatarColor: "bg-orange-100 text-orange-700",
    employees: 92,
    openPositions: 3,
    status: "Active",
  },
  {
    id: "dept-15",
    name: "Information Security",
    headName: "Rakesh Verma",
    headInitials: "RV",
    headAvatarColor: "bg-red-100 text-red-700",
    employees: 48,
    openPositions: 1,
    status: "Active",
  },
  {
    id: "dept-16",
    name: "Corporate Strategy",
    headName: "Divya Nambiar",
    headInitials: "DN",
    headAvatarColor: "bg-indigo-100 text-indigo-700",
    employees: 36,
    openPositions: 0,
    status: "Active",
  },
  {
    id: "dept-17",
    name: "Procurement",
    headName: "Pankaj Tripathi",
    headInitials: "PT",
    headAvatarColor: "bg-amber-100 text-amber-700",
    employees: 42,
    openPositions: 0,
    status: "Active",
  },
  {
    id: "dept-18",
    name: "Facilities & Admin",
    headName: "Jyoti Maurya",
    headInitials: "JM",
    headAvatarColor: "bg-teal-100 text-teal-700",
    employees: 58,
    openPositions: 1,
    status: "Active",
  },
]
