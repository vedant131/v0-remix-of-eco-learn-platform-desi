"use client"

import { useState, useEffect } from "react"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EcoCharacter } from "@/components/eco-characters"
import Link from "next/link"

interface UserProfile {
  name: string
  email: string
  avatar: "sapling" | "droplet" | "recycle"
  level: string
  points: number
  joinDate: string
  streakDays: number
  achievements: string[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "EcoHero",
    email: "ecohero@example.com",
    avatar: "sapling",
    level: "Nature Lover",
    points: 1247,
    joinDate: "2024-01-15",
    streakDays: 12,
    achievements: ["Tree Planter", "Water Saver", "Recycling Champion"],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    challengeUpdates: true,
    achievements: true,
    leaderboard: false,
  })

  useEffect(() => {
    // Load profile from localStorage in a real app
    const savedAvatar = localStorage.getItem("ecolearn-avatar")
    const savedName = localStorage.getItem("ecolearn-username")
    const savedPoints = localStorage.getItem("ecolearn-points")

    if (savedAvatar) setProfile((prev) => ({ ...prev, avatar: savedAvatar as any }))
    if (savedName) setProfile((prev) => ({ ...prev, name: savedName }))
    if (savedPoints) setProfile((prev) => ({ ...prev, points: Number.parseInt(savedPoints) }))
  }, [])

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    localStorage.setItem("ecolearn-username", editedProfile.name)
    localStorage.setItem("ecolearn-avatar", editedProfile.avatar)
    setIsEditing(false)
  }

  const handleAvatarChange = (newAvatar: "sapling" | "droplet" | "recycle") => {
    setEditedProfile((prev) => ({ ...prev, avatar: newAvatar }))
  }

  const availableAvatars = [
    { type: "sapling" as const, name: "Growing Sapling", description: "Watch me grow!" },
    { type: "droplet" as const, name: "Water Droplet", description: "Every drop counts!" },
    { type: "recycle" as const, name: "Recycle Hero", description: "Reduce, reuse, recycle!" },
  ]

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">👤 Your Profile</h1>
            <p className="text-muted-foreground">Manage your eco-learning journey</p>
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Overview */}
          <section>
            <Card className="p-8 glass border-primary/20">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <EcoCharacter type={profile.avatar} size="xl" animated />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {profile.streakDays}
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{profile.level}</p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{profile.points.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Eco Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{profile.streakDays}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{profile.achievements.length}</div>
                      <div className="text-sm text-muted-foreground">Achievements</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </Card>
          </section>

          {/* Profile Tabs */}
          <section>
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="avatar">Avatar</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6 glass border-secondary/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">Account Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editedProfile.name : profile.name}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editedProfile.email : profile.email}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Member Since</Label>
                      <p className="text-muted-foreground mt-1">
                        {new Date(profile.joinDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glass border-accent/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">Notification Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Daily Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminded to complete daily challenges</p>
                      </div>
                      <Switch
                        checked={notifications.dailyReminders}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, dailyReminders: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Challenge Updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications about new challenges</p>
                      </div>
                      <Switch
                        checked={notifications.challengeUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, challengeUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Achievement Alerts</Label>
                        <p className="text-sm text-muted-foreground">Celebrate when you unlock achievements</p>
                      </div>
                      <Switch
                        checked={notifications.achievements}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, achievements: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leaderboard Updates</Label>
                        <p className="text-sm text-muted-foreground">Weekly ranking notifications</p>
                      </div>
                      <Switch
                        checked={notifications.leaderboard}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, leaderboard: checked }))}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="avatar" className="space-y-6">
                <Card className="p-6 glass border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">Choose Your Avatar</h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    {availableAvatars.map((avatar) => (
                      <div
                        key={avatar.type}
                        onClick={() => isEditing && handleAvatarChange(avatar.type)}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          isEditing ? "cursor-pointer hover:scale-105" : "cursor-default"
                        } ${
                          (isEditing ? editedProfile.avatar : profile.avatar) === avatar.type
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            <EcoCharacter
                              type={avatar.type}
                              size="lg"
                              animated={(isEditing ? editedProfile.avatar : profile.avatar) === avatar.type}
                            />
                          </div>
                          <h4 className="text-lg font-bold text-foreground mb-2">{avatar.name}</h4>
                          <p className="text-sm text-muted-foreground">{avatar.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isEditing && (
                    <p className="text-center text-muted-foreground mt-6">Click "Edit Profile" to change your avatar</p>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="p-6 glass border-secondary/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">Your Achievements</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🌳</span>
                        <h4 className="font-bold text-foreground">Tree Planter</h4>
                        <Badge className="bg-secondary text-secondary-foreground">Unlocked</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Planted 10 virtual trees</p>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💧</span>
                        <h4 className="font-bold text-foreground">Water Saver</h4>
                        <Badge className="bg-primary text-primary-foreground">Unlocked</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Saved 500L of water</p>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">♻️</span>
                        <h4 className="font-bold text-foreground">Recycling Champion</h4>
                        <Badge className="bg-accent text-accent-foreground">Unlocked</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Recycled 50 items</p>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/10 border border-border opacity-50">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🌍</span>
                        <h4 className="font-bold text-foreground">Planet Protector</h4>
                        <Badge variant="outline">Locked</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Complete 100 challenges</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 glass border-primary/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">Learning Progress</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Lessons Completed</span>
                        <span className="font-bold text-primary">7/21</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Games Played</span>
                        <span className="font-bold text-secondary">12/13</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Challenges Completed</span>
                        <span className="font-bold text-accent">8/16</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Quiz Average</span>
                        <span className="font-bold text-primary">85%</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 glass border-secondary/20">
                    <h3 className="text-xl font-bold text-foreground mb-6">Environmental Impact</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Trees Planted</span>
                        <span className="font-bold text-secondary">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Water Saved</span>
                        <span className="font-bold text-primary">850L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">CO₂ Reduced</span>
                        <span className="font-bold text-accent">45kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Items Recycled</span>
                        <span className="font-bold text-secondary">67</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}
