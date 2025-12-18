import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, ShoppingCart, Star, Zap } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin"></div>
              <div className="absolute inset-1 bg-white dark:bg-slate-900 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const companyCounts = products.reduce((acc, product) => {
    acc[product.company] = (acc[product.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalProducts = products.length;
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  const inStockCount = products.filter(p => p.availability.toLowerCase() === 'yes').length;
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
  const bestSellers = products.sort((a, b) => b.discount - a.discount).slice(0, 4);
  const topRated = products.sort((a, b) => b.rating - a.rating).slice(0, 4);

  const StatCard = ({ title, value, icon: Icon, gradient }: { title: string; value: string; icon: any; gradient: string }) => (
    <Card className={`shadow-card border-0 bg-gradient-to-br ${gradient} hover:shadow-card-hover transition-all duration-300 transform hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-white/90">{title}</CardTitle>
        <Icon className="h-5 w-5 text-white/80" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
          🎯 Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Welcome to ShopMatrix - Your Ultimate E-Commerce Hub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts.toString()}
          icon={Package}
          gradient="from-purple-500 to-indigo-600"
        />
        <StatCard
          title="Avg Price"
          value={`₹${(avgPrice / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          gradient="from-pink-500 to-rose-600"
        />
        <StatCard
          title="In Stock"
          value={inStockCount.toString()}
          icon={ShoppingCart}
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Avg Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Categories & Companies */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Categories */}
        <Card className="shadow-card border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-card-hover transition-all">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-bold">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Companies */}
        <Card className="shadow-card border-2 border-purple-100 dark:border-purple-900/50 hover:shadow-card-hover transition-all">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Brands
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {Object.entries(companyCounts).map(([company, count]) => (
                <div key={company} className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{company}</span>
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-bold">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products */}
      <div className="space-y-6">
        {/* Best Sellers */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            🔥 Hot Deals & Best Discounts
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            ⭐ Top Rated Products
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <Card className="gradient-vibrant text-white shadow-card border-0">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-white/80 text-sm font-semibold mb-2">MARKETPLACE STATS</p>
              <p className="text-3xl font-bold">{totalProducts}</p>
              <p className="text-white/70 text-sm">Amazing Products</p>
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold mb-2">INVENTORY</p>
              <p className="text-3xl font-bold">{((inStockCount / totalProducts) * 100).toFixed(0)}%</p>
              <p className="text-white/70 text-sm">In Stock Available</p>
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold mb-2">QUALITY</p>
              <p className="text-3xl font-bold">{avgRating.toFixed(1)}★</p>
              <p className="text-white/70 text-sm">Average Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
