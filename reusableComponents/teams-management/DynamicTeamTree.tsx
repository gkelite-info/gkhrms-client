"use client"

import { TeamItem, TeamTreeNode, RoleUser, ManagerUser } from "./types"
import TeamTreeCard from "./TeamTreeCard"

interface DynamicTeamTreeProps {
  team: TeamItem
  selectedNodeId?: string
  onSelectNode: (node: TeamTreeNode) => void
}

export default function DynamicTeamTree({
  team,
  selectedNodeId,
  onSelectNode,
}: DynamicTeamTreeProps) {
  const getName = (val?: RoleUser | ManagerUser | string) => {
    if (!val) return ""
    return typeof val === "object" ? val.name : val
  }
  const getAvatar = (val?: RoleUser | ManagerUser | string) => {
    if (!val || typeof val !== "object") return undefined
    return val.avatar
  }

  const chainNodes: TeamTreeNode[] = []

  const addNode = (
    suffix: string,
    val: RoleUser | ManagerUser | string | undefined,
    defaultRole: string,
    iconType: "crown" | "briefcase" | "users" | "flag",
    dept: string,
    fallbackAvatar?: string
  ) => {
    const name = getName(val)
    if (!name) return
    chainNodes.push({
      id: `${team.id}-${suffix}`,
      name,
      role: (typeof val === "object" && val?.role) || defaultRole,
      iconType,
      teamName: team.name,
      department: team.department || dept,
      avatar: getAvatar(val) || fallbackAvatar,
    })
  }

  addNode("chairman", team.chairman, "Chairman", "crown", "Executive Leadership", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150")
  addNode("hr", team.hrManager, "HR Manager", "crown", "Human Resources", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150")
  addNode("tech-admin", team.techAdmin, "Tech Admin", "briefcase", "IT Infrastructure")
  addNode("finance-mgr", team.financeManager, "Finance Manager", "briefcase", "Finance & Accounts")
  addNode("manager", team.manager, "Manager", "briefcase", "Operations", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150")
  addNode("asst", team.asstManager, "Assistant Manager", "users", "Operations", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150")
  addNode("finance-exec", team.financeExecutive, "Finance Executive", "users", "Finance")

  chainNodes.push({
    id: `${team.id}-project`,
    name: team.name,
    role: "Team / Project",
    isTeamProject: true,
    iconType: "flag",
    teamName: team.name,
    department: team.department || "Operations",
    membersCount: team.membersCount,
  })

  const leadName = getName(team.teamLead)
  if (leadName && leadName !== "Unassigned") {
    chainNodes.push({
      id: `${team.id}-lead`,
      name: leadName,
      role: "Team Lead",
      iconType: "users",
      teamName: team.name,
      department: team.department || "Operations",
      avatar: getAvatar(team.teamLead) || team.teamLeadAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      membersCount: team.members.length,
    })
  }

  const memberNodes: TeamTreeNode[] = team.members.map((m, idx) => ({
    id: `${team.id}-mem-${m.id || idx}`,
    name: m.name,
    role: m.role || "Team Member",
    teamName: team.name,
    department: team.department || "Operations",
    reportingTo: leadName || "Team Lead",
    reportingToRole: "Team Lead",
    avatar: m.avatar || "https://images.unsplash.com/photo-1534751516642-a171edd2521b?w=150",
  }))

  return (
    <div className="flex flex-col items-center shrink-0">
      {chainNodes.map((node) => (
        <div key={node.id} className="flex flex-col items-center">
          <TeamTreeCard
            node={node}
            variant={node.isTeamProject ? "project" : "standard"}
            isSelected={selectedNodeId === node.id}
            onClick={onSelectNode}
          />
          <div className="w-0.5 h-6 bg-[#C7C3FA]" />
        </div>
      ))}

      {memberNodes.length > 0 ? (
        <div className="flex items-start justify-center shrink-0">
          {memberNodes.map((member, index) => {
            const isFirst = index === 0
            const isLast = index === memberNodes.length - 1
            const isSingle = memberNodes.length === 1

            return (
              <div key={member.id} className="relative flex flex-col items-center px-1.5 sm:px-2 shrink-0">
                {!isSingle && (
                  <div
                    className={`absolute top-0 h-0.5 bg-[#C7C3FA] ${
                      isFirst ? "left-1/2 right-0" : isLast ? "left-0 right-1/2" : "left-0 right-0"
                    }`}
                  />
                )}
                <div className="w-0.5 h-5 bg-[#C7C3FA]" />
                <TeamTreeCard
                  node={member}
                  variant="compact"
                  isSelected={selectedNodeId === member.id}
                  onClick={onSelectNode}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-400 italic">
          No members assigned to this team yet.
        </div>
      )}
    </div>
  )
}
