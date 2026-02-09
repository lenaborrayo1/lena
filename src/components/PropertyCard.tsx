import { Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "@/contexts/ListingsContext";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="block card-luxury group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-gold text-navy font-semibold">
            {property.status}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="bg-navy text-white">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-navy font-bold text-lg">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mr-1 text-gold" />
          <span className="text-sm">
            {property.address}, {property.city}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
