import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        applications: {
          include: {
            university: true,
          },
        },
      },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const profile = await prisma.profile.create({
      data,
      include: {
        applications: {
          include: {
            university: true,
          },
        },
      },
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
} 