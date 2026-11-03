import type { ElementType } from "react"

export type FormTabType = "leave" | "wfh"
export type DayOption = "full" | "half"
export type ApplicantRole =
  | "Employee"
  | "Team Lead"
  | "Manager"
  | "HR"
  | "Product Manager"

export interface RoleApprovalConfig {
  primaryLabel: string
  primaryPlaceholder: string
  primaryOptions: string[]
  secondaryLabel: string
  secondaryPlaceholder: string
  secondaryOptions: string[]
}

export interface LeaveBalanceItem {
  id: string
  label: string
  used: number
  total: number
  icon: ElementType
  iconBg: string
  iconColor: string
}

export interface WfhGuidelineItem {
  id: string
  title: string
  description: string
  icon: ElementType
  iconBg: string
  iconColor: string
}

export interface UploadedFileItem {
  id: string
  file: File
  name: string
  size: number
  formattedSize: string
}
