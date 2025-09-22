import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // Delete existing demo users and related data
    await db.message.deleteMany({
      where: {
        OR: [
          {
            sender: {
              email: {
                in: [
                  'john@freelancer.com',
                  'alice@freelancer.com',
                  'admin@freelancehub.com',
                  'techcorp@org.com',
                  'startupxyz@org.com'
                ]
              }
            }
          },
          {
            receiver: {
              email: {
                in: [
                  'john@freelancer.com',
                  'alice@freelancer.com',
                  'admin@freelancehub.com',
                  'techcorp@org.com',
                  'startupxyz@org.com'
                ]
              }
            }
          }
        ]
      }
    });

    await db.review.deleteMany({
      where: {
        OR: [
          {
            user: {
              email: {
                in: [
                  'john@freelancer.com',
                  'alice@freelancer.com',
                  'admin@freelancehub.com',
                  'techcorp@org.com',
                  'startupxyz@org.com'
                ]
              }
            }
          },
          {
            organization: {
              user: {
                email: {
                  in: [
                    'john@freelancer.com',
                    'alice@freelancer.com',
                    'admin@freelancehub.com',
                    'techcorp@org.com',
                    'startupxyz@org.com'
                  ]
                }
              }
            }
          }
        ]
      }
    });

    await db.order.deleteMany({
      where: {
        OR: [
          {
            user: {
              email: {
                in: [
                  'john@freelancer.com',
                  'alice@freelancer.com',
                  'admin@freelancehub.com',
                  'techcorp@org.com',
                  'startupxyz@org.com'
                ]
              }
            }
          },
          {
            organization: {
              user: {
                email: {
                  in: [
                    'john@freelancer.com',
                    'alice@freelancer.com',
                    'admin@freelancehub.com',
                    'techcorp@org.com',
                    'startupxyz@org.com'
                  ]
                }
              }
            }
          }
        ]
      }
    });

    await db.service.deleteMany({
      where: {
        user: {
          email: {
            in: [
              'john@freelancer.com',
              'alice@freelancer.com',
              'admin@freelancehub.com',
              'techcorp@org.com',
              'startupxyz@org.com'
            ]
          }
        }
      }
    });

    await db.organization.deleteMany({
      where: {
        user: {
          email: {
            in: [
              'john@freelancer.com',
              'alice@freelancer.com',
              'admin@freelancehub.com',
              'techcorp@org.com',
              'startupxyz@org.com'
            ]
          }
        }
      }
    });

    await db.user.deleteMany({
      where: {
        email: {
          in: [
            'john@freelancer.com',
            'alice@freelancer.com',
            'admin@freelancehub.com',
            'techcorp@org.com',
            'startupxyz@org.com'
          ]
        }
      }
    });

    // Create demo users with hashed passwords
    const demoUsers = [
      {
        email: 'john@freelancer.com',
        password: 'password123',
        name: 'John Doe',
        role: 'USER',
        bio: 'Full-stack developer with 5 years of experience in React and Node.js',
        skills: 'JavaScript,React,Node.js,Python,MongoDB',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0d8abc&color=fff'
      },
      {
        email: 'alice@freelancer.com',
        password: 'password123',
        name: 'Alice Smith',
        role: 'USER',
        bio: 'Creative graphic designer specializing in branding and UI/UX design',
        skills: 'Photoshop,Illustrator,Figma,Branding,UI/UX',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=e91e63&color=fff'
      },
      {
        email: 'admin@freelancehub.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'ADMIN',
        bio: 'Platform administrator',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=4caf50&color=fff'
      },
      {
        email: 'techcorp@org.com',
        password: 'org123',
        name: 'TechCorp Inc.',
        role: 'ORGANIZATION'
      },
      {
        email: 'startupxyz@org.com',
        password: 'org123',
        name: 'StartupXYZ',
        role: 'ORGANIZATION'
      }
    ];

    const users = [];
    
    for (const user of demoUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      
      const createdUser = await db.user.create({
        data: {
          email: user.email,
          name: user.name,
          role: user.role,
          bio: user.bio,
          skills: user.skills,
          avatar: user.avatar,
          hashedPassword: hashedPassword
        }
      });
      
      users.push(createdUser);
    }

    // Create organizations for organization users
    const organizations = [];
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.role === 'ORGANIZATION') {
        const org = await db.organization.create({
          data: {
            userId: user.id,
            name: user.name,
            description: user.name === 'TechCorp Inc.' 
              ? 'Leading technology company specializing in software solutions'
              : 'Innovative e-commerce startup disrupting the industry',
            website: user.name === 'TechCorp Inc.' 
              ? 'https://techcorp.com'
              : 'https://startupxyz.com',
            industry: user.name === 'TechCorp Inc.' ? 'Technology' : 'E-commerce',
            size: user.name === 'TechCorp Inc.' ? '201-500 employees' : '11-50 employees',
            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.name === 'TechCorp Inc.' ? '2196f3' : 'ff9800'}&color=fff`
          }
        });
        organizations.push(org);
      }
    }

    // Get categories for creating services
    const categories = await db.category.findMany();

    // Create sample services for freelancer users
    const services = [];
    
    if (categories.length > 0) {
      const johnUser = users.find(u => u.email === 'john@freelancer.com');
      const aliceUser = users.find(u => u.email === 'alice@freelancer.com');
      
      if (johnUser) {
        services.push(
          await db.service.create({
            data: {
              title: 'Custom Website Development',
              description: 'I will create a modern, responsive website tailored to your business needs. Using the latest technologies like React, Node.js, and MongoDB to deliver high-performance web applications.',
              price: 500,
              deliveryTime: 7,
              categoryId: categories[0].id,
              userId: johnUser.id,
              tags: 'website,react,node.js,responsive,custom',
              images: JSON.stringify(['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop'])
            }
          })
        );

        services.push(
          await db.service.create({
            data: {
              title: 'E-commerce Website Development',
              description: 'Complete e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern frameworks for optimal performance.',
              price: 1200,
              deliveryTime: 14,
              categoryId: categories[0].id,
              userId: johnUser.id,
              tags: 'e-commerce,shopify,payment,integration',
              images: JSON.stringify(['https://images.unsplash.com/photo-1556740749-833f75b0e9e1?w=400&h=300&fit=crop'])
            }
          })
        );
      }

      if (aliceUser) {
        services.push(
          await db.service.create({
            data: {
              title: 'Professional Logo Design',
              description: 'I will design a unique, memorable logo that represents your brand identity. Including multiple revisions and source files in various formats.',
              price: 150,
              deliveryTime: 3,
              categoryId: categories[1].id,
              userId: aliceUser.id,
              tags: 'logo,branding,design,professional',
              images: JSON.stringify(['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'])
            }
          })
        );

        services.push(
          await db.service.create({
            data: {
              title: 'Social Media Marketing',
              description: 'Comprehensive social media marketing strategy including content creation, audience engagement, and analytics reporting for your business.',
              price: 300,
              deliveryTime: 5,
              categoryId: categories[2].id,
              userId: aliceUser.id,
              tags: 'social media,marketing,content,analytics',
              images: JSON.stringify(['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop'])
            }
          })
        );
      }
    }

    return NextResponse.json({
      message: 'Demo users setup completed successfully',
      data: {
        users: users.length,
        organizations: organizations.length,
        services: services.length
      },
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
      }
    });
  } catch (error) {
    console.error('Error setting up demo users:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}