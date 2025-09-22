const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanAndRecreate() {
  try {
    console.log('Cleaning database and recreating users...');
    
    // Delete all users and related data
    await prisma.message.deleteMany();
    await prisma.review.deleteMany();
    await prisma.order.deleteMany();
    await prisma.service.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ Cleaned all data');
    
    // Create demo users using better-auth registration
    const demoUsers = [
      {
        email: 'john@freelancer.com',
        password: 'password123',
        name: 'John Doe'
      },
      {
        email: 'alice@freelancer.com',
        password: 'password123',
        name: 'Alice Smith'
      },
      {
        email: 'admin@freelancehub.com',
        password: 'admin123',
        name: 'Admin User'
      },
      {
        email: 'techcorp@org.com',
        password: 'orgpassword123',
        name: 'TechCorp Inc.'
      },
      {
        email: 'startupxyz@org.com',
        password: 'orgpassword123',
        name: 'StartupXYZ'
      }
    ];

    for (const user of demoUsers) {
      try {
        console.log(`Creating user: ${user.email}`);
        
        const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: user.email, 
            password: user.password,
            name: user.name
          }),
          credentials: 'include',
        });

        console.log(`Response status: ${response.status}`);
        
        if (response.ok) {
          console.log(`✅ Successfully created user: ${user.email}`);
          
          // Test login immediately
          const loginResponse = await fetch('http://localhost:3000/api/auth/sign-in/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: user.email, 
              password: user.password
            }),
            credentials: 'include',
          });
          
          console.log(`Login test status: ${loginResponse.status}`);
          
          if (loginResponse.ok) {
            console.log(`✅ Login successful for ${user.email}`);
          } else {
            const errorText = await loginResponse.text();
            console.log(`❌ Login failed: ${errorText}`);
          }
          
        } else {
          const text = await response.text();
          console.log(`❌ Failed to create user: ${text}`);
        }
        
        // Wait between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Error creating user ${user.email}:`, error.message);
      }
    }
    
    console.log('\n✅ Demo user creation completed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanAndRecreate();