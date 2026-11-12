export interface HrPayrollEmployee {
  id: number
  employeeId: string
  name: string
  email: string
  department: string
  designation: string
  location: string
  joinDate: string
  status: "Active" | "On Leave" | "Inactive"
  attendance: string
  avatar: string
  phone?: string
  bankInfo?: {
    bankName: string
    accountNumber: string
    ifscCode: string
    accountName: string
    branch: string
  }
  statutoryInfo?: {
    pfStatus: string
    pfNumber: string
    uan: string
    pfJoinDate: string
  }
  identityInfo?: {
    aadhaarNumber: string
    dob: string
    address: string
    enrollmentNumber: string
    gender: string
    panNumber: string
    fatherName: string
  }
}

export interface HrPayrollKpis {
  totalEmployees: number
  activeEmployees: number
  onLeaveToday: number
  joinedThisMonth: number
}

export const HR_PAYROLL_KPIS: HrPayrollKpis = {
  totalEmployees: 542,
  activeEmployees: 498,
  onLeaveToday: 12,
  joinedThisMonth: 18,
}

export const HR_PAYROLL_EMPLOYEES: HrPayrollEmployee[] = [
  {
    id: 1,
    employeeId: "EMP-00445",
    name: "Alexander",
    email: "alexander@gmail.com",
    department: "Data & Analytics",
    designation: "Data Analyst",
    location: "Hyderabad",
    joinDate: "23 Jan 2025",
    status: "Active",
    attendance: "87%",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    bankInfo: {
      bankName: "Bank of Baroda",
      accountNumber: "2345678905789",
      ifscCode: "234567890",
      accountName: "Alexander",
      branch: "N/A",
    },
    statutoryInfo: {
      pfStatus: "Enabled",
      pfNumber: "DF03456789045678",
      uan: "1234567890567",
      pfJoinDate: "21 Jan 2025",
    },
    identityInfo: {
      aadhaarNumber: "49087579678",
      dob: "19 Feb 2003",
      address: "Flat 502, Sun...",
      enrollmentNumber: "49087579678",
      gender: "Female",
      panNumber: "XXXXXXX9678",
      fatherName: "James",
    },
  },
  {
    id: 2,
    employeeId: "EMP-00446",
    name: "Priya Sharma",
    email: "priya.sharma@gk.com",
    department: "HR",
    designation: "HR Executive",
    location: "Hyderabad",
    joinDate: "15 Feb 2025",
    status: "Active",
    attendance: "94%",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43211",
    bankInfo: {
      bankName: "HDFC Bank",
      accountNumber: "50100456789123",
      ifscCode: "HDFC0001234",
      accountName: "Priya Sharma",
      branch: "Hitec City",
    },
    statutoryInfo: {
      pfStatus: "Enabled",
      pfNumber: "DF03456789045679",
      uan: "1234567890568",
      pfJoinDate: "15 Feb 2025",
    },
    identityInfo: {
      aadhaarNumber: "512398764512",
      dob: "12 Aug 1998",
      address: "Madhapur, Hyderabad",
      enrollmentNumber: "512398764512",
      gender: "Female",
      panNumber: "ABCPS1234K",
      fatherName: "Rajesh Sharma",
    },
  },
  {
    id: 3,
    employeeId: "EMP-00447",
    name: "Rohit Verma",
    email: "rohit.verma@gk.com",
    department: "Engineering",
    designation: "Software Engineer",
    location: "Bengaluru",
    joinDate: "10 Mar 2025",
    status: "Active",
    attendance: "91%",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    employeeId: "EMP-00448",
    name: "Sneha Reddy",
    email: "sneha.reddy@gk.com",
    department: "Product",
    designation: "Product Manager",
    location: "Hyderabad",
    joinDate: "01 Apr 2025",
    status: "Active",
    attendance: "89%",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43213",
  },
  {
    id: 5,
    employeeId: "EMP-00449",
    name: "Vikram Singh",
    email: "vikram.singh@gk.com",
    department: "Finance",
    designation: "Accountant",
    location: "Mumbai",
    joinDate: "12 Apr 2025",
    status: "Active",
    attendance: "96%",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43214",
  },
  {
    id: 6,
    employeeId: "EMP-00450",
    name: "Kavya Nair",
    email: "kavya.nair@gk.com",
    department: "Marketing",
    designation: "Marketing Executive",
    location: "Bengaluru",
    joinDate: "23 Apr 2025",
    status: "On Leave",
    attendance: "78%",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43215",
  },
  {
    id: 7,
    employeeId: "EMP-00451",
    name: "Arjun Mehta",
    email: "arjun.mehta@gk.com",
    department: "Operations",
    designation: "Operations Manager",
    location: "Hyderabad",
    joinDate: "05 May 2025",
    status: "Active",
    attendance: "92%",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43216",
  },
  {
    id: 8,
    employeeId: "EMP-00452",
    name: "Meera Iyer",
    email: "meera.iyer@gk.com",
    department: "Customer Support",
    designation: "Support Associate",
    location: "Chennai",
    joinDate: "14 May 2025",
    status: "Active",
    attendance: "95%",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43217",
  },
  {
    id: 9,
    employeeId: "EMP-00453",
    name: "Rahul Kumar",
    email: "rahul.kumar@gk.com",
    department: "Sales",
    designation: "Sales Executive",
    location: "Hyderabad",
    joinDate: "01 Jun 2025",
    status: "Inactive",
    attendance: "65%",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43218",
  },
  {
    id: 10,
    employeeId: "EMP-00454",
    name: "Ananya Das",
    email: "ananya.das@gk.com",
    department: "Design",
    designation: "UI/UX Designer",
    location: "Bengaluru",
    joinDate: "18 Jun 2025",
    status: "Active",
    attendance: "93%",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43219",
  },
]

