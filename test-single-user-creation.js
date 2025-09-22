async function testSingleUserCreation() {
  try {
    console.log('Creating single test user...');
    
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'testuser123@example.com', 
        password: 'testpassword123',
        name: 'Test User 123'
      }),
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      console.log('✅ Successfully created user');
      
      // Test login immediately after creation
      console.log('Testing login...');
      const loginResponse = await fetch('http://localhost:3000/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'testuser123@example.com', 
          password: 'testpassword123'
        }),
        credentials: 'include',
      });
      
      console.log('Login response status:', loginResponse.status);
      
      if (loginResponse.ok) {
        console.log('✅ Login successful!');
        
        // Test getting user data
        const userResponse = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include',
        });
        
        console.log('User response status:', userResponse.status);
        const userData = await userResponse.text();
        console.log('User data:', userData);
      } else {
        const loginText = await loginResponse.text();
        console.log('❌ Login failed:', loginText);
      }
    } else {
      const text = await response.text();
      console.log('❌ Failed to create user:', text);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSingleUserCreation();