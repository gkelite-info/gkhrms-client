import { redirect } from "next/navigation"

export default function ProductManagerApplyLeavePage() {
  redirect("/productmanager/attendance?tab=apply-leave")
}
