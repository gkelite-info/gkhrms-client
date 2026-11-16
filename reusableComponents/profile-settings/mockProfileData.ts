import { UserProfileData } from "./types"

export const DEFAULT_USER_PROFILE: UserProfileData = {
  id: "user_rohit_sharma",
  name: "Rohit Sharma",
  preferredName: "Rohit",
  status: "Active",
  role: "Senior Software Engineer",
  team: "Platform Team",
  empId: "GK10234",
  band: "IC4 Senior Eng",
  avatar: "/images/alexander.png",
  todayStatus: {
    status: "On Time",
    checkInTime: "09:20",
    isOnTime: true,
  },
  shift: {
    name: "Standard",
    timing: "09:30 AM – 06:30 PM",
  },
  workMode: {
    type: "Hybrid (HQ)",
    location: "Bengaluru Tech Park",
  },
  workHierarchy: {
    department: "Engineering",
    activeProject: "GK-HRMS Core Platform",
    manager: {
      name: "Anita Verma",
      initials: "AV",
    },
    employmentType: "Full-Time Regular (Permanent)",
    joiningDate: "15 Mar 2021",
    tenure: "3.6 yrs",
  },
  leaveQuotas: {
    paidLeavesLeft: 14,
    sickLeavesLeft: 4,
    compOffsAvail: 2,
  },
  contactData: {
    workEmail: "rohit.sharma@gkhrms.com",
    personalEmail: "rohit.personal@gmail.com",
    mobilePhone: "+91 98765 43210",
    emergencyContact: {
      person: "Suresh Sharma",
      relationship: "Father",
      phone: "+91 98123 45678",
    },
    residentialAddress: {
      street: "Flat 402, Green View Apts, Outer Ring Rd, Marathahalli",
      city: "Bengaluru",
      statePostal: "Karnataka — 560037",
    },
    dob: "15 Mar 1990",
    gender: "Male",
  },
}

