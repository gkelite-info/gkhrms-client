export const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
export const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

export function parseTimeString(timeStr?: string): { hour: string; minute: string; period: "AM" | "PM" } {
  if (!timeStr || timeStr === "-" || !timeStr.includes(":")) {
    return { hour: "09", minute: "00", period: "AM" }
  }
  const parts = timeStr.trim().split(" ")
  const timeParts = parts[0].split(":")
  const rawHour = parseInt(timeParts[0], 10)
  const hour = String(isNaN(rawHour) ? 9 : Math.min(12, Math.max(1, rawHour))).padStart(2, "0")
  const rawMin = parseInt(timeParts[1] || "0", 10)
  const minute = String(isNaN(rawMin) ? 0 : Math.min(59, Math.max(0, rawMin))).padStart(2, "0")
  const period: "AM" | "PM" = parts[1]?.toUpperCase() === "PM" ? "PM" : "AM"
  return { hour, minute, period }
}

export function formatTimeString(hour: string, minute: string, period: "AM" | "PM"): string {
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`
}

export function timeToMinutes(timeStr?: string): number {
  if (!timeStr || timeStr === "-") return -1
  const { hour, minute, period } = parseTimeString(timeStr)
  let h = parseInt(hour, 10) % 12
  if (period === "PM") h += 12
  return h * 60 + parseInt(minute, 10)
}

export function calculateWorkingHours(checkIn?: string, checkOut?: string): string {
  const inMin = timeToMinutes(checkIn)
  const outMin = timeToMinutes(checkOut)
  if (inMin < 0 || outMin < 0 || outMin <= inMin) return "-"
  const diff = outMin - inMin
  const h = Math.floor(diff / 60)
  const m = diff % 60
  return `${h}h ${String(m).padStart(2, "0")}m`
}

export function validateAttendanceTimes(
  status: string,
  checkIn?: string,
  checkOut?: string
): { isValid: boolean; error?: string } {
  if (status === "Absent" || status === "On Leave") {
    return { isValid: true }
  }
  if (!checkIn || checkIn === "-" || !checkOut || checkOut === "-") {
    return { isValid: false, error: "Check-in and Check-out times are required for Present/Late status." }
  }
  const inMin = timeToMinutes(checkIn)
  const outMin = timeToMinutes(checkOut)
  if (inMin < 0 || outMin < 0) {
    return { isValid: false, error: "Invalid time format. Please provide valid hours and minutes." }
  }
  if (outMin <= inMin) {
    return { isValid: false, error: "Check-out time must be later than Check-in time." }
  }
  return { isValid: true }
}

