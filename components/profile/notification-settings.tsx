"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Smartphone, Megaphone } from "lucide-react"
import type { NotificationSettings } from "@/lib/profile-data"

interface NotificationSettingsProps {
  settings: NotificationSettings
  onSubmit: (settings: NotificationSettings) => Promise<void>
}

export function NotificationSettingsComponent({ settings, onSubmit }: NotificationSettingsProps) {
  const [formData, setFormData] = useState<NotificationSettings>(settings)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const notificationOptions = [
    {
      key: "email" as keyof NotificationSettings,
      title: "Email Notifications",
      description: "Receive notifications via email",
      icon: Mail,
    },
    {
      key: "push" as keyof NotificationSettings,
      title: "Push Notifications",
      description: "Receive push notifications on your devices",
      icon: Smartphone,
    },
    {
      key: "marketing" as keyof NotificationSettings,
      title: "Marketing Communications",
      description: "Receive updates about new features and promotions",
      icon: Megaphone,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to be notified about important updates</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {notificationOptions.map((option) => {
              const Icon = option.icon
              return (
                <div key={option.key} className="flex items-center justify-between space-x-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <Label htmlFor={option.key} className="text-sm font-medium">
                        {option.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <Switch
                    id={option.key}
                    checked={formData[option.key]}
                    onCheckedChange={(checked) => setFormData({ ...formData, [option.key]: checked })}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
