import { ApplicantRole, RoleApprovalConfig } from "./types"

export const applicantRoles: ApplicantRole[] = [
  "Team Lead",
  "Employee",
  "Manager",
  "HR",
  "Product Manager",
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
      "Pooja Hegde (UI/UX Lead)",
      "Rajesh Kumar (Senior Project Manager)",
      "Anjali Mehta (Product Manager)",
      "Deepak Reddy (Technical Delivery Manager)",
      "Suresh N (Engineering Manager)",
    ],
    secondaryLabel: "HR Business Partner / Manager",
    secondaryPlaceholder: "Select HRBP / HR Manager",
    secondaryOptions: [
      "Sneha Kapoor (HR Manager)",
      "Priya Mehta (Senior HRBP)",
      "Amit Verma (HR Operations Lead)",
      "Neha Singh (People Operations)",
      "Kavita Nair (Enterprise Project Manager)",
      "Dr. Priya Mehta (CHRO)",
    ],
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
    secondaryOptions: [
      "Sneha Kapoor (HR Manager)",
      "Priya Mehta (Senior HRBP)",
      "Amit Verma (HR Operations Lead)",
      "Neha Singh (People Operations)",
    ],
  },
  Manager: {
    primaryLabel: "Executive Authority",
    primaryPlaceholder: "Select Chairman / Executive",
    primaryOptions: [
      "Dr. G. Krishna (Chairman & MD)",
      "Sunil Gavaskar (Executive Vice Chairman)",
      "Venkatesh Rao (Board Member & Director)",
      "Meenakshi Sundaram (Chief Executive Officer)",
    ],
    secondaryLabel: "HR Head / CHRO",
    secondaryPlaceholder: "Select HR Head",
    secondaryOptions: [
      "Dr. Priya Mehta (Chief Human Resources Officer)",
      "Sneha Kapoor (Head of People & Culture)",
      "Amit Verma (Global HR Director)",
    ],
  },
  HR: {
    primaryLabel: "HR Director",
    primaryPlaceholder: "Select HR Director / CHRO",
    primaryOptions: [
      "Dr. Priya Mehta (Chief Human Resources Officer)",
      "Amit Verma (Global HR Director)",
      "Sneha Kapoor (Head of People & Culture)",
    ],
    secondaryLabel: "Executive Authority",
    secondaryPlaceholder: "Select Chairman / Managing Director",
    secondaryOptions: [
      "Dr. G. Krishna (Chairman & MD)",
      "Sunil Gavaskar (Executive Vice Chairman)",
      "Venkatesh Rao (Board Member & Director)",
      "Meenakshi Sundaram (Chief Executive Officer)",
    ],
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
    secondaryOptions: [
      "Sneha Kapoor (HR Manager)",
      "Priya Mehta (Senior HRBP)",
      "Amit Verma (HR Operations Lead)",
    ],
  },
}
