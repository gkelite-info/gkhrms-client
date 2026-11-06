import { redirect } from "next/navigation"

export default function HrManagerRequestWfhPage() {
  redirect("/hrmanager/attendance?tab=request-wfh")
}

