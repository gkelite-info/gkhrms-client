import type { ElementType } from "react"
import { UsersThree, Clock, ShieldCheck } from "phosphor-react"
import { ApplicantRole } from "./types"

export interface LeaveInstructionItem {
  icon: ElementType
  title: string
  text: string
}

export const getRoleLeaveInstructions = (
  role: ApplicantRole
): LeaveInstructionItem[] => {
  switch (role) {
    case "HR Manager":
      return [
        {
          icon: UsersThree,
          title: "CHRO & Executive Approval",
          text: "HR Manager leaves require sign-off from Chief Human Resources Officer and executive notification.",
        },
        {
          icon: Clock,
          title: "Advance Operational Notice",
          text: "Submit planned leaves at least 3 business days in advance to ensure departmental leadership continuity.",
        },
        {
          icon: ShieldCheck,
          title: "Operational Backup Delegation",
          text: "Designate a Lead HRBP or secondary Operations Lead for grievance escalations and payroll sign-offs.",
        },
      ]
    case "HR":
      return [
        {
          icon: UsersThree,
          title: "HR Manager Review",
          text: "All HR specialist leaves require sign-off from the HR Manager and designated HRBP lead.",
        },
        {
          icon: Clock,
          title: "2 Days Advance Notice",
          text: "Apply planned leaves at least 2 business days in advance for smooth workload distribution.",
        },
        {
          icon: ShieldCheck,
          title: "Queue & Onboarding Handover",
          text: "Hand over active onboarding and candidate interview schedules to your designated peer.",
        },
      ]
    case "Product Manager":
      return [
        {
          icon: UsersThree,
          title: "Product Leadership Sign-Off",
          text: "Product Manager leaves require sign-off from Head of Product / VP and HRBP.",
        },
        {
          icon: Clock,
          title: "Sprint Alignment Notice",
          text: "Submit planned leaves before sprint planning meetings to avoid roadmap roadblocks.",
        },
        {
          icon: ShieldCheck,
          title: "Feature Ownership Delegation",
          text: "Assign release approvals and PRD queries to a designated proxy Product Lead.",
        },
      ]
    case "Manager":
      return [
        {
          icon: UsersThree,
          title: "Executive Approval",
          text: "Manager leaves require approval from Executive Leadership (MD/Chairman) and CHRO.",
        },
        {
          icon: Clock,
          title: "Program Continuity Notice",
          text: "Apply at least 3 business days in advance to ensure program alignment and client delivery continuity.",
        },
        {
          icon: ShieldCheck,
          title: "Interim Delegation",
          text: "Ensure secondary team leads are briefed on critical deliverables and escalation paths.",
        },
      ]
    case "Finance Manager":
    case "Finance Executive":
    case "Finance":
      return [
        {
          icon: UsersThree,
          title: "Finance Leadership & CFO Approval",
          text: "Finance leaves require sign-off from Chief Financial Officer / Finance Director and HRBP.",
        },
        {
          icon: Clock,
          title: "Payroll & Audit Cycle Notice",
          text: "Submit leaves at least 3 business days in advance, avoiding critical monthly financial closing cycles.",
        },
        {
          icon: ShieldCheck,
          title: "Disbursement & Invoice Delegation",
          text: "Ensure active reimbursement workflows, vendor payouts, and bank reconciliations are delegated.",
        },
      ]
    case "Employee":
      return [
        {
          icon: UsersThree,
          title: "Team Lead Approval",
          text: "All leaves must be reviewed and approved by your direct reporting Team Lead.",
        },
        {
          icon: Clock,
          title: "Advance Notice",
          text: "Apply at least 24 hours in advance for planned leaves to maintain project velocity.",
        },
        {
          icon: ShieldCheck,
          title: "Task Handover",
          text: "Ensure active Jira tasks and daily deliverables are handed over to your team buddy.",
        },
      ]
    case "Team Lead":
    default:
      return [
        {
          icon: UsersThree,
          title: "Project Manager Approval",
          text: "Team Lead leaves must be approved by your Project Manager and HR Manager.",
        },
        {
          icon: Clock,
          title: "Advance Notice",
          text: "Apply at least 48 hours in advance for planned leaves to allow sprint adjustments.",
        },
        {
          icon: ShieldCheck,
          title: "Sprint Delegation",
          text: "Designate a senior team engineer as the proxy lead during your leave duration.",
        },
      ]
  }
}
