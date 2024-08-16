import { NextRequest, NextResponse } from 'next/server';

import FormData from '../../../../models/Multi'
import connectDB from '@/config/mongoose';
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const pg = await FormData.findById(id);

    if (!pg) {
      return NextResponse.json({ error: 'PG not found' }, { status: 404 });
    }

    return NextResponse.json({ pg }, { status: 200 });
  } catch (error) {
    console.error('Error fetching PG by ID:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const updatedData = await req.json();
    const updatedPG = await FormData.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPG) {
      return NextResponse.json({ error: 'PG not found' }, { status: 404 });
    }

    return NextResponse.json({ pg: updatedPG }, { status: 200 });
  } catch (error) {
    console.error('Error updating PG:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
