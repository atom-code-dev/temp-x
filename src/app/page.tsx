"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Building2, Briefcase, MessageSquare, CheckCircle, Sparkles, Zap, Target } from "lucide-react";
import Link from "next/link";
import { Globe } from "@/components/ui/globe";
import { Marquee } from "@/components/ui/marquee";
import { GradientText } from "@/components/ui/gradient-text";
import { ShineButton } from "@/components/ui/shine-button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedList } from "@/components/ui/animated-list";
import { TypingText } from "@/components/ui/typing-text";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Aurora } from "@/components/ui/aurora";
import { DotsBackground } from "@/components/ui/dots-background";
import { Beam } from "@/components/ui/beam";
import { Confetti } from "@/components/ui/confetti";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { WordRotate } from "@/components/ui/word-rotate";
import { HeroPattern } from "@/components/ui/hero-pattern";
import { HeroGradient } from "@/components/ui/hero-gradient";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <HeroGradient type="radial" colors={["#3b82f6", "#8b5cf6", "#ec4899"]} opacity={0.1} />
      <DotsBackground />
      <Particles count={30} />
      <Beam />
      <Aurora />
      
      {/* Navigation */}
      <nav className="relative z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <GradientText colors={["#3b82f6", "#8b5cf6", "#ec4899"]} className="text-xl font-bold">
                  FreelanceHub
                </GradientText>
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
                <ShineButton variant="outline">Demo Credentials</ShineButton>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/login">
                <ShimmerButton>Sign Up</ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Launching Soon
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Connect with Top Freelancers & 
                <span className="block mt-2">
                  <WordRotate 
                    words={["Grow Your Business", "Build Amazing Projects", "Achieve Success"]}
                    className="text-primary"
                  />
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                <TypingText 
                  texts={[
                    "The ultimate platform where talented freelancers meet forward-thinking organizations.",
                    "Build amazing projects together, delivered with excellence.",
                    "Join thousands already collaborating on FreelanceHub."
                  ]}
                  className="text-lg text-muted-foreground mb-8 max-w-lg"
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <ShineButton size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                    I'm a Freelancer
                  </ShineButton>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                    I'm an Organization
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <NumberTicker value={10000} prefix="+" className="text-3xl font-bold text-primary" />
                  <p className="text-sm text-muted-foreground">Freelancers</p>
                </div>
                <div className="text-center">
                  <NumberTicker value={5000} prefix="+" className="text-3xl font-bold text-primary" />
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <NumberTicker value={98} suffix="%" className="text-3xl font-bold text-primary" />
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[600px] w-full">
                <Globe className="absolute inset-0" />
                <Meteors />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <Card className="p-6 shadow-lg animate-float">
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

                  <Card className="p-6 shadow-lg animate-float animation-delay-1000">
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

                  <Card className="p-6 shadow-lg animate-float animation-delay-2000">
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

                  <Card className="p-6 shadow-lg animate-float animation-delay-3000">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <HeroPattern pattern="dots" opacity={0.05} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <GradientText colors={["#3b82f6", "#8b5cf6", "#ec4899"]}>
                Why Choose FreelanceHub?
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the perfect platform for freelancers and organizations to collaborate effectively
            </p>
          </div>

          <BentoGrid>
            <BentoCard
              title="For Freelancers"
              description="Showcase your skills and find quality clients"
              icon={<Users className="h-8 w-8 text-primary" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Showcase your skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Find quality clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Get paid on time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Build your reputation</span>
                </div>
              </AnimatedList>
            </BentoCard>

            <BentoCard
              title="For Organizations"
              description="Access top talent and scale your team"
              icon={<Building2 className="h-8 w-8 text-primary" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Access top talent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Flexible hiring options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Scale your team</span>
                </div>
              </AnimatedList>
            </BentoCard>

            <BentoCard
              title="Seamless Communication"
              description="Real-time messaging and collaboration tools"
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>File sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure platform</span>
                </div>
              </AnimatedList>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Trusted by Leading Companies</h3>
          </div>
          <Marquee pauseOnHover>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center justify-center px-8">
                <div className="text-2xl font-bold text-muted-foreground">
                  Company {i + 1}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-primary text-primary-foreground overflow-hidden">
        <Confetti count={50} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <GradientText colors={["#ffffff", "#f0f0f0", "#ffffff"]}>
              Ready to Get Started?
            </GradientText>
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of freelancers and organizations already collaborating on FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <ShimmerButton size="lg" variant="secondary" className="text-lg px-8 py-6">
                Join as Freelancer
              </ShimmerButton>
            </Link>
            <Link href="/login">
              <ShineButton size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Join as Organization
              </ShineButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 relative">
        <HeroPattern pattern="grid" opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <GradientText colors={["#3b82f6", "#8b5cf6", "#ec4899"]} className="text-lg font-bold">
                  FreelanceHub
                </GradientText>
              </div>
              <p className="text-muted-foreground">
                Connecting talent with opportunity.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Freelancers</h4>
              <AnimatedList>
                <div><a href="#" className="hover:text-foreground transition-colors">Browse Jobs</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Create Profile</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Success Stories</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Resources</a></div>
              </AnimatedList>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Organizations</h4>
              <AnimatedList>
                <div><a href="#" className="hover:text-foreground transition-colors">Post a Job</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Find Talent</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Pricing</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Enterprise</a></div>
              </AnimatedList>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <AnimatedList>
                <div><a href="#" className="hover:text-foreground transition-colors">About Us</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Contact</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></div>
                <div><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></div>
              </AnimatedList>
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