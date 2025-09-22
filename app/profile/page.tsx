"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileForm } from "@/components/profile/profile-form"
import { NotificationSettingsComponent } from "@/components/profile/notification-settings"
import { SecuritySettingsComponent } from "@/components/profile/security-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, User, Bell, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  type ProfileData,
  type UpdateProfileData,
  type NotificationSettings,
  type SecuritySettings,
  fetchProfile,
  updateProfile,
  updateNotificationSettings,
  updatePassword,
  toggleTwoFactor,
} from "@/lib/profile-data"

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile()
        setProfile(profileData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [toast])

  const handleProfileUpdate = async (data: UpdateProfileData) => {
    try {
      const updatedProfile = await updateProfile(data)
      setProfile(updatedProfile)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleNotificationUpdate = async (settings: NotificationSettings) => {
    try {
      await updateNotificationSettings(settings)
      if (profile) {
        setProfile({ ...profile, notifications: settings })
      }
      toast({
        title: "Success",
        description: "Notification preferences updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      })
      throw error
    }
  }

  const handlePasswordUpdate = async (data: SecuritySettings) => {
    try {
      await updatePassword(data)
      toast({
        title: "Success",
        description: "Password updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleTwoFactorToggle = async (enabled: boolean) => {
    try {
      await toggleTwoFactor(enabled)
      if (profile) {
        setProfile({
          ...profile,
          security: { ...profile.security, twoFactorEnabled: enabled },
        })
      }
      toast({
        title: "Success",
        description: `Two-factor authentication ${enabled ? "enabled" : "disabled"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication",
        variant: "destructive",
      })
      throw error
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground">Unable to load profile data.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm profile={profile} onSubmit={handleProfileUpdate} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettingsComponent settings={profile.notifications} onSubmit={handleNotificationUpdate} />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettingsComponent
              profile={profile}
              onPasswordUpdate={handlePasswordUpdate}
              onTwoFactorToggle={handleTwoFactorToggle}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
