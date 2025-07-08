import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const checklist = await prisma.checklistTemplate.findUnique({
      where: { id: parseInt(id) },
      include: {
        application: true,
        items: true,
      },
    });
    if (!checklist) {
      return NextResponse.json({ error: 'Checklist not found' }, { status: 404 });
    }
    return NextResponse.json(checklist);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch checklist' }, { status: 500 });
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
    const { id: _, application, createdAt, updatedAt, ...updateData } = data;
    
    // For simplicity, delete all items and recreate
    const checklist = await prisma.checklistTemplate.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        items: data.items
          ? {
              deleteMany: {},
              create: data.items,
            }
          : undefined,
      },
      include: {
        application: true,
        items: true,
      },
    });
    return NextResponse.json(checklist);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update checklist' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.checklistTemplate.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Checklist deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete checklist' }, { status: 500 });
  }
} 