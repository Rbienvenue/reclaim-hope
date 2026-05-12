'use client';

import { useEffect } from 'react';

export default function DonateFinalCTA() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init();
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Together, We Can Build Brighter Futures
          </h2>

          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Your donation today becomes hope tomorrow. Every child in Rwanda deserves
            the chance to dream, learn, and grow. Join us in creating lasting change.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="#donation-form"
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Donate Now
            </a>

            <a
              href="#impact"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105"
            >
              See Our Impact
            </a>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Children Supported</div>
            </div>

            <div data-aos="fade-up" data-aos-delay="400">
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-lg opacity-90">Communities Reached</div>
            </div>

            <div data-aos="fade-up" data-aos-delay="600">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Funds to Programs</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-75">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔒</span>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">📊</span>
              <span>100% Transparent</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">❤️</span>
              <span>Tax Deductible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce">
        ❤️
      </div>
      <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-pulse">
        🌟
      </div>
    </section>
  );
}