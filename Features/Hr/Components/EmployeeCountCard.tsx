"use client"

import {
  Briefcase,
  House,
  Smiley,
  TrendDown,
  User,
  UsersThree,
} from "phosphor-react"
import CountCard from "./CountCard"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import TotalEmployeesModal from "@/app/(main)/hr/modals/totalemployees"
import ActiveEmployeesModal from "@/app/(main)/hr/modals/activeemployees"
import LeaveEmployeesModal from "@/app/(main)/hr/modals/leaveEmployees"
import WorkFromHomeEmployeesModal from "@/app/(main)/hr/modals/workfromhome"
import NewHireEmployeesModal from "@/app/(main)/hr/modals/newhire"
import OpeningsEmployeesModal from "@/app/(main)/hr/modals/openings"
import AttritionRatioEmployeesModal from "@/app/(main)/hr/modals/attritionratio"
import EmployeesSatisfactionModal from "@/app/(main)/hr/modals/employeesatisfaction"

const cardsData = [
  {
    key: "total",
    title: "Total Employees",
    count: 200,
    icon: <UsersThree color="#8248E3" size={24} className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "active",
    title: "Active Employees",
    count: 150,
    icon: <UsersThree color="#8248E3" size={24} className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "leave",
    title: "Leave Employees",
    count: 150,
    icon: <UsersThree color="#8248E3" size={24} className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "workfromhome",
    title: "Work From Home",
    count: 10,
    icon: <House size={24} color="#8248E3" className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "newhire",
    title: "New Hire",
    count: 10,
    icon: <User size={24} color="#8248E3" className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "openings",
    title: "Open Positions",
    count: 10,
    icon: <Briefcase size={24} color="#8248E3" className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "attrition",
    title: "Attrition Ratio",
    count: 10,
    icon: <TrendDown size={24} color="#8248E3" className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
  {
    key: "satisfaction",
    title: "Employee Satisfaction",
    count: 10,
    icon: <Smiley size={24} color="#8248E3" className="sm:w-[27px] sm:h-[27px]" />,
    iconBg: "#E0DEFBD6",
  },
]

const DashboardCards = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const modalParam = searchParams?.get("modal")?.toLowerCase() || null
  const [openModal, setOpenModal] = useState<string | null>(modalParam)

  useEffect(() => {
    setOpenModal(modalParam)
  }, [modalParam])

  const handleOpenModal = (key: string) => {
    setOpenModal(key)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("modal", key)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setOpenModal(null)
    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.delete("modal")
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  return (
    <>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
        {cardsData.map((card) => (
          <div
            key={card.key}
            onClick={() => handleOpenModal(card.key)}
            className="w-full cursor-pointer"
          >
            <CountCard
              title={card.title}
              count={card.count}
              icon={card.icon}
              iconBg={card.iconBg}
            />
          </div>
        ))}
      </div>

      <TotalEmployeesModal
        isOpen={openModal === "total"}
        onClose={handleCloseModal}
      />
      <ActiveEmployeesModal
        isOpen={openModal === "active"}
        onClose={handleCloseModal}
      />
      <LeaveEmployeesModal
        isOpen={openModal === "leave"}
        onClose={handleCloseModal}
      />
      <WorkFromHomeEmployeesModal
        isOpen={openModal === "workfromhome"}
        onClose={handleCloseModal}
      />
      <NewHireEmployeesModal
        isOpen={openModal === "newhire"}
        onClose={handleCloseModal}
      />
      <OpeningsEmployeesModal
        isOpen={openModal === "openings"}
        onClose={handleCloseModal}
      />
      <AttritionRatioEmployeesModal
        isOpen={openModal === "attrition"}
        onClose={handleCloseModal}
      />
      <EmployeesSatisfactionModal
        isOpen={openModal === "satisfaction"}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default DashboardCards
