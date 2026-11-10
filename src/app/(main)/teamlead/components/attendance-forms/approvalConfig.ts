import { ApplicantRole, RoleApprovalConfig } from "./types"

export const applicantRoles: ApplicantRole[] = [
  "Team Lead",
  "Employee",
  "Manager",
  "HR",
  "HR Manager",
  "Product Manager",
  "Finance",
  "Finance Manager",
  "Finance Executive",
  "Accountant Manager",
  "Accountant Executive",
  "Tech Admin",
]

const hrApprovers = [
  "Sneha Kapoor (HR Manager)",
  "Priya Mehta (Lead HRBP)",
  "Amit Verma (HR Operations Lead)",
  "Dr. Priya Mehta (CHRO)",
]

const executiveApprovers = [
  "Dr. G. Krishna (Chairman & MD)",
  "Sunil Gavaskar (Executive Vice Chairman)",
  "Venkatesh Rao (Board Member & Director)",
  "Meenakshi Sundaram (Chief Executive Officer)",
]

export const ROLE_APPROVAL_CONFIG: Record<ApplicantRole, RoleApprovalConfig> = {
  Employee: {
    primaryLabel: "Team Lead / Reporting Manager",
    primaryPlaceholder: "Select Team Lead / Manager / Product Manager",
    primaryOptions: [
      "Rohit Sharma (Lead Software Engineer)",
      "Ananya Sen (Frontend Team Lead)",
      "Vikram Malhotra (Backend Team Lead)",
      "Siddharth Rao (QA Lead)",
      "Rajesh Kumar (Senior Project Manager)",
      "Anjali Mehta (Product Manager)",
      "Deepak Reddy (Technical Delivery Manager)",
      "Suresh N (Engineering Manager)",
    ],
    secondaryLabel: "HR Business Partner / Manager",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Team Lead": {
    primaryLabel: "Project Manager",
    primaryPlaceholder: "Select Project Manager",
    primaryOptions: [
      "Rajesh Kumar (Senior Project Manager)",
      "Deepak Reddy (Technical Delivery Manager)",
      "Kavita Nair (Enterprise Project Manager)",
      "Suresh Iyer (Program Director)",
      "Arun Prakash (Engineering Manager)",
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
    secondaryOptions: [
      "Dr. Priya Mehta (Chief Human Resources Officer)",
      "Sneha Kapoor (Head of People & Culture)",
      "Amit Verma (Global HR Director)",
    ],
  },
  HR: {
    primaryLabel: "HR Manager",
    primaryPlaceholder: "Select HR Manager",
    primaryOptions: [
      "Sneha Kapoor (HR Manager)",
      "Priya Mehta (Lead HRBP)",
      "Amit Verma (HR Operations Lead)",
    ],
    secondaryLabel: "HR Director / CHRO",
    secondaryPlaceholder: "Select HR Director / CHRO",
    secondaryOptions: [
      "Dr. Priya Mehta (Chief Human Resources Officer)",
      "Amit Verma (Global HR Director)",
      "Dr. G. Krishna (Chairman & MD)",
    ],
  },
  "HR Manager": {
    primaryLabel: "HR Director / CHRO",
    primaryPlaceholder: "Select HR Director / CHRO",
    primaryOptions: [
      "Dr. Priya Mehta (Chief Human Resources Officer)",
      "Amit Verma (Global HR Director)",
      "Dr. G. Krishna (Chairman & MD)",
    ],
    secondaryLabel: "Executive Authority",
    secondaryPlaceholder: "Select Chairman / Managing Director",
    secondaryOptions: executiveApprovers,
  },
  "Product Manager": {
    primaryLabel: "Head of Product / Director",
    primaryPlaceholder: "Select Product Director / VP",
    primaryOptions: [
      "Venkatesh Rao (VP of Product)",
      "Meenakshi Sundaram (Chief Executive Officer)",
      "Kavita Nair (Head of Product & Delivery)",
      "Suresh Iyer (Program Director)",
    ],
    secondaryLabel: "HR Manager",
    secondaryPlaceholder: "Select HR Manager",
    secondaryOptions: hrApprovers,
  },
  Finance: {
    primaryLabel: "Finance Director / CFO",
    primaryPlaceholder: "Select Finance Director / CFO",
    primaryOptions: [
      "Rajesh Varma (Chief Financial Officer)",
      "Alok Gupta (Director of Finance & Accounts)",
      "Meenakshi Sundaram (Chief Executive Officer)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Finance Manager": {
    primaryLabel: "Finance Director / CFO",
    primaryPlaceholder: "Select Finance Director / CFO",
    primaryOptions: [
      "Rajesh Varma (Chief Financial Officer)",
      "Alok Gupta (Director of Finance & Accounts)",
      "Meenakshi Sundaram (Chief Executive Officer)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Finance Executive": {
    primaryLabel: "Finance Manager / Lead",
    primaryPlaceholder: "Select Finance Manager / Lead",
    primaryOptions: [
      "Rohan Verma (Finance Manager)",
      "Rajesh Varma (Chief Financial Officer)",
      "Alok Gupta (Director of Finance & Accounts)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Accountant Manager": {
    primaryLabel: "Chief Financial Officer / Director",
    primaryPlaceholder: "Select CFO / Director of Finance",
    primaryOptions: [
      "Rajesh Varma (Chief Financial Officer)",
      "Alok Gupta (Director of Finance & Accounts)",
      "Suresh Iyer (Executive Director)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Accountant Executive": {
    primaryLabel: "Accountant Manager / Lead",
    primaryPlaceholder: "Select Accountant Manager / Lead",
    primaryOptions: [
      "Rohan Verma (Finance Manager)",
      "Rajesh Varma (Chief Financial Officer)",
      "Alok Gupta (Director of Finance & Accounts)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
  "Tech Admin": {
    primaryLabel: "Engineering Director / VP",
    primaryPlaceholder: "Select Engineering Director / VP",
    primaryOptions: [
      "Deepak Reddy (Technical Delivery Manager)",
      "Suresh N (Engineering Manager)",
      "Dr. G. Krishna (Chairman & MD)",
    ],
    secondaryLabel: "HR Manager / Operations Head",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: hrApprovers,
  },
}
