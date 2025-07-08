import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
      include: {
        applications: {
          include: {
            university: true,
          },
        },
      },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    // Remove fields that shouldn't be updated
    const { id: _, applications, createdAt, updatedAt, ...updateData } = data;
    
    const profile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        applications: {
          include: {
            university: true,
          },
        },
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.profile.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
} 