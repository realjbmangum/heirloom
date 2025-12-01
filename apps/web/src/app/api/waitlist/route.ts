import { NextRequest, NextResponse } from 'next/server'

// In production, you would:
// 1. Save to a database (Supabase, etc.)
// 2. Send to an email service (Mailchimp, ConvertKit, etc.)
// 3. Send a confirmation email

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

    // TODO: Add your email service integration here
    // Example with Supabase:
    // const { error } = await supabase.from('waitlist').insert({ email })

    // Example with Mailchimp:
    // await mailchimp.lists.addListMember(listId, { email_address: email, status: 'subscribed' })

    // For now, just log it (you can see this in Vercel logs)
    console.log('Waitlist signup:', email)

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
