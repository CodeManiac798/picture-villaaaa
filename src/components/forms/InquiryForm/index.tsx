'use client';

import { useState } from 'react';
import type { InquiryFormData } from '@/types/inquiry';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

const SHOOT_TYPES = [
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'fashion', label: 'Fashion / Editorial' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'commercial', label: 'Commercial / Brand' },
  { value: 'music-video', label: 'Music Video' },
  { value: 'other', label: 'Other' },
] as const;

const labelClass = 'block text-label text-(--color-mist) mb-2';
const inputClass = cn(
  'w-full bg-transparent border-b border-(--color-beige)',
  'px-0 py-3 text-body text-(--color-charcoal)',
  'placeholder:text-(--color-mist)/60',
  'focus:outline-none focus:border-(--color-gold)',
  'transition-colors duration-200',
);

export function InquiryForm() {
  const [form, setForm] = useState<Partial<InquiryFormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const update = (field: keyof InquiryFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="font-display text-display-lg text-(--color-charcoal) mb-3">
          Thank you.
        </p>
        <p className="text-body text-(--color-mist)">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="inq-name" className={labelClass}>Full Name *</label>
          <input
            id="inq-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name ?? ''}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="inq-phone" className={labelClass}>Phone *</label>
          <input
            id="inq-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 00000 00000"
            value={form.phone ?? ''}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="inq-email" className={labelClass}>Email</label>
        <input
          id="inq-email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={form.email ?? ''}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Shoot type */}
      <div>
        <label htmlFor="inq-type" className={labelClass}>Type of Shoot *</label>
        <select
          id="inq-type"
          required
          value={form.shootType ?? ''}
          onChange={(e) => update('shootType', e.target.value)}
          className={cn(inputClass, 'appearance-none cursor-pointer')}
        >
          <option value="" disabled>Select shoot type</option>
          {SHOOT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="inq-date" className={labelClass}>Preferred Date</label>
        <input
          id="inq-date"
          type="date"
          value={form.preferredDate ?? ''}
          onChange={(e) => update('preferredDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inq-message" className={labelClass}>Anything else?</label>
        <textarea
          id="inq-message"
          rows={3}
          placeholder="Spaces you're interested in, team size, special requirements…"
          value={form.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {status === 'error' && (
        <p className="text-body-sm text-red-500">
          Something went wrong. Please try WhatsApp instead.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
