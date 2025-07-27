"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Search, ShoppingCart, Heart, Star, Filter, Plus, Minus, Eye } from "lucide-react"

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])

  // Mock data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Tomatoes",
      supplier: "Fresh Farm Supplies",
      price: 2.5,
      unit: "kg",
      rating: 4.8,
      reviews: 23,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Fresh Onions",
      supplier: "Valley Produce Co.",
      price: 1.8,
      unit: "kg",
      rating: 4.6,
      reviews: 18,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      category: "Vegetables",
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      supplier: "Dairy Direct",
      price: 12.0,
      unit: "kg",
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      category: "Dairy",
    },
    {
      id: 4,
      name: "Chicken Breast",
      supplier: "Protein Plus",
      price: 8.5,
      unit: "kg",
      rating: 4.7,
      reviews: 45,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      category: "Meat",
    },
    {
      id: 5,
      name: "Basmati Rice",
      supplier: "Grain Masters",
      price: 3.2,
      unit: "kg",
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      category: "Grains",
    },
    {
      id: 6,
      name: "Olive Oil",
      supplier: "Mediterranean Oils",
      price: 15.0,
      unit: "liter",
      rating: 4.8,
      reviews: 29,
      image: "/placeholder.svg?height=200&width=200",
      inStock: false,
      category: "Oils",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      supplier: "Fresh Farm Supplies",
      items: ["Premium Tomatoes (10kg)", "Fresh Lettuce (5kg)"],
      total: 45.5,
      status: "delivered",
      date: "2024-01-10",
      canReview: true,
    },
    {
      id: "ORD-002",
      supplier: "Dairy Direct",
      items: ["Mozzarella Cheese (5kg)"],
      total: 60.0,
      status: "shipped",
      date: "2024-01-12",
      canReview: false,
    },
  ]

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }])
  }

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  const filteredProducts = featuredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <Badge variant="secondary">Buyer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-600">Welcome, Sarah!</span>
              <Button variant="outline" size="sm">
                <Link href="/auth/signin">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search raw materials, suppliers, or categories..."
              className="pl-10 pr-4 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({wishlistItems.length})</TabsTrigger>
            <TabsTrigger value="cart">Cart ({cartItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Raw Materials"}
              </h2>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2" variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 left-2 bg-transparent"
                      onClick={() => addToWishlist(product)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}/{product.unit}
                      </span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1" disabled={!product.inStock} onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Track your recent purchases and leave reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-gray-600">{order.supplier}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">${order.total}</p>
                          <Badge
                            variant={
                              order.status === "delivered"
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
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                        <ul className="text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        {order.canReview && (
                          <Link href={`/buyer/review/${order.id}`}>
                            <Button size="sm">
                              <Star className="mr-2 h-4 w-4" />
                              Leave Review
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Your wishlist is empty</p>
                    <p className="text-sm text-gray-500">Add items you like to your wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.supplier}</p>
                          <p className="text-lg font-bold text-green-600 mt-2">
                            ${item.price}/{item.unit}
                          </p>
                          <Button className="w-full mt-3" size="sm">
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>Review your items before checkout</CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Add some items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.supplier}</p>
                            <p className="text-green-600 font-medium">
                              ${item.price}/{item.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 border rounded">{item.quantity}</span>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total: $45.50</span>
                        <Button size="lg">Proceed to Checkout</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
