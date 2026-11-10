import { redirect } from "next/navigation"

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RequestsPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const target = new URLSearchParams()
  target.set("tab", "requests")
  for (const [key, value] of Object.entries(resolvedParams)) {
    if (value && key !== "tab") {
      target.set(key, Array.isArray(value) ? value[0] : value)
    }
  }
  redirect(`/techadmin/attendance?${target.toString()}`)
}

