import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/better-auth";

export async function GET(request: NextRequest) {
  try {
    // Use Better Auth to get the current session
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user with organization details from database
    const user = await auth.api.getUser({
      headers: request.headers
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        organization: user.organization
      }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}