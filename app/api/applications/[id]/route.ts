import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await prisma.application.findUnique({
      where: { id: parseInt(id) },
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
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
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
    const { id: _, university, profile, checklists, createdAt, updatedAt, ...updateData } = data;
    
    const application = await prisma.application.update({
      where: { id: parseInt(id) },
      data: updateData,
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
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.application.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Application deleted' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
} 