import { Suspense } from "react"
import HrAttendanceDashboardContent from "../../hr/attendance-leaves/components/HrAttendanceDashboardContent"

export default function HrManagerAttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex-1 p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5B50EC] border-t-transparent animate-spin" />
        </div>
      }
    >
      <HrAttendanceDashboardContent isHrManager={true} />
    </Suspense>
  )
}

