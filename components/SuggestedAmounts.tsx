'use client';

import { useState, useEffect } from 'react';

interface AmountOption {
  amount: number | 'custom';
  title: string;
  impact: string;
  popular?: boolean;
}

export default function SuggestedAmounts() {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom' | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init();
    }
  }, []);

  const amounts: AmountOption[] = [
    {
      amount: 10,
      title: '$10',
      impact: 'School supplies for one day'
    },
    {
      amount: 25,
      title: '$25',
      impact: 'School supplies for a child for one week'
    },
    {
      amount: 50,
      title: '$50',
      impact: 'Monthly nutrition support for one child'
    },
    {
      amount: 100,
      title: '$100',
      impact: 'Educational support package for one child'
    },
    {
      amount: 'custom',
      title: 'Custom Amount',
      impact: 'Your choice, your impact'
    }
  ];

  return (
    <section id="suggested-amounts" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            Choose Your Impact
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Select an amount that feels right for you. Every dollar directly supports
            children in Rwanda and helps build brighter futures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {amounts.map((option, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedAmount === option.amount
                  ? 'ring-2 ring-orange-600 bg-orange-50'
                  : ''
              }`}
              onClick={() => setSelectedAmount(option.amount)}
              data-aos="fade-up"
              data-aos-delay={index * 100 + 400}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {option.impact}
                </p>

                {option.amount === 'custom' && selectedAmount === 'custom' && (
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    min="1"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#donation-form"
            className={`inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg ${
              selectedAmount
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!selectedAmount) e.preventDefault();
            }}
          >
            Continue to Donate
          </a>
          {!selectedAmount && (
            <p className="text-gray-500 mt-2">Please select an amount to continue</p>
          )}
        </div>
      </div>
    </section>
  );
}