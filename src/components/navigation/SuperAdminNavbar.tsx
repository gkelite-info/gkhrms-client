"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Crown,
  CreditCard,
  UserCheck,
  Headphones,
  Megaphone,
  BarChart3,
  FileText,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/superadmin", icon: LayoutDashboard },
  { label: "Companies", href: "/superadmin/companies", icon: Building2 },
  { label: "Subscriptions", href: "/superadmin/subscriptions", icon: Crown },
  { label: "Payments", href: "/superadmin/payments", icon: CreditCard },
  { label: "Company Admins", href: "/superadmin/company-admins", icon: UserCheck },
  { label: "Support Requests", href: "/superadmin/support-requests", icon: Headphones },
  { label: "Announcements", href: "/superadmin/announcements", icon: Megaphone },
  { label: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
  { label: "Audit Logs", href: "/superadmin/audit-logs", icon: FileText },
]

export default function SuperAdminNavbar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-w-[240px] h-screen bg-white border-r border-slate-100 flex flex-col justify-between py-4 select-none shrink-0">
      <div className="flex flex-col gap-5 flex-1 min-h-0">
        <div className="flex items-center gap-3 px-4 py-1 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#5B50E5] flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-[#1E293B] text-base tracking-wide">
              GK-HRMS
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              SUPER ADMIN
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto custom-scrollbar sidebar-scrollbar px-3 min-h-0">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/superadmin"
                ? pathname === "/superadmin"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
                  isActive
                    ? "bg-[#5B50E5] text-white font-semibold shadow-md shadow-indigo-100"
                    : "text-slate-600 hover:text-[#5B50E5] hover:bg-[#EEF0FD]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-[#5B50E5]"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mx-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center shrink-0">
        <p className="text-[11px] font-semibold text-slate-700">GK-HRMS v2.4</p>
        <p className="text-[9px] text-slate-400 mt-0.5">Cloud Multi-Tenant</p>
      </div>
    </aside>
  )
}
