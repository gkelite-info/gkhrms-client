import { redirect } from "next/navigation"

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TeamLeadPage(props: PageProps) {
  const searchParams = await props.searchParams
  const params = new URLSearchParams()
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (typeof v === "string") {
        params.set(k, v)
      } else if (Array.isArray(v)) {
        v.forEach((val) => params.append(k, val))
      }
    }
  }
  const qs = params.toString()
  redirect(`/teamlead/attendance${qs ? `?${qs}` : ""}`)
}
