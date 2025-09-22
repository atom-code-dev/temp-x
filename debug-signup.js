async function debugSignup() {
  try {
    console.log('Testing signup with detailed error handling...');
    
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'debug@example.com', 
        password: 'debugpassword123',
        name: 'Debug User'
      }),
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    const text = await response.text();
    console.log('Response body:', text);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugSignup();