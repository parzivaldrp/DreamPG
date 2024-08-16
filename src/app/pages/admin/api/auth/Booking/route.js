import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/config/mongoose';
import Booking from '@/app/models/Booking';

// Encryption key (replace 'your_actual_secret_key' with your actual secret key)

export async function GET(req = NextRequest) {
  try {
        await connectDB();
    // Fetch all PGs from the database
    const bookings = await Booking.find();

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching PGs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
