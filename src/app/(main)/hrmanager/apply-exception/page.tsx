import { redirect } from "next/navigation"

export default function HrManagerApplyExceptionPage() {
  redirect("/hrmanager/attendance?tab=apply-exception")
}

