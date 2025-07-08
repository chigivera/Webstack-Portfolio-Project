import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.checklistItem.findUnique({
      where: { id: parseInt(id) },
      include: {
        ChecklistTemplate: true,
      },
    });
    if (!item) {
      return NextResponse.json({ error: 'Checklist item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching checklist item:', error);
    return NextResponse.json({ error: 'Failed to fetch checklist item' }, { status: 500 });
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
    const { id: _, ChecklistTemplate, createdAt, updatedAt, ...updateData } = data;
    
    const item = await prisma.checklistItem.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        ChecklistTemplate: true,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating checklist item:', error);
    return NextResponse.json({ error: 'Failed to update checklist item' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.checklistItem.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Checklist item deleted' });
  } catch (error) {
    console.error('Error deleting checklist item:', error);
    return NextResponse.json({ error: 'Failed to delete checklist item' }, { status: 500 });
  }
} 