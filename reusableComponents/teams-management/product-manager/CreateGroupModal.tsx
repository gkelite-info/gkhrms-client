"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import {
  UsersThree,
  X,
  MagnifyingGlass,
  ImageSquare,
  CaretDown,
  Check,
  ChatTeardropText,
  FileText,
} from "phosphor-react"

export interface GroupMember {
  id: string
  name: string
  role: string
  avatar: string
}

export interface CreateGroupData {
  groupName: string
  groupPhoto?: string | null
  members: GroupMember[]
  admins: GroupMember[]
  whoCanSend: "everyone" | "admins"
  whoCanAdd: "admins" | "everyone"
}

export interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate?: (data: CreateGroupData) => void
  onOpenGroup?: (data: CreateGroupData) => void
}

const DEFAULT_AVAILABLE_MEMBERS: GroupMember[] = [
  {
    id: "mem-sneha",
    name: "Sneha Rao",
    role: "HR Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "mem-ravi",
    name: "Ravi Kumar",
    role: "Finance Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "mem-anjali",
    name: "Anjali Mehta",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    id: "mem-rohan",
    name: "Rohan Gupta",
    role: "Tech Admin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "mem-vikram",
    name: "Vikram Singh",
    role: "Team Lead",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    id: "mem-anita",
    name: "Anita Kulkarni",
    role: "Finance Executive",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
]

const DEFAULT_SELECTED_MEMBERS: GroupMember[] = [
  {
    id: "sel-priya",
    name: "Priya Shah",
    role: "Lead Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "sel-meera",
    name: "Meera Das",
    role: "Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  },
  {
    id: "sel-arjun",
    name: "Arjun Verma",
    role: "Backend Architect",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
  },
]

export default function CreateGroupModal({
  isOpen,
  onClose,
  onCreate,
  onOpenGroup,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [searchMemberQuery, setSearchMemberQuery] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<GroupMember[]>(DEFAULT_SELECTED_MEMBERS)
  const [availableMembers, setAvailableMembers] = useState<GroupMember[]>(DEFAULT_AVAILABLE_MEMBERS)
  const [selectedAdmins, setSelectedAdmins] = useState<GroupMember[]>([
    DEFAULT_SELECTED_MEMBERS[0],
    DEFAULT_SELECTED_MEMBERS[2],
  ])
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)
  const [whoCanSend, setWhoCanSend] = useState<"everyone" | "admins">("everyone")
  const [whoCanAdd, setWhoCanAdd] = useState<"admins" | "everyone">("admins")
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdGroup, setCreatedGroup] = useState<CreateGroupData | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const adminDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false)
      setCreatedGroup(null)
    }
  }, [isOpen])

  const filteredAvailableMembers = useMemo(() => {
    const q = searchMemberQuery.toLowerCase().trim()
    return availableMembers.filter(
      (m) =>
        !selectedMembers.some((s) => s.id === m.id) &&
        (!q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
    )
  }, [availableMembers, selectedMembers, searchMemberQuery])

  const eligibleForAdmin = useMemo(() => {
    return selectedMembers.filter((m) => !selectedAdmins.some((a) => a.id === m.id))
  }, [selectedMembers, selectedAdmins])

  if (!isOpen) return null

  const handleClose = () => {
    setIsSuccess(false)
    setCreatedGroup(null)
    onClose()
  }

  const handleOpenGroup = () => {
    if (createdGroup) {
      onOpenGroup?.(createdGroup)
    }
    handleClose()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAddMember = (member: GroupMember) => {
    setSelectedMembers((prev) => [...prev, member])
  }

  const handleRemoveMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id))
    setSelectedAdmins((prev) => prev.filter((m) => m.id !== id))
  }

  const handleAddAdmin = (admin: GroupMember) => {
    setSelectedAdmins((prev) => [...prev, admin])
    setIsAdminDropdownOpen(false)
  }

  const handleRemoveAdmin = (id: string) => {
    setSelectedAdmins((prev) => prev.filter((m) => m.id !== id))
  }

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault()

    const finalGroupName = groupName.trim() || "Product Design Team"
    const finalMembers = selectedMembers.length > 0 ? selectedMembers : DEFAULT_SELECTED_MEMBERS
    const finalAdmins =
      selectedAdmins.length > 0
        ? selectedAdmins
        : [finalMembers[0], finalMembers[2] || finalMembers[0]]

    const data: CreateGroupData = {
      groupName: finalGroupName,
      groupPhoto: photoPreview,
      members: finalMembers,
      admins: finalAdmins,
      whoCanSend,
      whoCanAdd,
    }

    setCreatedGroup(data)
    setIsSuccess(true)
    onCreate?.(data)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in duration-200">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
        />

        <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="w-48 h-14 rounded-full bg-gradient-to-r from-blue-50/70 via-indigo-50/80 to-purple-50/70 border border-white flex items-center justify-center mb-5">
            <div className="w-11 h-11 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
              <Check size={22} weight="bold" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            Group Created Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
            The group has been created and your team can start collaborating now.
          </p>

          <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3.5 mt-6 text-left shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 overflow-hidden">
              {createdGroup?.groupPhoto ? (
                <img
                  src={createdGroup.groupPhoto}
                  alt="Group"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UsersThree size={22} weight="bold" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                {createdGroup?.groupName || "Product Design Team"}
              </h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <UsersThree size={14} className="text-[#5046E5]" weight="bold" />
                  {createdGroup?.members.length || 12} Members
                </span>
                <span className="flex items-center gap-1">
                  <UsersThree size={14} className="text-[#5046E5]" weight="bold" />
                  {createdGroup?.admins.length || 2} Admins
                </span>
              </div>
            </div>
          </div>

          <div className="w-full py-2.5 px-3 rounded-2xl bg-[#F8F9FD] border border-gray-100 flex items-center justify-between text-xs text-gray-600 mt-3 font-medium">
            <div className="flex items-center gap-1.5">
              <ChatTeardropText size={15} className="text-[#5046E5]" />
              <span>Chat Instantly</span>
            </div>
            <div className="w-px h-3.5 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <FileText size={15} className="text-[#5046E5]" />
              <span>Share Files</span>
            </div>
            <div className="w-px h-3.5 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <UsersThree size={15} className="text-[#5046E5]" />
              <span>Collaborate with Team</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-3 mt-7">
            <button
              type="button"
              onClick={handleClose}
              className="px-7 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer min-w-[120px]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleOpenGroup}
              className="px-7 py-2.5 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold shadow-xs shadow-[#5046E5]/20 active:scale-98 transition-all cursor-pointer min-w-[140px]"
            >
              Open Group
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[92vh] overflow-hidden">
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-gray-100/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
              <UsersThree size={22} weight="bold" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Create Group
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Create a new group conversation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-4 sm:space-y-5">
          <div className="rounded-2xl border border-gray-200/80 p-4 sm:p-5 bg-white shadow-2xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
              GROUP DETAILS
            </span>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name (e.g., Finance Updates)"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#5046E5] focus:ring-1 focus:ring-[#5046E5]/20 placeholder:text-gray-400 text-gray-900 transition-all"
                />
              </div>

              <div className="sm:w-56 w-full shrink-0">
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Group Photo / Icon
                </label>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-12 h-12 rounded-full border-2 border-dashed border-[#5046E5]/40 flex items-center justify-center text-[#5046E5] bg-[#EEF2FF]/40 cursor-pointer hover:bg-[#EEF2FF]/80 transition-all shrink-0 overflow-hidden"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Group avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageSquare size={20} weight="regular" />
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-gray-900 hover:text-[#5046E5] transition-colors cursor-pointer block text-left"
                    >
                      Add group photo
                    </button>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      JPG, PNG (max 2 MB)
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 p-4 sm:p-5 bg-white shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                  ADD MEMBERS
                </span>

                <div className="relative mb-2.5">
                  <MagnifyingGlass
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchMemberQuery}
                    onChange={(e) => setSearchMemberQuery(e.target.value)}
                    placeholder="Search & add members"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#5046E5] placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {filteredAvailableMembers.length === 0 ? (
                    <div className="py-6 text-center text-xs text-gray-400 font-medium">
                      No members available
                    </div>
                  ) : (
                    filteredAvailableMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate leading-tight">
                              {member.name}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddMember(member)}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#5046E5] hover:bg-[#E0E7FF] transition-colors cursor-pointer shrink-0"
                        >
                          + Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                  SELECTED MEMBERS ({selectedMembers.length})
                </span>

                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                  {selectedMembers.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400 font-medium border border-dashed border-gray-200 rounded-xl">
                      No members selected yet
                    </div>
                  ) : (
                    selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-2 px-3 rounded-xl bg-gray-50/90 border border-gray-100 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <span className="text-xs font-semibold text-gray-800 truncate">
                            {member.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer shrink-0"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 p-4 sm:p-5 bg-white shadow-2xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
              GROUP ADMINS
            </span>

            <div
              ref={adminDropdownRef}
              className="relative border border-gray-200 rounded-xl p-2 sm:p-2.5 bg-white min-h-[46px] flex items-center flex-wrap gap-2"
            >
              {selectedAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="px-2.5 py-1 rounded-lg bg-gray-100/90 text-gray-800 text-xs font-medium flex items-center gap-1.5 shrink-0"
                >
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{admin.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAdmin(admin.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              <div className="relative flex-1 min-w-[170px]">
                <button
                  type="button"
                  onClick={() => setIsAdminDropdownOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-600 px-1 py-1 cursor-pointer transition-colors"
                >
                  <span>Select Group Admin(s)</span>
                  <CaretDown size={14} className="text-gray-400" />
                </button>

                {isAdminDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 max-h-44 overflow-y-auto custom-scrollbar">
                    {eligibleForAdmin.length === 0 ? (
                      <div className="px-3 py-2 text-xs text-gray-400">
                        {selectedMembers.length === 0
                          ? "Please add members first"
                          : "All selected members are admins"}
                      </div>
                    ) : (
                      eligibleForAdmin.map((member) => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => handleAddAdmin(member)}
                          className="w-full px-3 py-2 text-left text-xs hover:bg-[#EEF2FF] flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="font-semibold text-gray-800 truncate">
                            {member.name}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/80 p-4 sm:p-5 bg-white shadow-2xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
              GROUP SETTINGS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="border border-gray-200/90 rounded-xl p-3.5 bg-white">
                <span className="text-xs font-bold text-gray-900 block mb-3">
                  Who can send messages
                </span>
                <div className="flex items-center gap-5">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="whoCanSend"
                      value="everyone"
                      checked={whoCanSend === "everyone"}
                      onChange={() => setWhoCanSend("everyone")}
                      className="accent-[#5046E5] w-4 h-4 cursor-pointer"
                    />
                    <span>Everyone</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="whoCanSend"
                      value="admins"
                      checked={whoCanSend === "admins"}
                      onChange={() => setWhoCanSend("admins")}
                      className="accent-[#5046E5] w-4 h-4 cursor-pointer"
                    />
                    <span>Admins Only</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200/90 rounded-xl p-3.5 bg-white">
                <span className="text-xs font-bold text-gray-900 block mb-3">
                  Who can add members
                </span>
                <div className="flex items-center gap-5">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="whoCanAdd"
                      value="admins"
                      checked={whoCanAdd === "admins"}
                      onChange={() => setWhoCanAdd("admins")}
                      className="accent-[#5046E5] w-4 h-4 cursor-pointer"
                    />
                    <span>Admins Only</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="whoCanAdd"
                      value="everyone"
                      checked={whoCanAdd === "everyone"}
                      onChange={() => setWhoCanAdd("everyone")}
                      className="accent-[#5046E5] w-4 h-4 cursor-pointer"
                    />
                    <span>Everyone</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#5046E5] hover:bg-[#4338CA] rounded-xl shadow-xs shadow-[#5046E5]/20 active:scale-98 transition-all cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
