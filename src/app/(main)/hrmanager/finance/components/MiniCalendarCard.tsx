"use client"

import React from "react"
import ReusableCalendar, { ReusableCalendarProps } from "@/../reusableComponents/ReusableCalendar"

export type MiniCalendarCardProps = ReusableCalendarProps

export default function MiniCalendarCard(props: MiniCalendarCardProps) {
  return <ReusableCalendar {...props} />
}

