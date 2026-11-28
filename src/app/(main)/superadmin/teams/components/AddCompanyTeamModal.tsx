"use client"

import { useState } from "react"
import {
  X,
  Building2,
  User,
  Package,
  CreditCard,
  Plus,
} from "lucide-react"
import { TeamCompanyRecord } from "../teamsData"

interface AddCompanyTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newCompany: TeamCompanyRecord) => void
}

export default function AddCompanyTeamModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCompanyTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    industry: "Information Technology",
    email: "",
    phone: "",
    cityLocation: "Hyderabad, India",
    address: "",
    chairmanName: "",
    chairmanRole: "Chairman / Primary Admin",
    chairmanEmail: "",
    chairmanPhone: "",
    chairmanDepartment: "Executive Office",
    plan: "Enterprise" as "Enterprise" | "Professional" | "Standard",
    employees: 250,
    billingCycle: "Annual",
    subscriptionStart: "01 Jan 2026",
    subscriptionExpiry: "31 Dec 2026",
    paymentAmount: "₹4,80,000",
    paymentStatus: "Paid" as "Paid" | "Pending" | "Overdue",
    paymentMethod: "Bank Transfer",
    invoiceId: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
  })

  if (!isOpen) return null

  const handleChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const initials = (formData.name || "NC")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 3)
      .toUpperCase()

    let logoBg = "bg-[#EDE9FE]"
    let logoTextColor = "text-[#6D28D9]"
    if (formData.plan === "Professional") {
      logoBg = "bg-[#E0F2FE]"
      logoTextColor = "text-[#0284C7]"
    } else if (formData.plan === "Standard") {
      logoBg = "bg-[#DCFCE7]"
      logoTextColor = "text-[#15803D]"
    }

    const newRecord: TeamCompanyRecord = {
      id: `comp-${Date.now()}`,
      name: formData.name || "New Corporation Ltd.",
      code: formData.code || `CMP${Math.floor(100 + Math.random() * 900)}`,
      initials: initials || "NC",
      logoBg,
      logoTextColor,
      chairmanName: formData.chairmanName || "Executive Director",
      chairmanAvatar: "/images/shyam.jpg",
      chairmanRole: formData.chairmanRole,
      chairmanEmail: formData.chairmanEmail || `admin@${formData.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      chairmanPhone: formData.chairmanPhone || "+91 99887 77665",
      chairmanDepartment: formData.chairmanDepartment,
      plan: formData.plan,
      employees: Number(formData.employees) || 250,
      activeUsers: Math.round((Number(formData.employees) || 250) * 0.93),
      subscriptionExpiry: formData.subscriptionExpiry,
      paymentStatus: formData.paymentStatus,
      accountStatus: "Active",
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      website: `www.${formData.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      address: formData.address || "Corporate Tech Park, India",
      cityLocation: formData.cityLocation,
      subscriptionStart: formData.subscriptionStart,
      billingCycle: formData.billingCycle,
      modules: "HRMS, Payroll, Attendance, Finance, Teams",
      renewalDate: formData.subscriptionExpiry,
      lastPaymentAmount: formData.paymentAmount,
      lastPaymentDate: formData.subscriptionStart,
      nextDueDate: formData.subscriptionExpiry,
      paymentMethod: formData.paymentMethod,
      invoiceId: formData.invoiceId,
    }

    onSuccess(newRecord)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-[#EFF3FA] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200/80 p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0EFFE] text-[#5046E5] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Add New Company
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5">
                Onboard a new company to GK-HRMS portal and configure subscription.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Company Profile
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Apex Global Tech"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="e.g. AGT009"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors cursor-pointer"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Software & Cloud Services">Software & Cloud Services</option>
                  <option value="Fitness & Wellness">Fitness & Wellness</option>
                  <option value="Manufacturing & Engineering">Manufacturing & Engineering</option>
                  <option value="Financial Technology">Financial Technology</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City & Country
                </label>
                <input
                  type="text"
                  value={formData.cityLocation}
                  onChange={(e) => handleChange("cityLocation", e.target.value)}
                  placeholder="Hyderabad, India"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Hitech City, Hyderabad, Telangana"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#7C3AED]" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Chairman / Primary Admin
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chairman Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.chairmanName}
                  onChange={(e) => handleChange("chairmanName", e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role / Designation
                </label>
                <input
                  type="text"
                  value={formData.chairmanRole}
                  onChange={(e) => handleChange("chairmanRole", e.target.value)}
                  placeholder="Chairman / Primary Admin"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={formData.chairmanEmail}
                  onChange={(e) => handleChange("chairmanEmail", e.target.value)}
                  placeholder="eleanor.vance@company.com"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Admin Phone
                </label>
                <input
                  type="text"
                  value={formData.chairmanPhone}
                  onChange={(e) => handleChange("chairmanPhone", e.target.value)}
                  placeholder="+91 99887 77665"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.chairmanDepartment}
                  onChange={(e) => handleChange("chairmanDepartment", e.target.value)}
                  placeholder="Executive Office"
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Package className="w-4 h-4 text-[#7C3AED]" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Subscription Details
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => handleChange("plan", e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors cursor-pointer"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Professional">Professional</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Employee Headcount
                  </label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => handleChange("employees", Number(e.target.value))}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => handleChange("billingCycle", e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors cursor-pointer"
                  >
                    <option value="Annual">Annual</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subscription Expiry
                  </label>
                  <input
                    type="text"
                    value={formData.subscriptionExpiry}
                    onChange={(e) => handleChange("subscriptionExpiry", e.target.value)}
                    placeholder="31 Dec 2026"
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-[#7C3AED]" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Payment Details
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Amount
                  </label>
                  <input
                    type="text"
                    value={formData.paymentAmount}
                    onChange={(e) => handleChange("paymentAmount", e.target.value)}
                    placeholder="₹4,80,000"
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => handleChange("paymentStatus", e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => handleChange("paymentMethod", e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors cursor-pointer"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI / Corporate">UPI / Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Invoice ID
                  </label>
                  <input
                    type="text"
                    value={formData.invoiceId}
                    onChange={(e) => handleChange("invoiceId", e.target.value)}
                    placeholder="INV-2026-015"
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5046E5] text-slate-800 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/70">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#5046E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
