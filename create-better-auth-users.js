async function createDemoUsers() {
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
        
        // Test login immediately after creation
        console.log(`Testing login for ${user.email}...`);
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
        
        console.log(`Login response status: ${loginResponse.status}`);
        
        if (loginResponse.ok) {
          console.log(`✅ Login successful for ${user.email}`);
        } else {
          const errorText = await loginResponse.text();
          console.log(`❌ Login failed for ${user.email}: ${errorText}`);
        }
        
      } else {
        const text = await response.text();
        console.log(`❌ Failed to create user ${user.email}: ${text}`);
      }
      
      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error creating user ${user.email}:`, error.message);
    }
  }
  
  console.log('\n✅ Demo user creation completed!');
  console.log('\nLogin credentials:');
  console.log('Freelancer: john@freelancer.com / password123');
  console.log('Freelancer 2: alice@freelancer.com / password123');
  console.log('Organization: techcorp@org.com / orgpassword123');
  console.log('Organization 2: startupxyz@org.com / orgpassword123');
  console.log('Admin: admin@freelancehub.com / admin123');
}

createDemoUsers();