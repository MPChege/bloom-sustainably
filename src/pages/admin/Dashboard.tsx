
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, LineChart, FlowerIcon, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Admin Dashboard"
        subtitle="Manage your flower inventory and track sales"
        backgroundImage="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="small"
      />
      
      <section className="page-section bg-cream/30">
        <div className="container-tight max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-medium">Admin Controls</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Admin Account</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Add Product Card */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FlowerIcon className="h-5 w-5 text-primary" />
                  Product Management
                </CardTitle>
                <CardDescription>Add new flowers to your inventory</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground">
                  Create new product listings with images, descriptions, and pricing.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/admin/add-product" className="w-full">
                  <Button className="w-full gap-2">
                    <Plus size={16} />
                    Add New Product
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Sales Tracker Card */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Sales Analytics
                </CardTitle>
                <CardDescription>Track and analyze sales performance</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground">
                  View detailed sales reports and analyze customer purchasing patterns.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/admin/sales-tracker" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    View Sales Data
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* View Products Card */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Inventory
                </CardTitle>
                <CardDescription>Browse and manage existing products</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground">
                  View, edit, and delete products from your inventory.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/products" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    View All Products
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
