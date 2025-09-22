export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    avatar: "/diverse-user-avatars.png",
  },
]

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  if (!user || password !== "password") {
    throw new Error("Invalid credentials")
  }

  // Store in localStorage for persistence
  localStorage.setItem("user", JSON.stringify(user))
  return user
}

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  localStorage.removeItem("user")
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("user")
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}
