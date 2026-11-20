"use client"

import { useState } from "react"
import ChairmanWelcomeBanner from "./ChairmanWelcomeBanner"
import ChairmanStatCards from "./ChairmanStatCards"
import ChairmanFinanceOverviewChart from "./ChairmanFinanceOverviewChart"
import ChairmanExpenseBreakdownChart from "./ChairmanExpenseBreakdownChart"
import ChairmanBudgetUtilizationCard from "./ChairmanBudgetUtilizationCard"
import ChairmanHeadcountTrendChart from "./ChairmanHeadcountTrendChart"
import ChairmanDepartmentStrengthCard from "./ChairmanDepartmentStrengthCard"
import ChairmanRecruitmentStatusChart from "./ChairmanRecruitmentStatusChart"
import ChairmanKeyAlertsCard from "./ChairmanKeyAlertsCard"
import TotalEmployeesView from "./total-employees/TotalEmployeesView"
import ActiveDepartmentsView from "./active-departments/ActiveDepartmentsView"
import PresentTodayView from "./present-today/PresentTodayView"
import NewJoinersView from "./new-joiners/NewJoinersView"
import FinanceOverviewView from "./finance-overview/FinanceOverviewView"
import ChairmanHeadcountView from "../headcount/ChairmanHeadcountView"

type ChairmanDashboardViewType =
  | "dashboard"
  | "total_employees"
  | "active_departments"
  | "present_today"
  | "new_joiners"
  | "finance_overview"
  | "headcount"

export default function ChairmanDashboardView() {
  const [currentView, setCurrentView] =
    useState<ChairmanDashboardViewType>("dashboard")

  const handleSelectStatCard = (cardId: string) => {
    if (cardId === "total_employees") {
      setCurrentView("total_employees")
    } else if (cardId === "active_departments") {
      setCurrentView("active_departments")
    } else if (cardId === "present_today") {
      setCurrentView("present_today")
    } else if (cardId === "new_joiners") {
      setCurrentView("new_joiners")
    }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 flex flex-col gap-4 pb-12">
      {currentView === "total_employees" ? (
        <TotalEmployeesView onBack={() => setCurrentView("dashboard")} />
      ) : currentView === "active_departments" ? (
        <ActiveDepartmentsView onBack={() => setCurrentView("dashboard")} />
      ) : currentView === "present_today" ? (
        <PresentTodayView onBack={() => setCurrentView("dashboard")} />
      ) : currentView === "new_joiners" ? (
        <NewJoinersView onBack={() => setCurrentView("dashboard")} />
      ) : currentView === "finance_overview" ? (
        <FinanceOverviewView onBack={() => setCurrentView("dashboard")} />
      ) : currentView === "headcount" ? (
        <ChairmanHeadcountView onBack={() => setCurrentView("dashboard")} />
      ) : (
        <>
          <ChairmanWelcomeBanner />
          <ChairmanStatCards onSelectCard={handleSelectStatCard} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <ChairmanFinanceOverviewChart
                onClick={() => setCurrentView("finance_overview")}
              />
            </div>
            <div className="lg:col-span-4 flex flex-col">
              <ChairmanExpenseBreakdownChart />
            </div>
            <div className="lg:col-span-3 flex flex-col">
              <ChairmanBudgetUtilizationCard />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <ChairmanHeadcountTrendChart
                onClick={() => setCurrentView("headcount")}
              />
            </div>
            <div className="lg:col-span-4 flex flex-col">
              <ChairmanDepartmentStrengthCard />
            </div>
            <div className="lg:col-span-3 flex flex-col">
              <ChairmanRecruitmentStatusChart />
            </div>
          </div>

          <ChairmanKeyAlertsCard />
        </>
      )}
    </div>
  )
}
