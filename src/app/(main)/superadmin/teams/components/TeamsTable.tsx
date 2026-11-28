"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  ChevronDown,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { TeamCompanyRecord } from "../teamsData"
import ReusablePagination from "../../../../../../reusableComponents/ReusablePagination"

interface TeamsTableProps {
  companies: TeamCompanyRecord[]
  onAddCompanyClick: () => void
  onViewCompany: (company: TeamCompanyRecord) => void
}

export default function TeamsTable({
  companies,
  onAddCompanyClick,
  onViewCompany,
}: TeamsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [paymentFilter, setPaymentFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, planFilter, statusFilter, paymentFilter])

  const filteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      const matchSearch =
        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.chairmanName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchPlan =
        planFilter === "All" ||
        comp.plan.toLowerCase() === planFilter.toLowerCase()

      const matchStatus =
        statusFilter === "All" ||
        comp.accountStatus.toLowerCase() === statusFilter.toLowerCase()

      const matchPayment =
        paymentFilter === "All" ||
        comp.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()

      return matchSearch && matchPlan && matchStatus && matchPayment
    })
  }, [companies, searchTerm, planFilter, statusFilter, paymentFilter])

  const totalPages = Math.ceil(filteredCompanies.length / pageSize) || 1
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredCompanies.slice(start, start + pageSize)
  }, [filteredCompanies, currentPage, pageSize])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name, code or admin..."
            className="w-full h-10 pl-10 pr-4 text-xs font-normal text-slate-800 bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:border-[#5046E5] focus:ring-2 focus:ring-[#5046E5]/10 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="appearance-none h-10 pl-3.5 pr-8 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#5046E5] cursor-pointer"
            >
              <option value="All">Plan: All</option>
              <option value="Enterprise">Plan: Enterprise</option>
              <option value="Professional">Plan: Professional</option>
              <option value="Standard">Plan: Standard</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none h-10 pl-3.5 pr-8 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#5046E5] cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active</option>
              <option value="Inactive">Status: Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="appearance-none h-10 pl-3.5 pr-8 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#5046E5] cursor-pointer"
            >
              <option value="All">Payment: All</option>
              <option value="Paid">Payment: Paid</option>
              <option value="Pending">Payment: Pending</option>
              <option value="Overdue">Payment: Overdue</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onAddCompanyClick}
            className="h-10 px-4 bg-[#5046E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F9FAFC]/60">
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                #
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                COMPANY NAME
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                COMPANY CODE
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                CHAIRMAN
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                SUBSCRIPTION PLAN
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider text-center">
                EMPLOYEES
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                SUBSCRIPTION EXPIRY
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                PAYMENT STATUS
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider">
                ACCOUNT STATUS
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-700 tracking-wider text-center">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredCompanies.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-xs text-slate-400">
                  No companies found matching the filter criteria.
                </td>
              </tr>
            ) : (
              paginatedCompanies.map((comp, idx) => {
                const rowNum = (currentPage - 1) * pageSize + idx + 1

                let planBadgeClass = "bg-[#EDE9FE] text-[#6D28D9]"
                if (comp.plan === "Professional") {
                  planBadgeClass = "bg-[#E0F2FE] text-[#0284C7]"
                } else if (comp.plan === "Standard") {
                  planBadgeClass = "bg-[#DCFCE7] text-[#15803D]"
                }

                return (
                  <tr
                    key={`${comp.id}-${idx}`}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-400">
                      {rowNum}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${comp.logoBg} ${comp.logoTextColor}`}
                        >
                          {comp.initials}
                        </div>
                        <span className="text-xs font-bold text-slate-900 leading-snug">
                          {comp.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                      {comp.code}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={comp.chairmanAvatar || "/images/shyam.jpg"}
                          alt={comp.chairmanName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {comp.chairmanName}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${planBadgeClass}`}
                      >
                        {comp.plan}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 text-center">
                      {comp.employees.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                      {comp.subscriptionExpiry}
                    </td>

                    <td className="py-3.5 px-4">
                      {comp.paymentStatus === "Paid" ? (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Paid</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                          <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Pending</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {comp.accountStatus === "Active" ? (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>Inactive</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onViewCompany(comp)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 hover:border-[#5046E5] text-[#5046E5] hover:bg-[#F5F3FF] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredCompanies.length > 0 && (
        <div className="pt-2">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredCompanies.length}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20]}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              setCurrentPage(1)
            }}
          />
        </div>
      )}
    </div>
  )
}
