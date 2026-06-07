import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  summary: string;
  date: string;
}

export default function ArticleCard({
  image,
  category,
  title,
  summary,
  date,
}: ArticleCardProps) {
  return (
    <article className="group bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-2">

      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-7">

        <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {category}
        </span>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {summary}
        </p>

        <div className="flex justify-between items-center">

          <span className="text-gray-500 text-sm">
            {date}
          </span>

          <Link
            href="#"
            className="text-yellow-600 font-semibold hover:text-yellow-700"
          >
            Read More →
          </Link>

        </div>

      </div>

    </article>
  );
}