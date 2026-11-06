import {
  UsersThree,
  Clock,
  Laptop,
  CheckCircle,
  FileText,
} from "phosphor-react"
import { ApplicantRole, WfhGuidelineItem } from "./types"
import {
  hrManagerGuidelines,
  hrGuidelines,
  productManagerGuidelines,
} from "./managementWfhGuidelines"

export const getRoleGuidelines = (role: ApplicantRole): WfhGuidelineItem[] => {
  switch (role) {
    case "HR Manager":
      return hrManagerGuidelines
    case "HR":
      return hrGuidelines
    case "Product Manager":
      return productManagerGuidelines
    case "Manager":
      return [
        {
          id: "leadership-approval",
          title: "Executive Director Sign-Off Required",
          description:
            "Manager WFH requests require approval from the Board / Managing Director and HR Head.",
          icon: UsersThree,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "delegation-plan",
          title: "Standup & Delivery Continuity",
          description:
            "Maintain operational oversight and ensure cross-functional team blockers are resolved remotely.",
          icon: CheckCircle,
          iconBg: "bg-[#E8FAF4]",
          iconColor: "text-[#10B981]",
        },
        {
          id: "exec-availability",
          title: "Executive Availability",
          description:
            "Be available for scheduled escalations, steering committee calls, and stakeholder meetings.",
          icon: Clock,
          iconBg: "bg-[#FFF8EC]",
          iconColor: "text-[#F59E0B]",
        },
      ]
    case "Finance Manager":
    case "Finance":
      return [
        {
          id: "fin-sec",
          title: "Financial Ledger Security",
          description:
            "Use secured VPN when accessing financial ledgers, invoice workflows, and banking portals.",
          icon: Laptop,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "fin-auth",
          title: "Payment Authorization Compliance",
          description:
            "Ensure two-factor authorization and audit trails are completed for all remote disbursement requests.",
          icon: CheckCircle,
          iconBg: "bg-[#E8FAF4]",
          iconColor: "text-[#10B981]",
        },
        {
          id: "fin-avail",
          title: "Core Hours Availability",
          description:
            "Maintain active communication on Slack/Teams for urgent purchase approvals and vendor queries.",
          icon: Clock,
          iconBg: "bg-[#FFF8EC]",
          iconColor: "text-[#F59E0B]",
        },
      ]
    case "Employee":
      return [
        {
          id: "lead-approval",
          title: "Team Lead Approval Required",
          description:
            "WFH requests must be approved by your direct reporting Team Lead.",
          icon: UsersThree,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "daily-standup",
          title: "Join Daily Standup On Time",
          description:
            "Attend the 10:00 AM sprint standup via Google Meet with camera on.",
          icon: CheckCircle,
          iconBg: "bg-[#E8FAF4]",
          iconColor: "text-[#10B981]",
        },
        {
          id: "active-hours",
          title: "Active During Core Hours",
          description:
            "Be reachable on Slack/Teams from 9:30 AM to 6:30 PM for team syncs.",
          icon: Clock,
          iconBg: "bg-[#FFF8EC]",
          iconColor: "text-[#F59E0B]",
        },
        {
          id: "stable-network",
          title: "Stable High-Speed Connectivity",
          description:
            "Ensure dependable broadband connection with power backup during scheduled work hours.",
          icon: Laptop,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "daily-eod",
          title: "EOD Task Updates",
          description:
            "Send end-of-day task updates and mark completed tickets before clocking out.",
          icon: FileText,
          iconBg: "bg-[#F3F4F6]",
          iconColor: "text-gray-600",
        },
      ]
    case "Team Lead":
    default:
      return [
        {
          id: "pm-approval",
          title: "Project Manager Approval Required",
          description:
            "Requests require approval from your designated Project Manager and HR Manager.",
          icon: UsersThree,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "team-standup",
          title: "Lead Daily Team Standup",
          description:
            "Conduct the morning sprint call remotely and unblock team members without disruption.",
          icon: CheckCircle,
          iconBg: "bg-[#E8FAF4]",
          iconColor: "text-[#10B981]",
        },
        {
          id: "core-availability",
          title: "High Availability During Core Hours",
          description:
            "Maintain real-time availability on team communication channels throughout the day.",
          icon: Clock,
          iconBg: "bg-[#FFF8EC]",
          iconColor: "text-[#F59E0B]",
        },
        {
          id: "secure-env",
          title: "Company Device Usage",
          description:
            "Perform all code reviews and production deployments solely on secured corporate machines.",
          icon: Laptop,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
      ]
  }
}
