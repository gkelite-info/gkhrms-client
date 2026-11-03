import { ProductProject } from "./productAttendanceTypes"

export const PRODUCT_LIST: ProductProject[] = [
  { id: "project-alpha", name: "Project Alpha", description: "Core Product Platform", totalCount: 8 },
  { id: "project-nova", name: "Project Nova", description: "Mobile & Customer Experience", totalCount: 6 },
  { id: "project-pulse", name: "Project Pulse", description: "Cloud Infrastructure & APIs", totalCount: 6 },
  { id: "project-orbit", name: "Project Orbit", description: "Analytics & AI Pipeline", totalCount: 5 },
  { id: "project-echo", name: "Project Echo", description: "Enterprise Security Suite", totalCount: 6 },
  { id: "project-summit", name: "Project Summit", description: "Global Ecosystem Portal", totalCount: 5 },
]

export const EXTENDED_PROJECTS_LIST: ProductProject[] = [
  ...PRODUCT_LIST,
  { id: "project-zenith", name: "Project Zenith", description: "Customer Intelligence Hub", totalCount: 7 },
  { id: "project-horizon", name: "Project Horizon", description: "Cross-Border Payments", totalCount: 6 },
  { id: "project-quantum", name: "Project Quantum", description: "High-Frequency Trading", totalCount: 9 },
  { id: "project-apex", name: "Project Apex", description: "Enterprise Resource Hub", totalCount: 5 },
  { id: "project-nexus", name: "Project Nexus", description: "Integration Gateway", totalCount: 8 },
  { id: "project-vortex", name: "Project Vortex", description: "Streaming Analytics Engine", totalCount: 6 },
  { id: "project-titan", name: "Project Titan", description: "Scalable Infrastructure Core", totalCount: 10 },
  { id: "project-aurora", name: "Project Aurora", description: "AI & ML Inference Suite", totalCount: 7 },
]
