import { ChatMessage } from "../types"
import { CURRENT_USER } from "./mockChatData"

export const MOCK_OLDER_BATCH_1: ChatMessage[] = [
  { id: "old-1", senderId: "aisha", senderName: "Aisha Khan", text: "Good morning team! Starting the sprint 14 deployment checks today.", timestamp: "Yesterday, 09:15 AM", isOutgoing: false },
  { id: "old-2", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Morning Aisha. The new gym dashboard components are all merged into develop.", timestamp: "Yesterday, 09:20 AM", isOutgoing: true, status: "read" },
  { id: "old-3", senderId: "aisha", senderName: "Aisha Khan", text: "Great. Did we verify the responsive charts on tablet viewport?", timestamp: "Yesterday, 09:32 AM", isOutgoing: false },
  { id: "old-4", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Yes, verified across 768px and 1024px breakpoints. Everything adapts smoothly.", timestamp: "Yesterday, 09:45 AM", isOutgoing: true, status: "read" },
  { id: "old-5", senderId: "aisha", senderName: "Aisha Khan", text: "Here is the regression test plan for reference.", timestamp: "Yesterday, 10:00 AM", isOutgoing: false, attachment: { name: "Regression_Plan_Sprint14.pdf", size: "1.8 MB", type: "pdf", url: "#" } },
  { id: "old-6", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Thanks, reviewing the test steps now.", timestamp: "Yesterday, 10:12 AM", isOutgoing: true, status: "read" },
  { id: "old-7", senderId: "aisha", senderName: "Aisha Khan", text: "Pay special attention to member check-in QR scanner flow.", timestamp: "Yesterday, 10:25 AM", isOutgoing: false },
  { id: "old-8", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Camera permissions and fallback input are tested and passing.", timestamp: "Yesterday, 10:40 AM", isOutgoing: true, status: "read" },
  { id: "old-9", senderId: "aisha", senderName: "Aisha Khan", text: "Awesome. Did Ravi sign off on the attendance API contracts?", timestamp: "Yesterday, 11:05 AM", isOutgoing: false },
  { id: "old-10", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Yes, approved in the morning standup.", timestamp: "Yesterday, 11:15 AM", isOutgoing: true, status: "read" },
  { id: "old-11", senderId: "aisha", senderName: "Aisha Khan", text: "Perfect. Let's make sure staging environment is refreshed by 2 PM.", timestamp: "Yesterday, 11:30 AM", isOutgoing: false },
  { id: "old-12", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Pipeline trigger scheduled for 1:45 PM.", timestamp: "Yesterday, 11:42 AM", isOutgoing: true, status: "read" },
  { id: "old-13", senderId: "aisha", senderName: "Aisha Khan", text: "Sounds good. Please ping Priya Singh once staging is up.", timestamp: "Yesterday, 12:00 PM", isOutgoing: false },
  { id: "old-14", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Will do. Adding her to the deployment notification channel.", timestamp: "Yesterday, 12:15 PM", isOutgoing: true, status: "read" },
  { id: "old-15", senderId: "aisha", senderName: "Aisha Khan", text: "Also check the notification badge count on iOS safari.", timestamp: "Yesterday, 02:10 PM", isOutgoing: false },
  { id: "old-16", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Fixed the WebKit badge clipping bug. Clean 18px circle now.", timestamp: "Yesterday, 02:30 PM", isOutgoing: true, status: "read" },
  { id: "old-17", senderId: "aisha", senderName: "Aisha Khan", text: "Excellent work! What about dark mode tokens?", timestamp: "Yesterday, 03:00 PM", isOutgoing: false },
  { id: "old-18", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Dark mode tokens are aligned with design system v2.", timestamp: "Yesterday, 03:22 PM", isOutgoing: true, status: "read" },
  { id: "old-19", senderId: "aisha", senderName: "Aisha Khan", text: "Nice. Let's do a quick sync before final sign-off.", timestamp: "Yesterday, 04:05 PM", isOutgoing: false },
  { id: "old-20", senderId: "arjun", senderName: "Arjun Mehta", senderAvatar: CURRENT_USER.avatar, text: "Ready whenever you are. Calendar invite accepted.", timestamp: "Yesterday, 04:15 PM", isOutgoing: true, status: "read" },
]
