import { NextRequest, NextResponse } from 'next/server';
import FormData from '../../../models/Multi';
import connectDB from '@/config/mongoose';

export async function GET(req = NextRequest) {
  try {
    await connectDB();
    // Fetch all PGs from the database
    const pgs = await FormData.find();
    return NextResponse.json({ pgs });
  } catch (error) {
    console.error('Error fetching PGs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
