import { redirect } from "next/navigation"

export default function RequestWfhPage() {
  redirect("/techadmin/attendance?tab=request-wfh")
}

