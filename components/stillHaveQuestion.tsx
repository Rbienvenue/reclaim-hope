export default function StillHaveQuestion() {
    return (
        <>
            <div
                className="text-center mt-12 bg-orange-50 border border-orange-200 rounded-xl p-8"
                data-aos="fade-up"
                data-aos-delay="600"
            >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Still Have Questions?
                </h3>
                <p className="text-gray-600 mb-6">
                    We're here to help! Contact our team and we'll answer any questions
                    you have about donating or supporting our mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/contact"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                        Contact Us
                    </a>
                    <a
                        href="tel:+1234567890"
                        className="bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                        Call Now
                    </a>
                </div>
            </div>
        </>
    )
}