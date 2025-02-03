"use server"

export interface SalesData {
  month: string
  volume: number
  year: number
}

export async function getSalesData(): Promise<SalesData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate 3 years of data with some variations
  const years = [2022, 2023, 2024]
  const baseData = [
    { month: "Jan", volume: 52 },
    { month: "Feb", volume: 82 },
    { month: "Mar", volume: 95 },
    { month: "Apr", volume: 85 },
    { month: "May", volume: 94 },
    { month: "June", volume: 48 },
    { month: "July", volume: 82 },
    { month: "Aug", volume: 64 },
    { month: "Sep", volume: 88 },
    { month: "Oct", volume: 44 },
    { month: "Nov", volume: 90 },
    { month: "Dec", volume: 63 },
  ]

  return years.flatMap((year) =>
    baseData.map((data) => ({
      ...data,
      year,
      // Add some random variation to the volume for each year
      volume: Math.max(20, Math.min(100, data.volume + (Math.random() - 0.5) * 30)),
    })),
  )
}

