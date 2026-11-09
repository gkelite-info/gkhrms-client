import {
  House,
  User,
  Buildings,
  UsersThree,
  CurrencyCircleDollar,
  Timer,
  ChartBar,
  Airplay,
  Gear,
  Lock,
  Plugs,
  ChatsCircle,
  TrendUp,
  ChatCircleDots,
  ChartLineUp,
  Laptop,
  CalendarBlank,
  ArrowsLeftRight,
  CreditCard,
} from "phosphor-react"
import { Roles } from "../Features/Auth/Slice/loginType"

export const roleBasedNav: Record<
  Roles,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { label: string; href: string; icon: any }[]
> = {
  Admin: [
    { label: "Home", href: "/admin", icon: House },
    { label: "System & Users", href: "/admin/system-users", icon: Airplay },
    {
      label: "Policies & Configuration",
      href: "/admin/policies-configuration",
      icon: Gear,
    },
    {
      label: "Audit & Security",
      href: "/admin/audit-security",
      icon: Lock,
    },
    {
      label: "Integrations & Automation",
      href: "/admin/integration-automation",
      icon: Plugs,
    },
    {
      label: "Analytics & Reports",
      href: "/admin/analytics-reports",
      icon: ChartBar,
    },
    {
      label: "Engage",
      href: "/admin/engage",
      icon: ChatsCircle,
    },
  ],
  Manager: [
    { label: "Attendance", href: "/manager/attendance", icon: UsersThree },
    { label: "Profile", href: "/manager/profile", icon: User },
  ],
  Employee: [
    { label: "Home", href: "/employee", icon: House },
    { label: "Attendance", href: "/employee/attendance", icon: UsersThree },
    { label: "Me", href: "/employee/me", icon: User },
    { label: "My Team", href: "/employee/myteam", icon: UsersThree },
    {
      label: "Finance & Payroll",
      href: "/employee/finance",
      icon: CurrencyCircleDollar,
    },
    { label: "Org", href: "/employee/org", icon: Buildings },
    { label: "Performance", href: "/employee/performance", icon: TrendUp },
    { label: "Engage", href: "/employee/engage", icon: ChatCircleDots },
  ],
  Hr: [
    { label: "Home", href: "/hr", icon: House },
    { label: "Me", href: "/hr/me", icon: User },
    { label: "My Team", href: "/hr/myteam", icon: UsersThree },
    { label: "Workforce", href: "/hr/workforce", icon: Laptop },
    {
      label: "Finance & Payroll",
      href: "/hr/finance",
      icon: CurrencyCircleDollar,
    },
    { label: "Attendance", href: "/hr/attendance", icon: UsersThree },
    {
      label: "Attendance & Leave",
      href: "/hr/attendance-leaves",
      icon: CalendarBlank,
    },
    {
      label: "Automation & Integration",
      href: "/hr/integration-automation",
      icon: ArrowsLeftRight,
    },
    { label: "Org", href: "/hr/org", icon: Buildings },
    {
      label: "Analytics & Reports",
      href: "/hr/analytics-reports",
      icon: ChartBar,
    },
    {
      label: "Engage",
      href: "/hr/engage",
      icon: ChatCircleDots,
    },
  ],
  TeamLead: [
    { label: "Attendance", href: "/teamlead/attendance", icon: UsersThree },
    { label: "Performance", href: "/teamlead/performance", icon: ChartLineUp },
    { label: "Profile", href: "/teamlead/profile", icon: User },
  ],
  HrManager: [
    { label: "Attendance", href: "/hrmanager/attendance", icon: UsersThree },
  ],
  ProductManager: [
    { label: "Attendance", href: "/productmanager/attendance", icon: UsersThree },
  ],
  Finance: [
    { label: "Finance", href: "/financemanager/finance", icon: CurrencyCircleDollar },
    { label: "Attendance", href: "/financemanager/attendance", icon: UsersThree },
  ],
  FinanceManager: [
    { label: "Finance", href: "/financemanager/finance", icon: CurrencyCircleDollar },
    { label: "Attendance", href: "/financemanager/attendance", icon: UsersThree },
  ],
  Accountant: [
    { label: "Finance", href: "/accountant", icon: CreditCard },
  ],
  FinanceExecutive: [
    { label: "Attendance", href: "/financeexecutive/attendance", icon: UsersThree },
  ],
  AccountantExecutive: [
    { label: "Attendance", href: "/accountantexecutive/attendance", icon: UsersThree },
  ],
}
