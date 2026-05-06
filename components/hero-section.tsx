export default function HeroSection() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-img.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Reclaim Hope Rwanda
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Empowering children, transforming lives, and building a brighter future through education and care.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 transition rounded-lg font-semibold"
            >
              Donate Now
            </a>

            <a
              href="#donate"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 transition rounded-lg font-semibold"
            >
              Sponsor a child
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}