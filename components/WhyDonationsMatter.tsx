'use client';

import { useEffect } from 'react';

export default function WhyDonationsMatter() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init();
    }
  }, []);

  const impacts = [
    {
      icon: '📚',
      title: 'Education Support',
      description: 'Quality education and school supplies for every child'
    },
    {
      icon: '🍽️',
      title: 'Daily Meals',
      description: 'Nutritious meals to fuel growing minds and bodies'
    },
    {
      icon: '🎒',
      title: 'School Supplies',
      description: 'Books, uniforms, and materials for academic success'
    },
    {
      icon: '🤝',
      title: 'Mentorship Programs',
      description: 'Guidance and support from caring mentors'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            Why Your Donation Matters
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Your generosity directly impacts the lives of underserved children in Rwanda,
            providing them with the tools and support they need to build brighter futures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 400}
            >
              <div className="text-4xl mb-4">{impact.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {impact.title}
              </h3>
              <p className="text-gray-600">
                {impact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}