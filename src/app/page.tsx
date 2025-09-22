"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Building2, Briefcase, MessageSquare, CheckCircle, Sparkles, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects - Black theme with subtle accents */}
      <HeroGradient type="radial" colors={["#000000", "#0a0a0a", "#000000"]} opacity={0.4} />
      <DotsBackground dotColor="#333333" />
      <Particles count={15} color="#ffffff" />
      <Beam color="#ffffff" />
      <Aurora colorStops={["#ffffff", "#f0f0f0", "#e0e0e0"]} />
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-white" />
                <GradientText colors={["#ffffff", "#f0f0f0", "#ffffff"]} className="text-xl font-bold">
                  FreelanceHub
                </GradientText>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Product</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/demo">
                <ShineButton variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                  Demo
                </ShineButton>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Log In
                </Button>
              </Link>
              <Link href="/login">
                <ShimmerButton className="bg-white text-black hover:bg-gray-200">
                  Sign Up
                </ShimmerButton>
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
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Launching Soon
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
                Connect with Top Freelancers & 
                <span className="block mt-2">
                  <WordRotate 
                    words={["Grow Your Business", "Build Amazing Projects", "Achieve Success"]}
                    className="text-white"
                  />
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                <TypingText 
                  texts={[
                    "The ultimate platform where talented freelancers meet forward-thinking organizations.",
                    "Build amazing projects together, delivered with excellence.",
                    "Join thousands already collaborating on FreelanceHub."
                  ]}
                  className="text-lg text-gray-300 mb-8 max-w-lg"
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <ShineButton size="lg" className="text-lg px-8 py-6 w-full sm:w-auto bg-white text-black hover:bg-gray-100">
                    I'm a Freelancer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ShineButton>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto border-gray-700 text-gray-300 hover:text-white hover:border-gray-600">
                    I'm an Organization
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <NumberTicker value={10000} prefix="+" className="text-3xl font-bold text-white" />
                  <p className="text-sm text-gray-400">Freelancers</p>
                </div>
                <div className="text-center">
                  <NumberTicker value={5000} prefix="+" className="text-3xl font-bold text-white" />
                  <p className="text-sm text-gray-400">Projects</p>
                </div>
                <div className="text-center">
                  <NumberTicker value={98} suffix="%" className="text-3xl font-bold text-white" />
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[600px] w-full">
                <Globe className="absolute inset-0" />
                <Meteors />
              </div>
              
              {/* Floating Cards - Subtle */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <Card className="p-4 shadow-lg bg-black/80 backdrop-blur border-gray-800 animate-float">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-white">John Doe</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">5.0</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 text-sm text-white">Web Development</h3>
                    <p className="text-xs text-gray-400">Building modern web applications</p>
                    <div className="mt-3">
                      <span className="text-sm font-semibold text-white">$50/hr</span>
                    </div>
                  </Card>

                  <Card className="p-4 shadow-lg bg-black/80 backdrop-blur border-gray-800 animate-float animation-delay-1000">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-white">Alice Smith</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">4.9</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 text-sm text-white">UI/UX Design</h3>
                    <p className="text-xs text-gray-400">Creating beautiful user experiences</p>
                    <div className="mt-3">
                      <span className="text-sm font-semibold text-white">$75/hr</span>
                    </div>
                  </Card>

                  <Card className="p-4 shadow-lg bg-black/80 backdrop-blur border-gray-800 animate-float animation-delay-2000">
                    <div className="flex items-center space-x-3 mb-3">
                      <Building2 className="h-6 w-6 text-white" />
                      <div>
                        <p className="font-medium text-sm text-white">TechCorp Inc.</p>
                        <p className="text-xs text-gray-400">Software Company</p>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 text-sm text-white">Looking for Developers</h3>
                    <p className="text-xs text-gray-400">Multiple positions available</p>
                    <div className="mt-3">
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20">Hiring</Badge>
                    </div>
                  </Card>

                  <Card className="p-4 shadow-lg bg-black/80 backdrop-blur border-gray-800 animate-float animation-delay-3000">
                    <div className="flex items-center space-x-3 mb-3">
                      <Building2 className="h-6 w-6 text-white" />
                      <div>
                        <p className="font-medium text-sm text-white">StartupXYZ</p>
                        <p className="text-xs text-gray-400">E-commerce Platform</p>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 text-sm text-white">Marketing Experts</h3>
                    <p className="text-xs text-gray-400">Growth marketing needed</p>
                    <div className="mt-3">
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20">Urgent</Badge>
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
        <HeroPattern pattern="dots" opacity={0.02} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              <GradientText colors={["#ffffff", "#f0f0f0", "#ffffff"]}>
                Why Choose FreelanceHub?
              </GradientText>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We provide the perfect platform for freelancers and organizations to collaborate effectively
            </p>
          </div>

          <BentoGrid>
            <BentoCard
              title="For Freelancers"
              description="Showcase your skills and find quality clients"
              icon={<Users className="h-8 w-8 text-white" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Showcase your skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Find quality clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Get paid on time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Build your reputation</span>
                </div>
              </AnimatedList>
            </BentoCard>

            <BentoCard
              title="For Organizations"
              description="Access top talent and scale your team"
              icon={<Building2 className="h-8 w-8 text-white" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Access top talent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Flexible hiring options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Scale your team</span>
                </div>
              </AnimatedList>
            </BentoCard>

            <BentoCard
              title="Seamless Communication"
              description="Real-time messaging and collaboration tools"
              icon={<MessageSquare className="h-8 w-8 text-white" />}
            >
              <AnimatedList>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Real-time messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">File sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Progress tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">Secure platform</span>
                </div>
              </AnimatedList>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-white">Trusted by Leading Companies</h3>
          </div>
          <Marquee pauseOnHover>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center justify-center px-8">
                <div className="text-xl font-semibold text-gray-400">
                  Company {i + 1}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-gray-900 text-white overflow-hidden">
        <Confetti count={30} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <GradientText colors={["#ffffff", "#f0f0f0", "#ffffff"]}>
              Ready to Get Started?
            </GradientText>
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-gray-300">
            Join thousands of freelancers and organizations already collaborating on FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <ShimmerButton size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-200">
                Join as Freelancer
              </ShimmerButton>
            </Link>
            <Link href="/login">
              <ShineButton size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-black">
                Join as Organization
              </ShineButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 relative">
        <HeroPattern pattern="grid" opacity={0.02} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-white" />
                <GradientText colors={["#ffffff", "#f0f0f0", "#ffffff"]} className="text-lg font-bold">
                  FreelanceHub
                </GradientText>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <AnimatedList>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Enterprise</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></div>
              </AnimatedList>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <AnimatedList>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></div>
              </AnimatedList>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <AnimatedList>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></div>
              </AnimatedList>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 FreelanceHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}