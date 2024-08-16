// pages/api/Contact.js
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req = NextRequest) {
  try {
    // 1. Parse the Request Body
    const data = await req.json(); 
    const phoneNumber = data.phoneNumber; // 2. Correct access

    console.log('Phone Number:', phoneNumber); // Check if you get the number

    const client = twilio('ACa901c3a32c5ec1dabb6f69748f8f166b', 'd603466607814f8197477370b149191d');

    await client.messages.create({
      body: "DreamPG: Thank you for reaching out! 🏡 We've received your request for a callback. Our team will be in touch with you shortly to assist you further. In the meantime, feel free to explore our website for more information about our accommodation options. Have a great day!",
      to: phoneNumber,
      from: '+17657692075' // Your Twilio phone number
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({ error: 'Error sending SMS' });
  }
}