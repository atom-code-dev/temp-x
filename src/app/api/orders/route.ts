import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (userRole === 'USER') {
      where.userId = userId;
    } else if (userRole === 'ORGANIZATION') {
      where.orgId = userId;
    }

    if (status && status !== 'ALL') {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        include: {
          service: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              },
              category: {
                select: {
                  id: true,
                  name: true,
                  icon: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          organization: {
            select: {
              id: true,
              name: true,
              logo: true
            }
          },
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      db.order.count({ where })
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId || userRole !== 'ORGANIZATION') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { serviceId, requirements } = await request.json();

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Get service details
    const service = await db.service.findUnique({
      where: { id: serviceId },
      include: {
        user: true
      }
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Get organization details
    const organization = await db.organization.findUnique({
      where: { userId }
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Create order
    const order = await db.order.create({
      data: {
        serviceId,
        userId: service.userId,
        orgId: organization.id,
        price: service.price,
        requirements,
        status: 'PENDING'
      },
      include: {
        service: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            },
            category: {
              select: {
                id: true,
                name: true,
                icon: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        organization: {
          select: {
            id: true,
            name: true,
            logo: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: 'Order created successfully',
        order 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}