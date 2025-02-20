"use client"

import { useEffect, useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getSalesData, type SalesData } from "./get-sales-data"
import { YearSelector } from "./year-selector"
import { Skeleton } from "@/components/ui/skeleton"

export function   SalesVolumeChart() {
  const [data, setData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(2024)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const salesData = await getSalesData()
        setData(salesData)
      } catch (error) {
        console.error("Failed to fetch sales data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const years = useMemo(() => Array.from(new Set(data.map((item) => item.year))).sort(), [data])

  const filteredData = useMemo(() => data.filter((item) => item.year === selectedYear), [data, selectedYear])

  const statistics = useMemo(() => {
    if (!filteredData.length) return { average: 0, total: 0 }
    const total = filteredData.reduce((sum, item) => sum + item.volume, 0)
    return {
      average: total / filteredData.length,
      total,
    }
  }, [filteredData])

  if (loading) {
    return <Skeleton className="w-full h-[400px]" />
  }

  return (
    <Card className="w-full h-[470px] ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-base font-normal">Sales Volume</CardTitle>
          <div className="text-sm text-muted-foreground">
            Average: {statistics.average.toFixed(2)} | Total: {statistics.total.toFixed(2)}
          </div>
        </div>
        <div className="flex items-center gap-4  ">
          <YearSelector years={years} selectedYear={selectedYear} onYearChange={setSelectedYear} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            volume: {
              label: "Volume",
              color: "#1A237E",
            },
          }}
          className=" pb-[10px]"
        >
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart
              data={filteredData}
              margin={{ top: 5, right: 5, left: 1, bottom: 5 }}
              className="transition-opacity duration-300 min-h-[400px] 2xl:min-h-[0]"
              barGap={5} // Add gap between bars
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `${value}.00`}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${Number(value).toFixed(2)}`} />} />
              <Bar
                dataKey="volume"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
                barSize={20} // Set bar width to 20px
                
                animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

