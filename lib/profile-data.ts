export interface ProfileData {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar?: string
  department?: string
  phone?: string
  bio?: string
  location?: string
  timezone?: string
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
  }
}

export interface UpdateProfileData {
  name: string
  email: string
  department?: string
  phone?: string
  bio?: string
  location?: string
  timezone?: string
  avatar?: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  marketing: boolean
}

export interface SecuritySettings {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Mock profile data
const mockProfile: ProfileData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  avatar: "/placeholder.svg?key=profile",
  department: "Engineering",
  phone: "+1 (555) 123-4567",
  bio: "Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about creating scalable solutions and mentoring junior developers.",
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15",
  },
}

export const fetchProfile = async (): Promise<ProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const user = JSON.parse(storedUser)
    return {
      ...mockProfile,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }
  }

  return mockProfile
}

export const updateProfile = async (profileData: UpdateProfileData): Promise<ProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const user = JSON.parse(storedUser)
    const updatedUser = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      avatar: profileData.avatar,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return {
    ...mockProfile,
    ...profileData,
  }
}

export const updateNotificationSettings = async (settings: NotificationSettings): Promise<NotificationSettings> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return settings
}

export const updatePassword = async (securityData: SecuritySettings): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (securityData.newPassword !== securityData.confirmPassword) {
    throw new Error("Passwords do not match")
  }

  if (securityData.newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long")
  }
}

export const toggleTwoFactor = async (enabled: boolean): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return enabled
}

export const getTimezones = (): string[] => {
  return [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ]
}
