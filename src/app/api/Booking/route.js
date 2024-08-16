import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/config/mongoose';
import Booking from '../../model/Booking';

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


export async function POST(req = NextRequest) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const reqBody = await req.json();
      const { name, phoneNumber, email, message,status } = reqBody;

      const newBooking = new Booking({
        name,
        email,
        phoneNumber,
        message,
        status
      });

      const booking = await newBooking.save();

      return NextResponse.json({
        message: "Booking created successfully",
        success: true,
        booking
      });
    } catch (err) {
      console.error('Error in booking:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}

