import { useState, useEffect } from "react";
import { Property } from "@/contexts/ListingsContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Loader2, Link } from "lucide-react";

interface PropertyFormData {
  title: string;
  price: string;
  address: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  propertyType: "Villa" | "Condo" | "Apartment" | "House" | "Townhouse";
  description: string;
  images: string[];
  featured: boolean;
  status: "For Sale" | "For Rent" | "Sold";
}

interface PropertyFormProps {
  initialData?: Property | null;
  onSubmit: (data: Omit<Property, "id" | "createdAt">) => void;
  onCancel: () => void;
}

const PropertyForm = ({ initialData, onSubmit, onCancel }: PropertyFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    price: "",
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "House",
    description: "",
    images: [],
    featured: false,
    status: "For Sale",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price.toString(),
        address: initialData.address,
        city: initialData.city,
        bedrooms: initialData.bedrooms.toString(),
        bathrooms: initialData.bathrooms.toString(),
        sqft: initialData.sqft.toString(),
        propertyType: initialData.propertyType,
        description: initialData.description,
        images: initialData.images,
        featured: initialData.featured,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof PropertyFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("property-images")
        .upload(fileName, file);

      if (!error) {
        const { data: urlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
    setUploading(false);
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const propertyData: Omit<Property, "id" | "createdAt"> = {
      title: formData.title,
      price: parseFloat(formData.price) || 0,
      address: formData.address,
      city: formData.city,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      sqft: parseInt(formData.sqft) || 0,
      propertyType: formData.propertyType,
      description: formData.description,
      images: formData.images.length > 0 ? formData.images : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"],
      featured: formData.featured,
      status: formData.status,
    };

    onSubmit(propertyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., Luxury Oceanfront Villa"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="e.g., 1500000"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="e.g., 1234 Ocean Drive"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="e.g., Miami Beach"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleChange("bedrooms", e.target.value)}
            placeholder="e.g., 4"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleChange("bathrooms", e.target.value)}
            placeholder="e.g., 3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sqft">Sq Ft *</Label>
          <Input
            id="sqft"
            type="number"
            value={formData.sqft}
            onChange={(e) => handleChange("sqft", e.target.value)}
            placeholder="e.g., 2500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Property Type *</Label>
          <Select
            value={formData.propertyType}
            onValueChange={(value) => handleChange("propertyType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the property..."
          rows={4}
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Property Images</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                <img src={img} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="flex flex-col items-center cursor-pointer">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-muted-foreground mb-2 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            )}
            <span className="text-sm text-muted-foreground">
              {uploading ? "Uploading..." : "Click to upload images"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <div className="flex items-center gap-2 mt-4 w-full max-w-md mx-auto">
            <Link className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste image URL here..."
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (imageUrl.trim()) {
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, imageUrl.trim()],
                  }));
                  setImageUrl("");
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div>
          <Label htmlFor="featured" className="font-semibold">Featured Property</Label>
          <p className="text-sm text-muted-foreground">Display this property on the homepage</p>
        </div>
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => handleChange("featured", checked)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gold hover:bg-gold-dark text-navy font-semibold" disabled={uploading}>
          {initialData ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
