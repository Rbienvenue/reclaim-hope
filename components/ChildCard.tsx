import Image from "next/image";
import Link from "next/link";

type ChildCardProps = {
    id: string;
    name: string;
    age: number;
    dream: string;
    support: string;
    image: string;
};

export default function ChildCard({
    id,
    name,
    age,
    dream,
    support,
    image,
}: ChildCardProps) {

    return (
        <div className="group bg-white rounded-[32px] overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition duration-500">

            {/* IMAGE */}
            <div className="relative h-[340px] overflow-hidden">

                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                />

            </div>

            {/* CONTENT */}
            <div className="p-8">

                {/* NAME */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {name}, {age}
                </h3>

                {/* DREAM */}
                <p className="text-orange-500 font-semibold text-lg mb-4">
                    Dreams of becoming {dream}
                </p>

                {/* SUPPORT */}
                <p className="text-gray-600 leading-relaxed mb-8">
                    Needs support with {support}.
                </p>

                {/* BUTTON */}
                <Link
                    href={`/sponsor/${id}`}
                    className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 transition duration-300 text-white py-4 rounded-full font-semibold text-lg"
                >
                    Sponsor {name}
                </Link>

            </div>

        </div>
    );
}