"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, ArrowUpDown } from "lucide-react"
import type { UserData } from "@/lib/users-data"
import { useAuth } from "@/hooks/use-auth"

interface UsersTableProps {
  users: UserData[]
  onEdit: (user: UserData) => void
  onDelete: (id: string) => void
  onSort: (field: string) => void
  sortField: string
  sortOrder: "asc" | "desc"
  isLoading?: boolean
}

export function UsersTable({ users, onEdit, onDelete, onSort, sortField, sortOrder, isLoading }: UsersTableProps) {
  const { user: currentUser } = useAuth()

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                    <div>
                      <div className="h-4 bg-muted rounded animate-pulse w-24 mb-1" />
                      <div className="h-3 bg-muted rounded animate-pulse w-32" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted rounded animate-pulse w-16" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted rounded animate-pulse w-16" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted rounded animate-pulse w-20" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted rounded animate-pulse w-20" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted rounded animate-pulse w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("name")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                User
                {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("role")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                Role
                {getSortIcon("role")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("status")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                Status
                {getSortIcon("status")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("department")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                Department
                {getSortIcon("department")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("lastLogin")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                Last Login
                {getSortIcon("lastLogin")}
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
              </TableCell>
              <TableCell>{user.department || "-"}</TableCell>
              <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {currentUser?.role === "admin" && user.id !== currentUser.id && (
                      <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
