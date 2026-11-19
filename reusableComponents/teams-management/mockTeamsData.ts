import { TeamItem, ManagerUser, TeamMember, RoleUser } from "./types"

export const AVAILABLE_CHAIRMEN: RoleUser[] = [
  { id: "ch-1", name: "Dr. Ramesh Gupta", role: "Chairman & Founder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", email: "ramesh.gupta@gkhrms.com" },
  { id: "ch-2", name: "K. V. Subbarao", role: "Executive Chairman", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", email: "kv.subbarao@gkhrms.com" },
  { id: "ch-3", name: "Meenakshi Sundaram", role: "Board Director", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", email: "m.sundaram@gkhrms.com" },
]

export const AVAILABLE_HR_MANAGERS: RoleUser[] = [
  { id: "hr-1", name: "Sneha Rao", role: "HR Manager", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", email: "sneha.rao@gkhrms.com" },
  { id: "hr-2", name: "Pooja Sharma", role: "Senior HR Manager", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", email: "pooja.sharma@gkhrms.com" },
  { id: "hr-3", name: "Kavita Reddy", role: "People Operations Lead", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", email: "kavita.reddy@gkhrms.com" },
]

export const AVAILABLE_MANAGERS: ManagerUser[] = [
  { id: "mgr-1", name: "Sarah Jenkins", role: "Engineering Manager", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: "mgr-2", name: "Ravi Kumar", role: "Operations Manager", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: "mgr-3", name: "Vikram Reddy", role: "General Manager", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
  { id: "mgr-4", name: "Elena Rodriguez", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: "mgr-5", name: "Anita Verma", role: "Delivery Manager", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
]

export const AVAILABLE_FINANCE_MANAGERS: RoleUser[] = [
  { id: "fm-1", name: "Rajesh Singhania", role: "Finance Manager", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", email: "rajesh.s@gkhrms.com" },
  { id: "fm-2", name: "Anita Verma", role: "Accounts & Finance Head", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", email: "anita.verma@gkhrms.com" },
  { id: "fm-3", name: "Vikram Desai", role: "Treasury Manager", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", email: "vikram.desai@gkhrms.com" },
]

export const AVAILABLE_ASST_MANAGERS: RoleUser[] = [
  { id: "am-1", name: "Anjali Mehta", role: "Assistant Manager - Ops", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", email: "anjali.mehta@gkhrms.com" },
  { id: "am-2", name: "Suresh N", role: "Assistant Manager - Cloud", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", email: "suresh.n@gkhrms.com" },
  { id: "am-3", name: "Deepak Verma", role: "Assistant Manager - Delivery", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", email: "deepak.verma@gkhrms.com" },
]

export const AVAILABLE_FINANCE_EXECUTIVES: RoleUser[] = [
  { id: "fe-1", name: "Sneha Nair", role: "Finance Executive", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", email: "sneha.nair@gkhrms.com" },
  { id: "fe-2", name: "Arvind Swamy", role: "Senior Accountant", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", email: "arvind.s@gkhrms.com" },
  { id: "fe-3", name: "Neha Joshi", role: "Payroll Executive", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", email: "neha.joshi@gkhrms.com" },
]

export const AVAILABLE_TECH_ADMINS: RoleUser[] = [
  { id: "ta-1", name: "Karthik Iyer", role: "Tech Administrator", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", email: "karthik.iyer@gkhrms.com" },
  { id: "ta-2", name: "Sanjay Dutt", role: "DevOps & Systems Lead", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", email: "sanjay.dutt@gkhrms.com" },
  { id: "ta-3", name: "Priya Raman", role: "IT Security Admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", email: "priya.raman@gkhrms.com" },
]

export const AVAILABLE_LEADS: RoleUser[] = [
  { id: "ld-1", name: "Priya Singh", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", email: "priya.singh@gkhrms.com" },
  { id: "ld-2", name: "Meera Das", role: "Technical Lead", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", email: "meera.das@gkhrms.com" },
  { id: "ld-3", name: "Rahul Verma", role: "Lead Architect", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", email: "rahul.verma@gkhrms.com" },
  { id: "ld-4", name: "Sarah Chen", role: "Design Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", email: "sarah.chen@gkhrms.com" },
  { id: "ld-5", name: "Kiran Kumar", role: "Scrum Master", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", email: "kiran.kumar@gkhrms.com" },
]

const baseNames = [
  "GK Gym Life", "Tekton", "Phoenix Team", "Orion Team", "Horizon Team",
  "Aurora Team", "Apex Squad", "Vanguard Unit", "Nebula Crew", "Titan Division",
  "Starlight Group", "Zenith Team", "Quantum Force", "Pulse Team",
]

export const INITIAL_TEAMS: TeamItem[] = baseNames.map((name, i) => {
  const mgr = AVAILABLE_MANAGERS[i % AVAILABLE_MANAGERS.length]
  const lead = AVAILABLE_LEADS[i % AVAILABLE_LEADS.length]
  const count = [5, 5, 8, 10, 6, 7, 9, 12, 8, 14, 11, 6, 9, 10][i % 14]
  const members: TeamMember[] = [
    { id: `mem-${i}-1`, name: "Aditya Pillai", role: "Product Designer", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150" },
    { id: `mem-${i}-2`, name: "Divya Nair", role: "Full Stack Developer", avatar: "https://images.unsplash.com/photo-1534751516642-a171edd2521b?w=150" },
    { id: `mem-${i}-3`, name: "Rohan Gupta", role: "QA Engineer", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150" },
    { id: `mem-${i}-4`, name: "Simran Kaur", role: "Project Coordinator", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150" },
    { id: `mem-${i}-5`, name: "Kunal Verma", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" },
  ]
  return {
    id: `team-${i + 1}`,
    name,
    chairman: i % 2 === 0 ? AVAILABLE_CHAIRMEN[0] : undefined,
    hrManager: i % 3 === 0 ? AVAILABLE_HR_MANAGERS[0] : undefined,
    manager: mgr,
    financeManager: i % 4 === 0 ? AVAILABLE_FINANCE_MANAGERS[0] : undefined,
    asstManager: i % 2 === 0 ? AVAILABLE_ASST_MANAGERS[0] : AVAILABLE_ASST_MANAGERS[1],
    financeExecutive: i % 3 === 1 ? AVAILABLE_FINANCE_EXECUTIVES[0] : undefined,
    techAdmin: i % 3 === 2 ? AVAILABLE_TECH_ADMINS[0] : undefined,
    teamLead: lead,
    teamLeadAvatar: lead.avatar,
    membersCount: count,
    members,
    department: i % 2 === 0 ? "Product & Engineering" : "Cloud Operations",
    createdAt: "2026-01-15",
  }
})
