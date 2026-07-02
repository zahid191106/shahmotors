import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReviewForm from '@/components/ReviewForm'
import { client } from '@/lib/sanity.client'

export const metadata: Metadata = {
  title: 'Reviews | Shah Motors Galway',
  description: 'Submit your review for Shah Motors and read customer feedback once approved by our team.',
  alternates: {
    canonical: 'https://www.shahmotors.ie/reviews',
  },
}

export default async function ReviewsPage() {
  // Fetch approved reviews from Sanity
  const query = `*[_type == "review" && active == true] | order(createdAt desc)[0...20]{
    name,
    reviewText,
    stars,
    createdAt
  }`

  let reviews: Array<{ name: string; reviewText: string; stars: number; createdAt?: string }> = []
  try {
    reviews = await client.fetch(query)
  } catch (err) {
    // Fail gracefully; reviews will be empty
    console.error('Error fetching reviews:', err)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Navbar />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-red-600 font-extrabold">
            Customer Feedback
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Share your experience with Shah Motors
          </h1>
          <p className="text-lg text-slate-600">
            Add a review and help other buyers choose the right used car. Submitted reviews will be checked by our admin team before they appear publicly.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
          
          {/* Left Column: Reviews List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Reviews ({reviews.length})
            </h2>
            
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                No reviews yet — be the first to add one!
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {reviews.map((r, i) => (
                  <article 
                    key={i} 
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-bold text-slate-900">{r.name}</p>
                          <p className="text-xs text-slate-400">
                            {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IE') : ''}
                          </p>
                        </div>
                        <div className="flex text-amber-500 text-sm">
                          {Array.from({ length: Math.max(0, Math.min(5, Math.round(r.stars || 0))) }).map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        "{r.reviewText}"
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Form & Guidelines */}
          <div className="lg:sticky lg:top-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Write a Review</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your feedback helps us continuously improve. We review submissions promptly to ensure honest marketplace interactions.
                </p>
              </div>
              
              <div className="border-t border-slate-100 pt-6">
                <ReviewForm />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}