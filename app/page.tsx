import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Store, ShoppingCart, Star, Users, Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">StreetSource</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trusted Raw Materials for <span className="text-orange-600">Street Food</span> Excellence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with verified suppliers and discover premium raw materials for your street food business. Quality
            ingredients, competitive prices, trusted reviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?type=buyer">
              <Button size="lg" className="w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Buying
              </Button>
            </Link>
            <Link href="/signup?type=seller">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Store className="mr-2 h-5 w-5" />
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose StreetSource?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>Verified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All suppliers are verified and materials are quality-checked with detailed reviews and ratings.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Trusted Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join thousands of street food vendors and suppliers building successful businesses together.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Package className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple tools to manage inventory, orders, and customer relationships all in one place.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">StreetSource</span>
          </div>
          <p className="text-gray-400">Connecting street food vendors with trusted raw material suppliers.</p>
          <p className="text-gray-400 mt-4">&copy; 2024 StreetSource. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
