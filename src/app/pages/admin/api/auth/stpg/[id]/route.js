import { NextRequest, NextResponse } from 'next/server';

import Booking from '../../../../models/Booking'
import connectDB from '@/config/mongoose';
import { io } from 'socket.io-client';
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const pg = await Booking.findById(id);

    if (!pg) {
      return NextResponse.json({ error: 'PG not found' }, { status: 404 });
    }

    return NextResponse.json({ pg }, { status: 200 });
  } catch (error) {
    console.error('Error fetching PG by ID:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
const socket = io('http://localhost:3010');
export async function PUT(req, { params }) {
    try {
      await connectDB();
      const { id } = params;
      const { status } = await req.json(); // Extract the status from the request body
      const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!updatedBooking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }
      socket.emit('bookingStatusUpdated', updatedBooking);

      return NextResponse.json({ booking: updatedBooking }, { status: 200 });
    } catch (error) {
      console.error('Error updating booking:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  