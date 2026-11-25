"use client"

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Lightning,
  PlugsConnected,
  Database,
  ArrowsClockwise,
  MagnifyingGlass,
  CheckCircle,
  Clock,
  Play,
  Gear,
  Plus,
  X,
  CaretRight,
  Globe,
  SlidersHorizontal,
  CloudArrowUp,
  ShieldCheck,
  Bell,
  Cpu,
} from "phosphor-react"
import ToggleSwitch from "@/../utils/ToggleSwitch"

type HubTab = "all" | "automations" | "integrations" | "backups"
type HubCategory = "all" | "workflow" | "communication" | "productivity" | "hr" | "security" | "storage"

interface AutomationRule {
  id: string
  title: string
  category: HubCategory
  categoryLabel: string
  trigger: string
  description: string
  enabled: boolean
  lastRun: string
  runCount: number
  navLink?: string
}

interface IntegrationApp {
  id: string
  name: string
  category: HubCategory
  categoryLabel: string
  description: string
  status: "Connected" | "Available" | "Action Required"
  lastSync: string
  iconColor: string
  iconInitials: string
  authType: string
}

interface BackupItem {
  id: string
  title: string
  description: string
  status: "Healthy" | "Scheduled" | "Active"
  details: string
  path: string
}

const initialAutomations: AutomationRule[] = [
  {
    id: "auto-wfh",
    title: "Auto-Approve WFH (up to 2 days)",
    category: "workflow",
    categoryLabel: "Workflow",
    trigger: "On Employee WFH Request submission",
    description: "Instantly approves work-from-home requests up to 2 consecutive days for eligible employees without managerial bottleneck.",
    enabled: true,
    lastRun: "12 mins ago",
    runCount: 248,
    navLink: "/admin/auto-approve-wfh",
  },
  {
    id: "auto-reminders",
    title: "Birthday & Work Anniversary Reminders",
    category: "communication",
    categoryLabel: "Communication",
    trigger: "Daily at 09:00 AM IST",
    description: "Broadcasts milestone celebrations to team Slack/Teams channels and sends celebratory email greetings to employees.",
    enabled: true,
    lastRun: "Today, 09:00 AM",
    runCount: 1420,
    navLink: "/admin/auto-send-reminders",
  },
  {
    id: "auto-helpdesk",
    title: "Auto-Close Stale Helpdesk Tickets",
    category: "workflow",
    categoryLabel: "Workflow",
    trigger: "Every 24 hours",
    description: "Automatically transitions resolved IT and HR query tickets to closed after 7 calendar days of employee inactivity.",
    enabled: true,
    lastRun: "3 hours ago",
    runCount: 512,
  },
  {
    id: "payroll-sync",
    title: "Bi-Weekly Timesheet & Punch Sync",
    category: "hr",
    categoryLabel: "HR & Payroll",
    trigger: "12th & 26th of each month at 23:59",
    description: "Aggregates biometric punch logs, overtime hours, and approved exceptions into payroll pre-run records.",
    enabled: true,
    lastRun: "Yesterday",
    runCount: 48,
  },
  {
    id: "slack-leave-alert",
    title: "Real-time Slack Leave Channel Broadcast",
    category: "communication",
    categoryLabel: "Communication",
    trigger: "Instant on Leave Approval",
    description: "Notifies team and department channels when an employee leave is finalized to ensure uninterrupted project coverage.",
    enabled: false,
    lastRun: "2 days ago",
    runCount: 89,
  },
  {
    id: "revoke-tokens",
    title: "Auto-Revoke Session Tokens on Exit",
    category: "security",
    categoryLabel: "Security",
    trigger: "On Effective Last Working Date (LWD)",
    description: "Suspends Active Directory SSO access, revokes active web sessions, and generates IT asset return notification.",
    enabled: true,
    lastRun: "4 days ago",
    runCount: 19,
  },
]

