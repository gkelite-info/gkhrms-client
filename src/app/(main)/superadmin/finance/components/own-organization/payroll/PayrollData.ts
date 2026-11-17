export interface PayrollEmployeeRecord {
  id: string
  name: string
  email: string
  avatar: string
  employeeId: string
  department: string
  grossSalary: string
  deductions: string
  netSalary: string
  status: "Paid" | "Pending" | "Processing"
  paymentDate?: string
  bankAccount?: string
}

export interface PayrollTrendPoint {
  month: string
  amount: number
  label: string
}

export interface PayrollCostBreakdownItem {
  name: string
  value: number
  color: string
  amount: string
  [key: string]: any
}

export const INITIAL_PAYROLL_RECORDS: PayrollEmployeeRecord[] = [
  {
    id: "pay-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1045",
    department: "Technology",
    grossSalary: "₹ 1,20,000",
    deductions: "₹ 18,000",
    netSalary: "₹ 1,02,000",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "HDFC **** 4821",
  },
  {
    id: "pay-2",
    name: "Priya Nair",
    email: "priya.nair@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1046",
    department: "Product",
    grossSalary: "₹ 1,05,000",
    deductions: "₹ 15,750",
    netSalary: "₹ 89,250",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "ICICI **** 9012",
  },
  {
    id: "pay-3",
    name: "Amit Verma",
    email: "amit.verma@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1039",
    department: "Delivery",
    grossSalary: "₹ 1,30,000",
    deductions: "₹ 19,500",
    netSalary: "₹ 1,10,500",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "SBI **** 3341",
  },
  {
    id: "pay-4",
    name: "Sneha Reddy",
    email: "sneha.reddy@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1048",
    department: "Human Resources",
    grossSalary: "₹ 95,000",
    deductions: "₹ 14,250",
    netSalary: "₹ 80,750",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Axis **** 7819",
  },
  {
    id: "pay-5",
    name: "Karan Mehta",
    email: "karan.mehta@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1036",
    department: "Finance",
    grossSalary: "₹ 1,40,000",
    deductions: "₹ 21,000",
    netSalary: "₹ 1,19,000",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Kotak **** 5562",
  },
  {
    id: "pay-6",
    name: "Ananya Iyer",
    email: "ananya.iyer@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1050",
    department: "Technology",
    grossSalary: "₹ 1,25,000",
    deductions: "₹ 18,750",
    netSalary: "₹ 1,06,250",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "HDFC **** 1124",
  },
  {
    id: "pay-7",
    name: "Vikram Malhotra",
    email: "vikram.m@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1025",
    department: "Product",
    grossSalary: "₹ 1,50,000",
    deductions: "₹ 22,500",
    netSalary: "₹ 1,27,500",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "ICICI **** 8943",
  },
  {
    id: "pay-8",
    name: "Meera Sen",
    email: "meera.sen@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1055",
    department: "Human Resources",
    grossSalary: "₹ 90,000",
    deductions: "₹ 13,500",
    netSalary: "₹ 76,500",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "SBI **** 6023",
  },
  {
    id: "pay-9",
    name: "Siddharth Rao",
    email: "siddharth.r@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1061",
    department: "Technology",
    grossSalary: "₹ 1,15,000",
    deductions: "₹ 17,250",
    netSalary: "₹ 97,750",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Axis **** 3319",
  },
  {
    id: "pay-10",
    name: "Divya Nambiar",
    email: "divya.n@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1062",
    department: "Product",
    grossSalary: "₹ 1,10,000",
    deductions: "₹ 16,500",
    netSalary: "₹ 93,500",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Kotak **** 9102",
  },
  {
    id: "pay-11",
    name: "Arjun Singhania",
    email: "arjun.s@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1063",
    department: "Delivery",
    grossSalary: "₹ 1,28,000",
    deductions: "₹ 19,200",
    netSalary: "₹ 1,08,800",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "HDFC **** 4571",
  },
  {
    id: "pay-12",
    name: "Kavita Chawla",
    email: "kavita.c@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1064",
    department: "Human Resources",
    grossSalary: "₹ 92,000",
    deductions: "₹ 13,800",
    netSalary: "₹ 78,200",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "ICICI **** 6632",
  },
  {
    id: "pay-13",
    name: "Manish Pandey",
    email: "manish.p@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1065",
    department: "Finance",
    grossSalary: "₹ 1,35,000",
    deductions: "₹ 20,250",
    netSalary: "₹ 1,14,750",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "SBI **** 1290",
  },
  {
    id: "pay-14",
    name: "Pooja Hegde",
    email: "pooja.h@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1066",
    department: "Product",
    grossSalary: "₹ 1,08,000",
    deductions: "₹ 16,200",
    netSalary: "₹ 91,800",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Axis **** 8821",
  },
  {
    id: "pay-15",
    name: "Rajesh Kulkarni",
    email: "rajesh.k@gkelite.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    employeeId: "GK1067",
    department: "Technology",
    grossSalary: "₹ 1,22,000",
    deductions: "₹ 18,300",
    netSalary: "₹ 1,03,700",
    status: "Paid",
    paymentDate: "Nov 01, 2026",
    bankAccount: "Kotak **** 4015",
  },
]

export const PAYROLL_TREND_DATA: PayrollTrendPoint[] = [
  { month: "Jun 2026", amount: 1.15, label: "₹ 1.15 Cr" },
  { month: "Jul 2026", amount: 1.25, label: "₹ 1.25 Cr" },
  { month: "Aug 2026", amount: 1.24, label: "₹ 1.24 Cr" },
  { month: "Sep 2026", amount: 1.35, label: "₹ 1.35 Cr" },
  { month: "Oct 2026", amount: 1.38, label: "₹ 1.38 Cr" },
  { month: "Nov 2026", amount: 1.428, label: "₹ 1.42 Cr" },
]

export const PAYROLL_COST_BREAKDOWN: PayrollCostBreakdownItem[] = [
  {
    name: "Basic Salary",
    value: 72.4,
    color: "#3B82F6",
    amount: "₹ 1,03,38,720",
  },
  {
    name: "Allowances",
    value: 15.2,
    color: "#06B6D4",
    amount: "₹ 21,70,560",
  },
  {
    name: "Bonuses/Incentives",
    value: 6.1,
    color: "#10B981",
    amount: "₹ 8,71,080",
  },
  {
    name: "Deductions (PF, Tax, etc.)",
    value: 6.3,
    color: "#F97316",
    amount: "₹ 8,99,640",
  },
]
