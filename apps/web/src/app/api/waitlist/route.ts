import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'You\'re already on the list!' },
          { status: 200 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
