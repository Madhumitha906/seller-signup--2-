"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Package, ShoppingCart, Star, TrendingUp, Users, Plus, Edit, Eye, DollarSign } from "lucide-react"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalProducts: 24,
    totalOrders: 156,
    totalRevenue: 12450,
    averageRating: 4.7,
  }

  const recentOrders = [
    {
      id: "ORD-001",
      buyer: "Street Tacos Co.",
      product: "Premium Tomatoes",
      quantity: "50 kg",
      amount: 125,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      buyer: "Burger Express",
      product: "Fresh Onions",
      quantity: "25 kg",
      amount: 75,
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      buyer: "Pizza Corner",
      product: "Mozzarella Cheese",
      quantity: "10 kg",
      amount: 200,
      status: "shipped",
      date: "2024-01-13",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Premium Tomatoes",
      category: "Vegetables",
      price: 2.5,
      unit: "kg",
      stock: 500,
      rating: 4.8,
      reviews: 23,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Fresh Onions",
      category: "Vegetables",
      price: 1.8,
      unit: "kg",
      stock: 300,
      rating: 4.6,
      reviews: 18,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      category: "Dairy",
      price: 12.0,
      unit: "kg",
      stock: 50,
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <span className="text-2xl font-bold text-gray-900">StreetSource</span>
              </Link>
              <Badge variant="secondary">Seller Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, John!</span>
              <Button variant="outline" size="sm">
                <Link href="/auth/signin">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your products, orders, and business performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.buyer}</p>
                          <p className="text-sm text-gray-600">
                            {order.product} - {order.quantity}
                          </p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.amount}</p>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your business efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/seller/products/add">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                  </Link>
                  <Link href="/seller/orders">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View All Orders
                    </Button>
                  </Link>
                  <Link href="/seller/analytics">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </Link>
                  <Link href="/seller/profile">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your raw materials inventory</CardDescription>
                </div>
                <Link href="/seller/products/add">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-green-600">
                            ${product.price}/{product.unit}
                          </span>
                          <Badge variant="outline">
                            {product.stock} {product.unit} left
                          </Badge>
                        </div>
                        <div className="flex items-center mb-4">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage and track your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{order.buyer}</p>
                        <p className="text-sm text-gray-500">
                          {order.product} - {order.quantity}
                        </p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-green-600">${order.amount}</p>
                        <Button size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what customers are saying about your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Premium Tomatoes</h3>
                        <p className="text-sm text-gray-600">by Street Tacos Co.</p>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Excellent quality tomatoes! Fresh, juicy, and perfect for our tacos. Will definitely order again.
                      Fast delivery and great packaging."
                    </p>
                    <div className="flex items-center space-x-4">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Review photo"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-500">January 10, 2024</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Fresh Onions</h3>
                        <p className="text-sm text-gray-600">by Burger Express</p>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "Good quality onions, though some were a bit smaller than expected. Overall satisfied with the
                      purchase and the competitive pricing."
                    </p>
                    <p className="text-sm text-gray-500">January 8, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
