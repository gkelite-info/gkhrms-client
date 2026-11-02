"use client"

import { ReusablePagination } from "@/components/reusableComponents"
import { ManagerRequestItem } from "../../data/managerRequestsData"
import ManagerRequestItemCard from "./ManagerRequestItemCard"

interface ManagerRequestsListProps {
  currentSubtab: "team-member" | "team-lead" | "my-requests"
  title?: string
  paginatedRequests: ManagerRequestItem[]
  totalItems: number
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onView: (item: ManagerRequestItem) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export default function ManagerRequestsList({
  currentSubtab,
  title,
  paginatedRequests,
  totalItems,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onView,
  onApprove,
  onReject,
}: ManagerRequestsListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm sm:text-base font-bold text-gray-900">
        {title || (currentSubtab === "team-lead" ? "Team Lead Requests" : "Team Member Requests")} ({totalItems})
      </h2>

      {paginatedRequests.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-sm text-gray-500">
          No requests found matching your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginatedRequests.map((item) => (
            <ManagerRequestItemCard
              key={item.id}
              item={item}
              onView={onView}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </div>
      )}

      <ReusablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={[4, 6, 10, 20]}
        showPageSize={true}
        showTotalInfo={true}
        showJumpToPage={true}
        className="pt-2 border-t border-gray-100"
      />
    </div>
  )
}
