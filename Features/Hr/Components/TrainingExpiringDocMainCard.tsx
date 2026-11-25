"use client"

import ExpiringDocument from "./ExpiringDocument"

type ProgramSectionProps = {
  number: number
  title: string
  programs: string[]
}

const ProgramSection = ({
  number,
  title,
  programs,
}: ProgramSectionProps) => (
  <div className="w-full flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4">
    <div className="w-full sm:w-1/2 flex items-center gap-2 shrink-0">
      <span className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] flex rounded-full justify-center items-center bg-[#272372] text-white text-xs font-semibold shrink-0">
        {number}
      </span>
      <span className="text-[#272372] text-xs font-semibold">{title}</span>
    </div>
    <div className="w-full sm:w-1/2 flex flex-col gap-1.5 sm:gap-2">
      {programs.map((program, idx) => (
        <span key={idx} className="text-xs text-[#4C488F] truncate">
          {program}
        </span>
      ))}
    </div>
  </div>
)

const TrainingExpiringDocMainCard = () => {
  const onGoingPrograms = [
    "AI ML - Certification",
    "Project Management - Certification",
    "Project Management - Certification",
    "Project Management - Certification",
  ]

  const upcomingPrograms = [
    "AI ML - Certification",
    "Project Management - Certification",
    "Project Management - Certification",
    "Project Management - Certification",
  ]

  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
      <div className="w-full lg:w-1/2 bg-[#F9FAFB] rounded-2xl p-4 sm:p-6 flex flex-col gap-5 sm:gap-6 shadow-xs border border-gray-100 min-w-0">
        <h3 className="text-[#323232] font-semibold text-xs sm:text-sm">
          Training Programs
        </h3>
        <div className="w-full flex flex-col gap-5 sm:gap-6">
          <ProgramSection
            number={1}
            title="On Going Programs:"
            programs={onGoingPrograms}
          />
          <ProgramSection
            number={2}
            title="Upcoming Programs:"
            programs={upcomingPrograms}
          />
        </div>
      </div>

      <ExpiringDocument />
    </div>
  )
}

export default TrainingExpiringDocMainCard
