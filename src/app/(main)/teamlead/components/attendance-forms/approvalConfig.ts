import { ApplicantRole, RoleApprovalConfig } from "./types"

export const applicantRoles: ApplicantRole[] = [
  "Team Lead", "Employee", "Manager", "HR", "HR Manager", "Product Manager",
  "Finance", "Finance Manager", "Finance Executive", "Accountant Manager",
  "Accountant Executive", "Tech Admin", "Super Admin", "Chairman", "Assistant Manager",
]

const hrApprovers = [
  "Sneha Kapoor (HR Manager)", "Priya Mehta (Lead HRBP)",
  "Amit Verma (HR Operations Lead)", "Dr. Priya Mehta (CHRO)",
]

const executiveApprovers = [
  "Dr. G. Krishna (Chairman & MD)", "Sunil Gavaskar (Executive Vice Chairman)",
  "Venkatesh Rao (Board Member & Director)", "Meenakshi Sundaram (Chief Executive Officer)",
]

const financeDirectors = [
  "Rajesh Varma (Chief Financial Officer)", "Alok Gupta (Director of Finance & Accounts)",
  "Meenakshi Sundaram (Chief Executive Officer)",
]

const engineeringDirectors = [
  "Deepak Reddy (Technical Delivery Manager)", "Suresh N (Engineering Manager)",
  "Dr. G. Krishna (Chairman & MD)",
]

export const ROLE_APPROVAL_CONFIG: Record<ApplicantRole, RoleApprovalConfig> = {
  Employee: {
    primaryLabel: "Team Lead / Reporting Manager",
    primaryPlaceholder: "Select Team Lead / Manager / Product Manager",
    primaryOptions: [
      "Rohit Sharma (Lead Software Engineer)", "Ananya Sen (Frontend Team Lead)",
      "Vikram Malhotra (Backend Team Lead)", "Siddharth Rao (QA Lead)",
      "Rajesh Kumar (Senior Project Manager)", "Anjali Mehta (Product Manager)",
      "Deepak Reddy (Technical Delivery Manager)", "Suresh N (Engineering Manager)",
    ],
    secondaryLabel: "HR Business Partner / Manager",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Team Lead": {
    primaryLabel: "Project Manager",
    primaryPlaceholder: "Select Project Manager",
    primaryOptions: [
      "Rajesh Kumar (Senior Project Manager)", "Deepak Reddy (Technical Delivery Manager)",
      "Kavita Nair (Enterprise Project Manager)", "Suresh Iyer (Program Director)",
    ],
    secondaryLabel: "HR Manager",
    secondaryPlaceholder: "Select HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Assistant Manager": {
    primaryLabel: "Reporting Manager / Delivery Head",
    primaryPlaceholder: "Select Manager / Delivery Head",
    primaryOptions: [
      "Rajesh Kumar (Senior Project Manager)", "Deepak Reddy (Technical Delivery Manager)",
      "Suresh N (Engineering Manager)", "Kavita Nair (Head of Product & Delivery)",
    ],
    secondaryLabel: "HR Manager",
    secondaryPlaceholder: "Select HR Manager",
    secondaryOptions: hrApprovers,
  },
  Manager: {
    primaryLabel: "Executive Authority",
    primaryPlaceholder: "Select Chairman / Executive",
    primaryOptions: executiveApprovers,
    secondaryLabel: "HR Head / CHRO",
    secondaryPlaceholder: "Select HR Head",
    secondaryOptions: hrApprovers.slice(2),
  },
  HR: {
    primaryLabel: "HR Manager",
    primaryPlaceholder: "Select HR Manager",
    primaryOptions: hrApprovers.slice(0, 3),
    secondaryLabel: "HR Director / CHRO",
    secondaryPlaceholder: "Select HR Director / CHRO",
    secondaryOptions: [hrApprovers[3], "Amit Verma (Global HR Director)", executiveApprovers[0]],
  },
  "HR Manager": {
    primaryLabel: "HR Director / CHRO",
    primaryPlaceholder: "Select HR Director / CHRO",
    primaryOptions: [hrApprovers[3], "Amit Verma (Global HR Director)", executiveApprovers[0]],
    secondaryLabel: "Executive Authority",
    secondaryPlaceholder: "Select Chairman / Managing Director",
    secondaryOptions: executiveApprovers,
  },
  "Product Manager": {
    primaryLabel: "Head of Product / Director",
    primaryPlaceholder: "Select Product Director / VP",
    primaryOptions: [
      "Venkatesh Rao (VP of Product)", "Meenakshi Sundaram (Chief Executive Officer)",
      "Kavita Nair (Head of Product & Delivery)", "Suresh Iyer (Program Director)",
    ],
    secondaryLabel: "HR Manager",
    secondaryPlaceholder: "Select HR Manager",
    secondaryOptions: hrApprovers,
  },
  Finance: {
    primaryLabel: "Finance Director / CFO",
    primaryPlaceholder: "Select Finance Director / CFO",
    primaryOptions: financeDirectors,
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Finance Manager": {
    primaryLabel: "Finance Director / CFO",
    primaryPlaceholder: "Select Finance Director / CFO",
    primaryOptions: financeDirectors,
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Finance Executive": {
    primaryLabel: "Finance Manager / Lead",
    primaryPlaceholder: "Select Finance Manager / Lead",
    primaryOptions: ["Rohan Verma (Finance Manager)", ...financeDirectors.slice(0, 2)],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Accountant Manager": {
    primaryLabel: "Chief Financial Officer / Director",
    primaryPlaceholder: "Select CFO / Director of Finance",
    primaryOptions: [...financeDirectors.slice(0, 2), "Suresh Iyer (Executive Director)"],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Accountant Executive": {
    primaryLabel: "Accountant Manager / Lead",
    primaryPlaceholder: "Select Accountant Manager / Lead",
    primaryOptions: ["Rohan Verma (Finance Manager)", ...financeDirectors.slice(0, 2)],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Tech Admin": {
    primaryLabel: "Engineering Director / VP",
    primaryPlaceholder: "Select Engineering Director / VP",
    primaryOptions: engineeringDirectors,
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Super Admin": {
    primaryLabel: "Executive Board / Chairman",
    primaryPlaceholder: "Select Executive Authority",
    primaryOptions: executiveApprovers,
    secondaryLabel: "Global HRBP / CHRO",
    secondaryPlaceholder: "Select HR Authority",
    secondaryOptions: hrApprovers,
  },
  Chairman: {
    primaryLabel: "Board of Directors / Managing Committee",
    primaryPlaceholder: "Select Board Member",
    primaryOptions: executiveApprovers,
    secondaryLabel: "Chief Human Resources Officer",
    secondaryPlaceholder: "Select CHRO",
    secondaryOptions: hrApprovers.slice(2),
  },
}
