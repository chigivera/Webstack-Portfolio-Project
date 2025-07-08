import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const university = await prisma.university.findUnique({
      where: { id: parseInt(id) },
      include: {
        programFocus: true,
        scholarships: true,
      },
    });
    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 });
    }
    return NextResponse.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    return NextResponse.json({ error: 'Failed to fetch university' }, { status: 500 });
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
    const { id: _, programFocus, scholarships, createdAt, updatedAt, ...updateData } = data;
    
    const university = await prisma.university.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        programFocus: true,
        scholarships: true,
      },
    });
    return NextResponse.json(university);
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({ error: 'Failed to update university' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.university.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'University deleted' });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 });
  }
} 