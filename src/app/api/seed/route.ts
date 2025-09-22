import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Create sample categories only if they don't exist
    const existingCategories = await db.category.findMany();
    let categories = existingCategories;
    
    if (existingCategories.length === 0) {
      categories = await Promise.all([
        db.category.create({
          data: {
            name: 'Web Development',
            description: 'Building websites and web applications',
            icon: '💻'
          }
        }),
        db.category.create({
          data: {
            name: 'Graphic Design',
            description: 'Creating visual content and designs',
            icon: '🎨'
          }
        }),
        db.category.create({
          data: {
            name: 'Digital Marketing',
            description: 'Online marketing and promotion services',
            icon: '📱'
          }
        }),
        db.category.create({
          data: {
            name: 'Content Writing',
            description: 'Writing and content creation services',
            icon: '✍️'
          }
        }),
        db.category.create({
          data: {
            name: 'Mobile Development',
            description: 'iOS and Android app development',
            icon: '📱'
          }
        })
      ]);
    }

    // Create sample users only if they don't exist
    const existingUsers = await db.user.findMany();
    let users = existingUsers;
    
    if (existingUsers.length === 0) {
      users = await Promise.all([
        db.user.create({
          data: {
            email: 'john@freelancer.com',
            name: 'John Doe',
            role: 'USER',
            bio: 'Full-stack developer with 5 years of experience in React and Node.js',
            skills: 'JavaScript,React,Node.js,Python,MongoDB',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0d8abc&color=fff'
          }
        }),
        db.user.create({
          data: {
            email: 'alice@freelancer.com',
            name: 'Alice Smith',
            role: 'USER',
            bio: 'Creative graphic designer specializing in branding and UI/UX design',
            skills: 'Photoshop,Illustrator,Figma,Branding,UI/UX',
            avatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=e91e63&color=fff'
          }
        }),
        db.user.create({
          data: {
            email: 'admin@freelancehub.com',
            name: 'Admin User',
            role: 'ADMIN',
            bio: 'Platform administrator',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=4caf50&color=fff'
          }
        }),
        db.user.create({
          data: {
            email: 'techcorp@org.com',
            name: 'TechCorp Inc.',
            role: 'ORGANIZATION'
          }
        }),
        db.user.create({
          data: {
            email: 'startupxyz@org.com',
            name: 'StartupXYZ',
            role: 'ORGANIZATION'
          }
        })
      ]);
    }

    // Create organizations only if they don't exist
    const existingOrganizations = await db.organization.findMany();
    let organizations = existingOrganizations;
    
    if (existingOrganizations.length === 0 && users.length >= 2) {
      organizations = await Promise.all([
        db.organization.create({
          data: {
            userId: users[3].id,
            name: 'TechCorp Inc.',
            description: 'Leading technology company specializing in software solutions',
            website: 'https://techcorp.com',
            industry: 'Technology',
            size: '201-500 employees',
            logo: 'https://ui-avatars.com/api/?name=TechCorp&background=2196f3&color=fff'
          }
        }),
        db.organization.create({
          data: {
            userId: users[4].id,
            name: 'StartupXYZ',
            description: 'Innovative e-commerce startup disrupting the industry',
            website: 'https://startupxyz.com',
            industry: 'E-commerce',
            size: '11-50 employees',
            logo: 'https://ui-avatars.com/api/?name=StartupXYZ&background=ff9800&color=fff'
          }
        })
      ]);
    }

    // Create sample services only if they don't exist
    const existingServices = await db.service.findMany();
    let services = existingServices;
    
    if (existingServices.length === 0 && categories.length > 0 && users.length > 0) {
      services = await Promise.all([
        db.service.create({
          data: {
            title: 'Custom Website Development',
            description: 'I will create a modern, responsive website tailored to your business needs. Using the latest technologies like React, Node.js, and MongoDB to deliver high-performance web applications.',
            price: 500,
            deliveryTime: 7,
            categoryId: categories[0].id,
            userId: users[0].id,
            tags: 'website,react,node.js,responsive,custom',
            images: JSON.stringify(['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop'])
          }
        }),
        db.service.create({
          data: {
            title: 'Professional Logo Design',
            description: 'I will design a unique, memorable logo that represents your brand identity. Including multiple revisions and source files in various formats.',
            price: 150,
            deliveryTime: 3,
            categoryId: categories[1].id,
            userId: users[1].id,
            tags: 'logo,branding,design,professional',
            images: JSON.stringify(['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'])
          }
        }),
        db.service.create({
          data: {
            title: 'E-commerce Website Development',
            description: 'Complete e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern frameworks for optimal performance.',
            price: 1200,
            deliveryTime: 14,
            categoryId: categories[0].id,
            userId: users[0].id,
            tags: 'e-commerce,shopify,payment,integration',
            images: JSON.stringify(['https://images.unsplash.com/photo-1556740749-833f75b0e9e1?w=400&h=300&fit=crop'])
          }
        }),
        db.service.create({
          data: {
            title: 'Social Media Marketing',
            description: 'Comprehensive social media marketing strategy including content creation, audience engagement, and analytics reporting for your business.',
            price: 300,
            deliveryTime: 5,
            categoryId: categories[2].id,
            userId: users[1].id,
            tags: 'social media,marketing,content,analytics',
            images: JSON.stringify(['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop'])
          }
        })
      ]);
    }

    return NextResponse.json({
      message: 'Sample data created successfully',
      loginCredentials: {
        freelancer: {
          email: 'john@freelancer.com',
          password: 'password123',
          role: 'Freelancer'
        },
        freelancer2: {
          email: 'alice@freelancer.com',
          password: 'password123',
          role: 'Freelancer'
        },
        organization: {
          email: 'techcorp@org.com',
          password: 'org123',
          role: 'Organization'
        },
        organization2: {
          email: 'startupxyz@org.com',
          password: 'org123',
          role: 'Organization'
        },
        admin: {
          email: 'admin@freelancehub.com',
          password: 'admin123',
          role: 'Administrator'
        }
      },
      data: {
        categories: categories.length,
        users: users.length,
        organizations: organizations.length,
        services: services.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}