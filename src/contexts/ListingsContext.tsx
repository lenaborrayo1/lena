import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: "Villa" | "Condo" | "Apartment" | "House" | "Townhouse";
  description: string;
  images: string[];
  featured: boolean;
  status: "For Sale" | "For Rent" | "Sold";
  createdAt: string;
}

interface ListingsContextType {
  listings: Property[];
  addListing: (property: Omit<Property, "id" | "createdAt">) => void;
  updateListing: (id: string, property: Partial<Property>) => void;
  deleteListing: (id: string) => void;
  getListingById: (id: string) => Property | undefined;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const initialListings: Property[] = [
  {
    id: "1",
    title: "Luxury Oceanfront Villa",
    price: 4500000,
    address: "1234 Ocean Drive",
    city: "Miami Beach",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6500,
    propertyType: "Villa",
    description: "Stunning oceanfront villa with panoramic views of the Atlantic Ocean. This exceptional property features floor-to-ceiling windows, a private dock, infinity pool, and direct beach access. The gourmet kitchen is equipped with top-of-the-line appliances, and the master suite offers a spa-like bathroom with ocean views.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    featured: true,
    status: "For Sale",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Modern Downtown Penthouse",
    price: 2800000,
    address: "500 Brickell Avenue #PH1",
    city: "Miami",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    propertyType: "Condo",
    description: "Breathtaking penthouse in the heart of Brickell. Features wraparound terraces with 360-degree views of the city and bay. Smart home technology throughout, private elevator access, and resort-style amenities including rooftop pool and fitness center.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
    ],
    featured: true,
    status: "For Sale",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Coral Gables Estate",
    price: 3200000,
    address: "789 Alhambra Circle",
    city: "Coral Gables",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 5800,
    propertyType: "House",
    description: "Mediterranean-style estate in prestigious Coral Gables. Lush tropical landscaping surrounds this elegant home featuring a chef's kitchen, wine cellar, home theater, and resort-style pool with cabana.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200"
    ],
    featured: true,
    status: "For Sale",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Sunny Isles Beach Condo",
    price: 1500000,
    address: "18555 Collins Avenue #1208",
    city: "Sunny Isles Beach",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2100,
    propertyType: "Condo",
    description: "Luxurious beachfront condo with stunning ocean views. Features include marble floors, European kitchen, and spacious balconies. Building amenities include beach service, spa, and concierge.",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200"
    ],
    featured: false,
    status: "For Rent",
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Key Biscayne Waterfront",
    price: 5200000,
    address: "455 Grand Bay Drive",
    city: "Key Biscayne",
    bedrooms: 5,
    bathrooms: 5,
    sqft: 5200,
    propertyType: "Villa",
    description: "Exclusive waterfront property on Key Biscayne with private dock and boat lift. Open floor plan with seamless indoor-outdoor living, infinity pool, and lush gardens.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"
    ],
    featured: false,
    status: "For Sale",
    createdAt: new Date().toISOString()
  }
];

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Property[]>(() => {
    const saved = localStorage.getItem("listings");
    return saved ? JSON.parse(saved) : initialListings;
  });

  // Sync state to localStorage whenever listings change
  useEffect(() => {
    localStorage.setItem("listings", JSON.stringify(listings));
  }, [listings]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "listings" && e.newValue) {
        setListings(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addListing = (property: Omit<Property, "id" | "createdAt">) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setListings(prev => [newProperty, ...prev]);
  };

  const updateListing = (id: string, updates: Partial<Property>) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
  };

  const getListingById = (id: string) => {
    return listings.find(listing => listing.id === id);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListing, deleteListing, getListingById }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
};
