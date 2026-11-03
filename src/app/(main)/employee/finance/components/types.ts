export type FinanceTabType =
  | "summary"
  | "mypay"
  | "manage_tax"
  | "org_salary_overview"
  | "expenses_travel"

export interface PayrollSummaryData {
  cycle: string
  workingDays: number
  lossOfDay: number
  payslipAvailable: boolean
}

export interface PaymentInfoData {
  salaryPaymentMode: string
  bankName: string
  accountNumber: string
  ifscCode: string
  nameOnAccount: string
  branch: string
}

export interface StatutoryInfoData {
  pfStatus: string
  pfNumber: string
  universalAccountNumber: string
  pfJoinDate: string
}

export interface IdentityInfoData {
  aadhar: {
    number: string
    dob: string
    address: string
    enrollmentNumber: string
    name: string
    gender: string
    verified: boolean
  }
  pan: {
    panNumber: string
    dob: string
    name: string
    fathersName: string
    verified: boolean
  }
}
