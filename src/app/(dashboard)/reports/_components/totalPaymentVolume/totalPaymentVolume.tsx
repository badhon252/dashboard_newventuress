"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { paymentVolumeData } from "./_componenets/data"

function TotalPaymentVolume() {
  const [selectedYear, setSelectedYear] = useState("2024")
  return (
    <Card className=" w-[460px] 2xl:w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Total Payment Volume</CardTitle>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            volume: {
              label: "Volume",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[350px] w-[420px] 2xl:w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={paymentVolumeData[selectedYear]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(2)}`}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <ChartTooltip />
              <Line type="monotone" dataKey="volume" strokeWidth={2} dot={false} stroke="hsl(var(--primary))" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TotalPaymentVolume