import {
  UsersThree,
  Clock,
  Laptop,
  CheckCircle,
  FileText,
} from "phosphor-react"
import { WfhGuidelineItem } from "./types"

export const hrManagerGuidelines: WfhGuidelineItem[] = [
  {
    id: "chro-approval",
    title: "CHRO / HR Director Sign-Off Required",
    description:
      "HR Manager WFH applications require approval from the Chief Human Resources Officer and executive notification.",
    icon: UsersThree,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
  {
    id: "operational-continuity",
    title: "Operational Coverage & Escalation Plan",
    description:
      "Designate a secondary HR Operations Lead for on-site employee issues, urgent approvals, and grievance handling.",
    icon: CheckCircle,
    iconBg: "bg-[#E8FAF4]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "core-availability",
    title: "Core Business Hours Availability",
    description:
      "Remain accessible via Slack, MS Teams, and corporate email between 09:30 AM to 06:30 PM for emergency escalations.",
    icon: Clock,
    iconBg: "bg-[#FFF8EC]",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: "secure-hr-data",
    title: "Secure HRMS & Confidential Data Access",
    description:
      "Ensure company VPN is active when accessing confidential employee records, compensation, and payroll portals.",
    icon: Laptop,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
]

export const hrGuidelines: WfhGuidelineItem[] = [
  {
    id: "hr-manager-approval",
    title: "HR Manager Approval Required",
    description:
      "All HR executive WFH applications must be submitted and approved by the HR Manager prior to the date.",
    icon: UsersThree,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
  {
    id: "operational-desk",
    title: "Helpdesk & Employee Query Management",
    description:
      "Ensure ticket queues and new joining onboarding checklists are routed without SLA breaches.",
    icon: CheckCircle,
    iconBg: "bg-[#E8FAF4]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "core-hours",
    title: "Core Operating Hours (09:00 AM - 06:00 PM)",
    description:
      "Maintain continuous presence on office chat channels and promptly respond to internal stakeholders.",
    icon: Clock,
    iconBg: "bg-[#FFF8EC]",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: "data-security",
    title: "Information Security Protocols",
    description:
      "Use authorized corporate devices with strict multi-factor authentication for HRMS compliance.",
    icon: Laptop,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
]

export const productManagerGuidelines: WfhGuidelineItem[] = [
  {
    id: "approval-required",
    title: "Product VP & HR Approval Required",
    description:
      "Work from home requests must be approved by your VP of Product and HR Manager before taking leave.",
    icon: UsersThree,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#5B50EC]",
  },
  {
    id: "roadmap-cadence",
    title: "Release & Sprint Alignment",
    description:
      "Ensure critical sprint reviews, backlog grooming, and release deployments have designated delegates.",
    icon: CheckCircle,
    iconBg: "bg-[#E8FAF4]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "core-hours",
    title: "Core Collaboration Hours",
    description:
      "Remain available on Slack, Zoom, and Google Meet during core team hours (10:00 AM to 6:00 PM).",
    icon: Clock,
    iconBg: "bg-[#FFF8EC]",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: "daily-sync",
    title: "Standup & Sync Documentation",
    description:
      "Document end-of-day progress, feature velocity, and blockers on Jira/Confluence tickets.",
    icon: FileText,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-600",
  },
]

