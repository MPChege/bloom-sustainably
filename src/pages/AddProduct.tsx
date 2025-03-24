
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/context/LanguageContext";

// Form validation schema
const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  category: z.string().min(2, { message: "Category is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
});

// Type for our form
type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  // Get the existing products from localStorage or initialize an empty array
  const getExistingProducts = () => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  };

  // Form definition
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      image: "",
      category: "",
      description: "",
      price: 0,
    },
  });

  // Handle form submission
  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Get existing products
      const existingProducts = getExistingProducts();
      
      // Create new product with an ID
      const newProduct = {
        ...data,
        id: Date.now(), // Use timestamp as a simple ID
      };
      
      // Add to existing products
      const updatedProducts = [...existingProducts, newProduct];
      
      // Save to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      
      toast.success("Product added successfully!");
      form.reset();
      
      // Navigate to products page after a short delay
      setTimeout(() => {
        navigate("/products");
      }, 1500);
      
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isRTL ? "rtl" : ""}`}>
      <HeroSection 
        title={isRTL ? "إضافة منتج جديد" : "Add New Product"}
        subtitle={isRTL 
          ? "أضف منتجات الزهور الجديدة إلى متجرك" 
          : "Add new flower products to your store"}
        backgroundImage="https://images.unsplash.com/photo-1558650214-95fb3eb89ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="small"
      />
      
      <section className="page-section bg-cream/30">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-medium mb-6">Product Information</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Red Naomi Roses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Premium Roses" {...field} />
                      </FormControl>
                      <FormDescription>
                        Select from existing categories or create a new one
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/flower-image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the product image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your product in detail..." 
                          {...field} 
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          placeholder="29.99" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/products")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Adding..." : "Add Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
