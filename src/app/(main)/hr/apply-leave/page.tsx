import { redirect } from "next/navigation"

export default function HrApplyLeavePage() {
  redirect("/hr/attendance?tab=apply-leave")
}

