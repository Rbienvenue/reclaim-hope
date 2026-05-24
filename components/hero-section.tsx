import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Optimized Hero Image */}
      <Image
        src="/hero-img.jpg"
        alt="Children in Rwanda receiving education and support from Reclaim Hope"
        fill
        className="object-cover animate-hero-zoom"
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl">

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up">
            Reclaim Hope Rwanda
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg md:text-xl text-slate-200 animate-fade-up-delay-2">
            Empowering children, transforming lives, and building a brighter future through education and care.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            <a
              href="/donate"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 transition rounded-lg font-semibold"
            >
              Donate Now
            </a>

            <a
              href="/sponsor"
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