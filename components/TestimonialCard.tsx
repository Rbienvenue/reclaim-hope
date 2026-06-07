import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  image,
}: TestimonialCardProps) {
  return (
    <div className="group bg-white rounded-[32px] p-8 shadow-md hover:shadow-xl transition duration-500 border border-gray-100">

      <Quote className="w-10 h-10 text-yellow-500 mb-6" />

      <p className="text-gray-600 text-lg leading-relaxed italic mb-8">
        "{quote}"
      </p>

      <div className="flex items-center gap-4">

        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={author}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-gray-900">
            {author}
          </h4>

          <p className="text-sm text-gray-500">
            {role}
          </p>
        </div>

      </div>

    </div>
  );
}