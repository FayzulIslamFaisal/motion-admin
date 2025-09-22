"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, Key, AlertTriangle } from "lucide-react"
import type { SecuritySettings, ProfileData } from "@/lib/profile-data"

interface SecuritySettingsProps {
  profile: ProfileData
  onPasswordUpdate: (data: SecuritySettings) => Promise<void>
  onTwoFactorToggle: (enabled: boolean) => Promise<void>
}

export function SecuritySettingsComponent({ profile, onPasswordUpdate, onTwoFactorToggle }: SecuritySettingsProps) {
  const [passwordData, setPasswordData] = useState<SecuritySettings>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(profile.security.twoFactorEnabled)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isUpdatingTwoFactor, setIsUpdatingTwoFactor] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsUpdatingPassword(true)

    try {
      await onPasswordUpdate(passwordData)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setIsUpdatingTwoFactor(true)

    try {
      await onTwoFactorToggle(enabled)
      setTwoFactorEnabled(enabled)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update two-factor authentication")
    } finally {
      setIsUpdatingTwoFactor(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Update */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdatingPassword}>
                {isUpdatingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Two-Factor Authentication</span>
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-4 p-4 border rounded-lg">
            <div>
              <h4 className="text-sm font-medium">Enable Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Secure your account with an additional verification step</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} disabled={isUpdatingTwoFactor} />
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Security Information</p>
                <p className="text-muted-foreground">
                  Last password change: {new Date(profile.security.lastPasswordChange).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
