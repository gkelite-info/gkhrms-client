import { redirect } from "next/navigation"

export default function EmployeeApplyExceptionPage() {
  redirect("/employee/attendance?tab=apply-exception")
}

