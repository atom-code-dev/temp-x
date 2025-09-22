"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, Shield, Mail, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const loginCredentials = [
    {
      role: "Freelancer",
      icon: <Briefcase className="h-5 w-5" />,
      credentials: [
        { email: "john@freelancer.com", password: "password123", name: "John Doe" },
        { email: "alice@freelancer.com", password: "password123", name: "Alice Smith" }
      ]
    },
    {
      role: "Organization", 
      icon: <Building2 className="h-5 w-5" />,
      credentials: [
        { email: "techcorp@org.com", password: "org123", name: "TechCorp Inc." },
        { email: "startupxyz@org.com", password: "org123", name: "StartupXYZ" }
      ]
    },
    {
      role: "Administrator",
      icon: <Shield className="h-5 w-5" />,
      credentials: [
        { email: "admin@freelancehub.com", password: "admin123", name: "Admin User" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">FreelanceHub Demo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use the login credentials below to explore the platform as different user types
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loginCredentials.map((userType, index) => (
            <Card key={index} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {userType.icon}
                  <span>{userType.role}</span>
                </CardTitle>
                <CardDescription>
                  Login credentials for {userType.role.toLowerCase()} accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userType.credentials.map((cred, credIndex) => (
                  <div key={credIndex} className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{cred.name}</span>
                      <Badge variant="outline">{userType.role}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono">{cred.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono">{cred.password}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link href="/login">
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Go to Login Page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
              <CardDescription>
                Explore these key features with different user accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold mb-2">👨‍💻 Freelancer Account</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create and manage services</li>
                    <li>• Track orders and deliveries</li>
                    <li>• Communicate with clients</li>
                    <li>• View reviews and ratings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🏢 Organization Account</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Browse services marketplace</li>
                    <li>• Place orders and track progress</li>
                    <li>• Manage company profile</li>
                    <li>• Rate completed services</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🛡️ Admin Account</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manage platform users</li>
                    <li>• Monitor services and orders</li>
                    <li>• View platform analytics</li>
                    <li>• Administrative oversight</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌟 General Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time messaging</li>
                    <li>• Service marketplace</li>
                    <li>• Order management</li>
                    <li>• Review and rating system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Tip: Copy and paste the credentials into the login form to experience different user perspectives
          </p>
        </div>
      </div>
    </div>
  );
}