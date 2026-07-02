import { NextResponse } from 'next/server'
import { serverClient } from '@/lib/sanity.server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, reviewText, stars } = body

    if (!name || !email || !reviewText || !stars) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const rating = Number(stars)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be an integer from 1 to 5.' }, { status: 400 })
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Sanity write token is not configured.' }, { status: 500 })
    }

    await serverClient.create({
      _type: 'review',
      name: String(name).trim(),
      email: String(email).trim(),
      reviewText: String(reviewText).trim(),
      stars: rating,
      active: false,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: 'Review submitted successfully. It will be visible after admin approval.' })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to submit review at this time.' }, { status: 500 })
  }
}
