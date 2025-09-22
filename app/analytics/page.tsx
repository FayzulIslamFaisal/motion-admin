"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts"
import { TrendingUp, Users, Activity, DollarSign } from "lucide-react"

// Mock analytics data
const trafficData = [
  { date: "2024-03-01", visitors: 1200, pageViews: 3400, bounceRate: 45 },
  { date: "2024-03-02", visitors: 1350, pageViews: 3800, bounceRate: 42 },
  { date: "2024-03-03", visitors: 1100, pageViews: 3100, bounceRate: 48 },
  { date: "2024-03-04", visitors: 1450, pageViews: 4200, bounceRate: 38 },
  { date: "2024-03-05", visitors: 1600, pageViews: 4800, bounceRate: 35 },
  { date: "2024-03-06", visitors: 1750, pageViews: 5200, bounceRate: 32 },
  { date: "2024-03-07", visitors: 1900, pageViews: 5600, bounceRate: 30 },
]

const conversionData = [
  { channel: "Organic Search", conversions: 245, rate: 3.2 },
  { channel: "Social Media", conversions: 189, rate: 2.8 },
  { channel: "Email", conversions: 156, rate: 4.1 },
  { channel: "Direct", conversions: 134, rate: 3.7 },
  { channel: "Paid Ads", conversions: 98, rate: 2.1 },
]

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout requiredRole="admin">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Advanced analytics and insights</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-20 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Advanced analytics and insights for administrators</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,350</div>
              <p className="text-xs text-secondary">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29,100</div>
              <p className="text-xs text-secondary">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-secondary">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0.3% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-secondary">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +15.3% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily website traffic and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                visitors: {
                  label: "Visitors",
                  color: "hsl(var(--chart-1))",
                },
                pageViews: {
                  label: "Page Views",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stackId="1"
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stackId="1"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion by Channel</CardTitle>
            <CardDescription>Performance metrics across different traffic sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                conversions: {
                  label: "Conversions",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="channel" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="conversions" fill="var(--color-chart-3)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
