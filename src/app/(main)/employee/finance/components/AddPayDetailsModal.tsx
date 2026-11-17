"use client"

import React, { useState, useEffect } from "react"
import { Plus, Minus, X, Trash2 } from "lucide-react"
import { ReusableAvatar } from "@/../reusableComponents"
import { HrPayrollEmployee } from "./hrPayrollData"

export type JobTypeOption = "Intern" | "Contract" | "Permanent"
export type BonusPayKind = "Fixed" | "Variable"

export interface CustomLeaveEntry {
  id: string
  label: string
  days: string
}

export interface ComplianceItemState {
  enabled: boolean
  value: string
}

export interface CustomComplianceEntry {
  id: string
  label: string
  enabled: boolean
  value: string
}

export interface BonusEntry {
  id: string
  bonusType: string
  bonusAmount: string
  payKind: BonusPayKind
}

export interface AddPayDetailsData {
  totalCtc: string
  fixedPay: string
  variablePay: string
  jobType: JobTypeOption
  totalLeavesPerYear: string
  sickLeave: string
  casualLeave: string
  customLeaves: CustomLeaveEntry[]
  basicSalary: string
  hra: string
  telephoneAllowance: string
  transportationAllowance: string
  statutoryBonus: string
  companyDeduction: string
  otherAllowance: string
  compliance: {
    pf: ComplianceItemState
    ef: ComplianceItemState
    tds: ComplianceItemState
    directPay: ComplianceItemState
  }
  customCompliance: CustomComplianceEntry[]
  bonuses: BonusEntry[]
  joiningCompensation: string
  maintenance: string
  otherAddOn: string
}

export interface AddPayDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  employee?: HrPayrollEmployee
  initialData?: AddPayDetailsData | null
  onSave?: (data: AddPayDetailsData) => void
}

type ExpandableAllowanceKey =
  | "transportationAllowance"
  | "statutoryBonus"
  | "companyDeduction"
  | "otherAllowance"

type ExpandableAddOnKey = "joiningCompensation" | "maintenance" | "otherAddOn"

const JOB_TYPE_OPTIONS: JobTypeOption[] = ["Intern", "Contract", "Permanent"]

const ALLOWANCE_TOGGLES: {
  key: ExpandableAllowanceKey
  label: string
  placeholder: string
}[] = [
  {
    key: "transportationAllowance",
    label: "Transportation Allowance",
    placeholder: "Enter amount",
  },
  {
    key: "statutoryBonus",
    label: "Statutory Bonus (Paid Monthly)",
    placeholder: "Enter amount",
  },
  {
    key: "companyDeduction",
    label: "Company's Deduction (Tax/Allowances)",
    placeholder: "Enter amount",
  },
  {
    key: "otherAllowance",
    label: "Others",
    placeholder: "Enter amount",
  },
]

const COMPLIANCE_FIELDS: {
  key: keyof AddPayDetailsData["compliance"]
  label: string
}[] = [
  { key: "pf", label: "PF" },
  { key: "ef", label: "EF" },
  { key: "tds", label: "TDS" },
  { key: "directPay", label: "Direct Pay" },
]

const ADDON_TOGGLES: {
  key: ExpandableAddOnKey
  label: string
  placeholder: string
}[] = [
  {
    key: "joiningCompensation",
    label: "Joining Compensation",
    placeholder: "Enter joining compensation",
  },
  {
    key: "maintenance",
    label: "Maintenance",
    placeholder: "Enter maintenance amount",
  },
  {
    key: "otherAddOn",
    label: "Others",
    placeholder: "Enter amount or details",
  },
]

