"use client"

import {
  ListFilter,
  Calendar,
  Code,
  Cog,
  Megaphone,
  Landmark,
  Users,
  Package,
  Check,
  Clock,
} from "lucide-react"
import {
  RECENT_PAYROLL_RECORDS,
  RecentPayrollRecord,
} from "./ChairmanPayrollData"

export default function ChairmanRecentPayrollTable() {
  const renderDepartmentIcon = (
    icon: RecentPayrollRecord["department"]["icon"]
  ) => {
    switch (icon) {
      case "code":
        return <Code className="w-3.5 h-3.5 text-[#5B50E5]" />
      case "cog":
        return <Cog className="w-3.5 h-3.5 text-cyan-600" />
      case "megaphone":
        return <Megaphone className="w-3.5 h-3.5 text-teal-600" />
      case "finance":
        return <Landmark className="w-3.5 h-3.5 text-amber-500" />
      case "users":
        return <Users className="w-3.5 h-3.5 text-purple-600" />
      case "package":
        return <Package className="w-3.5 h-3.5 text-pink-500" />
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <ListFilter className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recent Payroll Records
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Date <span className="text-[9px] text-slate-400">▲</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Payroll Cycle <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Employees <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Gross Payroll <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Deductions <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Net Salary <span className="text-[9px] text-slate-400">▼</span>
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Status <span className="text-[9px] text-slate-400">▼</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_PAYROLL_RECORDS.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-700 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {renderDepartmentIcon(item.department.icon)}
                    <span className="text-xs font-semibold text-slate-800">
                      {item.department.name}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.payrollCycle}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-700 font-medium whitespace-nowrap">
                  {item.employees.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.grossPayroll}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.deductions}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {item.netSalary}
                </td>

                <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                  {item.status === "Processed" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      Processed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/80">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
