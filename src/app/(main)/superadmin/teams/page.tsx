"use client"

import { useState } from "react"
import {
  Building2,
  Network,
  MessageCircleMore,
} from "lucide-react"
import { Users as PhosphorUsers } from "phosphor-react"
import { initialTeamCompanies, TeamCompanyRecord } from "./teamsData"
import TeamsStats from "./components/TeamsStats"
import TeamsTable from "./components/TeamsTable"
import CompanyHierarchyView from "./components/CompanyHierarchyView"
import TeamChatView from "./components/TeamChatView"
import CompanyDetailModal from "./components/CompanyDetailModal"
import AddCompanyTeamModal from "./components/AddCompanyTeamModal"

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState<"companies" | "hierarchy" | "chat">("companies")
  const [companies, setCompanies] = useState<TeamCompanyRecord[]>(initialTeamCompanies)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<TeamCompanyRecord | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleAddCompanySuccess = (newCompany: TeamCompanyRecord) => {
    setCompanies((prev) => [newCompany, ...prev])
  }

  const handleViewCompany = (comp: TeamCompanyRecord) => {
    setSelectedCompany(comp)
    setIsDetailModalOpen(true)
  }

  const activeCount = companies.filter((c) => c.accountStatus === "Active").length
  const inactiveCount = companies.filter((c) => c.accountStatus === "Inactive").length
  const expiringCount = companies.filter((c) => c.paymentStatus === "Pending").length

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EEECFC] flex items-center justify-center shrink-0 shadow-2xs">
            <PhosphorUsers size={24} weight="bold" className="text-[#5046E5]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
              Teams
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Manage and view all companies using the GK-HRMS portal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab("companies")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "companies"
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 border border-slate-100 shadow-2xs"
              }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Companies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hierarchy")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "hierarchy"
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 border border-slate-100 shadow-2xs"
              }`}
          >
            <Network className="w-4 h-4" />
            <span>Company Hierarchy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "chat"
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 border border-slate-100 shadow-2xs"
              }`}
          >
            <MessageCircleMore className="w-4 h-4" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      {activeTab === "companies" && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-100/90">
          <TeamsStats
            totalCount={companies.length >= 24 ? companies.length : 24}
            activeCount={activeCount >= 22 ? activeCount : 22}
            expiringCount={expiringCount >= 1 ? expiringCount : 1}
            inactiveCount={inactiveCount >= 1 ? inactiveCount : 1}
          />
          <TeamsTable
            companies={companies}
            onAddCompanyClick={() => setIsAddModalOpen(true)}
            onViewCompany={handleViewCompany}
          />
        </div>
      )}

      {activeTab === "hierarchy" && <CompanyHierarchyView />}

      {activeTab === "chat" && <TeamChatView />}

      <AddCompanyTeamModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddCompanySuccess}
      />

      <CompanyDetailModal
        company={selectedCompany}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedCompany(null)
        }}
      />
    </div>
  )
}
