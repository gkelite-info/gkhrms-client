"use client"

import React from "react"
import { useExpiryDocumentHook } from "../hooks/ExpiryDocument.hook"
import Table from "../../../utils/Table/Table"
import { useExpiryDocsTableData } from "../data/ExpiryDocument.data"

const ExpiringDocument = () => {
  const { expiryDocs } = useExpiryDocumentHook()
  const { column } = useExpiryDocsTableData()

  return (
    <div className="w-full lg:w-1/2 bg-[#F9FAFB] shadow-xs border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 min-w-0">
      <h3 className="text-[#323232] font-semibold text-xs sm:text-sm">
        Expiring Documents
      </h3>
      <div className="w-full bg-white rounded-xl shadow-2xs border border-gray-100 overflow-x-auto scrollbar-thin">
        <div className="min-w-[480px]">
          <Table
            columns={column}
            data={expiryDocs}
            bgColor="#fff"
            headerTextColor="#000"
            tableItemBg="#fff"
            tableItemTextColor="#000"
          />
        </div>
      </div>
    </div>
  )
}

export default ExpiringDocument
