import { Mail, Phone, MapPin, Camera, Users, Briefcase, Play } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@reclaimhope.rw",
    href: "mailto:info@reclaimhope.rw"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+250 788 123 456",
    href: "tel:+250788123456"
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Nyamirambo, Kigali, Rwanda",
    href: "#"
  },
  {
    icon: Camera,
    title: "Instagram",
    content: "@reclaimhope_rw",
    href: "https://instagram.com/reclaimhope_rw"
  },
  {
    icon: Users,
    title: "Facebook",
    content: "Reclaim Hope Rwanda",
    href: "https://facebook.com/reclaimhope"
  },
  {
    icon: Briefcase,
    title: "LinkedIn",
    content: "Reclaim Hope Rwanda",
    href: "https://linkedin.com/company/reclaimhope"
  },
  {
    icon: Play,
    title: "YouTube",
    content: "Reclaim Hope Rwanda",
    href: "https://youtube.com/@reclaimhope"
  }
];

export default function ContactInformation() {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const delayClass = index === 0 ? 'animate-stagger-reveal' :
                              index === 1 ? 'animate-stagger-reveal-delay-1' :
                              index === 2 ? 'animate-stagger-reveal-delay-2' :
                              'animate-stagger-reveal-delay-3';
            return (
              <a
                key={item.title}
                href={item.href}
                className={`bg-gray-50 hover:bg-yellow-50 transition-all duration-300 rounded-2xl p-6 text-center group ${delayClass}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 group-hover:bg-yellow-200 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.content}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}