import { jsPDF } from "jspdf"
import {
  PayslipData,
  DEFAULT_PAYSLIP_DATA,
} from "../components/EmployeePayslipDocument"

export function downloadPayslipPdf(
  data: PayslipData = DEFAULT_PAYSLIP_DATA,
  fileName: string = "Payslip_Alexander_Jul2025.pdf"
): boolean {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(15, 23, 42)
    doc.text(data.company.name, 105, 18, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text(
      `${data.company.address} | Ph: ${data.company.phone}`,
      105,
      23,
      { align: "center" }
    )

    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(15, 23, 42)
    doc.text("P A Y S L I P", 105, 31, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(51, 65, 85)
    doc.text(data.period, 105, 36, { align: "center" })

    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(15, 40, 195, 40)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(15, 23, 42)
    doc.text(data.employee.name, 15, 47)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8.5)
    doc.setTextColor(71, 85, 105)
    doc.text(data.employee.addressLine1, 15, 52)
    doc.text(data.employee.addressLine2, 15, 56.5)
    doc.text(`Phone: ${data.employee.phone}`, 15, 61)

    doc.text("Employee ID: ", 140, 47)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.employee.employeeId, 195, 47, { align: "right" })

    doc.setFont("helvetica", "normal")
    doc.setTextColor(71, 85, 105)
    doc.text("Date of Joining: ", 140, 52)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.employee.dateOfJoining, 195, 52, { align: "right" })

    doc.setFont("helvetica", "normal")
    doc.setTextColor(71, 85, 105)
    doc.text("Designation: ", 140, 56.5)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.employee.designation, 195, 56.5, { align: "right" })

    doc.setDrawColor(226, 232, 240)
    doc.line(15, 66, 195, 66)

    doc.setFillColor(251, 251, 252)
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(15, 70, 180, 22, 2, 2, "FD")

    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text("Bank Name", 19, 75)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.bankName, 42, 75)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("PAN #", 19, 81)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.pan, 42, 81)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("PF A/c #", 19, 87)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.pfAccount, 42, 87)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("Bank A/c", 80, 75)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.bankAccount, 103, 75)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("AADHAAR #", 80, 81)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.aadhaar, 103, 81)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("PF UAN #", 80, 87)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.pfUan, 103, 87)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("Bank IFSC", 142, 75)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.bankIfsc, 165, 75)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)
    doc.text("Tax Regime", 142, 81)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text(data.bankAndStatutory.taxRegime, 165, 81)

    const formatCurrency = (val: string) => val.replace(/₹/g, "Rs. ")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    doc.text("EARNINGS & ALLOWANCES", 15, 100)
    doc.setDrawColor(15, 23, 42)
    doc.setLineWidth(0.5)
    doc.line(15, 102, 98, 102)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    doc.text("DEDUCTIONS", 112, 100)
    doc.setDrawColor(15, 23, 42)
    doc.setLineWidth(0.5)
    doc.line(112, 102, 195, 102)

    const startY = 108
    const rowStep = 6
    const maxItems = Math.max(
      data.earnings.items.length,
      data.deductions.items.length
    )

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)

    data.earnings.items.forEach((item, index) => {
      const y = startY + index * rowStep
      doc.text(item.label, 15, y)
      doc.text(formatCurrency(item.amount), 98, y, { align: "right" })
    })

    data.deductions.items.forEach((item, index) => {
      const y = startY + index * rowStep
      doc.text(item.label, 112, y)
      doc.text(formatCurrency(item.amount), 195, y, { align: "right" })
    })

    const totalsDividerY = startY + maxItems * rowStep + 2
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(15, totalsDividerY, 98, totalsDividerY)
    doc.line(112, totalsDividerY, 195, totalsDividerY)

    const totalsY = totalsDividerY + 5
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text("Gross Earnings", 15, totalsY)
    doc.text(formatCurrency(data.earnings.gross), 98, totalsY, {
      align: "right",
    })
    doc.text("Total Deductions", 112, totalsY)
    doc.text(formatCurrency(data.deductions.total), 195, totalsY, {
      align: "right",
    })

    const netDividerY = totalsY + 7
    doc.setDrawColor(15, 23, 42)
    doc.setLineWidth(0.5)
    doc.line(15, netDividerY, 195, netDividerY)

    const netTitleY = netDividerY + 6
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(15, 23, 42)
    doc.text("NET PAYABLE SALARY", 15, netTitleY)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text("Amount transferred to bank account", 15, netTitleY + 4.5)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(15)
    doc.setTextColor(15, 23, 42)
    doc.text(formatCurrency(data.netPayable), 195, netTitleY + 3.5, {
      align: "right",
    })

    const footerDividerY = netTitleY + 12
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(15, footerDividerY, 195, footerDividerY)

    const footerTextY = footerDividerY + 5
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text(
      "This is a system generated payslip and does not require a signature.",
      15,
      footerTextY
    )
    doc.text("(c) 2026 gkhrms", 195, footerTextY, { align: "right" })

    doc.save(fileName)
    return true
  } catch (err) {
    console.error("PDF generation error:", err)
    return false
  }
}

