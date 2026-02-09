import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Building2,
  Eye,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useListings, Property } from "@/contexts/ListingsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PropertyForm from "@/components/PropertyForm";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const { listings, loading, addListing, updateListing, deleteListing } = useListings();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (authLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddProperty = async (data: Omit<Property, "id" | "createdAt">) => {
    await addListing(data);
    setIsFormOpen(false);
    toast({
      title: "Property Added",
      description: "The property has been successfully added.",
    });
  };

  const handleEditProperty = async (data: Omit<Property, "id" | "createdAt">) => {
    if (editingProperty) {
      await updateListing(editingProperty.id, data);
      setEditingProperty(null);
      toast({
        title: "Property Updated",
        description: "The property has been successfully updated.",
      });
    }
  };

  const handleDeleteProperty = async () => {
    if (deleteId) {
      await deleteListing(deleteId);
      setDeleteId(null);
      toast({
        title: "Property Deleted",
        description: "The property has been successfully deleted.",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <main className="min-h-screen pt-16 md:pt-20 bg-cream">
      {/* Dashboard Header */}
      <div className="bg-navy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-300">Manage your property listings</p>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                className="bg-white/20 border border-white text-white hover:bg-white hover:text-navy"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button
                className="bg-white/20 border border-white text-white hover:bg-white hover:text-navy"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">{listings.length}</div>
                <div className="text-sm text-muted-foreground">Total Listings</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">
                  {listings.filter((l) => l.status === "For Sale").length}
                </div>
                <div className="text-sm text-muted-foreground">For Sale</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">
                  {listings.filter((l) => l.status === "For Rent").length}
                </div>
                <div className="text-sm text-muted-foreground">For Rent</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">
                  {listings.filter((l) => l.featured).length}
                </div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-navy">Property Listings</h2>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gold hover:bg-gold-dark text-navy font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                          />
                          <div>
                            <div className="font-medium text-navy line-clamp-1">
                              {property.title}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {property.city}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatPrice(property.price)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {property.propertyType}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.status === "For Sale"
                              ? "default"
                              : property.status === "For Rent"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            property.status === "For Sale"
                              ? "bg-green-100 text-green-800"
                              : property.status === "For Rent"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {property.featured ? (
                          <Badge className="bg-gold/20 text-gold-dark">Yes</Badge>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Link to={`/property/${property.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingProperty(property)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => setDeleteId(property.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {listings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No properties yet</p>
                        <Button
                          variant="link"
                          onClick={() => setIsFormOpen(true)}
                          className="text-gold"
                        >
                          Add your first property
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Add Property Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <PropertyForm
            onSubmit={handleAddProperty}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog
        open={!!editingProperty}
        onOpenChange={(open) => !open && setEditingProperty(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <PropertyForm
            initialData={editingProperty}
            onSubmit={handleEditProperty}
            onCancel={() => setEditingProperty(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Dashboard;
