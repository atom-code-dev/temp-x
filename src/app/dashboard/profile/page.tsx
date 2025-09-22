"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Save, Briefcase, Building2, Mail, Phone, MapPin, Globe, Star, Users } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  skills?: string;
  avatar?: string;
  role: 'USER' | 'ORGANIZATION' | 'ADMIN';
}

interface OrganizationProfile {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  industry?: string;
  size?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    bio: '',
    skills: '',
    avatar: '',
    role: 'USER',
  });
  
  const [orgProfile, setOrgProfile] = useState<OrganizationProfile>({
    id: '',
    name: '',
    description: '',
    website: '',
    logo: '',
    industry: '',
    size: '',
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      if (user.role === 'ORGANIZATION') {
        fetchOrgProfile();
      }
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrgProfile = async () => {
    try {
      const response = await fetch('/api/organization/profile');
      if (response.ok) {
        const data = await response.json();
        setOrgProfile(data.organization);
      }
    } catch (error) {
      console.error('Error fetching organization profile:', error);
    }
  };

  const updateUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        toast({
          title: "Profile updated!",
          description: "Your profile has been updated successfully.",
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const updateOrgProfile = async () => {
    try {
      const response = await fetch('/api/organization/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orgProfile),
      });

      if (response.ok) {
        toast({
          title: "Organization profile updated!",
          description: "Your organization profile has been updated successfully.",
        });
        setIsEditingOrg(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update organization profile.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Marketing",
    "Design",
    "Real Estate",
    "Hospitality",
    "Other",
  ];

  const sizeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Personal Profile</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-lg">
                  {userProfile.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                <p className="text-muted-foreground">{userProfile.email}</p>
                <Badge variant="outline" className="mt-1">
                  {userProfile.role === 'USER' ? 'Freelancer' : userProfile.role}
                </Badge>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, React, Design"
                    value={userProfile.skills}
                    onChange={(e) => setUserProfile({ ...userProfile, skills: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    value={userProfile.avatar}
                    onChange={(e) => setUserProfile({ ...userProfile, avatar: e.target.value })}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={updateUserProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {userProfile.bio && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                    <p className="text-sm">{userProfile.bio}</p>
                  </div>
                )}
                
                {userProfile.skills && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userProfile.skills.split(',').map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{userProfile.email}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Organization Profile (only for organizations) */}
        {user?.role === 'ORGANIZATION' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Organization Profile</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingOrg(!isEditingOrg)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Your company information and details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={orgProfile.logo} />
                  <AvatarFallback className="text-lg">
                    {orgProfile.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{orgProfile.name}</h3>
                  {orgProfile.industry && (
                    <p className="text-muted-foreground">{orgProfile.industry}</p>
                  )}
                </div>
              </div>

              {isEditingOrg ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Company Name</Label>
                    <Input
                      id="orgName"
                      value={orgProfile.name}
                      onChange={(e) => setOrgProfile({ ...orgProfile, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your company..."
                      value={orgProfile.description}
                      onChange={(e) => setOrgProfile({ ...orgProfile, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://example.com"
                      value={orgProfile.website}
                      onChange={(e) => setOrgProfile({ ...orgProfile, website: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={orgProfile.industry} onValueChange={(value) => setOrgProfile({ ...orgProfile, industry: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Select value={orgProfile.size} onValueChange={(value) => setOrgProfile({ ...orgProfile, size: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizeOptions.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      placeholder="https://example.com/logo.jpg"
                      value={orgProfile.logo}
                      onChange={(e) => setOrgProfile({ ...orgProfile, logo: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={updateOrgProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingOrg(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {orgProfile.description && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                      <p className="text-sm">{orgProfile.description}</p>
                    </div>
                  )}
                  
                  {orgProfile.website && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={orgProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {orgProfile.website}
                      </a>
                    </div>
                  )}
                  
                  {orgProfile.industry && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{orgProfile.industry}</span>
                    </div>
                  )}
                  
                  {orgProfile.size && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{orgProfile.size}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}