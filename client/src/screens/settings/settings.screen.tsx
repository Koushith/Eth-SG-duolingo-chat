import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const SettingsScreen: React.FC = () => {
  return (
    <form className="w-full">
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Settings</h1>
      <hr className="my-10 mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
      
      <section className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="space-y-1">
          <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Account Preferences</h2>
          <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Manage your account settings and preferences.</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Select>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

      <section className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="space-y-1">
          <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Achievements Filter</h2>
          <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Customize which achievements you want to see.</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-completed">Show Completed</Label>
            <Switch id="show-completed" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-in-progress">Show In Progress</Label>
            <Switch id="show-in-progress" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievement-category">Achievement Category</Label>
            <Select>
              <SelectTrigger id="achievement-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

      <section className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="space-y-1">
          <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Notification Settings</h2>
          <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Customize how you receive notifications.</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch id="push-notifications" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-frequency">Notification Frequency</Label>
            <Select>
              <SelectTrigger id="notification-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

      <div className="flex justify-end gap-4">
        <Button type="reset" variant="outline">Reset</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};