function createDefaultFormData(): AddPayDetailsData {
  return {
    totalCtc: "",
    fixedPay: "",
    variablePay: "",
    jobType: "Permanent",
    totalLeavesPerYear: "24",
    sickLeave: "12",
    casualLeave: "12",
    customLeaves: [],
    basicSalary: "50,000",
    hra: "5000",
    telephoneAllowance: "1500",
    transportationAllowance: "",
    statutoryBonus: "",
    companyDeduction: "",
    otherAllowance: "",
    compliance: {
      pf: { enabled: false, value: "50,000" },
      ef: { enabled: false, value: "50,000" },
      tds: { enabled: false, value: "50,000" },
      directPay: { enabled: false, value: "50,000" },
    },
    customCompliance: [],
    bonuses: [
      {
        id: "bonus-1",
        bonusType: "Performance Bonus",
        bonusAmount: "2,000",
        payKind: "Fixed",
      },
    ],
    joiningCompensation: "",
    maintenance: "",
    otherAddOn: "",
  }
}

function PurplePlusBadge({ expanded = false }: { expanded?: boolean }) {
  return (
    <span className="w-4 h-4 rounded-full bg-[#8B7FE8] text-white inline-flex items-center justify-center shrink-0">
      {expanded ? (
        <Minus className="w-2.5 h-2.5 stroke-[3]" />
      ) : (
        <Plus className="w-2.5 h-2.5 stroke-[3]" />
      )}
    </span>
  )
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className={`w-3.5 h-3.5 rounded-full border inline-flex items-center justify-center shrink-0 transition-colors ${
        selected ? "border-[#6D5CE8]" : "border-[#9F95F5]"
      }`}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-[#6D5CE8]" />}
    </span>
  )
}

