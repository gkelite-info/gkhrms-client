import { redirect } from "next/navigation"

export default function EmployeeApplyLeavePage() {
  redirect("/employee/attendance?tab=apply-leave")
}

