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
          title: "Team Delegation Plan",
          description:
            "Confirm designated team leads have authority to make operational calls during remote days.",
          icon: CheckCircle,
          iconBg: "bg-[#E8FAF4]",
          iconColor: "text-[#10B981]",
        },
        {
          id: "leadership-availability",
          title: "Emergency Accessibility",
          description:
            "Remain on-call for cross-departmental and executive escalations throughout business hours.",
          icon: Clock,
          iconBg: "bg-[#FFF8EC]",
          iconColor: "text-[#F59E0B]",
        },
        {
          id: "secure-access",
          title: "Secure Enterprise VPN Access",
          description:
            "Ensure VPN encryption is utilized when accessing administrative reports and finance tooling.",
          icon: Laptop,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
      ]
    case "Employee":
      return [
        {
          id: "tl-approval",
          title: "Team Lead Approval Required",
          description:
            "Submit requests at least 24 hours in advance to receive sign-off from your direct Team Lead.",
          icon: UsersThree,
          iconBg: "bg-[#EEF2FF]",
          iconColor: "text-[#5B50EC]",
        },
        {
          id: "shift-timings",
          title: "Adhere to Scheduled Shift Timings",
          description:
            "Check in and check out within the designated shift window to ensure accurate working hours.",
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
