import { redirect } from "next/navigation"

export default function ManagerRequestWfhPage() {
  redirect("/manager/attendance?tab=request-wfh")
}
