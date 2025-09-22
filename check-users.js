const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('Checking users in database...');
    
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        organization: true
      }
    });
    
    console.log(`Found ${users.length} users:`);
    
    for (const user of users) {
      console.log(`\n--- User: ${user.email} ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Role: ${user.role}`);
      console.log(`Email Verified: ${user.emailVerified}`);
      console.log(`Has hashedPassword: ${user.hashedPassword ? 'Yes' : 'No'}`);
      console.log(`Has password: ${user.password ? 'Yes' : 'No'}`);
      console.log(`Accounts: ${user.accounts.length}`);
      console.log(`Sessions: ${user.sessions.length}`);
      console.log(`Organization: ${user.organization ? 'Yes' : 'No'}`);
      
      if (user.accounts.length > 0) {
        console.log('Account details:');
        user.accounts.forEach(account => {
          console.log(`  Provider: ${account.providerId}`);
          console.log(`  Provider Account ID: ${account.providerAccountId}`);
          console.log(`  Access Token: ${account.accessToken ? 'Yes' : 'No'}`);
        });
      }
    }
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();