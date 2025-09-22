"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Briefcase, Building2, Shield } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "",
  });
  
  const router = useRouter();
  const { toast } = useToast();
  const { login, register } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginForm.email, loginForm.password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        
        // Redirect based on user role
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(
        registerForm.email,
        registerForm.password,
        registerForm.name,
        registerForm.role as "USER" | "ORGANIZATION"
      );
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to FreelanceHub. Your account has been created successfully.",
        });
        
        // Redirect based on user role
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">FreelanceHub</span>
            </div>
            <ThemeToggle />
          </div>
          <h1 className="text-2xl font-bold">Welcome to FreelanceHub</h1>
          <p className="text-muted-foreground mt-2">
            Connect with top freelancers and grow your business
          </p>
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Join FreelanceHub and start connecting with talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a</Label>
                    <Select value={registerForm.role} onValueChange={(value) => setRegisterForm({ ...registerForm, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4" />
                            <span>Freelancer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ORGANIZATION">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Organization</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="hover:text-foreground underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-foreground underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Demo Credentials Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Demo Login Credentials</CardTitle>
            <CardDescription className="text-center">
              Use these credentials to explore the platform as different user types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-3 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Freelancer
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@freelancer.com</p>
                    <p className="text-xs font-mono">password123</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-xs text-muted-foreground">alice@freelancer.com</p>
                    <p className="text-xs font-mono">password123</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold mb-3 flex items-center justify-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Organization
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">TechCorp Inc.</p>
                    <p className="text-xs text-muted-foreground">techcorp@org.com</p>
                    <p className="text-xs font-mono">org123</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">StartupXYZ</p>
                    <p className="text-xs text-muted-foreground">startupxyz@org.com</p>
                    <p className="text-xs font-mono">org123</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold mb-3 flex items-center justify-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Administrator
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@freelancehub.com</p>
                    <p className="text-xs font-mono">admin123</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}