const initialIntegrations: IntegrationApp[] = [
  {
    id: "slack",
    name: "Slack Enterprise",
    category: "communication",
    categoryLabel: "Communication",
    description: "Real-time leave status updates, HR query bot, and automated team celebration announcements in channels.",
    status: "Connected",
    lastSync: "Just now",
    iconColor: "bg-[#4A154B] text-white",
    iconInitials: "SL",
    authType: "OAuth 2.0 Bot",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    category: "productivity",
    categoryLabel: "Productivity",
    description: "Syncs out-of-office status to Google Calendar, exports employee records to Sheets, and delivers Gmail notifications.",
    status: "Connected",
    lastSync: "4 mins ago",
    iconColor: "bg-[#4285F4] text-white",
    iconInitials: "GW",
    authType: "Service Account",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft 365 & Teams",
    category: "communication",
    categoryLabel: "Communication",
    description: "Calendar availability synchronization, Azure Active Directory Single Sign-On (SSO), and Teams meeting links.",
    status: "Connected",
    lastSync: "15 mins ago",
    iconColor: "bg-[#0078D4] text-white",
    iconInitials: "MS",
    authType: "Azure AD SSO",
  },
  {
    id: "jira",
    name: "Jira Software & Service Desk",
    category: "productivity",
    categoryLabel: "Productivity",
    description: "Bi-directional sync between HR equipment requests and IT service management tickets.",
    status: "Connected",
    lastSync: "1 hour ago",
    iconColor: "bg-[#0052CC] text-white",
    iconInitials: "JR",
    authType: "Atlassian API Token",
  },
  {
    id: "bamboohr",
    name: "BambooHR / Workday Connector",
    category: "hr",
    categoryLabel: "HR & Payroll",
    description: "Legacy human resources system connector for bulk historical records import and compliance export.",
    status: "Available",
    lastSync: "Never",
    iconColor: "bg-[#73C322] text-white",
    iconInitials: "HR",
    authType: "API Key",
  },
  {
    id: "zoom",
    name: "Zoom Video Communications",
    category: "communication",
    categoryLabel: "Communication",
    description: "Automated virtual interview room provisioning and candidate video schedule calendar invites.",
    status: "Available",
    lastSync: "Never",
    iconColor: "bg-[#2D8CFF] text-white",
    iconInitials: "ZM",
    authType: "Server-to-Server OAuth",
  },
  {
    id: "github",
    name: "GitHub Organization",
    category: "productivity",
    categoryLabel: "Productivity",
    description: "Developer team seat provisioning, code activity correlation, and security audit log sync.",
    status: "Available",
    lastSync: "Never",
    iconColor: "bg-[#24292F] text-white",
    iconInitials: "GH",
    authType: "GitHub App",
  },
  {
    id: "webhooks",
    name: "Custom Webhook Endpoints",
    category: "security",
    categoryLabel: "Security",
    description: "Custom incoming and outgoing HTTP POST payloads signed with HMAC SHA-256 for internal microservices.",
    status: "Connected",
    lastSync: "5 mins ago",
    iconColor: "bg-[#8571EE] text-white",
    iconInitials: "WH",
    authType: "HMAC Secret",
  },
]

const initialBackups: BackupItem[] = [
  {
    id: "backup-status",
    title: "Recent Backup Status",
    description: "Real-time snapshot verification, recovery point objective (RPO) monitoring, and database health metrics.",
    status: "Healthy",
    details: "Last completed 4 hours ago • Size: 4.8 GB",
    path: "/admin/backup&restoration",
  },
  {
    id: "archival-schedule",
    title: "Archival Schedule",
    description: "Automated cold-storage archival routines for past employees, expired contracts, and tax compliance records.",
    status: "Scheduled",
    details: "Next run tonight at 23:59 IST • Retention: 7 Years",
    path: "/admin/archival_schedule",
  },
  {
    id: "retention-alert",
    title: "Retention & Compliance Alerts",
    description: "Proactive warnings for audit log expiration, statutory compliance windows, and storage thresholds.",
    status: "Healthy",
    details: "0 critical alerts • 1 informational notice",
    path: "/admin/retention-alert",
  },
  {
    id: "data-process",
    title: "Data Backup Progress",
    description: "Live replication stream across secondary availability zone and encrypted off-site cloud vault.",
    status: "Active",
    details: "Active synchronization at 42 MB/s • Multi-Region",
    path: "/admin/data-backup-process",
  },
]

function HubContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname() || "/admin/integration-automation"

  const parseTab = useCallback((val: string | null): HubTab => {
    const t = (val || "").toLowerCase()
    if (t === "automations" || t === "workflows") return "automations"
    if (t === "integrations" || t === "apps") return "integrations"
    if (t === "backups" || t === "retention") return "backups"
    return "all"
  }, [])

  const parseCategory = useCallback((val: string | null): HubCategory => {
    const c = (val || "").toLowerCase()
    if (
      c === "workflow" ||
      c === "communication" ||
      c === "productivity" ||
      c === "hr" ||
      c === "security" ||
      c === "storage"
    ) {
      return c as HubCategory
    }
    return "all"
  }, [])

  const [activeTab, setActiveTab] = useState<HubTab>(() => parseTab(searchParams?.get("tab")))
  const [activeCategory, setActiveCategory] = useState<HubCategory>(() => parseCategory(searchParams?.get("category")))
  const [searchQuery, setSearchQuery] = useState(() => searchParams?.get("q") || "")

  const [automations, setAutomations] = useState<AutomationRule[]>(initialAutomations)
  const [integrations, setIntegrations] = useState<IntegrationApp[]>(initialIntegrations)

  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null)
  const [connectModalOpen, setConnectModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<IntegrationApp | null>(null)
  const [apiKeyInput, setApiKeyInput] = useState("")

  useEffect(() => {
    setActiveTab(parseTab(searchParams?.get("tab")))
    setActiveCategory(parseCategory(searchParams?.get("category")))
    if (searchParams?.has("q")) {
      setSearchQuery(searchParams.get("q") || "")
    }
  }, [searchParams, parseTab, parseCategory])

  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search)
      setActiveTab(parseTab(currentParams.get("tab")))
      setActiveCategory(parseCategory(currentParams.get("category")))
      setSearchQuery(currentParams.get("q") || "")
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [parseTab, parseCategory])

  const updateQueryParams = (
    tab: HubTab,
    category: HubCategory,
    query: string
  ) => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams()
    if (tab !== "all") params.set("tab", tab)
    if (category !== "all") params.set("category", category)
    if (query.trim()) params.set("q", query.trim())

    const queryString = params.toString()
    const base = pathname.split("?")[0] || "/admin/integration-automation"
    const url = queryString ? `${base}?${queryString}` : base
    window.history.pushState(null, "", url)
    try {
      router.push(url, { scroll: false })
    } catch {}
  }

  const handleTabChange = (tab: HubTab) => {
    setActiveTab(tab)
    updateQueryParams(tab, activeCategory, searchQuery)
  }

  const handleCategoryChange = (cat: HubCategory) => {
    setActiveCategory(cat)
    updateQueryParams(activeTab, cat, searchQuery)
  }

  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    updateQueryParams(activeTab, activeCategory, q)
  }

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled
          showToast(`Automation rule "${item.title}" ${nextState ? "activated" : "paused"}`)
          return { ...item, enabled: nextState }
        }
        return item
      })
    )
  }

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const isConnected = app.status === "Connected"
          const nextStatus = isConnected ? "Available" : "Connected"
          showToast(`${app.name} is now ${nextStatus.toLowerCase()}`)
          return {
            ...app,
            status: nextStatus,
            lastSync: nextStatus === "Connected" ? "Just now" : "Disconnected",
          }
        }
        return app
      })
    )
  }

  const runAutomationNow = (rule: AutomationRule) => {
    setAutomations((prev) =>
      prev.map((item) =>
        item.id === rule.id
          ? { ...item, lastRun: "Just now", runCount: item.runCount + 1 }
          : item
      )
    )
    showToast(`Triggered "${rule.title}" successfully. All actions executed.`)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur))
    }, 3200)
  }

  const filteredAutomations = useMemo(() => {
    return automations.filter((rule) => {
      const matchCat = activeCategory === "all" || rule.category === activeCategory
      const matchQuery =
        !searchQuery.trim() ||
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.trigger.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [automations, activeCategory, searchQuery])

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((app) => {
      const matchCat = activeCategory === "all" || app.category === activeCategory
      const matchQuery =
        !searchQuery.trim() ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.authType.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [integrations, activeCategory, searchQuery])

  const filteredBackups = useMemo(() => {
    return initialBackups.filter((item) => {
      const matchCat = activeCategory === "all" || activeCategory === "storage" || activeCategory === "security"
      const matchQuery =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [activeCategory, searchQuery])

  const activeAutomationCount = automations.filter((a) => a.enabled).length
  const connectedIntegrationCount = integrations.filter((i) => i.status === "Connected").length

  return (
    <div className="w-full min-h-full max-w-full min-w-0 px-2.5 sm:px-4 md:px-6 pt-3 sm:pt-4 pb-6 md:pb-8 flex flex-col gap-3.5 sm:gap-4 select-none overflow-y-auto overflow-x-hidden scrollbar-hide">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#1E1D32] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-h-[90px] sm:min-h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Active Automations</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-[#8571EE] flex items-center justify-center shrink-0">
              <Lightning size={16} weight="bold" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              {activeAutomationCount} <span className="text-xs sm:text-sm font-normal text-gray-400">/ {automations.length}</span>
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>● Operational</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-h-[90px] sm:min-h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Connected Apps</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <PlugsConnected size={16} weight="bold" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              {connectedIntegrationCount} <span className="text-xs sm:text-sm font-normal text-gray-400">/ {integrations.length}</span>
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <span>Cloud & Webhooks</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-h-[90px] sm:min-h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Monthly Runs</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Cpu size={16} weight="bold" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              24,580
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>99.8% Success Rate</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-h-[90px] sm:min-h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Storage & Backup</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Database size={16} weight="bold" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              Encrypted
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <span>Tonight 23:59 IST</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-full bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xs border border-gray-100">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide w-full">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`flex-1 min-w-[90px] py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer select-none focus:outline-none shrink-0 ${
              activeTab === "all"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "bg-white text-[#374151] hover:bg-gray-50 border border-gray-200/70"
            }`}
          >
            All Services
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("automations")}
            className={`flex-1 min-w-[130px] py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer select-none focus:outline-none shrink-0 ${
              activeTab === "automations"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "bg-white text-[#374151] hover:bg-gray-50 border border-gray-200/70"
            }`}
          >
            Workflows ({automations.length})
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("integrations")}
            className={`flex-1 min-w-[140px] py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer select-none focus:outline-none shrink-0 ${
              activeTab === "integrations"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "bg-white text-[#374151] hover:bg-gray-50 border border-gray-200/70"
            }`}
          >
            Connected Apps ({integrations.length})
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("backups")}
            className={`flex-1 min-w-[140px] py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer select-none focus:outline-none shrink-0 ${
              activeTab === "backups"
                ? "bg-[#8571EE] text-white shadow-xs"
                : "bg-white text-[#374151] hover:bg-gray-50 border border-gray-200/70"
            }`}
          >
            Backups & Retention ({initialBackups.length})
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-xs border border-gray-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search triggers, integrations, webhook endpoints..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#8571EE] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {(["all", "workflow", "communication", "productivity", "hr", "security"] as HubCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer capitalize shrink-0 ${
                  activeCategory === cat
                    ? "bg-white text-[#8571EE] shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedApp(null)
              setApiKeyInput("")
              setConnectModalOpen(true)
            }}
            className="px-3 py-1.5 sm:py-2 bg-[#8571EE] hover:bg-[#725EE8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 transition-colors"
          >
            <Plus size={14} weight="bold" />
            <span className="hidden sm:inline">Add Webhook</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {(activeTab === "all" || activeTab === "automations") && filteredAutomations.length > 0 && (
        <div className="flex flex-col gap-2.5 w-full">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#1E293B] flex items-center gap-2">
              <Lightning size={16} weight="fill" className="text-[#8571EE]" />
              Workflow Automations
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              {filteredAutomations.length} configured rules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {filteredAutomations.map((rule) => (
              <div
                key={rule.id}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-purple-50 text-[#8571EE] border border-purple-100">
                        {rule.categoryLabel}
                      </span>
                      {rule.enabled ? (
                        <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          Paused
                        </span>
                      )}
                    </div>

                    <ToggleSwitch
                      checked={rule.enabled}
                      onChange={() => toggleAutomation(rule.id)}
                    />
                  </div>

                  <h4 className="text-sm font-bold text-[#1E293B] leading-snug">
                    {rule.title}
                  </h4>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {rule.description}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-2 text-[11px] text-gray-600 flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-[#8571EE] shrink-0" />
                    <span className="truncate">Trigger: {rule.trigger}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="truncate">Last run: {rule.lastRun}</span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => runAutomationNow(rule)}
                      title="Execute rule immediately"
                      className="px-2.5 py-1 bg-gray-100 hover:bg-purple-50 hover:text-[#8571EE] text-gray-700 font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Play size={11} weight="fill" />
                      <span>Run</span>
                    </button>

                    {rule.navLink ? (
                      <Link
                        href={rule.navLink}
                        className="px-2.5 py-1 bg-[#8571EE] text-white hover:bg-[#725EE8] font-semibold rounded-md transition-colors flex items-center gap-1"
                      >
                        <Gear size={11} weight="bold" />
                        <span>Manage</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRule(rule)
                          setConfigModalOpen(true)
                        }}
                        className="px-2.5 py-1 bg-[#8571EE] text-white hover:bg-[#725EE8] font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Gear size={11} weight="bold" />
                        <span>Config</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "all" || activeTab === "integrations") && filteredIntegrations.length > 0 && (
        <div className="flex flex-col gap-2.5 w-full mt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#1E293B] flex items-center gap-2">
              <PlugsConnected size={16} weight="fill" className="text-blue-600" />
              Connected Applications & Cloud Tools
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              {filteredIntegrations.length} integrations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredIntegrations.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl ${app.iconColor} font-black text-xs flex items-center justify-center shadow-xs shrink-0`}>
                      {app.iconInitials}
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        app.status === "Connected"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#1E293B] truncate">{app.name}</h4>
                    <span className="text-[10px] font-medium text-gray-400 capitalize">
                      {app.categoryLabel} • {app.authType}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {app.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="truncate">Sync: {app.lastSync}</span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleIntegration(app.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                        app.status === "Connected"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-[#8571EE] text-white hover:bg-[#725EE8]"
                      }`}
                    >
                      {app.status === "Connected" ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "all" || activeTab === "backups") && filteredBackups.length > 0 && (
        <div className="flex flex-col gap-2.5 w-full mt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#1E293B] flex items-center gap-2">
              <Database size={16} weight="fill" className="text-indigo-600" />
              Backup & Compliance Retention
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              Enterprise Storage Controls
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredBackups.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#8571EE]/40 transition-all duration-200 group"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.status}
                    </span>
                    <CaretRight size={14} className="text-gray-400 group-hover:text-[#8571EE] transition-colors" />
                  </div>

                  <h4 className="text-sm font-bold text-[#1E293B] group-hover:text-[#8571EE] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  {item.details}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {configModalOpen && selectedRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1E293B]">Configure Automation</h3>
                <p className="text-xs text-[#8571EE] font-medium">{selectedRule.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Execution Schedule / Frequency</label>
                <input
                  type="text"
                  defaultValue={selectedRule.trigger}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8571EE]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Target Department Scope</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8571EE]">
                  <option value="all">All Organization Departments</option>
                  <option value="engineering">Engineering & Product</option>
                  <option value="hr">Human Resources & Operations</option>
                  <option value="sales">Sales & Marketing</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Notify Admin on Execution Failure</label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="checkbox" defaultChecked className="rounded text-[#8571EE]" id="notifyAdmin" />
                  <label htmlFor="notifyAdmin" className="text-gray-600">Send email and Slack alert to HR Admin</label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfigModalOpen(false)
                  showToast(`Configuration saved for ${selectedRule.title}`)
                }}
                className="px-5 py-2 bg-[#8571EE] hover:bg-[#725EE8] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {connectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1E293B]">
                  {selectedApp ? `Connect ${selectedApp.name}` : "Create Webhook Endpoint"}
                </h3>
                <p className="text-xs text-gray-500">Provide authentication credentials or endpoint URL</p>
              </div>
              <button
                type="button"
                onClick={() => setConnectModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Webhook Endpoint URL / Host *</label>
                <input
                  type="url"
                  placeholder="https://api.yourdomain.com/v1/hrms-webhook"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8571EE]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Secret Token / API Key *</label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="sk_live_..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8571EE]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Subscribed Events</label>
                <div className="grid grid-cols-2 gap-1.5 mt-1 text-gray-600">
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded text-[#8571EE]" />
                    <span>Leave Approvals</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded text-[#8571EE]" />
                    <span>Attendance Punch</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded text-[#8571EE]" />
                    <span>New Joinings</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded text-[#8571EE]" />
                    <span>Payroll Finalized</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setConnectModalOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConnectModalOpen(false)
                  showToast("Webhook endpoint verified and connected successfully!")
                }}
                className="px-5 py-2 bg-[#8571EE] hover:bg-[#725EE8] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Verify & Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-4 shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function AdminIntegrationAutomation() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
            <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
            <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
            <div className="h-24 bg-white/60 animate-pulse rounded-2xl" />
          </div>
          <div className="w-full h-12 bg-white/60 animate-pulse rounded-2xl mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="h-44 bg-white/60 animate-pulse rounded-2xl" />
            <div className="h-44 bg-white/60 animate-pulse rounded-2xl" />
            <div className="h-44 bg-white/60 animate-pulse rounded-2xl" />
          </div>
        </div>
      }
    >
      <HubContent />
    </Suspense>
  )
}