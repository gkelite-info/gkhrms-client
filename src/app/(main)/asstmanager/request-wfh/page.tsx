import { redirect } from "next/navigation"

export default function RequestWfhPage() {
  redirect("/asstmanager/attendance?tab=request-wfh")
}

