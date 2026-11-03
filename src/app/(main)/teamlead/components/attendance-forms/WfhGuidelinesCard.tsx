"use client"

import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import {
  Info,
  UsersThree,
  Clock,
  WifiHigh,
  FileText,
  ShieldCheck,
  Briefcase,
} from "phosphor-react"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole, WfhGuidelineItem } from "./types"

interface WfhGuidelinesCardProps {
  role?: ApplicantRole
}

const getRoleGuidelines = (role: ApplicantRole): WfhGuidelineItem[] => {
  switch (role) {
    case "Product Manager":
      return [
        {
          id: "approval-required",
          title: "Product VP & HR Approval Required",
          description:
            "All WFH requests are subject to Head of Product / VP and HR Manager approval.",
          icon: UsersThree,
          iconBg: "bg-[#FFF7ED]",
          iconColor: "text-[#EA580C]",
        },
        {
          id: "available-hours",
          title: "Cross-Functional Sync Availability",
          description:
            "Maintain active presence on Slack/Teams for standups, design reviews, and engineering syncs.",
          icon: Clock,
          iconBg: "bg-[#ECFDF5]",
          iconColor: "text-[#059669]",
        },
        {
          id: "stable-internet",
          title: "High-Speed Internet for Demos & Sprints",
          description:
            "Ensure high-speed connectivity for product walkthroughs, customer demos, and sprint planning.",
          icon: WifiHigh,
          iconBg: "bg-[#FAF5FF]",
          iconColor: "text-[#9333EA]",
        },
        {
          id: "attachment-note",
          title: "Attachment (Optional)",
          description:
            "Attach sprint schedule, async updates plan, or demo notes if working remotely.",
          icon: FileText,
          iconBg: "bg-[#EFF6FF]",
          iconColor: "text-[#2563EB]",
        },
      ]
    case "HR":
      return [
        {
          id: "approval-required",
          title: "Executive & Board Approval Required",
          description:
            "All WFH requests are subject to HR Director / CHRO and Executive Authority (Chairman / MD) approval.",
          icon: UsersThree,
          iconBg: "bg-[#FFF7ED]",
          iconColor: "text-[#EA580C]",
        },
        {
          id: "available-hours",
          title: "Employee Support Reachability",
          description:
            "Maintain continuous availability for urgent employee relations, grievance handling, and queries.",
          icon: Clock,
          iconBg: "bg-[#ECFDF5]",
          iconColor: "text-[#059669]",
        },
        {
          id: "stable-internet",
          title: "Secure Network & Data Confidentiality",
          description:
            "Ensure a secure, encrypted internet connection when processing confidential personnel and payroll data.",
          icon: ShieldCheck,
          iconBg: "bg-[#FAF5FF]",
          iconColor: "text-[#9333EA]",
        },
        {
          id: "attachment-note",
          title: "Attachment (Optional)",
          description:
            "You can attach handover notes, emergency contacts, or travel details if working remotely.",
          icon: FileText,
          iconBg: "bg-[#EFF6FF]",
          iconColor: "text-[#2563EB]",
        },
      ]

    case "Manager":
      return [
        {
          id: "approval-required",
          title: "Executive & HR Approval Required",
          description:
            "All WFH requests are subject to Chairman / Executive Authority and CHRO approval.",
          icon: UsersThree,
          iconBg: "bg-[#FFF7ED]",
          iconColor: "text-[#EA580C]",
        },
        {
          id: "available-hours",
          title: "Leadership & Escalation Reachability",
          description:
            "Ensure you are reachable for executive escalations and departmental coordination during working hours.",
          icon: Briefcase,
          iconBg: "bg-[#ECFDF5]",
          iconColor: "text-[#059669]",
        },
        {
          id: "stable-internet",
          title: "High-Speed Internet Connection",
          description:
            "Maintain high-speed internet connectivity for virtual townhalls, executive reviews, and syncs.",
          icon: WifiHigh,
          iconBg: "bg-[#FAF5FF]",
          iconColor: "text-[#9333EA]",
        },
        {
          id: "attachment-note",
          title: "Attachment (Optional)",
          description:
            "You can attach supporting documents if required (e.g., travel schedule, executive notice, etc.).",
          icon: FileText,
          iconBg: "bg-[#EFF6FF]",
          iconColor: "text-[#2563EB]",
        },
      ]

    case "Team Lead":
      return [
        {
          id: "approval-required",
          title: "Project Manager & HR Approval Required",
          description:
            "All WFH requests are subject to Project Manager and HR Manager approval.",
          icon: UsersThree,
          iconBg: "bg-[#FFF7ED]",
          iconColor: "text-[#EA580C]",
        },
        {
          id: "available-hours",
          title: "Team Availability & Standups",
          description:
            "Ensure availability to lead daily standups, review sprint tasks, and unblock team members.",
          icon: Clock,
          iconBg: "bg-[#ECFDF5]",
          iconColor: "text-[#059669]",
        },
        {
          id: "stable-internet",
          title: "Stable Internet Connection",
          description:
            "Maintain a stable internet connection to attend client demos, standups, and collaborate with the team.",
          icon: WifiHigh,
          iconBg: "bg-[#FAF5FF]",
          iconColor: "text-[#9333EA]",
        },
        {
          id: "attachment-note",
          title: "Attachment (Optional)",
          description:
            "You can attach supporting documents if required (e.g., personal reasons, travel details, etc.).",
          icon: FileText,
          iconBg: "bg-[#EFF6FF]",
          iconColor: "text-[#2563EB]",
        },
      ]

    case "Employee":
    default:
      return [
        {
          id: "approval-required",
          title: "Team Lead & HR Approval Required",
          description:
            "All WFH requests are subject to Team Lead and HR Business Partner approval.",
          icon: UsersThree,
          iconBg: "bg-[#FFF7ED]",
          iconColor: "text-[#EA580C]",
        },
        {
          id: "available-hours",
          title: "Be Available During Working Hours",
          description:
            "Ensure you are available and reachable during your regular working hours.",
          icon: Clock,
          iconBg: "bg-[#ECFDF5]",
          iconColor: "text-[#059669]",
        },
        {
          id: "stable-internet",
          title: "Stable Internet Connection",
          description:
            "Maintain a stable internet connection to attend calls, meetings, and collaborate with the team.",
          icon: WifiHigh,
          iconBg: "bg-[#FAF5FF]",
          iconColor: "text-[#9333EA]",
        },
        {
          id: "attachment-note",
          title: "Attachment (Optional)",
          description:
            "You can attach supporting documents if required (e.g., personal reasons, travel details, etc.).",
          icon: FileText,
          iconBg: "bg-[#EFF6FF]",
          iconColor: "text-[#2563EB]",
        },
      ]
  }
}

export default function WfhGuidelinesCard({ role }: WfhGuidelinesCardProps) {
  const pathname = usePathname()
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isHr = pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")

  const activeRole: ApplicantRole =
    role ||
    (isHr
      ? "HR"
      : isManager
      ? "Manager"
      : isProductManager
      ? "Product Manager"
      : authRole === "Hr"
      ? "HR"
      : authRole === "Manager"
      ? "Manager"
      : authRole === "ProductManager"
      ? "Product Manager"
      : authRole === "Employee"
      ? "Employee"
      : "Team Lead")

  const guidelines = getRoleGuidelines(activeRole)

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
          <Info size={18} weight="bold" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
            Work From Home Guidelines
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Please go through the following guidelines before submitting your request.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {guidelines.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon size={18} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {item.title}
                </span>
                <span className="text-[11px] text-gray-400 font-medium leading-relaxed mt-0.5">
                  {item.description}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
