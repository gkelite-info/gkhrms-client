import { redirect } from "next/navigation"

export default async function HrExceptionHistoryPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = searchParams ? await searchParams : {}
  const query = new URLSearchParams()
  query.set("tab", "exception-history")
  for (const [key, val] of Object.entries(resolvedParams)) {
    if (key !== "tab" && typeof val === "string") {
      query.set(key, val)
    }
  }
  redirect(`/hr/attendance?${query.toString()}`)
}

