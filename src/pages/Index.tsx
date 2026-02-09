import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Award, Users, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListings } from "@/contexts/ListingsContext";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import lenaImage from "@/assets/lena-borrayo.png";

const Index = () => {
  const { listings, loading } = useListings();
  const featuredListings = listings.filter((l) => l.featured).slice(0, 3);

  const stats = [
    { icon: HomeIcon, value: "150+", label: "Properties Sold" },
    { icon: Users, value: "200+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Years Experience" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 md:pt-20 bg-cream overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - Added relative and z-10 to bring buttons to front */}
            <div className="order-2 lg:order-1 text-center lg:text-left animate-fade-in relative z-10">
              <span className="inline-block px-4 py-2 bg-gold/20 text-gold-dark rounded-full text-sm font-semibold mb-4 font-body">
                Florida Real Estate Industry
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-4">
                Your Trusted FLORIDA{" "}
                <span className="text-gold">Real Estate Expert</span>
              </h1>
              <p className="font-script text-3xl md:text-4xl text-gold mb-6">
                Realteando por la Vida con Lena
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 font-body">
                Your expert in <strong>Florida Real Estate Industry</strong>. Helping you Buy, Sell, and Rent with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold text-lg px-8 font-body cursor-pointer relative z-20">
                  <Link to="/properties">
                    View Listings
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-navy hover:bg-navy-light text-white font-semibold text-lg px-8 font-body cursor-pointer relative z-20"
                >
                  <a href="#contact-form">
                    Contact Lena
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative z-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full blur-3xl"></div>
                <img
                  src={lenaImage}
                  alt="Lena Borrayo - Florida Real Estate Agent"
                  className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-cover rounded-full border-4 border-gold shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave - Added pointer-events-none so clicks pass through it */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 mx-auto text-gold mb-2" />
                <div className="text-2xl md:text-4xl font-bold text-navy">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold-dark rounded-full text-sm font-semibold mb-4 font-body">
              Featured Properties
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Excellent Properties in Florida
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Discover handpicked excellent properties in South Florida's most desirable locations.
            </p>
          </div>

          {featuredListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body">No active listings at the moment.</p>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light text-white font-semibold">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={lenaImage}
                alt="Lena Borrayo"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-gold/20 text-gold-dark rounded-full text-sm font-semibold mb-4 font-body">
                About Me
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                Your Partner in Finding the Perfect Home
              </h2>
              <p className="text-muted-foreground mb-6 font-body">
                With over 15 years of experience in Florida real estate, I specialize in excellent properties across South Florida. My commitment is to provide personalized service that exceeds your expectations.
              </p>
              <p className="text-muted-foreground mb-8 font-body">
                Whether you're buying your dream home, selling a property, or looking for the perfect rental, I'm here to guide you every step of the way with expertise and dedication.
              </p>
              <Button asChild className="bg-gold hover:bg-gold-dark text-navy font-semibold font-body">
                <a href="tel:+17863440357">
                  <Phone className="w-4 h-4 mr-2" />
                  1-786-344-0357
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 font-body">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-300 mb-10 font-body">
              Contact me today for a personalized consultation. I'm here to help you navigate the Florida real estate market.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <a
                href="tel:+17863440357"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone className="w-8 h-8 text-gold mb-3" />
                <span className="font-semibold mb-1 font-body">Phone</span>
                <span className="text-gray-300 text-sm font-body">1-786-344-0357</span>
              </a>
              <a
                href="mailto:lenaborrayo@gmail.com"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Mail className="w-8 h-8 text-gold mb-3" />
                <span className="font-semibold mb-1 font-body">Email</span>
                <span className="text-gray-300 text-sm font-body">lenaborrayo@gmail.com</span>
              </a>
              <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl">
                <MapPin className="w-8 h-8 text-gold mb-3" />
                <span className="font-semibold mb-1 font-body">Location</span>
                <span className="text-gray-300 text-sm font-body">Miami, Florida</span>
              </div>
            </div>

            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold text-lg px-10 font-body">
              <a href="https://wa.me/17863440357" target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
