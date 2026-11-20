export interface RegisteredUser {
  id: number
  name: string
  initials: string
  avatarColor: string
  employeeId: string
  email: string
  phone: string
  role: "HR Manager" | "Manager"
  department: string
  status: "Active" | "Inactive" | "Invited"
  createdDate: string
  designation?: string
  workLocation?: string
  employmentType?: string
  joiningDate?: string
  reportingTo?: string
  invitationStatus?: string
  avatarPhoto?: string
}

export const INITIAL_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 1,
    name: "Anita Sharma",
    initials: "AS",
    avatarColor: "bg-purple-100 text-purple-700",
    employeeId: "HRM001",
    email: "anita.sharma@gk.com",
    phone: "+91 98765 43210",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    createdDate: "12 Oct 2026",
    designation: "HR Manager",
    workLocation: "Hyderabad",
    employmentType: "Permanent",
    joiningDate: "12 Oct 2026",
    reportingTo: "Ramesh Kumar (Chairman)",
    invitationStatus: "Invited (08 Oct 2026)",
    avatarPhoto: "/images/jane_smith.jpg",
  },
  {
    id: 2,
    name: "Rahul Verma",
    initials: "RK",
    avatarColor: "bg-emerald-100 text-emerald-700",
    employeeId: "HRM002",
    email: "rahul.verma@gk.com",
    phone: "+91 98765 67890",
    role: "HR Manager",
    department: "Human Resources",
    status: "Invited",
    createdDate: "08 Oct 2026",
    designation: "HR Manager",
    workLocation: "Bengaluru",
    employmentType: "Permanent",
    joiningDate: "08 Oct 2026",
    reportingTo: "Ramesh Kumar (Chairman)",
    invitationStatus: "Invited (08 Oct 2026)",
    avatarPhoto: "/images/shyam.jpg",
  },
  {
    id: 3,
    name: "Sneha Patel",
    initials: "SP",
    avatarColor: "bg-amber-100 text-amber-700",
    employeeId: "MNG001",
    email: "sneha.patel@gk.com",
    phone: "+91 98765 11223",
    role: "Manager",
    department: "Operations",
    status: "Active",
    createdDate: "15 Sep 2026",
    designation: "Operations Manager",
    workLocation: "Mumbai",
    employmentType: "Permanent",
    joiningDate: "15 Sep 2026",
    reportingTo: "Anita Sharma (HR Manager)",
    invitationStatus: "Invited (10 Sep 2026)",
    avatarPhoto: "/images/shreya_raj.jpg",
  },
  {
    id: 4,
    name: "Vikram Reddy",
    initials: "VK",
    avatarColor: "bg-sky-100 text-sky-700",
    employeeId: "MNG002",
    email: "vikram.reddy@gk.com",
    phone: "+91 98765 44556",
    role: "Manager",
    department: "Product Team",
    status: "Active",
    createdDate: "20 Aug 2026",
    designation: "Product Manager",
    workLocation: "Hyderabad",
    employmentType: "Permanent",
    joiningDate: "20 Aug 2026",
    reportingTo: "Anita Sharma (HR Manager)",
    invitationStatus: "Invited (15 Aug 2026)",
    avatarPhoto: "/images/alexander.png",
  },
  {
    id: 5,
    name: "Priya Desai",
    initials: "PD",
    avatarColor: "bg-pink-100 text-pink-700",
    employeeId: "MNG003",
    email: "priya.desai@gk.com",
    phone: "+91 98765 77889",
    role: "Manager",
    department: "IT & Infrastructure",
    status: "Invited",
    createdDate: "01 Jul 2026",
    designation: "IT Manager",
    workLocation: "Pune",
    employmentType: "Permanent",
    joiningDate: "01 Jul 2026",
    reportingTo: "Anita Sharma (HR Manager)",
    invitationStatus: "Invited (01 Jul 2026)",
    avatarPhoto: "/images/jane_smith.jpg",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    initials: "AM",
    avatarColor: "bg-purple-100 text-purple-700",
    employeeId: "MNG004",
    email: "arjun.mehta@gk.com",
    phone: "+91 98765 99001",
    role: "Manager",
    department: "Marketing",
    status: "Active",
    createdDate: "18 Jun 2026",
    designation: "Marketing Manager",
    workLocation: "Delhi",
    employmentType: "Permanent",
    joiningDate: "18 Jun 2026",
    reportingTo: "Anita Sharma (HR Manager)",
    invitationStatus: "Invited (12 Jun 2026)",
    avatarPhoto: "/images/admin_rohan.jpg",
  },
]
