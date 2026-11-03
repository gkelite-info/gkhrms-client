"use client"

import { useState } from "react"
import EmployeeModal, { StatusEmployee } from "./EmployeeModal"

interface MetricCardData {
  id: string
  title: string
  count: number
  titleColor: string
  employees: StatusEmployee[]
}

const metricCardsData: MetricCardData[] = [
  {
    id: "off-today",
    title: "Who is off today",
    count: 2,
    titleColor: "#F59E0B",
    employees: [
      {
        id: 1,
        name: "James",
        role: "Manager",
        department: "Engineering",
        email: "james.manager@gkelite.com",
        phone: "+91 98765 43210",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Casual Leave",
      },
      {
        id: 2,
        name: "Sara Johnson",
        role: "Designer",
        department: "Design",
        email: "sara.johnson@gkelite.com",
        phone: "+91 98765 43211",
        location: "Bangalore",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Planned Vacation",
      },
    ],
  },
  {
    id: "on-time",
    title: "Employees on Time Today",
    count: 7,
    titleColor: "#4338CA",
    employees: [
      {
        id: 11,
        name: "Jay",
        role: "Manager",
        department: "Product",
        email: "jay.manager@gkelite.com",
        phone: "+91 98765 43212",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:52 AM",
      },
      {
        id: 12,
        name: "Emily Davis",
        role: "Manager",
        department: "Operations",
        email: "emily.davis@gkelite.com",
        phone: "+91 98765 43213",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:55 AM",
      },
      {
        id: 13,
        name: "John Doe",
        role: "Developer",
        department: "Frontend",
        email: "john.doe@gkelite.com",
        phone: "+91 98765 43214",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:58 AM",
      },
      {
        id: 14,
        name: "Sarah Johnson",
        role: "Designer",
        department: "UI/UX",
        email: "sarah.j@gkelite.com",
        phone: "+91 98765 43215",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:48 AM",
      },
      {
        id: 15,
        name: "Michael Smith",
        role: "Developer",
        department: "Backend",
        email: "michael.smith@gkelite.com",
        phone: "+91 98765 43216",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:50 AM",
      },
      {
        id: 16,
        name: "Emily Davis",
        role: "Developer",
        department: "Frontend",
        email: "emily.dev@gkelite.com",
        phone: "+91 98765 43217",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:59 AM",
      },
      {
        id: 17,
        name: "Davis",
        role: "Developer",
        department: "Fullstack",
        email: "davis.dev@gkelite.com",
        phone: "+91 98765 43218",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Checked In",
        time: "08:54 AM",
      },
    ],
  },
  {
    id: "late-arrivals",
    title: "Late Arrivals Today",
    count: 3,
    titleColor: "#EC4899",
    employees: [
      {
        id: 21,
        name: "Smith",
        role: "Developer",
        department: "Engineering",
        email: "smith@gkelite.com",
        phone: "+91 98765 43219",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Late by 40 min",
        time: "09:40 AM",
      },
      {
        id: 22,
        name: "John",
        role: "Developer",
        department: "Mobile Team",
        email: "john.mobile@gkelite.com",
        phone: "+91 98765 43220",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Late by 25 min",
        time: "09:25 AM",
      },
      {
        id: 23,
        name: "Alex Patel",
        role: "QA Engineer",
        department: "Quality Assurance",
        email: "alex.patel@gkelite.com",
        phone: "+91 98765 43221",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Late by 30 min",
        time: "09:30 AM",
      },
    ],
  },
  {
    id: "wfh",
    title: "Work from Home",
    count: 2,
    titleColor: "#10B981",
    employees: [
      {
        id: 31,
        name: "Michael Smith",
        role: "Developer",
        department: "Backend",
        email: "michael.smith@gkelite.com",
        phone: "+91 98765 43216",
        location: "Home Office",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&auto=format&fit=crop&q=80",
        statusDetail: "WFH Approved",
        time: "Online since 09:00 AM",
      },
      {
        id: 32,
        name: "Emily Davis",
        role: "Developer",
        department: "Frontend",
        email: "emily.dev@gkelite.com",
        phone: "+91 98765 43217",
        location: "Home Office",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
        statusDetail: "WFH Approved",
        time: "Online since 08:45 AM",
      },
    ],
  },
  {
    id: "remote",
    title: "Remote",
    count: 2,
    titleColor: "#06B6D4",
    employees: [
      {
        id: 41,
        name: "Sara Johnson",
        role: "Designer",
        department: "Design System",
        email: "sara.johnson@gkelite.com",
        phone: "+91 98765 43211",
        location: "Bangalore (Remote)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Remote Work",
        time: "Active",
      },
      {
        id: 42,
        name: "Davis",
        role: "Developer",
        department: "Cloud Architecture",
        email: "davis.dev@gkelite.com",
        phone: "+91 98765 43218",
        location: "Pune (Remote)",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Remote Work",
        time: "Active",
      },
    ],
  },
  {
    id: "not-in-yet",
    title: "Not in yet Today",
    count: 2,
    titleColor: "#EF4444",
    employees: [
      {
        id: 51,
        name: "James",
        role: "Manager",
        department: "Engineering",
        email: "james.manager@gkelite.com",
        phone: "+91 98765 43210",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Not Clocked In",
      },
      {
        id: 52,
        name: "Robert Fox",
        role: "DevOps Engineer",
        department: "Infrastructure",
        email: "robert.fox@gkelite.com",
        phone: "+91 98765 43222",
        location: "Hyderabad",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
        statusDetail: "Shift Starts 11:00 AM",
      },
    ],
  },
]

export default function StatusCards() {
  const [selectedCard, setSelectedCard] = useState<MetricCardData | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 w-full">
        {metricCardsData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            <h3
              className="text-xs sm:text-sm font-bold tracking-tight"
              style={{ color: card.titleColor }}
            >
              {card.title}
            </h3>

            <div className="flex items-baseline justify-between mt-3 sm:mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
                {card.count}
              </span>

              <button
                type="button"
                onClick={() => setSelectedCard(card)}
                className="text-xs font-semibold text-[#8571EE] hover:text-[#6D54E6] cursor-pointer transition-colors hover:underline"
              >
                View Employees
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCard && (
        <EmployeeModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          title={selectedCard.title}
          color={selectedCard.titleColor}
          employees={selectedCard.employees}
        />
      )}
    </>
  )
}

