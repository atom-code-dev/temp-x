"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Building2, Briefcase, MessageSquare, CheckCircle, ArrowRight, Github, Twitter, Linkedin, Zap, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Globe } from "@/components/ui/globe";
import { GradientText } from "@/components/ui/gradient-text";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { WordRotate } from "@/components/ui/word-rotate";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">FreelanceHub</span>
              </div>
              <div className="hidden ml-16 lg:flex items-center space-x-8">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Platform</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">For Freelancers</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">For Companies</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Log in
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border-blue-200 mb-6">
                <Zap className="w-3 h-3 mr-2" />
                Trusted by 10,000+ professionals
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where great 
                <span className="text-blue-600"> freelancers</span>
                <br />
                meet great 
                <span className="text-blue-600"> companies</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl">
                The professional platform connecting talented freelancers with innovative companies. 
                Build amazing projects together, delivered with excellence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-medium">
                    Find Talent
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium">
                    Find Work
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <NumberTicker value={10000} prefix="+" className="text-3xl font-bold text-gray-900" />
                    <p className="text-sm text-gray-600 mt-1">Freelancers</p>
                  </div>
                  <div className="text-center">
                    <NumberTicker value={5000} prefix="+" className="text-3xl font-bold text-gray-900" />
                    <p className="text-sm text-gray-600 mt-1">Companies</p>
                  </div>
                  <div className="text-center">
                    <NumberTicker value={98} suffix="%" className="text-3xl font-bold text-gray-900" />
                    <p className="text-sm text-gray-600 mt-1">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <NumberTicker value={24} suffix="/7" className="text-3xl font-bold text-gray-900" />
                    <p className="text-sm text-gray-600 mt-1">Support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] w-full">
                <Globe className="absolute inset-0" />
                {/* Overlay Cards */}
                <div className="absolute top-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-600">Senior Developer</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">5.0</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">TechCorp</p>
                        <p className="text-sm text-gray-600">Hiring Now</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help freelancers and companies work together effectively
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            <BentoCard
              title="For Freelancers"
              description="Showcase your skills and find your next opportunity"
              icon={<Users className="h-6 w-6 text-blue-600" />}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Professional portfolio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Quality job opportunities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Build reputation</span>
                </div>
              </div>
            </BentoCard>

            <BentoCard
              title="For Companies"
              description="Access top talent and scale your team"
              icon={<Building2 className="h-6 w-6 text-blue-600" />}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Vetted professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Flexible hiring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Scale efficiently</span>
                </div>
              </div>
            </BentoCard>

            <BentoCard
              title="Communication"
              description="Seamless collaboration tools"
              icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Real-time messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">File sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Progress tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Secure platform</span>
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and find your perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Profile</h3>
              <p className="text-gray-600">Sign up and create your professional profile in minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Matches</h3>
              <p className="text-gray-600">Browse opportunities or talent that fits your needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Working</h3>
              <p className="text-gray-600">Connect and collaborate on amazing projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of freelancers and companies already collaborating on FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                I'm a Freelancer
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-medium">
                I'm a Company
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold">FreelanceHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting talented freelancers with innovative companies worldwide.
              </p>
              <div className="flex space-x-4">
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
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">For Freelancers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">For Companies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 FreelanceHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}