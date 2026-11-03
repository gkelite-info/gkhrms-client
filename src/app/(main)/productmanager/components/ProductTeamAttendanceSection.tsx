"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  ReusableTable,
  ReusablePagination,
  DateFilterValue,
} from "@/components/reusableComponents"
import {
  INITIAL_PRODUCT_MEMBERS,
  PRODUCT_LIST,
} from "../data/productAttendanceData"
import ProductTeamHeader from "./team/ProductTeamHeader"
import ProductTeamAttendanceStats from "./team/ProductTeamAttendanceStats"
import ProductTeamAttendanceFilters from "./team/ProductTeamAttendanceFilters"
import { createProductTeamAttendanceColumns } from "./team/productTeamAttendanceColumns"

interface ProductTeamAttendanceSectionProps {
  selectedProjectId?: string
  onBack?: () => void
}

export default function ProductTeamAttendanceSection({
  selectedProjectId = "project-alpha",
  onBack,
}: ProductTeamAttendanceSectionProps) {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState(selectedProjectId)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState<DateFilterValue>(new Date(2025, 3, 24))
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const currentProjectName = useMemo(() => {
    const found = PRODUCT_LIST.find((p) => p.id === selectedProduct)
    return found ? found.name : "Project"
  }, [selectedProduct])

  const productFilteredMembers = useMemo(() => {
    const list = INITIAL_PRODUCT_MEMBERS.filter(
      (m) => m.productId === selectedProduct || (selectedProduct === "project-alpha" && m.productId === "product-a")
    )
    return list.length > 0 ? list : INITIAL_PRODUCT_MEMBERS.slice(0, 8)
  }, [selectedProduct])

  const stats = useMemo(() => {
    const total = productFilteredMembers.length
    const present = productFilteredMembers.filter((m) => m.status === "Present").length
    const absent = productFilteredMembers.filter((m) => m.status === "Absent").length
    const onLeave = productFilteredMembers.filter((m) => m.status === "On Leave").length
    const wfh = productFilteredMembers.filter((m) => m.status === "WFH").length
    return { total, present, absent, onLeave, wfh }
  }, [productFilteredMembers])

  const filteredData = useMemo(() => {
    return productFilteredMembers.filter((m) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const match =
          m.name.toLowerCase().includes(query) ||
          m.employeeId.toLowerCase().includes(query) ||
          m.designation.toLowerCase().includes(query)
        if (!match) return false
      }
      if (roleFilter !== "All" && m.role !== roleFilter) return false
      if (statusFilter !== "All" && m.status !== statusFilter) return false
      return true
    })
  }, [productFilteredMembers, searchQuery, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  const columns = useMemo(() => {
    return createProductTeamAttendanceColumns({
      onViewMember: (member) => {
        router.push(`/productmanager/member/${member.employeeId || member.id}?project=${selectedProduct}`)
      },
    })
  }, [router, selectedProduct])

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <ProductTeamHeader
        onBack={onBack}
        currentProjectName={currentProjectName}
        selectedProduct={selectedProduct}
        onProductChange={(id) => {
          setSelectedProduct(id)
          setCurrentPage(1)
        }}
      />

      <ProductTeamAttendanceStats stats={stats} />

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4 min-w-0">
        <ProductTeamAttendanceFilters
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q)
            setCurrentPage(1)
          }}
          roleFilter={roleFilter}
          onRoleChange={(r) => {
            setRoleFilter(r)
            setCurrentPage(1)
          }}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setStatusFilter(s)
            setCurrentPage(1)
          }}
          selectedDate={selectedDate}
          onDateChange={(d) => {
            setSelectedDate(d)
            setCurrentPage(1)
          }}
        />

        <ReusableTable
          columns={columns}
          data={paginatedData}
          keyExtractor={(row) => row.id}
          headerBgColor="#F9FAFB"
          headerTextColor="#6B7280"
          showBorder={false}
          rowHover={true}
          tableClassName="text-xs min-w-[850px]"
          containerClassName="w-full overflow-x-auto rounded-xl border border-gray-100"
          emptyMessage="No employees found for this product or filter."
        />

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageSizeChange={(sz) => {
            setPageSize(sz)
            setCurrentPage(1)
          }}
          pageSizeOptions={[5, 8, 10, 20]}
          showJumpToPage={true}
          showPageSize={true}
          showTotalInfo={true}
        />
      </div>
    </div>
  )
}
