"use client"

import { Suspense } from "react"
import ProductManagerTeamsView from "../../../../../reusableComponents/teams-management/product-manager/ProductManagerTeamsView"

export default function ProductManagerMyTeamPage() {
  return (
    <Suspense fallback={null}>
      <ProductManagerTeamsView />
    </Suspense>
  )
}
