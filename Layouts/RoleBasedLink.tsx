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
    { label: "Workforce", href: "/hr/workforce", icon: User },
    {
      label: "Payroll & Compliance",
      href: "/hr/payrole-compliance",
      icon: CurrencyCircleDollar,
    },
    { label: "Attendance", href: "/hr/attendance", icon: UsersThree },
    {
      label: "Engagement & Culture",
      href: "/hr/engagement-culture",
      icon: Timer,
    },
    {
      label: "Analytics & Reports",
      href: "/hr/analytics-reports",
      icon: ChartBar,
    },
  ],
  TeamLead: [
    { label: "Attendance", href: "/teamlead/attendance", icon: UsersThree },
    { label: "Performance", href: "/teamlead/performance", icon: ChartLineUp },
    { label: "Profile", href: "/teamlead/profile", icon: User },
  ],
  ProductManager: [
    { label: "Attendance", href: "/productmanager/attendance", icon: UsersThree },
  ],
}
