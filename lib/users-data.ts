export interface UserData {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  avatar?: string
  createdAt: string
  lastLogin?: string
  department?: string
}

// Mock users data
const mockUsers: UserData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    avatar: "/professional-male-avatar.png",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-20",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    avatar: "/professional-female-avatar.png",
    createdAt: "2024-02-10",
    lastLogin: "2024-03-19",
    department: "Marketing",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    status: "inactive",
    avatar: "/professional-male-avatar-2.png",
    createdAt: "2024-01-20",
    lastLogin: "2024-03-10",
    department: "Sales",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    avatar: "/professional-female-avatar-2.png",
    createdAt: "2024-03-01",
    lastLogin: "2024-03-21",
    department: "Design",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    role: "user",
    status: "active",
    avatar: "/professional-male-avatar-3.png",
    createdAt: "2024-02-15",
    lastLogin: "2024-03-18",
    department: "Engineering",
  },
]

export interface UsersFilters {
  search?: string
  role?: "admin" | "user" | "all"
  status?: "active" | "inactive" | "all"
  department?: string
}

export interface UsersPagination {
  page: number
  limit: number
  total: number
}

export interface UsersResponse {
  users: UserData[]
  pagination: UsersPagination
}

// API functions
export const fetchUsers = async (
  filters: UsersFilters = {},
  page = 1,
  limit = 10,
  sortBy = "name",
  sortOrder: "asc" | "desc" = "asc",
): Promise<UsersResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredUsers = [...mockUsers]

  // Apply filters
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.department?.toLowerCase().includes(searchLower),
    )
  }

  if (filters.role && filters.role !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
  }

  if (filters.status && filters.status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === filters.status)
  }

  if (filters.department) {
    filteredUsers = filteredUsers.filter((user) => user.department === filters.department)
  }

  // Apply sorting
  filteredUsers.sort((a, b) => {
    let aValue = a[sortBy as keyof UserData] as string
    let bValue = b[sortBy as keyof UserData] as string

    if (sortBy === "createdAt" || sortBy === "lastLogin") {
      aValue = aValue || ""
      bValue = bValue || ""
    }

    const comparison = aValue.localeCompare(bValue)
    return sortOrder === "asc" ? comparison : -comparison
  })

  // Apply pagination
  const total = filteredUsers.length
  const startIndex = (page - 1) * limit
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit)

  return {
    users: paginatedUsers,
    pagination: {
      page,
      limit,
      total,
    },
  }
}

export const createUser = async (userData: Omit<UserData, "id" | "createdAt">): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newUser: UserData = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
  }

  mockUsers.push(newUser)
  return newUser
}

export const updateUser = async (id: string, userData: Partial<UserData>): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    throw new Error("User not found")
  }

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
  return mockUsers[userIndex]
}

export const deleteUser = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    throw new Error("User not found")
  }

  mockUsers.splice(userIndex, 1)
}

export const getUserById = async (id: string): Promise<UserData | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsers.find((user) => user.id === id) || null
}

export const getDepartments = (): string[] => {
  const departments = [...new Set(mockUsers.map((user) => user.department).filter(Boolean))]
  return departments as string[]
}
