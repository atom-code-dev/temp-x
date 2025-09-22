"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Building2, Briefcase, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">FreelanceHub</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Find Services</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">For Freelancers</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">For Organizations</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/demo">
                <Button variant="outline">Demo Credentials</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/login">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Launching Soon
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Connect with Top Freelancers & 
                <span className="text-primary"> Grow Your Business</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                The ultimate platform where talented freelancers meet forward-thinking organizations. 
                Build amazing projects together, delivered with excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                    I'm a Freelancer
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                    I'm an Organization
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">5.0</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">Web Development</h3>
                  <p className="text-sm text-muted-foreground">Building modern web applications</p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold">$50/hr</span>
                  </div>
                </Card>

                <Card className="p-6 shadow-lg mt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alice Smith</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">4.9</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">UI/UX Design</h3>
                  <p className="text-sm text-muted-foreground">Creating beautiful user experiences</p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold">$75/hr</span>
                  </div>
                </Card>

                <Card className="p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">TechCorp Inc.</p>
                      <p className="text-sm text-muted-foreground">Software Company</p>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">Looking for Developers</h3>
                  <p className="text-sm text-muted-foreground">Multiple positions available</p>
                  <div className="mt-4">
                    <Badge variant="secondary">Hiring</Badge>
                  </div>
                </Card>

                <Card className="p-6 shadow-lg mt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">StartupXYZ</p>
                      <p className="text-sm text-muted-foreground">E-commerce Platform</p>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">Marketing Experts</h3>
                  <p className="text-sm text-muted-foreground">Growth marketing needed</p>
                  <div className="mt-4">
                    <Badge variant="secondary">Urgent</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose FreelanceHub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the perfect platform for freelancers and organizations to collaborate effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Freelancers</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Showcase your skills</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Find quality clients</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Get paid on time</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Build your reputation</span>
                </li>
              </ul>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Access top talent</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Flexible hiring options</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Quality guaranteed</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Scale your team</span>
                </li>
              </ul>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seamless Communication</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time messaging</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>File sharing</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Progress tracking</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure platform</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of freelancers and organizations already collaborating on FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Join as Freelancer
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Join as Organization
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">FreelanceHub</span>
              </div>
              <p className="text-muted-foreground">
                Connecting talent with opportunity.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Freelancers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Resources</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Organizations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}