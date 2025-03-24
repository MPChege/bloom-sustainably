
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  date: string;
}

interface ProductSales {
  name: string;
  value: number;
  quantity: number;
}

const SalesTracker = () => {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [productSales, setProductSales] = useState<ProductSales[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { t, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    // Load sales data from localStorage
    const loadSales = () => {
      const storedSales = localStorage.getItem("sales");
      const salesData = storedSales ? JSON.parse(storedSales) : [];
      setSales(salesData);
      
      // Calculate total revenue and items
      let revenue = 0;
      let items = 0;
      salesData.forEach((sale: SaleRecord) => {
        revenue += sale.price * sale.quantity;
        items += sale.quantity;
      });
      setTotalRevenue(revenue);
      setTotalItems(items);
      
      // Aggregate product sales for the charts
      const productMap = new Map<number, ProductSales>();
      
      salesData.forEach((sale: SaleRecord) => {
        if (productMap.has(sale.productId)) {
          const product = productMap.get(sale.productId)!;
          product.value += sale.price * sale.quantity;
          product.quantity += sale.quantity;
        } else {
          productMap.set(sale.productId, {
            name: sale.productName,
            value: sale.price * sale.quantity,
            quantity: sale.quantity
          });
        }
      });
      
      setProductSales(Array.from(productMap.values()));
    };
    
    loadSales();
  }, []);

  // Demo data for testing - uncomment to see charts with data
  /*
  useEffect(() => {
    // Demo data for testing
    const demoSales = [
      { id: 1, productId: 1, productName: "Red Naomi Roses", quantity: 5, price: 29.99, date: "2023-05-15" },
      { id: 2, productId: 2, productName: "White O'Hara Roses", quantity: 3, price: 27.99, date: "2023-05-16" },
      { id: 3, productId: 1, productName: "Red Naomi Roses", quantity: 2, price: 29.99, date: "2023-05-17" },
      { id: 4, productId: 3, productName: "Pink Avalanche Roses", quantity: 4, price: 26.99, date: "2023-05-18" },
      { id: 5, productId: 4, productName: "Yellow Finesse Roses", quantity: 6, price: 28.99, date: "2023-05-19" },
    ];
    
    localStorage.setItem("sales", JSON.stringify(demoSales));
    setSales(demoSales);
    
    let revenue = 0;
    let items = 0;
    demoSales.forEach(sale => {
      revenue += sale.price * sale.quantity;
      items += sale.quantity;
    });
    setTotalRevenue(revenue);
    setTotalItems(items);
    
    const productMap = new Map();
    demoSales.forEach(sale => {
      if (productMap.has(sale.productId)) {
        const product = productMap.get(sale.productId);
        product.value += sale.price * sale.quantity;
        product.quantity += sale.quantity;
      } else {
        productMap.set(sale.productId, {
          name: sale.productName,
          value: sale.price * sale.quantity,
          quantity: sale.quantity
        });
      }
    });
    
    setProductSales(Array.from(productMap.values()));
  }, []);
  */

  return (
    <div className={`min-h-screen pt-16 ${isRTL ? "rtl" : ""}`}>
      <HeroSection 
        title={isRTL ? "تتبع المبيعات" : "Sales Tracking"}
        subtitle={isRTL 
          ? "تحليل أداء المبيعات ومراقبة المخزون" 
          : "Analyze sales performance and monitor inventory"}
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="small"
      />
      
      <section className="page-section bg-white">
        <div className="container-tight">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatPrice(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Lifetime sales
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground">Items Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Total quantity
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {sales.length > 0 
                    ? formatPrice(totalRevenue / sales.length) 
                    : formatPrice(0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Per transaction
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Product</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] pt-0">
                {productSales.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {productSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [formatPrice(Number(value)), "Revenue"]} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No sales data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quantity Sold by Product</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] pt-0">
                {productSales.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productSales}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#8884d8" name="Units Sold" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No sales data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sales Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent sales</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.length > 0 ? (
                    sales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.date}</TableCell>
                        <TableCell>{sale.productName}</TableCell>
                        <TableCell className="text-right">{sale.quantity}</TableCell>
                        <TableCell className="text-right">{formatPrice(sale.price)}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(sale.price * sale.quantity)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No sales records available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SalesTracker;
