'use client';

import { useState, useEffect } from 'react';

export default function DonationOptions() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init();
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            Choose Your Donation Type
          </h2>
          <p
            className="text-xl text-gray-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Whether you prefer a one-time gift or ongoing monthly support,
            every contribution makes a lasting difference.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div
          className="flex justify-center mb-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setDonationType('one-time')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                donationType === 'one-time'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              One-Time Donation
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                donationType === 'monthly'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly Donation
            </button>
          </div>
        </div>

        {/* Content based on selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`p-8 rounded-xl border-2 transition-all duration-300 ${
              donationType === 'one-time'
                ? 'border-yellow-600 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              One-Time Donation
            </h3>
            <p className="text-gray-600 mb-6">
              Make an immediate impact with a single contribution.
              Perfect for special occasions or when you want to give right now.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Immediate support for children in need</li>
              <li>✓ Flexible amounts</li>
              <li>✓ Tax-deductible receipt</li>
              <li>✓ Direct impact on programs</li>
            </ul>
          </div>

          <div
            className={`p-8 rounded-xl border-2 transition-all duration-300 ${
              donationType === 'monthly'
                ? 'border-yellow-600 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Monthly Donation
            </h3>
            <p className="text-gray-600 mb-6">
              Provide consistent, reliable support that helps us plan
              and sustain long-term programs for children.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Predictable funding for programs</li>
              <li>✓ Cancel anytime</li>
              <li>✓ Greater collective impact</li>
              <li>✓ Preferred by 70% of NGOs</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            {donationType === 'monthly'
              ? "Monthly donors help us maintain stability and plan for the future."
              : "One-time donors provide immediate relief and support for urgent needs."
            }
          </p>
          <a
            href="#suggested-amounts"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block"
          >
            Choose Amount
          </a>
        </div>
      </div>
    </section>
  );
}