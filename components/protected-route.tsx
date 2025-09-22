"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/login-form"
import { AccessDenied } from "@/components/access-denied"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    return <AccessDenied requiredRole={requiredRole} />
  }

  return <>{children}</>
}
