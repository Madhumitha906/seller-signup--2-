"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ChefHat,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  Eye,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Filter,
} from "lucide-react"

interface Product {
  id: number
  name: string
  supplier: string
  businessName: string
  price: number
  unit: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  category: string
  description: string
  location: string
  totalOrders: number
}

interface Business {
  id: number
  name: string
  owner: string
  location: string
  rating: number
  reviews: number
  totalOrders: number
  established: string
  description: string
  image: string
  products: Product[]
}

interface CartItem extends Product {
  quantity: number
}

interface SearchResult {
  type: "business" | "product"
  data: Business | Product
}

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("browse")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [showBusinessProducts, setShowBusinessProducts] = useState(false)

  // Enhanced mock data with businesses and verification status
  const businesses: Business[] = [
    {
      id: 1,
      name: "Fresh Farm Supplies Co.",
      owner: "John Smith",
      location: "California, USA",
      rating: 4.8,
      reviews: 156,
      totalOrders: 650,
      established: "2018",
      description: "Premium organic vegetables and fresh produce supplier",
      image: "/placeholder.svg?height=100&width=100&text=Farm",
      products: [],
    },
    {
      id: 2,
      name: "Valley Produce Co.",
      owner: "Maria Garcia",
      location: "Texas, USA",
      rating: 4.6,
      reviews: 89,
      totalOrders: 420,
      established: "2019",
      description: "Quality vegetables and seasonal produce",
      image: "/placeholder.svg?height=100&width=100&text=Valley",
      products: [],
    },
    {
      id: 3,
      name: "Dairy Direct Ltd.",
      owner: "Roberto Italian",
      location: "New York, USA",
      rating: 4.9,
      reviews: 234,
      totalOrders: 780,
      established: "2016",
      description: "Premium dairy products and cheese supplier",
      image: "/placeholder.svg?height=100&width=100&text=Dairy",
      products: [],
    },
    {
      id: 4,
      name: "Protein Plus Meats",
      owner: "Ahmed Hassan",
      location: "Michigan, USA",
      rating: 4.7,
      reviews: 178,
      totalOrders: 520,
      established: "2017",
      description: "Fresh halal meat and poultry supplier",
      image: "/placeholder.svg?height=100&width=100&text=Meat",
      products: [],
    },
  ]

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Premium Tomatoes",
      supplier: "John Smith",
      businessName: "Fresh Farm Supplies Co.",
      price: 2.5,
      unit: "kg",
      rating: 4.8,
      reviews: 23,
      image: "/placeholder.svg?height=200&width=200&text=Tomatoes",
      inStock: true,
      category: "Vegetables",
      description: "Fresh, organic tomatoes perfect for street food preparation",
      location: "California, USA",
      totalOrders: 650,
    },
    {
      id: 2,
      name: "Fresh Onions",
      supplier: "Maria Garcia",
      businessName: "Valley Produce Co.",
      price: 1.8,
      unit: "kg",
      rating: 4.6,
      reviews: 18,
      image: "/placeholder.svg?height=200&width=200&text=Onions",
      inStock: true,
      category: "Vegetables",
      description: "High-quality yellow onions, perfect for cooking",
      location: "Texas, USA",
      totalOrders: 420,
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      supplier: "Roberto Italian",
      businessName: "Dairy Direct Ltd.",
      price: 12.0,
      unit: "kg",
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg?height=200&width=200&text=Cheese",
      inStock: true,
      category: "Dairy",
      description: "Premium mozzarella cheese for pizzas and sandwiches",
      location: "New York, USA",
      totalOrders: 780,
    },
    {
      id: 4,
      name: "Chicken Breast",
      supplier: "Ahmed Hassan",
      businessName: "Protein Plus Meats",
      price: 8.5,
      unit: "kg",
      rating: 4.7,
      reviews: 45,
      image: "/placeholder.svg?height=200&width=200&text=Chicken",
      inStock: true,
      category: "Meat",
      description: "Fresh, halal chicken breast for grilling and cooking",
      location: "Michigan, USA",
      totalOrders: 520,
    },
    {
      id: 5,
      name: "Basmati Rice",
      supplier: "Raj Patel",
      businessName: "Grain Masters Inc.",
      price: 3.2,
      unit: "kg",
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=200&text=Rice",
      inStock: true,
      category: "Grains",
      description: "Premium basmati rice, perfect for biryanis and rice dishes",
      location: "California, USA",
      totalOrders: 340,
    },
    {
      id: 6,
      name: "Extra Virgin Olive Oil",
      supplier: "Elena Rossi",
      businessName: "Mediterranean Oils Co.",
      price: 15.0,
      unit: "liter",
      rating: 4.8,
      reviews: 29,
      image: "/placeholder.svg?height=200&width=200&text=Oil",
      inStock: false,
      category: "Oils",
      description: "Premium extra virgin olive oil from Mediterranean olives",
      location: "California, USA",
      totalOrders: 280,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      supplier: "Fresh Farm Supplies Co.",
      items: ["Premium Tomatoes (10kg)", "Fresh Lettuce (5kg)"],
      total: 45.5,
      status: "delivered",
      date: "2024-01-10",
      canReview: true,
    },
    {
      id: "ORD-002",
      supplier: "Dairy Direct Ltd.",
      items: ["Mozzarella Cheese (2kg)"],
      total: 24.0,
      status: "shipped",
      date: "2024-01-12",
      canReview: false,
    },
  ]

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowBusinessProducts(false)
      setSelectedBusiness(null)
      return
    }

    const query = searchQuery.toLowerCase()
    const results: SearchResult[] = []

    // Search businesses first
    businesses.forEach((business) => {
      if (
        business.name.toLowerCase().includes(query) ||
        business.owner.toLowerCase().includes(query) ||
        business.description.toLowerCase().includes(query)
      ) {
        results.push({ type: "business", data: business })
      }
    })

    // Then search products
    featuredProducts.forEach((product) => {
      if (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      ) {
        results.push({ type: "product", data: product })
      }
    })

    setSearchResults(results)
  }, [searchQuery])

  // Cart functionality
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Wishlist functionality
  const addToWishlist = (product: Product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  // Business selection
  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business)
    setShowBusinessProducts(true)
    // Get products for this business
    const businessProducts = featuredProducts.filter((product) => product.businessName === business.name)
    setSelectedBusiness({ ...business, products: businessProducts })
  }

  const handleBackToBrowse = () => {
    setShowBusinessProducts(false)
    setSelectedBusiness(null)
    setSearchQuery("")
    setSearchResults([])
  }

  // Order functionality
  const reorderItems = (orderId: string) => {
    alert(`Reordering items from order ${orderId}`)
  }

  const viewOrderDetails = (orderId: string) => {
    alert(`Viewing details for order ${orderId}`)
  }

  // Checkout functionality
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }
    alert(`Proceeding to checkout with ${getCartItemsCount()} items totaling $${getCartTotal().toFixed(2)}`)
  }

  const continueShopping = () => {
    setActiveTab("browse")
  }

  // Verification badge component
  const VerificationBadge = ({ totalOrders }: { totalOrders: number }) => {
    if (totalOrders >= 500) {
      return (
        <CheckCircle className="h-4 w-4 text-blue-500 ml-1" title={`Verified supplier with ${totalOrders}+ orders`} />
      )
    }
    return null
  }

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
              <button onClick={() => setActiveTab("cart")} className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </button>
              <span className="text-sm text-gray-600">Welcome, Sarah!</span>
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Logout
                </Button>
              </Link>
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
              placeholder="Search for raw materials, suppliers, or business names..."
              className="pl-10 pr-4 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSearchResults([])
                  setShowBusinessProducts(false)
                  setSelectedBusiness(null)
                }}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && !showBusinessProducts && (
            <div className="max-w-2xl mx-auto mt-4 bg-white rounded-lg shadow-lg border">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Search Results for "{searchQuery}"</h3>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      {result.type === "business" ? (
                        <button
                          onClick={() => handleBusinessClick(result.data as Business)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img
                                src={(result.data as Business).image || "/placeholder.svg"}
                                alt={(result.data as Business).name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <div className="flex items-center">
                                  <h4 className="font-medium text-gray-900">{(result.data as Business).name}</h4>
                                  <VerificationBadge totalOrders={(result.data as Business).totalOrders} />
                                </div>
                                <p className="text-sm text-gray-600">{(result.data as Business).description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-500">
                                    {(result.data as Business).rating} • {(result.data as Business).location}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">Business</Badge>
                          </div>
                        </button>
                      ) : (
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={(result.data as Product).image || "/placeholder.svg"}
                              alt={(result.data as Product).name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{(result.data as Product).name}</h4>
                                <Badge variant="secondary">Product</Badge>
                              </div>
                              <div className="flex items-center">
                                <p className="text-sm text-blue-600 font-medium">
                                  {(result.data as Product).businessName}
                                </p>
                                <VerificationBadge totalOrders={(result.data as Product).totalOrders} />
                              </div>
                              <p className="text-sm text-green-600 font-bold">
                                ${(result.data as Product).price}/{(result.data as Product).unit}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: "browse", label: "Browse Products" },
            { key: "orders", label: "My Orders" },
            { key: "wishlist", label: `Wishlist (${wishlistItems.length})` },
            { key: "cart", label: `Cart (${getCartItemsCount()})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.key ? "bg-white shadow-sm" : "text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "browse" && (
          <div>
            {showBusinessProducts && selectedBusiness ? (
              // Business Products View
              <div>
                <div className="mb-6">
                  <Button variant="outline" onClick={handleBackToBrowse} className="mb-4 bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Browse
                  </Button>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={selectedBusiness.image || "/placeholder.svg"}
                        alt={selectedBusiness.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h2 className="text-2xl font-bold text-gray-900">{selectedBusiness.name}</h2>
                          <VerificationBadge totalOrders={selectedBusiness.totalOrders} />
                        </div>
                        <p className="text-gray-600 mb-2">{selectedBusiness.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm">
                              {selectedBusiness.rating} ({selectedBusiness.reviews} reviews)
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{selectedBusiness.location}</span>
                          <Badge variant="outline">Est. {selectedBusiness.established}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Raw Materials from {selectedBusiness.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts
                    .filter((product) => product.businessName === selectedBusiness.name)
                    .map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                            className="absolute top-2 left-2 bg-white/90 hover:bg-white"
                            onClick={() => addToWishlist(product)}
                          >
                            <Heart
                              className={`h-4 w-4 ${wishlistItems.find((item) => item.id === product.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Viewing details for ${product.name}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ) : (
              // Regular Browse View
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery ? `Search Results for "${searchQuery}"` : "Raw Materials from Verified Suppliers"}
                    </h2>
                    <p className="text-gray-600 mt-2">Discover quality ingredients from trusted business partners</p>
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                          className="absolute top-2 left-2 bg-white/90 hover:bg-white"
                          onClick={() => addToWishlist(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${wishlistItems.find((item) => item.id === product.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600">{product.businessName}</p>
                              <VerificationBadge totalOrders={product.totalOrders} />
                            </div>
                            <p className="text-xs text-gray-500">
                              by {product.supplier} • {product.location}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert(`Viewing details for ${product.name}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Track your recent purchases and leave reviews</CardDescription>
              </div>
              <Button variant="outline" onClick={() => alert("Viewing all orders")}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <div className="flex items-center">
                          <p className="text-blue-600 font-medium">{order.supplier}</p>
                          <VerificationBadge totalOrders={650} />
                        </div>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${order.total}</p>
                        <Badge variant={order.status === "delivered" ? "default" : "outline"}>{order.status}</Badge>
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
                      <Button variant="outline" size="sm" onClick={() => viewOrderDetails(order.id)}>
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => reorderItems(order.id)}>
                        Reorder
                      </Button>
                      {order.canReview && (
                        <Link href={`/review/${order.id}`}>
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
        )}

        {activeTab === "wishlist" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </div>
              {wishlistItems.length > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your wishlist is empty</p>
                  <p className="text-sm text-gray-500">Add items you like to your wishlist</p>
                  <Button className="mt-4" onClick={() => setActiveTab("browse")}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 bg-white/90"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center">
                          <p className="text-sm text-blue-600 font-medium">{item.businessName}</p>
                          <VerificationBadge totalOrders={item.totalOrders} />
                        </div>
                        <p className="text-xs text-gray-500">{item.supplier}</p>
                        <p className="text-lg font-bold text-green-600 mt-2">
                          ${item.price}/{item.unit}
                        </p>
                        <Button
                          className="w-full mt-3"
                          size="sm"
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "cart" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>Review your items before checkout</CardDescription>
              </div>
              {cartItems.length > 0 && (
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                  <p className="text-sm text-gray-500">Add some items to get started</p>
                  <Button className="mt-4" onClick={() => setActiveTab("browse")}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex items-center">
                            <p className="text-sm text-blue-600 font-medium">{item.businessName}</p>
                            <VerificationBadge totalOrders={item.totalOrders} />
                          </div>
                          <p className="text-xs text-gray-500">{item.supplier}</p>
                          <p className="text-green-600 font-medium">
                            ${item.price}/{item.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 border rounded min-w-[3rem] text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right min-w-[4rem]">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Cart Summary */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Total Items:</span>
                      <span>{getCartItemsCount()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-bold">Total Amount:</span>
                      <span className="font-bold text-green-600">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={continueShopping}>
                        Continue Shopping
                      </Button>
                      <Button size="lg" className="flex-1" onClick={proceedToCheckout}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
