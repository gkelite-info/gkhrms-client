import { redirect } from "next/navigation"

export default function ManagerApplyLeavePage() {
  redirect("/manager/attendance?tab=apply-leave")
}
