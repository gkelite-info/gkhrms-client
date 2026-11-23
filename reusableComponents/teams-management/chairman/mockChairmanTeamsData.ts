import { ChairmanMemberItem, ChairmanRoleCategory } from "./types"

export const CHAIRMAN_ROLE_CATEGORIES: ChairmanRoleCategory[] = [
  { id: "managers", label: "Managers", count: 24 },
  { id: "finance", label: "Finance" },
  { id: "team_leads", label: "Team Leads" },
  { id: "employees", label: "Employees" },
  { id: "tech_admins", label: "Tech Admins" },
  { id: "hr", label: "HR" },
  { id: "product_managers", label: "Product Managers" },
  { id: "accountants", label: "Accountants" },
]

const MGR_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
]

const BASE_MANAGERS: Omit<ChairmanMemberItem, "id" | "category">[] = [
  { name: "Ravi Kumar", email: "ravi.kumar@company.com", employeeId: "MGR102", designation: "Manager", department: "Technology", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active", avatar: MGR_AVATARS[0] },
  { name: "Anjali Rao", email: "anjali.rao@company.com", employeeId: "AM104", designation: "Assistant Manager", department: "Operations", location: "Hyderabad", reportingTo: "Ravi Kumar", status: "Active", avatar: MGR_AVATARS[1] },
  { name: "Vikram Singh", email: "vikram.singh@company.com", employeeId: "MGR108", designation: "Manager", department: "Projects", location: "Bangalore", reportingTo: "Sneha Rao", status: "Active", avatar: MGR_AVATARS[2] },
  { name: "Neha Verma", email: "neha.verma@company.com", employeeId: "AM110", designation: "Assistant Manager", department: "Technology", location: "Mumbai", reportingTo: "Vikram Singh", status: "Active", avatar: MGR_AVATARS[3] },
  { name: "Karan Malhotra", email: "karan.malhotra@company.com", employeeId: "MGR115", designation: "Manager", department: "Product", location: "Delhi", reportingTo: "Arjun Rao", status: "Active", avatar: MGR_AVATARS[4] },
  { name: "Priya Sharma", email: "priya.sharma@company.com", employeeId: "AM118", designation: "Assistant Manager", department: "HR & People", location: "Bangalore", reportingTo: "Ramesh Kulkarni", status: "Active", avatar: MGR_AVATARS[5] },
  { name: "Siddharth Jain", email: "siddharth.jain@company.com", employeeId: "MGR121", designation: "Manager", department: "Technology", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Meera Nair", email: "meera.nair@company.com", employeeId: "AM125", designation: "Assistant Manager", department: "Operations", location: "Hyderabad", reportingTo: "Ravi Kumar", status: "Active" },
  { name: "Rohit Roy", email: "rohit.roy@company.com", employeeId: "MGR130", designation: "Manager", department: "Projects", location: "Mumbai", reportingTo: "Sneha Rao", status: "Active" },
  { name: "Kavita Reddy", email: "kavita.reddy@company.com", employeeId: "AM134", designation: "Assistant Manager", department: "Technology", location: "Bangalore", reportingTo: "Vikram Singh", status: "Active" },
  { name: "Aditya Chopra", email: "aditya.chopra@company.com", employeeId: "MGR138", designation: "Manager", department: "Product", location: "Delhi", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Snehal Patil", email: "snehal.patil@company.com", employeeId: "AM142", designation: "Assistant Manager", department: "HR & People", location: "Hyderabad", reportingTo: "Ramesh Kulkarni", status: "Active" },
  { name: "Gaurav Mehta", email: "gaurav.mehta@company.com", employeeId: "MGR145", designation: "Manager", department: "Technology", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Divya Iyer", email: "divya.iyer@company.com", employeeId: "AM148", designation: "Assistant Manager", department: "Operations", location: "Mumbai", reportingTo: "Ravi Kumar", status: "Active" },
  { name: "Naveen Joshi", email: "naveen.joshi@company.com", employeeId: "MGR152", designation: "Manager", department: "Projects", location: "Bangalore", reportingTo: "Sneha Rao", status: "Active" },
  { name: "Pooja Hegde", email: "pooja.hegde@company.com", employeeId: "AM155", designation: "Assistant Manager", department: "Technology", location: "Delhi", reportingTo: "Vikram Singh", status: "Active" },
  { name: "Harish Pillai", email: "harish.pillai@company.com", employeeId: "MGR160", designation: "Manager", department: "Product", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Aparna Sen", email: "aparna.sen@company.com", employeeId: "AM164", designation: "Assistant Manager", department: "HR & People", location: "Hyderabad", reportingTo: "Ramesh Kulkarni", status: "Active" },
  { name: "Manoj Deshmukh", email: "manoj.deshmukh@company.com", employeeId: "MGR168", designation: "Manager", department: "Technology", location: "Mumbai", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Deepa Menon", email: "deepa.menon@company.com", employeeId: "AM172", designation: "Assistant Manager", department: "Operations", location: "Bangalore", reportingTo: "Ravi Kumar", status: "Active" },
  { name: "Tarun Kapoor", email: "tarun.kapoor@company.com", employeeId: "MGR176", designation: "Manager", department: "Projects", location: "Delhi", reportingTo: "Sneha Rao", status: "Active" },
  { name: "Swati Bhatt", email: "swati.bhatt@company.com", employeeId: "AM180", designation: "Assistant Manager", department: "Technology", location: "Hyderabad", reportingTo: "Vikram Singh", status: "Active" },
  { name: "Vikas Saxena", email: "vikas.saxena@company.com", employeeId: "MGR185", designation: "Manager", department: "Product", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active" },
  { name: "Shalini Kaul", email: "shalini.kaul@company.com", employeeId: "AM190", designation: "Assistant Manager", department: "HR & People", location: "Mumbai", reportingTo: "Ramesh Kulkarni", status: "Active" },
]

export const MOCK_CHAIRMAN_MEMBERS: ChairmanMemberItem[] = [
  ...BASE_MANAGERS.map((m, idx) => ({ ...m, id: `cm-mgr-${idx + 1}`, category: "managers" as const })),
  { id: "cm-fin-1", name: "Amitabh Sen", email: "amitabh.sen@company.com", employeeId: "FIN101", designation: "Finance Manager", department: "Finance", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active", category: "finance" },
  { id: "cm-fin-2", name: "Sunita Ghosh", email: "sunita.ghosh@company.com", employeeId: "FIN105", designation: "Senior Financial Analyst", department: "Finance", location: "Mumbai", reportingTo: "Amitabh Sen", status: "Active", category: "finance" },
  { id: "cm-tl-1", name: "Aisha Khan", email: "aisha.khan@company.com", employeeId: "TL102", designation: "Team Lead", department: "Technology", location: "Bangalore", reportingTo: "Ravi Kumar", status: "Active", category: "team_leads" },
  { id: "cm-emp-1", name: "Rahul Verma", email: "rahul.verma@company.com", employeeId: "EMP201", designation: "Frontend Engineer", department: "Technology", location: "Bangalore", reportingTo: "Aisha Khan", status: "Active", category: "employees" },
  { id: "cm-ta-1", name: "Rohan Das", email: "rohan.das@company.com", employeeId: "TA101", designation: "DevOps Admin", department: "Technology", location: "Bangalore", reportingTo: "Ravi Kumar", status: "Active", category: "tech_admins" },
  { id: "cm-hr-1", name: "Sneha Rao", email: "sneha.rao@company.com", employeeId: "HR101", designation: "HR Manager", department: "HR & People", location: "Bangalore", reportingTo: "Arjun Rao", status: "Active", category: "hr" },
  { id: "cm-pm-1", name: "Tanvi Mathur", email: "tanvi.mathur@company.com", employeeId: "PM101", designation: "Product Manager", department: "Product", location: "Bangalore", reportingTo: "Karan Malhotra", status: "Active", category: "product_managers" },
  { id: "cm-acc-1", name: "Rajesh Kanna", email: "rajesh.kanna@company.com", employeeId: "ACC101", designation: "Senior Accountant", department: "Finance", location: "Hyderabad", reportingTo: "Amitabh Sen", status: "Active", category: "accountants" },
]
