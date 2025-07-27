"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChefHat,
  Package,
  ShoppingCart,
  Star,
  Plus,
  Edit,
  Eye,
  DollarSign,
  Upload,
  MapPin,
  Trash2,
  AlertTriangle,
  X,
  Save,
} from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  unit: string
  stock: number
  rating: number
  reviews: number
  image: string
  description: string
  isActive: boolean
  origin?: string
  expiryDays?: number
  minOrderQuantity?: number
  createdDate: string
}

interface ProductFormData {
  name: string
  category: string
  price: string
  unit: string
  stock: string
  description: string
  origin: string
  expiryDays: string
  minOrderQuantity: string
  image: string
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState<number | null>(null)
  const [showViewProduct, setShowViewProduct] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Tomatoes",
      category: "Vegetables",
      price: 2.5,
      unit: "kg",
      stock: 500,
      rating: 4.8,
      reviews: 23,
      image: "/placeholder.svg?height=100&width=100&text=Tomatoes",
      description: "Fresh, organic tomatoes perfect for street food preparation",
      isActive: true,
      origin: "California Farms",
      expiryDays: 7,
      minOrderQuantity: 5,
      createdDate: "2024-01-01",
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
      image: "/placeholder.svg?height=100&width=100&text=Onions",
      description: "High-quality yellow onions, perfect for cooking",
      isActive: true,
      origin: "Local Farms",
      expiryDays: 14,
      minOrderQuantity: 10,
      createdDate: "2024-01-02",
    },
    {
      id: 3,
      name: "Bell Peppers Mix",
      category: "Vegetables",
      price: 4.2,
      unit: "kg",
      stock: 150,
      rating: 4.7,
      reviews: 12,
      image: "/placeholder.svg?height=100&width=100&text=Peppers",
      description: "Colorful mix of red, yellow, and green bell peppers",
      isActive: true,
      origin: "Greenhouse Grown",
      expiryDays: 10,
      minOrderQuantity: 3,
      createdDate: "2024-01-03",
    },
  ])

  const [productForm, setProductForm] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    unit: "",
    stock: "",
    description: "",
    origin: "",
    expiryDays: "",
    minOrderQuantity: "",
    image: "",
  })

  // Mock data with enhanced business information
  const businessInfo = {
    name: "Fresh Farm Supplies Co.",
    owner: "John Smith",
    location: "California, USA",
    established: "2018",
    rating: 4.8,
    totalReviews: 156,
    totalOrders: 650,
  }

  const stats = {
    totalProducts: products.filter((p) => p.isActive).length,
    totalOrders: 156,
    totalRevenue: 12450,
    averageRating: 4.7,
  }

  const recentOrders = [
    {
      id: "ORD-001",
      buyer: "Street Tacos Co.",
      buyerBusiness: "Maria's Taco Stand",
      product: "Premium Tomatoes",
      quantity: "50 kg",
      amount: 125,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      buyer: "Burger Express",
      buyerBusiness: "Mike's Burger Joint",
      product: "Fresh Onions",
      quantity: "25 kg",
      amount: 75,
      status: "completed",
      date: "2024-01-14",
    },
  ]

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Grains",
    "Spices",
    "Oils",
    "Beverages",
    "Frozen",
    "Other",
  ]

  const units = ["kg", "liter", "piece", "dozen", "pack", "box", "bag"]

  // Form handlers
  const handleFormChange = (field: keyof ProductFormData, value: string) => {
    setProductForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setProductForm({
      name: "",
      category: "",
      price: "",
      unit: "",
      stock: "",
      description: "",
      origin: "",
      expiryDays: "",
      minOrderQuantity: "",
      image: "",
    })
  }

  const validateForm = (): boolean => {
    const required = ["name", "category", "price", "unit", "stock", "description"]
    return required.every((field) => productForm[field as keyof ProductFormData].trim() !== "")
  }

  // Product management functions
  const handleAddProduct = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields!")
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: Number.parseFloat(productForm.price),
      unit: productForm.unit,
      stock: Number.parseInt(productForm.stock),
      description: productForm.description,
      origin: productForm.origin || "Not specified",
      expiryDays: productForm.expiryDays ? Number.parseInt(productForm.expiryDays) : undefined,
      minOrderQuantity: productForm.minOrderQuantity ? Number.parseInt(productForm.minOrderQuantity) : 1,
      rating: 0,
      reviews: 0,
      image: productForm.image || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(productForm.name)}`,
      isActive: true,
      createdDate: new Date().toISOString().split("T")[0],
    }

    setProducts([...products, newProduct])
    setShowAddProduct(false)
    resetForm()
    alert(`Product "${newProduct.name}" added successfully!`)
  }

  const handleEditProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setProductForm({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        unit: product.unit,
        stock: product.stock.toString(),
        description: product.description,
        origin: product.origin || "",
        expiryDays: product.expiryDays?.toString() || "",
        minOrderQuantity: product.minOrderQuantity?.toString() || "1",
        image: product.image,
      })
      setShowEditProduct(productId)
    }
  }

  const handleUpdateProduct = () => {
    if (!validateForm() || !showEditProduct) {
      alert("Please fill in all required fields!")
      return
    }

    setProducts(
      products.map((product) =>
        product.id === showEditProduct
          ? {
              ...product,
              name: productForm.name,
              category: productForm.category,
              price: Number.parseFloat(productForm.price),
              unit: productForm.unit,
              stock: Number.parseInt(productForm.stock),
              description: productForm.description,
              origin: productForm.origin || "Not specified",
              expiryDays: productForm.expiryDays ? Number.parseInt(productForm.expiryDays) : undefined,
              minOrderQuantity: productForm.minOrderQuantity ? Number.parseInt(productForm.minOrderQuantity) : 1,
              image: productForm.image || product.image,
            }
          : product,
      ),
    )

    setShowEditProduct(null)
    resetForm()
    alert("Product updated successfully!")
  }

  const handleViewProduct = (productId: number) => {
    setShowViewProduct(productId)
  }

  const handleDeleteProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    setProducts(products.filter((product) => product.id !== productId))
    setShowDeleteConfirm(null)
    alert(`Product "${product?.name}" deleted successfully!`)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProductForm((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Other management functions
  const handleViewOrderDetails = (orderId: string) => {
    alert(`Viewing details for order: ${orderId}`)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    alert(`Updating order ${orderId} status to: ${newStatus}`)
  }

  const handleUpdateProfile = () => {
    alert("Opening profile update form...")
  }

  const handleViewAnalytics = () => {
    alert("Opening analytics dashboard...")
  }

  const handleViewAllOrders = () => {
    setActiveTab("orders")
  }

  const handleViewAllReviews = () => {
    setActiveTab("reviews")
  }

  const getProductToView = () => {
    return products.find((p) => p.id === showViewProduct)
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
              <Badge variant="secondary">Seller Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{businessInfo.name}</p>
                <p className="text-xs text-gray-500">Welcome back, {businessInfo.owner}!</p>
              </div>
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
        {/* Business Info Header */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{businessInfo.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{businessInfo.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-gray-600">
                    {businessInfo.rating} ({businessInfo.totalReviews} reviews)
                  </span>
                </div>
                <Badge variant="outline">Est. {businessInfo.established}</Badge>
                {businessInfo.totalOrders >= 500 && (
                  <Badge variant="default" className="bg-blue-500">
                    ✓ Verified Supplier
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={handleUpdateProfile}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Business Profile
            </Button>
          </div>
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

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          {["overview", "products", "orders", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md capitalize transition-colors ${
                activeTab === tab ? "bg-white shadow-sm" : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
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
                        <p className="font-medium">{order.buyerBusiness}</p>
                        <p className="text-sm text-gray-600">by {order.buyer}</p>
                        <p className="text-sm text-gray-600">
                          {order.product} - {order.quantity}
                        </p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.amount}</p>
                        <Badge variant={order.status === "completed" ? "default" : "outline"}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllOrders}>
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your business efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => setShowAddProduct(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleViewAllOrders}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleViewAllReviews}
                >
                  <Star className="mr-2 h-4 w-4" />
                  View Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleViewAnalytics}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleUpdateProfile}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update Business Info
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "products" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Raw Materials</CardTitle>
                <CardDescription>Manage your inventory and product listings</CardDescription>
              </div>
              <Button onClick={() => setShowAddProduct(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.isActive)
                  .map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">
                              ${product.price}/{product.unit}
                            </span>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <Badge variant="secondary">
                              {product.stock} {product.unit} in stock
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="ml-1">
                                {product.rating > 0 ? `${product.rating} (${product.reviews})` : "No reviews"}
                              </span>
                            </div>
                          </div>

                          {product.origin && <p className="text-xs text-gray-500">Origin: {product.origin}</p>}

                          {product.minOrderQuantity && (
                            <p className="text-xs text-gray-500">
                              Min. order: {product.minOrderQuantity} {product.unit}
                            </p>
                          )}

                          <p className="text-xs text-gray-400">Added: {product.createdDate}</p>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={() => setShowDeleteConfirm(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "orders" && (
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
                        <Badge variant={order.status === "completed" ? "default" : "outline"}>{order.status}</Badge>
                      </div>
                      <p className="text-gray-900 font-medium">{order.buyerBusiness}</p>
                      <p className="text-gray-600">Contact: {order.buyer}</p>
                      <p className="text-sm text-gray-500">
                        {order.product} - {order.quantity}
                      </p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-green-600">${order.amount}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" onClick={() => handleViewOrderDetails(order.id)}>
                          View Details
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                          >
                            Mark Shipped
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
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
                      <p className="text-sm text-blue-600">by Maria's Taco Stand</p>
                      <p className="text-xs text-gray-500">Contact: Street Tacos Co.</p>
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
                      src="/placeholder.svg?height=60&width=60&text=Review"
                      alt="Review photo"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <p className="text-sm text-gray-500">January 10, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Add New Raw Material</CardTitle>
                    <CardDescription>Add a new product to your {businessInfo.name} inventory</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddProduct(false)
                      resetForm()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        placeholder="e.g., Premium Tomatoes"
                        value={productForm.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => handleFormChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your raw material, its quality, origin, and best uses..."
                      rows={3}
                      value={productForm.description}
                      onChange={(e) => handleFormChange("description", e.target.value)}
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing & Stock</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Unit *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="2.50"
                        value={productForm.price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit *</Label>
                      <Select value={productForm.unit} onValueChange={(value) => handleFormChange("unit", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="500"
                        value={productForm.stock}
                        onChange={(e) => handleFormChange("stock", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin/Source</Label>
                      <Input
                        id="origin"
                        placeholder="e.g., California Farms"
                        value={productForm.origin}
                        onChange={(e) => handleFormChange("origin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDays">Shelf Life (Days)</Label>
                      <Input
                        id="expiryDays"
                        type="number"
                        placeholder="7"
                        value={productForm.expiryDays}
                        onChange={(e) => handleFormChange("expiryDays", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minOrderQuantity">Min. Order Quantity</Label>
                      <Input
                        id="minOrderQuantity"
                        type="number"
                        placeholder="1"
                        value={productForm.minOrderQuantity}
                        onChange={(e) => handleFormChange("minOrderQuantity", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Image</h3>
                  <div className="space-y-2">
                    <Label htmlFor="photos">Product Photo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {productForm.image ? (
                        <div className="space-y-4">
                          <img
                            src={productForm.image || "/placeholder.svg"}
                            alt="Product preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <Button variant="outline" onClick={() => handleFormChange("image", "")}>
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload a high-quality photo of your product</p>
                          <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                        </div>
                      )}
                      <Input id="photos" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      {!productForm.image && (
                        <Label htmlFor="photos">
                          <Button variant="outline" className="mt-2 cursor-pointer bg-transparent" asChild>
                            <span>Choose File</span>
                          </Button>
                        </Label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddProduct(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>
                    <Save className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Edit Product</CardTitle>
                    <CardDescription>Update product information</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowEditProduct(null)
                      resetForm()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Same form structure as Add Product */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editProductName">Product Name *</Label>
                      <Input
                        id="editProductName"
                        placeholder="e.g., Premium Tomatoes"
                        value={productForm.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editCategory">Category *</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => handleFormChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editDescription">Product Description *</Label>
                    <Textarea
                      id="editDescription"
                      placeholder="Describe your raw material, its quality, origin, and best uses..."
                      rows={3}
                      value={productForm.description}
                      onChange={(e) => handleFormChange("description", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing & Stock</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editPrice">Price per Unit *</Label>
                      <Input
                        id="editPrice"
                        type="number"
                        step="0.01"
                        placeholder="2.50"
                        value={productForm.price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editUnit">Unit *</Label>
                      <Select value={productForm.unit} onValueChange={(value) => handleFormChange("unit", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editStock">Stock Quantity *</Label>
                      <Input
                        id="editStock"
                        type="number"
                        placeholder="500"
                        value={productForm.stock}
                        onChange={(e) => handleFormChange("stock", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editOrigin">Origin/Source</Label>
                      <Input
                        id="editOrigin"
                        placeholder="e.g., California Farms"
                        value={productForm.origin}
                        onChange={(e) => handleFormChange("origin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editExpiryDays">Shelf Life (Days)</Label>
                      <Input
                        id="editExpiryDays"
                        type="number"
                        placeholder="7"
                        value={productForm.expiryDays}
                        onChange={(e) => handleFormChange("expiryDays", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editMinOrderQuantity">Min. Order Quantity</Label>
                      <Input
                        id="editMinOrderQuantity"
                        type="number"
                        placeholder="1"
                        value={productForm.minOrderQuantity}
                        onChange={(e) => handleFormChange("minOrderQuantity", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditProduct(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateProduct}>
                    <Save className="mr-2 h-4 w-4" />
                    Update Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Product Modal */}
        {showViewProduct && getProductToView() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Complete information about this product</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowViewProduct(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {(() => {
                  const product = getProductToView()!
                  return (
                    <>
                      {/* Product Image */}
                      <div className="text-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
                        />
                      </div>

                      {/* Basic Information */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge variant={product.isActive ? "default" : "secondary"}>
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Price</Label>
                            <p className="text-xl font-bold text-green-600">
                              ${product.price}/{product.unit}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Stock</Label>
                            <p className="text-lg font-semibold">
                              {product.stock} {product.unit}
                            </p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-500">Description</Label>
                          <p className="text-gray-700 mt-1">{product.description}</p>
                        </div>

                        {product.origin && (
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Origin/Source</Label>
                            <p className="text-gray-700 mt-1">{product.origin}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          {product.expiryDays && (
                            <div>
                              <Label className="text-sm font-medium text-gray-500">Shelf Life</Label>
                              <p className="text-gray-700 mt-1">{product.expiryDays} days</p>
                            </div>
                          )}
                          {product.minOrderQuantity && (
                            <div>
                              <Label className="text-sm font-medium text-gray-500">Min. Order</Label>
                              <p className="text-gray-700 mt-1">
                                {product.minOrderQuantity} {product.unit}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Rating</Label>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-gray-700">
                                {product.rating > 0
                                  ? `${product.rating} (${product.reviews} reviews)`
                                  : "No reviews yet"}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Added Date</Label>
                            <p className="text-gray-700 mt-1">{product.createdDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setShowViewProduct(null)}>
                          Close
                        </Button>
                        <Button
                          onClick={() => {
                            setShowViewProduct(null)
                            handleEditProduct(product.id)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </Button>
                      </div>
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-red-600">Delete Product</CardTitle>
                </div>
                <CardDescription>
                  Are you sure you want to delete "{products.find((p) => p.id === showDeleteConfirm)?.name}"? This
                  action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowDeleteConfirm(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleDeleteProduct(showDeleteConfirm)}>
                  Delete Product
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
