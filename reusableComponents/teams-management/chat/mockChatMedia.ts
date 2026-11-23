import { SharedMediaItem, SharedLinkItem } from "../types"

export const MOCK_SHARED_MEDIA: SharedMediaItem[] = [
  {
    id: "m-1",
    title: "QA App Test Release",
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400",
    date: "Today, 11:05 AM",
  },
  {
    id: "m-2",
    title: "Workout Tracker UI",
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    date: "Yesterday",
  },
  {
    id: "m-3",
    title: "Member Attendance Dashboard",
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400",
    date: "Jan 19",
  },
  {
    id: "m-4",
    title: "Fitness Metrics Mockup",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    date: "Jan 18",
  },
  {
    id: "m-5",
    title: "Gym Mobile Preview",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    date: "Jan 16",
  },
  {
    id: "m-6",
    title: "Profile Settings Screen",
    url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    date: "Jan 15",
  },
]

export const MOCK_SHARED_LINKS: SharedLinkItem[] = [
  {
    id: "l-1",
    title: "GK Gym Life Web UI Design",
    url: "https://www.figma.com/file/gkgymlife-design-system",
    domain: "figma.com",
    date: "Today, 10:15 AM",
  },
  {
    id: "l-2",
    title: "PR #154 - QA Fixes & Responsive Chat",
    url: "https://github.com/gkhrms/client/pull/154",
    domain: "github.com",
    date: "Jan 19, 4:20 PM",
  },
  {
    id: "l-3",
    title: "Staging Release Environment v1.2",
    url: "https://staging.gkgymlife.app/dashboard",
    domain: "gkgymlife.app",
    date: "Jan 18, 2:40 PM",
  },
]
