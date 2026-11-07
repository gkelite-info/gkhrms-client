import { redirect } from "next/navigation"

export default async function FinanceExecutiveRequestsRedirectPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = searchParams ? await searchParams : {}
  const query = new URLSearchParams()
  query.set("tab", "requests")
  for (const [key, val] of Object.entries(resolvedParams)) {
    if (key !== "tab" && typeof val === "string") {
      query.set(key, val)
    }
  }
  redirect(`/financeexecutive/attendance?${query.toString()}`)
}

