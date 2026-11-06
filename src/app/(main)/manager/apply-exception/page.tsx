import { redirect } from "next/navigation"

export default function ManagerApplyExceptionPage() {
  redirect("/manager/attendance?tab=apply-exception")
}

