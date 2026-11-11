"use client"

export interface TableColumn<T> {
  key?: string
  header: React.ReactNode
  accessor?: keyof T
  render?: (row: T, index: number) => React.ReactNode
  width?: string
  align?: "left" | "center" | "right"
  className?: string
  headerClassName?: string
}

export interface ReusableTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  headerBgColor?: string // Default ash / "yeash" color from design
  headerTextColor?: string
  headerRounded?: string
  showBorder?: boolean
  tableClassName?: string
  containerClassName?: string
  rowHover?: boolean
  keyExtractor?: (row: T, index: number) => string | number
  emptyMessage?: string
  maxHeight?: string | number
}

export default function ReusableTable<T>({
  columns,
  data,
  headerBgColor = "#EAE8E4",
  headerTextColor = "#1F2937",
  headerRounded = "rounded-xl",
  showBorder = false,
  tableClassName = "",
  containerClassName = "",
  rowHover = true,
  keyExtractor,
  emptyMessage = "No data available",
  maxHeight,
}: ReusableTableProps<T>) {
  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const isRoundedHeader = Boolean(
    headerRounded && headerRounded !== "rounded-none"
  )

  return (
    <div
      style={maxHeight ? { maxHeight } : undefined}
      className={`w-full overflow-x-auto ${maxHeight ? "overflow-y-auto" : ""} table-scrollbar ${containerClassName}`}
    >
      <table
        className={`w-full ${
          isRoundedHeader ? "border-collapse" : "border-separate border-spacing-0"
        } text-xs text-[#323232] min-w-[650px] ${tableClassName}`}
      >
        <thead>
          <tr
            style={{ backgroundColor: headerBgColor }}
            className={`w-full ${
              isRoundedHeader ? `overflow-hidden ${headerRounded}` : ""
            } ${showBorder ? "border border-gray-200" : ""}`}
          >
            {columns.map((col, index) => {
              const isFirst = index === 0
              const isLast = index === columns.length - 1
              const colKey =
                col.key ||
                (col.accessor ? String(col.accessor) : `col-${index}`)
              const thCornerClass = isRoundedHeader
                ? `${isFirst ? "rounded-l-xl" : ""} ${
                    isLast ? "rounded-r-xl" : ""
                  }`
                : ""

              return (
                <th
                  key={colKey}
                  style={{
                    width: col.width || "auto",
                    color: headerTextColor,
                    backgroundColor: headerBgColor,
                  }}
                  className={`py-3 px-4 font-semibold text-xs tracking-tight select-none whitespace-nowrap ${getAlignmentClass(
                    col.align
                  )} ${thCornerClass} ${col.headerClassName || ""}`}
                >
                  {col.header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100/60">
          {data.length > 0 ? (
            data.map((row, rowIndex) => {
              const rowKey = keyExtractor
                ? keyExtractor(row, rowIndex)
                : rowIndex
              return (
                <tr
                  key={rowKey}
                  className={`transition-colors font-medium text-[12px] ${
                    rowHover ? "hover:bg-[#F9F9FE]" : ""
                  }`}
                >
                  {columns.map((col, colIndex) => {
                    const content = col.render
                      ? col.render(row, rowIndex)
                      : col.accessor
                      ? (row[col.accessor] as unknown as React.ReactNode)
                      : null

                    const cellKey = col.key || (col.accessor ? String(col.accessor) : `cell-${colIndex}`)

                    return (
                      <td
                        key={cellKey}
                        className={`py-3.5 px-4 whitespace-nowrap ${getAlignmentClass(col.align)} ${
                          col.className || "text-gray-700"
                        }`}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-400 italic font-normal text-xs"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
