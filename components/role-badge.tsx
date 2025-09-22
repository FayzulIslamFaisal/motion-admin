"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, User } from "lucide-react"

interface RoleBadgeProps {
  role: "admin" | "user"
  showIcon?: boolean
}

export function RoleBadge({ role, showIcon = false }: RoleBadgeProps) {
  const isAdmin = role === "admin"

  return (
    <Badge
      variant={isAdmin ? "default" : "secondary"}
      className={`${isAdmin ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
    >
      {showIcon && <>{isAdmin ? <Shield className="mr-1 h-3 w-3" /> : <User className="mr-1 h-3 w-3" />}</>}
      {isAdmin ? "Administrator" : "User"}
    </Badge>
  )
}
