import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useListings, Property } from "@/contexts/ListingsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageLightbox from "@/components/ImageLightbox";
import lenaImage from "@/assets/lena-borrayo.png";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListingById } = useListings();
  const property = getListingById(id || "");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!property) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Property Not Found</h1>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-20 bg-cream">
      {/* Back Button */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-navy hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Properties
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover cursor-pointer"
                  onClick={() => openLightbox(currentImageIndex)}
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-navy" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-navy" />
                    </button>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gold text-navy font-semibold">
                    {property.status}
                  </Badge>
                </div>
              </div>

              {/* Thumbnails - Below main image */}
              {property.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-gold"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              {/* Price & Title */}
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-bold text-gold">
                  {formatPrice(property.price)}
                </span>
                {property.status === "For Rent" && (
                  <span className="text-muted-foreground text-lg"> / month</span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-navy mt-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-muted-foreground mt-2">
                  <MapPin className="w-5 h-5 mr-1 text-gold" />
                  <span>
                    {property.address}, {property.city}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="text-center">
                  <Bed className="w-8 h-8 mx-auto text-gold mb-2" />
                  <div className="text-2xl font-bold text-navy">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-8 h-8 mx-auto text-gold mb-2" />
                  <div className="text-2xl font-bold text-navy">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-8 h-8 mx-auto text-gold mb-2" />
                  <div className="text-2xl font-bold text-navy">
                    {property.sqft.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Sq Ft</div>
                </div>
              </div>

              {/* Description */}
              <div className="py-6">
                <h2 className="text-xl font-semibold text-navy mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  {property.propertyType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Sidebar - Agent Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <img
                  src={lenaImage}
                  alt="Lena Borrayo"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gold"
                />
                <h3 className="text-xl font-bold text-navy">Lena Borrayo</h3>
                <p className="text-muted-foreground text-sm">Real Estate Agent</p>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href="tel:+17863440357"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gold hover:bg-gold-dark text-navy font-semibold rounded-lg transition-colors font-body"
                >
                  <Phone className="w-5 h-5" />
                  1-786-344-0357
                </a>
                <a
                  href="mailto:lenaborrayo@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
                <a
                  href="https://wa.me/17863440357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Interested in this property? Contact me for a viewing or more information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={property.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
};

export default PropertyDetails;
