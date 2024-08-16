import { NextResponse } from 'next/server';
import FormData from '../../models/Multi';
import connectDB from '../../../config/mongoose';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const pg = await FormData.findById(id);
    if (!pg) {
      return NextResponse.json({ error: 'PG not found' }, { status: 404 });
    }
    return NextResponse.json(pg);
  } catch (error) {
    console.error('Error fetching PG:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
