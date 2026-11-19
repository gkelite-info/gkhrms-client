import { TeamTreeNode } from "./types"

const makeNode = (
  id: string,
  name: string,
  role: string,
  avatar: string,
  teamName: string,
  department: string,
  reportingTo: string,
  reportingToRole: string,
  extra: Partial<TeamTreeNode> = {}
): TeamTreeNode => ({
  id,
  name,
  role,
  avatar,
  teamName,
  department,
  reportingTo,
  reportingToRole,
  ...extra,
})

export const ROOT_HR_NODE: TeamTreeNode = makeNode(
  "sneha-rao",
  "Sneha Rao",
  "HR Manager",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  "Executive Leadership",
  "Human Resources",
  "Board of Directors",
  "Executive Board",
  { membersCount: 14, iconType: "crown" }
)

export const BRANCH_ONE_NODES = {
  manager: makeNode(
    "ravi-kumar",
    "Ravi Kumar",
    "Manager",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "GK Gym Life",
    "Product & Engineering",
    "Sneha Rao",
    "HR Manager",
    { membersCount: 8, iconType: "briefcase" }
  ),
  assistantManager: makeNode(
    "anjali-mehta",
    "Anjali Mehta",
    "Assistant Manager",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "GK Gym Life",
    "Product & Engineering",
    "Ravi Kumar",
    "Manager",
    { membersCount: 7, iconType: "users" }
  ),
  project: {
    id: "gk-gymlife-project",
    name: "GK GymLife",
    role: "Team / Project",
    isTeamProject: true,
    teamName: "GK Gym Life",
    department: "Product & Engineering",
    reportingTo: "Anjali Mehta",
    reportingToRole: "Assistant Manager",
    membersCount: 6,
    iconType: "flag" as const,
  },
  teamLead: makeNode(
    "priya-singh",
    "Priya Singh",
    "Team Lead",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    "GK Gym Life",
    "Product & Engineering",
    "Anjali Mehta",
    "Assistant Manager",
    { membersCount: 5, iconType: "users" }
  ),
  members: [
    makeNode("rahul-sharma", "Rahul Sharma", "UI Designer", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", "GK Gym Life", "Product & Engineering", "Priya Singh", "Team Lead"),
    makeNode("karthik-rao", "Karthik Rao", "Backend Developer", "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", "GK Gym Life", "Product & Engineering", "Priya Singh", "Team Lead"),
    makeNode("neha-patel", "Neha Patel", "QA Engineer", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", "GK Gym Life", "Product & Engineering", "Priya Singh", "Team Lead"),
    makeNode("aisha-khan", "Aisha Khan", "Business Analyst", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "GK Gym Life", "Product & Engineering", "Priya Singh", "Team Lead"),
    makeNode("arjun-mehta", "Arjun Mehta", "Frontend Developer", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "GK Gym Life", "Product & Engineering", "Priya Singh", "Team Lead"),
  ],
}

export const BRANCH_TWO_NODES = {
  manager: makeNode(
    "vikram-reddy",
    "Vikram Reddy",
    "Manager",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    "Tekton",
    "Cloud Operations",
    "Sneha Rao",
    "HR Manager",
    { membersCount: 8, iconType: "briefcase" }
  ),
  assistantManager: makeNode(
    "suresh-n",
    "Suresh N",
    "Assistant Manager",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    "Tekton",
    "Cloud Operations",
    "Vikram Reddy",
    "Manager",
    { membersCount: 7, iconType: "users" }
  ),
  project: {
    id: "tekton-project",
    name: "Tekton",
    role: "Team / Project",
    isTeamProject: true,
    teamName: "Tekton",
    department: "Cloud Operations",
    reportingTo: "Suresh N",
    reportingToRole: "Assistant Manager",
    membersCount: 6,
    iconType: "flag" as const,
  },
  teamLead: makeNode(
    "meera-das",
    "Meera Das",
    "Team Lead",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    "Tekton",
    "Cloud Operations",
    "Suresh N",
    "Assistant Manager",
    { membersCount: 5, iconType: "users" }
  ),
  members: [
    makeNode("aditya-pillai", "Aditya Pillai", "Product Designer", "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150", "Tekton", "Cloud Operations", "Meera Das", "Team Lead"),
    makeNode("divya-nair", "Divya Nair", "Full Stack Developer", "https://images.unsplash.com/photo-1534751516642-a171edd2521b?w=150", "Tekton", "Cloud Operations", "Meera Das", "Team Lead"),
    makeNode("rohan-gupta", "Rohan Gupta", "QA Engineer", "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150", "Tekton", "Cloud Operations", "Meera Das", "Team Lead"),
    makeNode("simran-kaur", "Simran Kaur", "Project Coordinator", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150", "Tekton", "Cloud Operations", "Meera Das", "Team Lead"),
    makeNode("kunal-verma", "Kunal Verma", "Data Analyst", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", "Tekton", "Cloud Operations", "Meera Das", "Team Lead"),
  ],
}
