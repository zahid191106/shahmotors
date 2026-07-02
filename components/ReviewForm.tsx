'use client'

import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  reviewText: '',
  stars: 5,
}

export default function ReviewForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()
      if (!response.ok) {
        setStatus('error')
        setMessage(data.error || 'Unable to submit your review.')
        return
      }

      setStatus('success')
      setMessage(data.message || 'Review submitted successfully.')
      setForm(initialState)
    } catch (error) {
      setStatus('error')
      setMessage('Unable to submit your review at this time.')
    }
  }

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600"
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
          <span>Rating</span>
          <select
            value={form.stars}
            onChange={(event) => handleChange('stars', Number(event.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} Star{value > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
          <span>Review</span>
          <textarea
            value={form.reviewText}
            onChange={(event) => handleChange('reviewText', event.target.value)}
            required
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600"
            placeholder="Tell us about your experience with our vehicles or service..."
          />
        </label>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Review'}
          </button>
          
          {message ? (
            <p className={`text-sm font-medium text-center ${status === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}