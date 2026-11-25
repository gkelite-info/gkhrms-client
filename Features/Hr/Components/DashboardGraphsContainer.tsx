"use client"

import StandLineGraph from "../../../utils/StandLineGraph"
import Approvals from "./Approvals"
import { CheckCircle, Clock, UsersThree } from "phosphor-react"
import ExperienceDistribution from "./ExperienceDistribution"

const DashboardGraphsContainer = () => {
  const chartData = [
    { name: "HR", value: 200, color: "#8248E3" },
    { name: "Managers", value: 400, color: "#1E90FF" },
    { name: "Employees", value: 300, color: "#28A745" },
    { name: "Admins", value: 240, color: "#FF5733" },
  ]

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-4">
      <div className="w-full lg:w-[30%] min-w-0 bg-[#F9FAFB] shadow-xs border border-gray-100 min-h-[320px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-center">
        <h3 className="text-[#323232] font-semibold text-xs sm:text-sm text-center">
          Headcount by Department
        </h3>
        <div className="w-full flex-1 flex items-center justify-center min-w-0 pt-2">
          <StandLineGraph data={chartData} barHeight={240} />
        </div>
      </div>

      <ExperienceDistribution />

      <div className="w-full lg:w-[30%] min-w-0 bg-[#F9FAFB] min-h-[320px] rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between items-center gap-4">
        <h3 className="text-[#323232] font-semibold text-xs sm:text-sm text-center">
          Approvals
        </h3>
        <div className="w-full p-2 sm:p-3 flex flex-col justify-around items-center flex-1 gap-4">
          <Approvals
            icon={<Clock size={20} color="#fff" />}
            count={10}
            label="Pending Approvals"
            bgColor="#51B677"
          />
          <Approvals
            icon={<CheckCircle size={20} color="#fff" />}
            count={25}
            label="Completed Tasks"
            bgColor="#4A90E2"
          />
          <Approvals
            icon={<UsersThree size={20} color="#fff" />}
            count={200}
            label="Employees"
            bgColor="#8248E3"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardGraphsContainer
