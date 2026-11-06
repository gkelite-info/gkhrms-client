import { redirect } from "next/navigation"

export default function HrApplyExceptionPage() {
  redirect("/hr/attendance?tab=apply-exception")
}

