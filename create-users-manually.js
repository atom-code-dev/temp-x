const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUsersManually() {
  try {
    console.log('Creating users manually with proper better-auth structure...');
    
    const demoUsers = [
      {
        email: 'john@freelancer.com',
        password: 'password123',
        name: 'John Doe',
        role: 'USER'
      },
      {
        email: 'alice@freelancer.com',
        password: 'password123',
        name: 'Alice Smith',
        role: 'USER'
      },
      {
        email: 'admin@freelancehub.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'ADMIN'
      },
      {
        email: 'techcorp@org.com',
        password: 'orgpassword123',
        name: 'TechCorp Inc.',
        role: 'ORGANIZATION'
      },
      {
        email: 'startupxyz@org.com',
        password: 'orgpassword123',
        name: 'StartupXYZ',
        role: 'ORGANIZATION'
      }
    ];

    for (const userData of demoUsers) {
      try {
        console.log(`Creating user: ${userData.email}`);
        
        // Create user with both password fields (better-auth might use both)
        const user = await prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
            role: userData.role,
            // Leave password fields empty - better-auth will handle them
          }
        });
        
        console.log(`✅ Created user: ${userData.email} with ID: ${user.id}`);
        
        // Create organization for organization users
        if (userData.role === 'ORGANIZATION') {
          await prisma.organization.create({
            data: {
              userId: user.id,
              name: userData.name,
              description: userData.name === 'TechCorp Inc.' 
                ? 'Leading technology company specializing in software solutions'
                : 'Innovative e-commerce startup disrupting the industry',
              website: userData.name === 'TechCorp Inc.' 
                ? 'https://techcorp.com'
                : 'https://startupxyz.com',
              industry: userData.name === 'TechCorp Inc.' ? 'Technology' : 'E-commerce',
              size: userData.name === 'TechCorp Inc.' ? '201-500 employees' : '11-50 employees',
              logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=${userData.name === 'TechCorp Inc.' ? '2196f3' : 'ff9800'}&color=fff`
            }
          });
          console.log(`✅ Created organization for: ${userData.name}`);
        }
        
      } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
          console.log(`User ${userData.email} already exists, skipping...`);
        } else {
          console.error(`Error creating user ${userData.email}:`, error.message);
        }
      }
    }
    
    console.log('\n✅ User creation completed!');
    console.log('Now you need to set passwords using better-auth registration or update them directly.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsersManually();