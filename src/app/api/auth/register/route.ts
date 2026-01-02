import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import { query } from '@/lib/db';


export async function POST(request: Request) {
    const reqJson = await request.json();
    const { name, email, password, confirmPassword, phone_number } = reqJson;

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const isValidPhone = (phone: string) => {
        const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
        return phoneRegex.test(phone);
    }
    if (!name || !email || !password || !confirmPassword || !phone_number) {
        return NextResponse.json({message: " All fields are required"}, {status:400})
    }

    if (!isValidEmail(email)) {
        return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }
    if (!isValidPhone(phone_number)) {
        return NextResponse.json({ message: "Invalid phone number" }, { status: 400 });
    }
    if (confirmPassword !== password) {
        return NextResponse.json({message:"Password do not match"}, { status:400})
    }
    if (password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 character long" }, { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUserResult = await query(`SELECT id FROM users WHERE email = $1`, [email]);
        if (existingUserResult.rows.length > 0) {
          return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert the new user into the database
        await query(
          'INSERT INTO users (username, email, password_hash, phone_number) VALUES ($1, $2, $3, $4)',
          [name, email, hashedPassword, phone_number]
        );
    
        return NextResponse.json({ message: 'User created' }, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
      }
}