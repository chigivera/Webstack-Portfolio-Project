import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const checklistTemplates = await prisma.checklistTemplate.findMany({
      include: {
        application: true,
        items: true,
      },
    });
    return NextResponse.json(checklistTemplates);
  } catch (error) {
    console.error('Error fetching checklist templates:', error);
    return NextResponse.json({ error: 'Failed to fetch checklist templates' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const checklistTemplate = await prisma.checklistTemplate.create({
      data,
      include: {
        application: true,
        items: true,
      },
    });
    return NextResponse.json(checklistTemplate, { status: 201 });
  } catch (error) {
    console.error('Error creating checklist template:', error);
    return NextResponse.json({ error: 'Failed to create checklist template' }, { status: 500 });
  }
} 