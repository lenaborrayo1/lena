import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  loading: boolean;
  addListing: (property: Omit<Property, "id" | "createdAt">) => Promise<void>;
  updateListing: (id: string, property: Partial<Property>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  getListingById: (id: string) => Property | undefined;
  refreshListings: () => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

// Map DB row to Property
const mapRow = (row: any): Property => ({
  id: row.id,
  title: row.title,
  price: Number(row.price),
  address: row.address,
  city: row.city,
  bedrooms: row.bedrooms,
  bathrooms: row.bathrooms,
  sqft: row.sqft,
  propertyType: row.property_type as Property["propertyType"],
  description: row.description,
  images: row.images || [],
  featured: row.featured,
  status: row.status as Property["status"],
  createdAt: row.created_at,
});

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setListings(data.map(mapRow));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const addListing = async (property: Omit<Property, "id" | "createdAt">) => {
    const { error } = await (supabase as any).from("listings").insert({
      title: property.title,
      price: property.price,
      address: property.address,
      city: property.city,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      property_type: property.propertyType,
      description: property.description,
      images: property.images,
      featured: property.featured,
      status: property.status,
    });
    if (!error) await fetchListings();
  };

  const updateListing = async (id: string, updates: Partial<Property>) => {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.address !== undefined) dbUpdates.address = updates.address;
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.bedrooms !== undefined) dbUpdates.bedrooms = updates.bedrooms;
    if (updates.bathrooms !== undefined) dbUpdates.bathrooms = updates.bathrooms;
    if (updates.sqft !== undefined) dbUpdates.sqft = updates.sqft;
    if (updates.propertyType !== undefined) dbUpdates.property_type = updates.propertyType;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
    if (updates.status !== undefined) dbUpdates.status = updates.status;

    const { error } = await (supabase as any).from("listings").update(dbUpdates).eq("id", id);
    if (!error) await fetchListings();
  };

  const deleteListing = async (id: string) => {
    const { error } = await (supabase as any).from("listings").delete().eq("id", id);
    if (!error) await fetchListings();
  };

  const getListingById = (id: string) => {
    return listings.find((listing) => listing.id === id);
  };

  return (
    <ListingsContext.Provider
      value={{ listings, loading, addListing, updateListing, deleteListing, getListingById, refreshListings: fetchListings }}
    >
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
