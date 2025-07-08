"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, CheckSquare, School, Briefcase } from "lucide-react"
import { ApplicationDashboard } from "@/components/application-dashboard"
import { ProfileManager } from "@/components/profile-manager"
import { DocumentManager } from "@/components/document-manager"
import { UniversityDatabase } from "@/components/university-database"
import { ChecklistManager } from "@/components/checklist-manager"
import { ReminderSystem } from "@/components/reminder-system"
import { DataBackup } from "@/components/data-backup"
import { useApplications } from "@/lib/hooks/useApplications"
import type { Application } from "@/lib/types"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  
  // Get all applications for stats calculation (no pagination)
  const { applications, isLoading } = useApplications(1, 1000)

  // Calculate dynamic stats from actual data
  const stats = {
    totalApplications: applications?.length || 0,
    inProgress: applications?.filter((app: Application) => app.status === "in-progress").length || 0,
    submitted: applications?.filter((app: Application) => app.status === "submitted").length || 0,
    accepted: applications?.filter((app: Application) => app.status === "accepted").length || 0,
    rejected: applications?.filter((app: Application) => app.status === "rejected").length || 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Local Application Organizer</h1>
          <p className="text-muted-foreground mt-2">Manage your university and job applications efficiently</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{isLoading ? "..." : stats.totalApplications}</p>
                  <p className="text-xs text-muted-foreground">Total Apps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{isLoading ? "..." : stats.inProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{isLoading ? "..." : stats.submitted}</p>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <School className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{isLoading ? "..." : stats.accepted}</p>
                  <p className="text-xs text-muted-foreground">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{isLoading ? "..." : stats.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reminder System */}
        <ReminderSystem />

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ApplicationDashboard />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManager />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentManager />
          </TabsContent>

          <TabsContent value="universities">
            <UniversityDatabase />
          </TabsContent>

          <TabsContent value="checklist">
            <ChecklistManager />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Settings</h2>
                <p className="text-muted-foreground">Manage your application data and preferences</p>
              </div>
              <DataBackup />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
