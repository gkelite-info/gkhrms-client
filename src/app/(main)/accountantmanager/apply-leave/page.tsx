import { redirect } from "next/navigation"

export default function ApplyLeavePage() {
  redirect("/accountantmanager/attendance?tab=apply-leave")
}

