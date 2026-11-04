import { redirect } from "next/navigation"

export default function EmployeeRequestWfhPage() {
  redirect("/employee/attendance?tab=request-wfh")
}

