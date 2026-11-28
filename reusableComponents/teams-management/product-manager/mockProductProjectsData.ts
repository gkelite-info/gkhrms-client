import { ProductProjectItem, ProductManagerStats } from "./types"

export const MOCK_PRODUCT_PROJECTS: ProductProjectItem[] = [
  {
    id: "proj-1",
    numericId: 1,
    name: "GK Gym Life",
    code: "GK-001",
    iconType: "swap",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    manager: {
      name: "Rohan Malhotra",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      email: "rohan.malhotra@company.com",
      role: "Product Manager",
    },
    assistantManager: {
      name: "Sneha Rao",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      email: "sneha.rao@company.com",
      role: "Assistant Manager",
    },
    teamLeads: [
      {
        name: "Aisha Khan",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        role: "Team Lead",
      },
      {
        name: "Dev Patel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Tech Lead",
      },
    ],
    extraLeadsCount: 1,
    totalMembers: 18,
    startDate: "Apr 01, 2026",
    status: "Active",
  },
  {
    id: "proj-2",
    numericId: 2,
    name: "Tekton",
    code: "TK-002",
    iconType: "desktop",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    manager: {
      name: "Anita Kulkarni",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      email: "anita.kulkarni@company.com",
      role: "Product Manager",
    },
    assistantManager: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      email: "vikram.singh@company.com",
      role: "Assistant Manager",
    },
    teamLeads: [
      {
        name: "Pooja Mehta",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        role: "Team Lead",
      },
      {
        name: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
        role: "QA Lead",
      },
    ],
    extraLeadsCount: 1,
    totalMembers: 14,
    startDate: "May 15, 2026",
    status: "Active",
  },
  {
    id: "proj-3",
    numericId: 3,
    name: "HRMS Revamp",
    code: "HR-003",
    iconType: "archive",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    manager: {
      name: "Karthik Iyer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      email: "karthik.iyer@company.com",
      role: "Product Manager",
    },
    assistantManager: {
      name: "Neha Verma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      email: "neha.verma@company.com",
      role: "Assistant Manager",
    },
    teamLeads: [
      {
        name: "Ravi Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Engineering Lead",
      },
      {
        name: "Divya Sharma",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
        role: "Product Lead",
      },
    ],
    totalMembers: 12,
    startDate: "Jun 01, 2026",
    status: "Active",
  },
  {
    id: "proj-4",
    numericId: 4,
    name: "Mobile App",
    code: "MB-004",
    iconType: "mobile",
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    manager: {
      name: "Meera Das",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      email: "meera.das@company.com",
      role: "Product Manager",
    },
    assistantManager: {
      name: "Arjun Nair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      email: "arjun.nair@company.com",
      role: "Assistant Manager",
    },
    teamLeads: [
      {
        name: "Siddharth Rao",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
        role: "iOS Lead",
      },
      {
        name: "Kavya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        role: "Android Lead",
      },
    ],
    extraLeadsCount: 1,
    totalMembers: 12,
    startDate: "Jul 10, 2026",
    status: "Active",
  },
]

export const MOCK_PRODUCT_STATS: ProductManagerStats = {
  totalProjects: 4,
  activeProjects: 3,
  totalMembers: 56,
}
