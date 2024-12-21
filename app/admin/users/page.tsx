"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FiPlus, FiEdit2, FiTrash2, FiLock, FiUnlock } from "react-icons/fi"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
    problemsSolved: 45,
    joinedDate: "2023-12-01"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    problemsSolved: 120,
    joinedDate: "2023-11-15"
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Student",
    status: "Inactive",
    problemsSolved: 15,
    joinedDate: "2023-12-10"
  }
]

const statusColors = {
  Active: "bg-green-500/10 text-green-500",
  Inactive: "bg-red-500/10 text-red-500"
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button>
          <FiPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border border-neutral-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Problems Solved</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={statusColors[user.status as keyof typeof statusColors]}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.problemsSolved}</TableCell>
                <TableCell>{user.joinedDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      {user.status === "Active" ? (
                        <FiLock className="h-4 w-4" />
                      ) : (
                        <FiUnlock className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
