"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, Shield, Users, Star, MessageSquare, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "USER":
        return <Briefcase className="h-5 w-5" />;
      case "ORGANIZATION":
        return <Building2 className="h-5 w-5" />;
      case "ADMIN":
        return <Shield className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "USER":
        return "Freelancer";
      case "ORGANIZATION":
        return "Organization";
      case "ADMIN":
        return "Administrator";
      default:
        return role;
    }
  };

  const getDashboardContent = () => {
    switch (user.role) {
      case "USER":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>My Services</span>
                </CardTitle>
                <CardDescription>
                  Manage your freelance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Services</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href="/dashboard/services">
                      <Button className="w-full sm:w-auto">
                        Manage Services
                      </Button>
                    </Link>
                    <Link href="/dashboard/orders">
                      <Button variant="outline" className="w-full sm:w-auto">
                        View Orders
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </CardTitle>
                <CardDescription>
                  Client communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Unread Messages</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Conversations</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Link href="/dashboard/messages">
                    <Button variant="outline" className="w-full mt-4">
                      View Messages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Reviews</span>
                </CardTitle>
                <CardDescription>
                  Your client feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <Badge variant="secondary">0.0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Reviews</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Link href="/dashboard/orders">
                    <Button variant="outline" className="w-full mt-4">
                      View Reviews
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "ORGANIZATION":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Organization Profile</span>
                </CardTitle>
                <CardDescription>
                  Manage your company profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Company Name</span>
                    <span className="text-sm font-medium">{user.organization?.name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Industry</span>
                    <span className="text-sm font-medium">{user.organization?.industry || "Not set"}</span>
                  </div>
                  <Link href="/dashboard/profile">
                    <Button className="w-full mt-4">Edit Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Active Orders</span>
                </CardTitle>
                <CardDescription>
                  Track your project orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Link href="/dashboard/orders">
                    <Button variant="outline" className="w-full mt-4">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Find Freelancers</span>
                </CardTitle>
                <CardDescription>
                  Browse available talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available Services</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Top Rated</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Link href="/marketplace">
                    <Button className="w-full mt-4">Browse Services</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "ADMIN":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>
                  Manage platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Button className="w-full mt-4">Manage Users</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Service Management</span>
                </CardTitle>
                <CardDescription>
                  Monitor platform services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Services</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending Review</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <Link href="/marketplace">
                    <Button variant="outline" className="w-full mt-4">
                      View Services
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Platform Stats</span>
                </CardTitle>
                <CardDescription>
                  Platform overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <Badge variant="secondary">$0</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">FreelanceHub</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium">{user.name}</p>
                  <div className="flex items-center space-x-1">
                    {getRoleIcon(user.role)}
                    <span className="text-sm text-muted-foreground">
                      {getRoleDisplayName(user.role)}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your {getRoleDisplayName(user.role).toLowerCase()} account.
          </p>
        </div>

        {getDashboardContent()}
      </main>
    </div>
  );
}