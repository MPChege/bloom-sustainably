
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Type for sales data
interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  date: string;
}

// Helper to group by category
const groupByCategory = (products: any[], sales: SaleRecord[]) => {
  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  const categoryMap = sales.reduce((acc, sale) => {
    const product = productMap[sale.productId];
    if (product) {
      const category = product.category;
      acc[category] = (acc[category] || 0) + (sale.price * sale.quantity);
    }
    return acc;
  }, {});

  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};

// Helper to group by date
const groupByDate = (sales: SaleRecord[]) => {
  const dateMap = sales.reduce((acc, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + (sale.price * sale.quantity);
    return acc;
  }, {});

  return Object.entries(dateMap)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const AdminSalesTracker = () => {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [salesByDate, setSalesByDate] = useState<any[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [mostPopularProduct, setMostPopularProduct] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load sales data from localStorage
    const storedSales = localStorage.getItem("sales");
    const salesData = storedSales ? JSON.parse(storedSales) : [];
    setSales(salesData);

    // Load products data
    const storedProducts = localStorage.getItem("products");
    const productsData = storedProducts ? JSON.parse(storedProducts) : [];
    setProducts(productsData);

    // Calculate derived data
    const byDate = groupByDate(salesData);
    setSalesByDate(byDate);

    const byCategory = groupByCategory(productsData, salesData);
    setSalesByCategory(byCategory);

    // Calculate total revenue
    const revenue = salesData.reduce((total, sale) => total + (sale.price * sale.quantity), 0);
    setTotalRevenue(revenue);

    // Find most popular product
    const productSales = salesData.reduce((acc, sale) => {
      acc[sale.productId] = (acc[sale.productId] || 0) + sale.quantity;
      return acc;
    }, {});

    if (Object.keys(productSales).length > 0) {
      const mostPopularId = Object.entries(productSales)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0][0];
      
      const popular = productsData.find(p => p.id === parseInt(mostPopularId));
      setMostPopularProduct(popular ? popular.name : "");
    }
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Sales Analytics"
        subtitle="Track and analyze your flower sales performance"
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="small"
      />
      
      <section className="page-section bg-cream/30">
        <div className="container-tight max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-medium">Sales Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
                Back to Dashboard
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sales.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Most Popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mostPopularProduct || "No sales yet"}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sales by Date */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesByDate}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="amount" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {salesByCategory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No category data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Sales Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                {sales.length > 0 ? (
                  <div className="rounded border overflow-auto max-h-80">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left">Date</th>
                          <th className="p-2 text-left">Product</th>
                          <th className="p-2 text-right">Price</th>
                          <th className="p-2 text-right">Qty</th>
                          <th className="p-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.slice().reverse().slice(0, 10).map((sale) => (
                          <tr key={sale.id} className="border-t">
                            <td className="p-2">{sale.date}</td>
                            <td className="p-2">{sale.productName}</td>
                            <td className="p-2 text-right">${sale.price.toFixed(2)}</td>
                            <td className="p-2 text-right">{sale.quantity}</td>
                            <td className="p-2 text-right font-medium">
                              ${(sale.price * sale.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">No sales data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSalesTracker;
