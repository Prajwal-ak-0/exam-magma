"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-neutral-400 mt-1">Configure your platform settings and preferences</p>
      </div>
      
      <div className="grid gap-6">
        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader>
            <CardTitle className="text-teal-300">General Settings</CardTitle>
            <CardDescription className="text-teal-300/60">
              Configure general system settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-teal-200">Site Name</Label>
              <Input 
                id="siteName" 
                defaultValue="Online Judge" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-teal-200">Site Description</Label>
              <Input 
                id="description" 
                defaultValue="A platform for coding practice and competitions" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-transparent">
              <div className="space-y-0.5">
                <Label className="text-teal-200">Maintenance Mode</Label>
                <p className="text-sm text-teal-300/60">
                  Temporarily disable access to the platform
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-teal-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader>
            <CardTitle className="text-teal-300">Email Settings</CardTitle>
            <CardDescription className="text-teal-300/60">
              Configure email notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost" className="text-teal-200">SMTP Host</Label>
              <Input 
                id="smtpHost" 
                placeholder="smtp.example.com" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort" className="text-teal-200">SMTP Port</Label>
              <Input 
                id="smtpPort" 
                placeholder="587" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-transparent">
              <div className="space-y-0.5">
                <Label className="text-teal-200">Email Notifications</Label>
                <p className="text-sm text-teal-300/60">
                  Send email notifications for important events
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-teal-400" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader>
            <CardTitle className="text-teal-300">Judge Settings</CardTitle>
            <CardDescription className="text-teal-300/60">
              Configure code execution and judging settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit" className="text-teal-200">Default Time Limit (seconds)</Label>
              <Input 
                id="timeLimit" 
                type="number" 
                defaultValue="2" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memoryLimit" className="text-teal-200">Default Memory Limit (MB)</Label>
              <Input 
                id="memoryLimit" 
                type="number" 
                defaultValue="256" 
                className="bg-neutral-800 border-teal-500/20 focus:border-teal-500/40 focus:ring-teal-500/20"
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-transparent">
              <div className="space-y-0.5">
                <Label className="text-teal-200">Strict Mode</Label>
                <p className="text-sm text-teal-300/60">
                  Enable strict judging criteria
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-teal-400" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="border-teal-500/20 hover:border-teal-500/40 hover:bg-teal-500/10 text-teal-300"
          >
            Reset
          </Button>
          <Button className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white shadow-lg shadow-teal-500/20 border-none">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
