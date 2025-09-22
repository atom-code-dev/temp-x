const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function recreateDemoUsers() {
  try {
    console.log('Deleting existing demo users...');
    
    // Delete demo users and their related data
    const demoEmails = [
      'john@freelancer.com',
      'alice@freelancer.com', 
      'admin@freelancehub.com',
      'techcorp@org.com',
      'startupxyz@org.com'
    ];
    
    // Delete related data first
    await prisma.message.deleteMany({
      where: {
        OR: [
          {
            sender: {
              email: { in: demoEmails }
            }
          },
          {
            receiver: {
              email: { in: demoEmails }
            }
          }
        ]
      }
    });

    await prisma.review.deleteMany({
      where: {
        OR: [
          {
            user: {
              email: { in: demoEmails }
            }
          },
          {
            organization: {
              user: {
                email: { in: demoEmails }
              }
            }
          }
        ]
      }
    });

    await prisma.order.deleteMany({
      where: {
        OR: [
          {
            user: {
              email: { in: demoEmails }
            }
          },
          {
            organization: {
              user: {
                email: { in: demoEmails }
              }
            }
          }
        ]
      }
    });

    await prisma.service.deleteMany({
      where: {
        user: {
          email: { in: demoEmails }
        }
      }
    });

    await prisma.organization.deleteMany({
      where: {
        user: {
          email: { in: demoEmails }
        }
      }
    });

    // Delete better-auth related data
    await prisma.session.deleteMany({
      where: {
        user: {
          email: { in: demoEmails }
        }
      }
    });

    await prisma.account.deleteMany({
      where: {
        user: {
          email: { in: demoEmails }
        }
      }
    });

    // Delete the users
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        email: { in: demoEmails }
      }
    });

    console.log(`✅ Deleted ${deletedUsers.count} demo users`);
    
    // Clean up test users
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'test'
        }
      }
    });
    
    console.log('✅ Cleaned up test users');
    
  } catch (error) {
    console.error('❌ Error recreating demo users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

recreateDemoUsers();