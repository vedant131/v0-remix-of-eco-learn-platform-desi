"use client"

import { useState } from "react"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  points: number
  joinDate: string
  status: "active" | "inactive"
}

interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalLessons: number
  totalChallenges: number
  totalGames: number
  avgEngagement: number
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Emma Green",
    email: "emma@school.edu",
    role: "student",
    points: 2847,
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Alex Rivers",
    email: "alex@school.edu",
    role: "student",
    points: 2634,
    joinDate: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    name: "Ms. Johnson",
    email: "johnson@school.edu",
    role: "teacher",
    points: 1250,
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "4",
    name: "Maya Forest",
    email: "maya@school.edu",
    role: "student",
    points: 2521,
    joinDate: "2024-02-01",
    status: "active",
  },
  {
    id: "5",
    name: "Dr. Smith",
    email: "smith@school.edu",
    role: "admin",
    points: 890,
    joinDate: "2024-01-05",
    status: "active",
  },
]

const platformStats: PlatformStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalLessons: 21,
  totalChallenges: 16,
  totalGames: 13,
  avgEngagement: 78,
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newUserRole, setNewUserRole] = useState<"student" | "teacher" | "admin">("student")

  const handleUserRoleChange = (userId: string, newRole: "student" | "teacher" | "admin") => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const handleUserStatusToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive text-destructive-foreground"
      case "teacher":
        return "bg-secondary text-secondary-foreground"
      case "student":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">⚙️ Admin Panel</h1>
            <p className="text-muted-foreground">Manage users, content, and platform settings</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Platform Overview */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Platform Overview</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="p-4 glass border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{platformStats.totalUsers}</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </Card>
              <Card className="p-4 glass border-secondary/20 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{platformStats.activeUsers}</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </Card>
              <Card className="p-4 glass border-accent/20 text-center">
                <div className="text-2xl font-bold text-accent mb-1">{platformStats.totalLessons}</div>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </Card>
              <Card className="p-4 glass border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{platformStats.totalChallenges}</div>
                <p className="text-sm text-muted-foreground">Challenges</p>
              </Card>
              <Card className="p-4 glass border-secondary/20 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{platformStats.totalGames}</div>
                <p className="text-sm text-muted-foreground">Games</p>
              </Card>
              <Card className="p-4 glass border-accent/20 text-center">
                <div className="text-2xl font-bold text-accent mb-1">{platformStats.avgEngagement}%</div>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </Card>
            </div>
          </section>

          {/* Admin Tabs */}
          <section>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <Card className="p-6 glass border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">User Management</h3>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Add New User</Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>{user.points.toLocaleString()}</TableCell>
                            <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Select
                                  value={user.role}
                                  onValueChange={(value: "student" | "teacher" | "admin") =>
                                    handleUserRoleChange(user.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button size="sm" variant="outline" onClick={() => handleUserStatusToggle(user.id)}>
                                  {user.status === "active" ? "Deactivate" : "Activate"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 glass border-secondary/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">Content Management</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Published Lessons</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-secondary">21</span>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Active Challenges</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">16</span>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Available Games</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-accent">13</span>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 glass border-accent/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>

                    <div className="space-y-3">
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Create New Lesson
                      </Button>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Add Challenge
                      </Button>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Upload Game
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Bulk Import Content
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 glass border-primary/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">User Engagement</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Daily Active Users</span>
                        <span className="font-bold text-primary">456</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Weekly Active Users</span>
                        <span className="font-bold text-secondary">892</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Average Session Time</span>
                        <span className="font-bold text-accent">24 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-bold text-primary">78%</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 glass border-secondary/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">Content Performance</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Most Popular Lesson</span>
                        <span className="font-bold text-secondary">Climate Change</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Top Challenge</span>
                        <span className="font-bold text-primary">Plant a Tree</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Favorite Game</span>
                        <span className="font-bold text-accent">Waste Sorting</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Quiz Average</span>
                        <span className="font-bold text-secondary">82%</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6 glass border-accent/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">Platform Settings</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>User Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new users to register</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leaderboard Visibility</Label>
                        <p className="text-sm text-muted-foreground">Show global leaderboard to all users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="pt-4 border-t border-border/20">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}
