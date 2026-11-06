import { redirect } from "next/navigation"

export default function HrManagerApplyLeavePage() {
  redirect("/hrmanager/attendance?tab=apply-leave")
}

