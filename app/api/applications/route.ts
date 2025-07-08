import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          university: true,
          profile: true,
          checklists: {
            include: {
              items: true,
            },
          },
        },
      }),
      prisma.application.count(),
    ]);

    return NextResponse.json({
      applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const application = await prisma.application.create({
      data,
      include: {
        university: true,
        profile: true,
        checklists: {
          include: {
            items: true,
          },
        },
      },
    });
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
} 