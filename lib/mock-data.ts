export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  conversionRate: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
}

export interface RevenueData {
  month: string
  revenue: number
  orders: number
}

export const dashboardStats: DashboardStats = {
  totalUsers: 12543,
  totalRevenue: 89432,
  totalOrders: 1834,
  conversionRate: 3.2,
}

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 12000, orders: 145 },
  { month: "Feb", revenue: 15000, orders: 178 },
  { month: "Mar", revenue: 18000, orders: 203 },
  { month: "Apr", revenue: 22000, orders: 234 },
  { month: "May", revenue: 25000, orders: 267 },
  { month: "Jun", revenue: 28000, orders: 289 },
]

export const userGrowthData: ChartData[] = [
  { name: "Week 1", value: 400 },
  { name: "Week 2", value: 600 },
  { name: "Week 3", value: 800 },
  { name: "Week 4", value: 1200 },
  { name: "Week 5", value: 1600 },
  { name: "Week 6", value: 2000 },
]

export const categoryData: ChartData[] = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Books", value: 20 },
  { name: "Home & Garden", value: 15 },
  { name: "Sports", value: 5 },
]

// Mock API functions
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return dashboardStats
}

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return revenueData
}

export const fetchUserGrowthData = async (): Promise<ChartData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return userGrowthData
}

export const fetchCategoryData = async (): Promise<ChartData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return categoryData
}
