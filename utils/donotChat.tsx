"use client"
import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { DonotChatData } from "../Features/Hr/Components/ExperienceDistribution"

interface DonutChartProps {
  chartData: DonotChatData[]
  innerRadius?: number
  outerRadius?: number
  height?: number | string
  width?: number | string
}

const DonutChart: React.FC<DonutChartProps> = ({
  chartData,
  innerRadius = 38,
  outerRadius = 58,
  height = 140,
  width = "100%",
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={0}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DonutChart
