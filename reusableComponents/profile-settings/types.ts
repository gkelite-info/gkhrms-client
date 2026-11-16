export interface UserProfileData {
  id: string
  name: string
  preferredName?: string
  status: "Active" | "Away" | "Offline"
  role: string
  team: string
  empId: string
  band: string
  avatar?: string
  todayStatus: {
    status: string
    checkInTime: string
    isOnTime: boolean
  }
  shift: {
    name: string
    timing: string
  }
  workMode: {
    type: string
    location: string
  }
  workHierarchy: {
    department: string
    activeProject: string
    manager: {
      name: string
      initials: string
      avatar?: string
    }
    employmentType: string
    joiningDate: string
    tenure: string
  }
  leaveQuotas: {
    paidLeavesLeft: number
    sickLeavesLeft: number
    compOffsAvail: number
  }
  contactData: {
    workEmail: string
    personalEmail?: string
    mobilePhone: string
    emergencyContact: {
      person: string
      relationship: string
      phone: string
    }
    residentialAddress: {
      street: string
      city: string
      statePostal: string
    }
    dob?: string
    gender?: string
  }
}

export interface NotificationPreferences {
  approvals: boolean
  payroll: boolean
  announcements: boolean
}

export interface SecurityPreferences {
  lastPasswordChangedDays: number
  twoFactorEnabled: boolean
}

export interface ProfileSettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
  userProfile?: UserProfileData
  onProfileUpdated?: (updated: UserProfileData) => void
  onSignOut?: () => void
}

export interface EditFormData {
  name: string
  preferredName: string
  personalEmail: string
  mobilePhone: string
  dob: string
  gender: string
  street: string
  city: string
  statePostal: string
  emergencyPerson: string
  emergencyRelationship: string
  emergencyPhone: string
}

