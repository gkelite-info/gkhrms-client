import { ProductTeamMember } from "./productAttendanceTypes"

export const INITIAL_PRODUCT_MEMBERS: ProductTeamMember[] = [
  {
    id: "pm-1", employeeId: "EMP1821", name: "Arjun Mehta", avatar: null,
    designation: "Engineering Manager", role: "Manager", status: "Present",
    checkIn: "09:08 AM", checkOut: "06:12 PM", workingHours: "9h 04m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-2", employeeId: "EMP1845", name: "Sneha Reddy", avatar: null,
    designation: "UI/UX Lead", role: "Team Lead", status: "Present",
    checkIn: "09:15 AM", checkOut: "06:05 PM", workingHours: "8h 50m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-3", employeeId: "EMP1852", name: "Rohit Kumar", avatar: null,
    designation: "Backend Lead", role: "Team Lead", status: "WFH",
    checkIn: "09:00 AM", checkOut: "06:00 PM", workingHours: "9h 00m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-4", employeeId: "EMP1861", name: "Priya Nair", avatar: null,
    designation: "Frontend Developer", role: "Employee", status: "Present",
    checkIn: "09:12 AM", checkOut: "06:10 PM", workingHours: "8h 58m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-5", employeeId: "EMP1869", name: "Karthik Rao", avatar: null,
    designation: "Backend Developer", role: "Employee", status: "Present",
    checkIn: "09:20 AM", checkOut: "06:15 PM", workingHours: "8h 55m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-6", employeeId: "EMP1874", name: "Aisha Khan", avatar: null,
    designation: "QA Engineer", role: "Employee", status: "On Leave",
    checkIn: "--", checkOut: "--", workingHours: "--",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-7", employeeId: "EMP1882", name: "Rahul Sharma", avatar: null,
    designation: "UI Designer", role: "Employee", status: "Present",
    checkIn: "09:05 AM", checkOut: "06:02 PM", workingHours: "8h 57m",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-8", employeeId: "EMP1891", name: "Neha Patel", avatar: null,
    designation: "Business Analyst", role: "Employee", status: "Absent",
    checkIn: "--", checkOut: "--", workingHours: "--",
    productId: "project-alpha", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-9", employeeId: "EMP1902", name: "Vikas Joshi", avatar: null,
    designation: "Mobile Tech Lead", role: "Team Lead", status: "Present",
    checkIn: "09:10 AM", checkOut: "06:14 PM", workingHours: "9h 04m",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-10", employeeId: "EMP1908", name: "Divya Deshmukh", avatar: null,
    designation: "React Native Dev", role: "Employee", status: "Present",
    checkIn: "09:18 AM", checkOut: "06:20 PM", workingHours: "9h 02m",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-11", employeeId: "EMP1914", name: "Manish Agarwal", avatar: null,
    designation: "iOS Developer", role: "Employee", status: "WFH",
    checkIn: "09:02 AM", checkOut: "06:05 PM", workingHours: "9h 03m",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-12", employeeId: "EMP1920", name: "Pooja Hegde", avatar: null,
    designation: "QA Lead", role: "Team Lead", status: "Present",
    checkIn: "09:25 AM", checkOut: "06:28 PM", workingHours: "9h 03m",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-13", employeeId: "EMP1928", name: "Ravi Teja", avatar: null,
    designation: "Android Engineer", role: "Employee", status: "On Leave",
    checkIn: "--", checkOut: "--", workingHours: "--",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-14", employeeId: "EMP1935", name: "Ananya Roy", avatar: null,
    designation: "Product Analyst", role: "Employee", status: "Present",
    checkIn: "09:06 AM", checkOut: "06:00 PM", workingHours: "8h 54m",
    productId: "project-nova", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-15", employeeId: "EMP1940", name: "Sameer Kulkarni", avatar: null,
    designation: "DevOps Architect", role: "Manager", status: "Present",
    checkIn: "09:00 AM", checkOut: "06:10 PM", workingHours: "9h 10m",
    productId: "project-pulse", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-16", employeeId: "EMP1948", name: "Harsh Vardhan", avatar: null,
    designation: "Cloud SRE", role: "Team Lead", status: "Present",
    checkIn: "09:12 AM", checkOut: "06:08 PM", workingHours: "8h 56m",
    productId: "project-pulse", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-17", employeeId: "EMP1955", name: "Kavita Sen", avatar: null,
    designation: "Security Analyst", role: "Employee", status: "Present",
    checkIn: "09:15 AM", checkOut: "06:15 PM", workingHours: "9h 00m",
    productId: "project-orbit", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-18", employeeId: "EMP1962", name: "Tarun Gill", avatar: null,
    designation: "Database Admin", role: "Employee", status: "WFH",
    checkIn: "08:55 AM", checkOut: "05:58 PM", workingHours: "9h 03m",
    productId: "project-echo", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
  {
    id: "pm-19", employeeId: "EMP1970", name: "Sunita Rao", avatar: null,
    designation: "Release Engineer", role: "Employee", status: "Present",
    checkIn: "09:22 AM", checkOut: "06:25 PM", workingHours: "9h 03m",
    productId: "project-summit", date: "Thu, 24 Apr 2025", shift: "09:00 AM - 06:00 PM",
  },
]

