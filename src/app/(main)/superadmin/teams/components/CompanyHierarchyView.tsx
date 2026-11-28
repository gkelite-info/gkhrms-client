"use client"

import {
  Building2,
  Crown,
  User,
  Users as LucideUsers,
  Check,
  AlertCircle,
} from "lucide-react"
import { Users as PhosphorUsers } from "phosphor-react"

interface HierarchyCompany {
  id: string
  name: string
  status: "Active" | "Pending"
  employees: string
  cardBg: string
  cardBorder: string
  iconBg: string
  iconColor: string
  chairmanName: string
  primaryAdminName: string
}

const hierarchyCompanies: HierarchyCompany[] = [
  {
    id: "gk-gym",
    name: "GK Gym Life Pvt. Ltd.",
    status: "Active",
    employees: "1,240",
    cardBg: "bg-[#EEF1FB]",
    cardBorder: "border-[#D9E2F7]",
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#6D28D9]",
    chairmanName: "Amit Desai",
    primaryAdminName: "Priya Shah",
  },
  {
    id: "tekton",
    name: "Tekton Solutions",
    status: "Active",
    employees: "680",
    cardBg: "bg-[#FEF6E8]",
    cardBorder: "border-[#FDE5BE]",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    chairmanName: "Rohan Malhotra",
    primaryAdminName: "Sneha Rao",
  },
  {
    id: "bsl",
    name: "BSL Technologies",
    status: "Active",
    employees: "2,150",
    cardBg: "bg-[#EEF5FC]",
    cardBorder: "border-[#D4E7FA]",
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
    chairmanName: "Vikram Singh",
    primaryAdminName: "Neha Verma",
  },
  {
    id: "mnr",
    name: "MNR Industries",
    status: "Pending",
    employees: "420",
    cardBg: "bg-[#ECFDF5]",
    cardBorder: "border-[#B9F1D4]",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#15803D]",
    chairmanName: "Karthik Iyer",
    primaryAdminName: "Anita Kulkarni",
  },
]

export default function CompanyHierarchyView() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/90 flex flex-col gap-8 min-h-[640px]">
      <div>
        <h2 className="text-lg font-bold text-slate-900 leading-tight">
          Company Hierarchy
        </h2>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          View the organizational structure of companies onboarded on the platform.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-8">
        <div className="min-w-[980px] flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="border-2 border-[#5046E5] bg-[#F5F4FE] rounded-2xl py-3 px-6 flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#5046E5] text-white flex items-center justify-center shrink-0">
                <PhosphorUsers size={20} weight="bold" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  GK-HRMS
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  (Super Admin Portal)
                </p>
              </div>
            </div>

            <div className="w-0.5 h-10 bg-[#5046E5]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#5046E5] -mt-1" />
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-[78%] h-0.5 bg-[#5046E5]" />

            <div className="w-[78%] flex justify-between">
              <div className="w-0.5 h-8 bg-[#5046E5]" />
              <div className="w-0.5 h-8 bg-[#5046E5]" />
              <div className="w-0.5 h-8 bg-[#5046E5]" />
              <div className="w-0.5 h-8 bg-[#5046E5]" />
            </div>

            <div className="w-full grid grid-cols-4 gap-5">
              {hierarchyCompanies.map((comp) => (
                <div key={comp.id} className="flex flex-col items-center">
                  <div
                    className={`w-full rounded-2xl p-4 border ${comp.cardBg} ${comp.cardBorder} shadow-2xs`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${comp.iconBg} ${comp.iconColor}`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">
                          {comp.name}
                        </h3>
                        <div className="mt-1">
                          {comp.status === "Active" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                              <AlertCircle className="w-3 h-3 stroke-[2.5]" />
                              <span>Pending</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
                      <LucideUsers className="w-3.5 h-3.5 text-slate-500" />
                      <span>{comp.employees} Employees</span>
                    </div>
                  </div>

                  <div className="w-full pl-6 pt-3 relative">
                    <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-slate-300" />

                    <div className="space-y-3">
                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-300" />
                        <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs hover:border-[#5046E5] transition-colors">
                          <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                            <Crown className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-400 font-medium leading-none">
                              Chairman
                            </p>
                            <p className="text-xs font-bold text-slate-800 truncate mt-1">
                              {comp.chairmanName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-300" />
                        <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs hover:border-[#5046E5] transition-colors">
                          <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-400 font-medium leading-none">
                              Primary Admin
                            </p>
                            <p className="text-xs font-bold text-slate-800 truncate mt-1">
                              {comp.primaryAdminName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
