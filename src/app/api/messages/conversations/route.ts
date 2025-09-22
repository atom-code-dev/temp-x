import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all messages involving the current user
    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            organization: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
            organization: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Group messages by conversation and get last message
    const conversations = new Map();
    
    messages.forEach((message) => {
      const otherUser = message.senderId === userId ? message.receiver : message.sender;
      const conversationId = [userId, otherUser.id].sort().join('-');
      
      if (!conversations.has(conversationId) || 
          new Date(message.createdAt) > new Date(conversations.get(conversationId).lastMessage.createdAt)) {
        conversations.set(conversationId, {
          id: conversationId,
          otherUser,
          lastMessage: message,
          unreadCount: 0, // TODO: Calculate actual unread count based on read status
        });
      }
    });

    return NextResponse.json({
      conversations: Array.from(conversations.values()),
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}