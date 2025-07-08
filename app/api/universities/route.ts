import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { location: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [universities, total] = await Promise.all([
      prisma.university.findMany({
        where,
        skip,
        take: limit,
        orderBy: { priority: 'asc' },
        include: {
          programFocus: true,
          scholarships: true,
        },
      }),
      prisma.university.count({ where }),
    ]);

    return NextResponse.json({
      universities,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const university = await prisma.university.create({
      data,
      include: {
        programFocus: true,
        scholarships: true,
      },
    });
    return NextResponse.json(university, { status: 201 });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json({ error: 'Failed to create university' }, { status: 500 });
  }
} 