export function downloadForm12BBPdf(
  financialYear: string = "APR 2024 - MAR 2025",
  fileName?: string
): boolean {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.setTextColor(15, 23, 42)
    doc.text("FORM NO. 12BB", 105, 18, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text("(See rule 26C)", 105, 23, { align: "center" })
    doc.text(
      "Statement showing particulars of claims by an employee for deduction under section 192",
      105,
      27,
      { align: "center" }
    )

    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(15, 31, 195, 31)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(15, 23, 42)
    doc.text("1. Name and address of employee: ", 15, 38)
    doc.setFont("helvetica", "normal")
    doc.text("Alexander, Flat 502, Sun City Apartments, Hyderabad, TS", 80, 38)

    doc.setFont("helvetica", "bold")
    doc.text("2. Permanent Account Number (PAN): ", 15, 45)
    doc.setFont("helvetica", "normal")
    doc.text("XXXXXXXX9678", 80, 45)

    doc.setFont("helvetica", "bold")
    doc.text("3. Financial Year: ", 15, 52)
    doc.setFont("helvetica", "normal")
    doc.text(financialYear, 80, 52)

    doc.line(15, 56, 195, 56)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.setFillColor(248, 250, 252)
    doc.rect(15, 60, 180, 8, "F")
    doc.text("Sl. No.", 18, 65)
    doc.text("Nature of Claim", 40, 65)
    doc.text("Section", 125, 65)
    doc.text("Amount (Rs.)", 192, 65, { align: "right" })

    const claims = [
      {
        no: "1",
        nature: "House Rent Allowance (HRA)",
        sec: "10(13A)",
        amount: "85,000.00",
      },
      {
        no: "2",
        nature: "Leave Travel Concession / Assistance",
        sec: "10(5)",
        amount: "0.00",
      },
      {
        no: "3",
        nature: "Deduction of Interest on Borrowing",
        sec: "24",
        amount: "0.00",
      },
      {
        no: "4",
        nature: "Life Insurance Premium & PF",
        sec: "80C",
        amount: "1,50,000.00",
      },
      {
        no: "5",
        nature: "Health Insurance Premium",
        sec: "80D",
        amount: "25,000.00",
      },
      {
        no: "6",
        nature: "National Pension Scheme (NPS)",
        sec: "80CCD(1B)",
        amount: "50,000.00",
      },
    ]

    let cy = 74
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)
    claims.forEach((c) => {
      doc.text(c.no, 20, cy)
      doc.text(c.nature, 40, cy)
      doc.text(c.sec, 125, cy)
      doc.text(c.amount, 192, cy, { align: "right" })
      cy += 7
    })

    doc.line(15, cy, 195, cy)
    cy += 5
    doc.setFont("helvetica", "bold")
    doc.setTextColor(15, 23, 42)
    doc.text("Total Proposed Deductions", 40, cy)
    doc.text("Rs. 3,10,000.00", 192, cy, { align: "right" })

    cy += 14
    doc.line(15, cy, 195, cy)
    cy += 6
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.text("Verification", 15, cy)
    cy += 5
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text(
      "I, Alexander, do hereby declare that what is stated above is true to the best of my knowledge and belief.",
      15,
      cy
    )
    cy += 15
    doc.text("Date: " + new Date().toLocaleDateString("en-IN"), 15, cy)
    doc.text("Signature of the Employee: ______________________", 125, cy)

    const finalName =
      fileName ||
      `Form12BB_Alexander_${financialYear.replace(/\s+/g, "_")}.pdf`
    doc.save(finalName)
    return true
  } catch (err) {
    console.error("Form 12BB download error:", err)
    return false
  }
}

