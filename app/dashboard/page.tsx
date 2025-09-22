"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import {
  type DashboardStats,
  type RevenueData,
  type ChartData,
  fetchDashboardStats,
  fetchRevenueData,
  fetchUserGrowthData,
  fetchCategoryData,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [userGrowthData, setUserGrowthData] = useState<ChartData[]>([])
  const [categoryData, setCategoryData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, revenue, userGrowth, categories] = await Promise.all([
          fetchDashboardStats(),
          fetchRevenueData(),
          fetchUserGrowthData(),
          fetchCategoryData(),
        ])

        setStats(statsData)
        setRevenueData(revenue)
        setUserGrowthData(userGrowth)
        setCategoryData(categories)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Cards */}
        <StatsCards
          stats={stats || { totalUsers: 0, totalRevenue: 0, totalOrders: 0, conversionRate: 0 }}
          isLoading={loading}
        />

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <RevenueChart data={revenueData} isLoading={loading} />
          <UserGrowthChart data={userGrowthData} isLoading={loading} />
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <CategoryChart data={categoryData} isLoading={loading} />
        </div>
      </div>
    </DashboardLayout>
  )
}