export default function AddPayDetailsModal({
  isOpen,
  onClose,
  employee,
  initialData,
  onSave,
}: AddPayDetailsModalProps) {
  const [formData, setFormData] = useState<AddPayDetailsData>(() =>
    initialData ? initialData : createDefaultFormData()
  )
  const [expandedAllowances, setExpandedAllowances] = useState<
    Record<ExpandableAllowanceKey, boolean>
  >({
    transportationAllowance: false,
    statutoryBonus: false,
    companyDeduction: false,
    otherAllowance: false,
  })
  const [expandedAddOns, setExpandedAddOns] = useState<
    Record<ExpandableAddOnKey, boolean>
  >({
    joiningCompensation: false,
    maintenance: false,
    otherAddOn: false,
  })

  useEffect(() => {
    if (!isOpen) return
    const nextData = initialData ? initialData : createDefaultFormData()
    setFormData(nextData)
    setExpandedAllowances({
      transportationAllowance: Boolean(nextData.transportationAllowance),
      statutoryBonus: Boolean(nextData.statutoryBonus),
      companyDeduction: Boolean(nextData.companyDeduction),
      otherAllowance: Boolean(nextData.otherAllowance),
    })
    setExpandedAddOns({
      joiningCompensation: Boolean(nextData.joiningCompensation),
      maintenance: Boolean(nextData.maintenance),
      otherAddOn: Boolean(nextData.otherAddOn),
    })
  }, [isOpen, employee?.employeeId, initialData])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.(formData)
    onClose()
  }

  const toggleAllowance = (key: ExpandableAllowanceKey) => {
    setExpandedAllowances((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleAddOn = (key: ExpandableAddOnKey) => {
    setExpandedAddOns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddCustomLeave = () => {
    setFormData((prev) => ({
      ...prev,
      customLeaves: [
        ...prev.customLeaves,
        { id: `leave-${Date.now()}`, label: "", days: "" },
      ],
    }))
  }

  const handleUpdateCustomLeave = (
    id: string,
    field: "label" | "days",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      customLeaves: prev.customLeaves.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  const handleRemoveCustomLeave = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      customLeaves: prev.customLeaves.filter((item) => item.id !== id),
    }))
  }

  const handleAddCustomCompliance = () => {
    setFormData((prev) => ({
      ...prev,
      customCompliance: [
        ...prev.customCompliance,
        { id: `comp-${Date.now()}`, label: "", enabled: true, value: "" },
      ],
    }))
  }

  const handleUpdateCustomCompliance = (
    id: string,
    patch: Partial<CustomComplianceEntry>
  ) => {
    setFormData((prev) => ({
      ...prev,
      customCompliance: prev.customCompliance.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }))
  }

  const handleRemoveCustomCompliance = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      customCompliance: prev.customCompliance.filter((item) => item.id !== id),
    }))
  }

  const handleAddBonusRow = () => {
    setFormData((prev) => ({
      ...prev,
      bonuses: [
        ...prev.bonuses,
        {
          id: `bonus-${Date.now()}`,
          bonusType: "",
          bonusAmount: "",
          payKind: "Fixed",
        },
      ],
    }))
  }

  const handleUpdateBonusRow = (id: string, patch: Partial<BonusEntry>) => {
    setFormData((prev) => ({
      ...prev,
      bonuses: prev.bonuses.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }))
  }

  const handleRemoveBonusRow = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      bonuses: prev.bonuses.filter((b) => b.id !== id),
    }))
  }

  const employeeName = employee?.name || "Alexander"
  const employeeId = employee?.employeeId || "EMP-00445"
  const joinDate = employee?.joinDate || "23 Jan 2025"
  const branch = employee?.department || "Data & Analytics"
  const role = employee?.designation || "Data Analyst"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-pay-modal-title"
        className="w-full max-w-[780px] max-h-[94dvh] sm:max-h-[92vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-7 pt-4 sm:pt-5 pb-3 sm:pb-3.5 flex items-center justify-between shrink-0 bg-white">
          <h2
            id="add-pay-modal-title"
            className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none"
          >
            Add Pay Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 -mr-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5 block" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-7 pb-4 sm:pb-5 space-y-3.5 sm:space-y-4">
            <div className="border border-slate-200/90 rounded-xl p-3.5 sm:p-4 bg-white flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
              <ReusableAvatar
                src={employee?.avatar}
                name={employeeName}
                size={68}
                shape="rounded"
                fallbackType="initials"
                className="shrink-0 bg-slate-100"
              />
              <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {employeeName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-xs">
                  <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                    <span className="font-semibold text-slate-800 shrink-0">
                      Employee ID :
                    </span>
                    <span className="text-slate-600 truncate">{employeeId}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                    <span className="font-semibold text-slate-800 shrink-0">
                      Joining Date :
                    </span>
                    <span className="text-slate-600 truncate">{joinDate}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                    <span className="font-semibold text-slate-800 shrink-0">
                      Branch :
                    </span>
                    <span className="text-slate-600 truncate">{branch}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
                    <span className="font-semibold text-slate-800 shrink-0">
                      Role :
                    </span>
                    <span className="text-slate-600 truncate">{role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
              <div className="flex flex-col gap-3.5 min-w-0">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    Salary Structure
                  </h4>
                  <div className="border border-slate-200/90 rounded-xl p-3 sm:p-3.5 bg-white flex flex-col gap-2.5">
                    <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                      <span className="text-xs font-semibold text-slate-800">
                        Total CTC:
                      </span>
                      <input
                        type="text"
                        value={formData.totalCtc}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, totalCtc: e.target.value }))
                        }
                        placeholder="Enter CTC"
                        className="w-full sm:w-44 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                      />
                    </label>

                    <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                      <span className="text-xs font-semibold text-slate-800">
                        Fixed Pay :
                      </span>
                      <input
                        type="text"
                        value={formData.fixedPay}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, fixedPay: e.target.value }))
                        }
                        placeholder="Enter fixed pay"
                        className="w-full sm:w-44 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                      />
                    </label>

                    <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                      <span className="text-xs font-semibold text-slate-800">
                        Variable Pay :
                      </span>
                      <input
                        type="text"
                        value={formData.variablePay}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            variablePay: e.target.value,
                          }))
                        }
                        placeholder="Enter variable pay"
                        className="w-full sm:w-44 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    Job Type
                  </h4>
                  <div className="border border-slate-200/90 rounded-xl p-3 sm:p-3.5 bg-white flex flex-wrap sm:flex-col gap-x-5 gap-y-2.5">
                    {JOB_TYPE_OPTIONS.map((option) => {
                      const selected = formData.jobType === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, jobType: option }))
                          }
                          className="flex items-center gap-2 text-left cursor-pointer w-fit"
                        >
                          <RadioIndicator selected={selected} />
                          <span
                            className={`text-xs font-medium ${
                              selected ? "text-[#5B50EC] font-semibold" : "text-[#7A6FE8]"
                            }`}
                          >
                            {option}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                      Leave Allocation
                    </h4>
                    <div className="border border-slate-200/90 rounded-xl p-3 sm:p-3.5 bg-white flex flex-col gap-2.5">
                      <label className="flex items-center justify-between gap-2 sm:gap-3">
                        <span className="text-xs font-medium text-[#7A6FE8] flex-1 min-w-0 leading-snug">
                          Total Leaves Per Year :
                        </span>
                        <input
                          type="text"
                          value={formData.totalLeavesPerYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              totalLeavesPerYear: e.target.value,
                            }))
                          }
                          className="w-24 sm:w-32 shrink-0 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                        />
                      </label>

                      <label className="flex items-center justify-between gap-2 sm:gap-3">
                        <span className="text-xs font-medium text-[#7A6FE8] flex-1 min-w-0 leading-snug">
                          Sick Leave :
                        </span>
                        <input
                          type="text"
                          value={formData.sickLeave}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              sickLeave: e.target.value,
                            }))
                          }
                          className="w-24 sm:w-32 shrink-0 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                        />
                      </label>

                      <label className="flex items-center justify-between gap-2 sm:gap-3">
                        <span className="text-xs font-medium text-[#7A6FE8] flex-1 min-w-0 leading-snug">
                          Casual Leave :
                        </span>
                        <input
                          type="text"
                          value={formData.casualLeave}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              casualLeave: e.target.value,
                            }))
                          }
                          className="w-24 sm:w-32 shrink-0 px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8] focus:border-[#6D5CE8]"
                        />
                      </label>

                      {formData.customLeaves.map((leave) => (
                        <div
                          key={leave.id}
                          className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100"
                        >
                          <input
                            type="text"
                            value={leave.label}
                            onChange={(e) =>
                              handleUpdateCustomLeave(leave.id, "label", e.target.value)
                            }
                            placeholder="Leave name"
                            className="flex-1 min-w-0 px-2.5 py-1.5 text-xs border border-slate-200 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                          />
                          <input
                            type="text"
                            value={leave.days}
                            onChange={(e) =>
                              handleUpdateCustomLeave(leave.id, "days", e.target.value)
                            }
                            placeholder="Days"
                            className="w-16 shrink-0 px-2.5 py-1.5 text-xs border border-slate-200 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomLeave(leave.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                            aria-label="Remove custom leave"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomLeave}
                    className="w-full border border-slate-200/90 rounded-xl px-3.5 py-2.5 bg-white flex items-center gap-2 text-xs font-bold text-slate-800 hover:border-[#7A6FE8]/60 hover:bg-[#F8F7FF] transition-colors cursor-pointer"
                  >
                    <PurplePlusBadge />
                    <span>Add Other</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3.5 min-w-0">
                <div className="border border-slate-200/90 rounded-xl p-3 sm:p-3.5 bg-white flex flex-col gap-2.5">
                  <label className="flex items-center justify-between gap-2 sm:gap-3">
                    <span className="text-xs font-semibold text-slate-800 flex-1 min-w-0 leading-snug">
                      Basic Salary :
                    </span>
                    <input
                      type="text"
                      value={formData.basicSalary}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          basicSalary: e.target.value,
                        }))
                      }
                      className="w-24 sm:w-28 shrink-0 px-3 py-1.5 text-xs font-semibold text-center rounded-md bg-[#8B7FE8] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#5B50EC]"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-2 sm:gap-3">
                    <span className="text-xs font-medium text-[#7A6FE8] flex-1 min-w-0 leading-snug">
                      House Rent Allowance (HRA) :
                    </span>
                    <input
                      type="text"
                      value={formData.hra}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, hra: e.target.value }))
                      }
                      className="w-24 sm:w-28 shrink-0 px-3 py-1 text-xs font-medium text-center border border-slate-200 rounded-md text-[#7A6FE8] focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-2 sm:gap-3">
                    <span className="text-xs font-medium text-[#7A6FE8] flex-1 min-w-0 leading-snug">
                      Telephone Allowance :
                    </span>
                    <input
                      type="text"
                      value={formData.telephoneAllowance}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          telephoneAllowance: e.target.value,
                        }))
                      }
                      className="w-24 sm:w-28 shrink-0 px-3 py-1 text-xs font-medium text-center border border-slate-200 rounded-md text-[#7A6FE8] focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                    />
                  </label>

                  <div className="flex flex-col gap-2 pt-0.5">
                    {ALLOWANCE_TOGGLES.map((item) => {
                      const isExpanded = expandedAllowances[item.key]
                      return (
                        <div key={item.key} className="flex flex-col gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleAllowance(item.key)}
                            className="flex items-center gap-2 text-left text-xs font-semibold text-slate-800 hover:text-[#5B50EC] transition-colors cursor-pointer w-full sm:w-fit"
                          >
                            <PurplePlusBadge expanded={isExpanded} />
                            <span className="leading-snug">{item.label}</span>
                          </button>
                          {isExpanded && (
                            <div className="pl-6">
                              <input
                                type="text"
                                value={formData[item.key]}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [item.key]: e.target.value,
                                  }))
                                }
                                placeholder={item.placeholder}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="pt-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">
                      Payroll Compliance
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
                      {COMPLIANCE_FIELDS.map(({ key, label }) => {
                        const fieldState = formData.compliance[key]
                        return (
                          <div key={key} className="flex items-center justify-between sm:justify-start gap-1.5 min-w-0">
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  compliance: {
                                    ...prev.compliance,
                                    [key]: {
                                      ...prev.compliance[key],
                                      enabled: !prev.compliance[key].enabled,
                                    },
                                  },
                                }))
                              }
                              className="flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <RadioIndicator selected={fieldState.enabled} />
                              <span className="text-[11px] font-medium text-[#7A6FE8]">
                                {label}
                              </span>
                            </button>
                            <input
                              type="text"
                              value={fieldState.value}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  compliance: {
                                    ...prev.compliance,
                                    [key]: {
                                      ...prev.compliance[key],
                                      value: e.target.value,
                                    },
                                  },
                                }))
                              }
                              className="w-24 sm:w-full min-w-0 px-2 py-0.5 text-[10px] font-medium text-center border border-slate-200 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                            />
                          </div>
                        )
                      })}
                    </div>

                    {formData.customCompliance.length > 0 && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        {formData.customCompliance.map((comp) => (
                          <div key={comp.id} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={comp.label}
                              onChange={(e) =>
                                handleUpdateCustomCompliance(comp.id, {
                                  label: e.target.value,
                                })
                              }
                              placeholder="Name"
                              className="flex-1 min-w-0 px-2 py-1 text-[11px] border border-slate-200 rounded text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                            />
                            <input
                              type="text"
                              value={comp.value}
                              onChange={(e) =>
                                handleUpdateCustomCompliance(comp.id, {
                                  value: e.target.value,
                                })
                              }
                              placeholder="Amount"
                              className="w-20 shrink-0 px-2 py-1 text-[11px] border border-slate-200 rounded text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomCompliance(comp.id)}
                              className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                              aria-label="Remove compliance item"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddCustomCompliance}
                      className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 hover:border-[#7A6FE8]/60 hover:bg-[#F8F7FF] transition-colors cursor-pointer"
                    >
                      <PurplePlusBadge />
                      <span>Others</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    Additional Add-ons
                  </h4>

                  <div className="flex flex-col gap-2">
                    {formData.bonuses.map((bonus, idx) => (
                      <div
                        key={bonus.id}
                        className="border border-slate-200/90 rounded-xl p-3 sm:p-3.5 bg-white flex flex-col gap-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {idx === 0 ? "Add Bonus" : `Bonus #${idx + 1}`}
                          </span>
                          {idx === 0 ? (
                            <button
                              type="button"
                              onClick={handleAddBonusRow}
                              className="cursor-pointer hover:opacity-85 transition-opacity"
                              title="Add another bonus"
                              aria-label="Add another bonus"
                            >
                              <PurplePlusBadge />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRemoveBonusRow(bonus.id)}
                              className="p-0.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                              aria-label="Remove bonus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                          <span className="text-xs font-semibold text-slate-800">
                            Bonus Type :
                          </span>
                          <input
                            type="text"
                            value={bonus.bonusType}
                            onChange={(e) =>
                              handleUpdateBonusRow(bonus.id, {
                                bonusType: e.target.value,
                              })
                            }
                            placeholder="Bonus type"
                            className="w-full sm:w-44 px-3 py-1.5 text-xs font-semibold text-center border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                          />
                        </label>

                        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                          <span className="text-xs font-semibold text-slate-800">
                            Bonus Amount :
                          </span>
                          <input
                            type="text"
                            value={bonus.bonusAmount}
                            onChange={(e) =>
                              handleUpdateBonusRow(bonus.id, {
                                bonusAmount: e.target.value,
                              })
                            }
                            placeholder="Bonus amount"
                            className="w-full sm:w-44 px-3 py-1.5 text-xs font-semibold text-center border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                          />
                        </label>

                        <div className="flex items-center justify-center gap-6 pt-0.5">
                          {(["Fixed", "Variable"] as BonusPayKind[]).map((kind) => {
                            const selected = bonus.payKind === kind
                            return (
                              <button
                                key={kind}
                                type="button"
                                onClick={() =>
                                  handleUpdateBonusRow(bonus.id, { payKind: kind })
                                }
                                className="flex items-center gap-1.5 cursor-pointer"
                              >
                                <RadioIndicator selected={selected} />
                                <span
                                  className={`text-xs font-medium ${
                                    selected ? "text-[#5B50EC] font-semibold" : "text-[#7A6FE8]"
                                  }`}
                                >
                                  {kind}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}

                    {ADDON_TOGGLES.map((item) => {
                      const isExpanded = expandedAddOns[item.key]
                      return (
                        <div
                          key={item.key}
                          className="border border-slate-200/90 rounded-xl px-3.5 py-2.5 bg-white flex flex-col gap-2"
                        >
                          <button
                            type="button"
                            onClick={() => toggleAddOn(item.key)}
                            className="flex items-center gap-2 text-left text-xs font-bold text-slate-800 hover:text-[#5B50EC] transition-colors cursor-pointer w-full"
                          >
                            <PurplePlusBadge expanded={isExpanded} />
                            <span>{item.label}</span>
                          </button>
                          {isExpanded && (
                            <input
                              type="text"
                              value={formData[item.key]}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  [item.key]: e.target.value,
                                }))
                              }
                              placeholder={item.placeholder}
                              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#6D5CE8]"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-7 py-3 sm:py-4 border-t border-slate-100 bg-white flex items-center justify-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none sm:w-48 py-2.5 sm:py-2 rounded-lg bg-[#E2E4E8] hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none sm:w-48 py-2.5 sm:py-2 rounded-lg bg-[#4A47E5] hover:bg-[#3E3BD4] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

