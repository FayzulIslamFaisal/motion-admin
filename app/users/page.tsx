"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersTable } from "@/components/users/users-table"
import { UsersFiltersComponent } from "@/components/users/users-filters"
import { UserFormDialog } from "@/components/users/user-form-dialog"
import { Pagination } from "@/components/users/pagination"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  type UserData,
  type UsersFilters,
  type UsersPagination,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  getDepartments,
} from "@/lib/users-data"

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [pagination, setPagination] = useState<UsersPagination>({
    page: 1,
    limit: 10,
    total: 0,
  })
  const [filters, setFilters] = useState<UsersFilters>({
    search: "",
    role: "all",
    status: "all",
    department: "",
  })
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [departments] = useState(getDepartments())
  const { toast } = useToast()

  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetchUsers(filters, pagination.page, pagination.limit, sortField, sortOrder)
      setUsers(response.users)
      setPagination(response.pagination)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [filters, pagination.page, pagination.limit, sortField, sortOrder, toast])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleFiltersChange = (newFilters: UsersFilters) => {
    setFilters(newFilters)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }))
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (id: string) => {
    setDeletingUserId(id)
  }

  const confirmDelete = async () => {
    if (!deletingUserId) return

    try {
      await deleteUser(deletingUserId)
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
      loadUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setDeletingUserId(null)
    }
  }

  const handleSubmitUser = async (userData: Omit<UserData, "id" | "createdAt">) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData)
        toast({
          title: "Success",
          description: "User updated successfully",
        })
      } else {
        await createUser(userData)
        toast({
          title: "Success",
          description: "User created successfully",
        })
      }
      loadUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingUser ? "update" : "create"} user`,
        variant: "destructive",
      })
      throw error
    }
  }
console.log("users page rendered", users);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          <Button onClick={handleCreateUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View, search, and manage all user accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UsersFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} departments={departments} />

            <UsersTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
              isLoading={isLoading}
            />

            <Pagination pagination={pagination} onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
          </CardContent>
        </Card>

        <UserFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          user={editingUser}
          onSubmit={handleSubmitUser}
          departments={departments}
        />

        <AlertDialog open={!!deletingUserId} onOpenChange={() => setDeletingUserId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}
