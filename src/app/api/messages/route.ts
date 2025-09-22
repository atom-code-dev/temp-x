import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (otherUserId) {
      // Get messages between current user and specific user
      const messages = await db.message.findMany({
        where: {
          OR: [
            {
              senderId: userId,
              receiverId: otherUserId,
            },
            {
              senderId: otherUserId,
              receiverId: userId,
            },
          ],
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return NextResponse.json({ messages });
    } else {
      // Get all conversations for the user
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
            unreadCount: 0, // TODO: Calculate actual unread count
          });
        }
      });

      return NextResponse.json({
        conversations: Array.from(conversations.values()),
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content, receiverId, orderId } = await request.json();

    if (!content || !receiverId) {
      return NextResponse.json(
        { error: 'Content and receiver ID are required' },
        { status: 400 }
      );
    }

    // Create message
    const message = await db.message.create({
      data: {
        content,
        senderId: userId,
        receiverId,
        orderId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        data: message 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}