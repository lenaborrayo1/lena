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

const initialListings: Property[] = [];

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Property[]>(() => {
    const saved = localStorage.getItem("listings");
    // Only use initial listings if localStorage key doesn't exist (null)
    // If it exists (even as empty array "[]"), respect that state
    if (saved === null) {
      return initialListings;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return initialListings;
    }
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
