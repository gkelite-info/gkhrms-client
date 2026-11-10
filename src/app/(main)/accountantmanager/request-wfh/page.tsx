import { redirect } from "next/navigation"

export default function RequestWfhPage() {
  redirect("/accountantmanager/attendance?tab=request-wfh")
}

