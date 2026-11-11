import type { ElementType } from "react"

export type FormTabType = "leave" | "wfh" | "exception"
export type DayOption = "full" | "half"
export type ExceptionType =
  | "Late Check-in"
  | "Missed Check-out"
  | "Low Working Hours"
  | "Missed Biometric"
  | "On Duty / Client Visit"
export type ApplicantRole =
  | "Employee"
  | "Team Lead"
  | "Manager"
  | "HR"
  | "HR Manager"
  | "Product Manager"
  | "Finance"
  | "Finance Manager"
  | "Finance Executive"
  | "Accountant Manager"
  | "Accountant Executive"
  | "Tech Admin"
  | "Super Admin"
  | "Chairman"
  | "Assistant Manager"

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
