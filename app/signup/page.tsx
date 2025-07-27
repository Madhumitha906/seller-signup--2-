"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, Store, User, Mail, Lock, Phone, MapPin } from "lucide-react"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const defaultType = searchParams?.get("type") || "buyer"
  const [accountType, setAccountType] = useState(defaultType)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">StreetSource</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Join our marketplace and start your journey</p>
        </div>

        {/* Account Type Selector */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setAccountType("buyer")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              accountType === "buyer" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
          >
            <User className="h-4 w-4" />
            Buyer Account
          </button>
          <button
            onClick={() => setAccountType("seller")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              accountType === "seller" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Store className="h-4 w-4" />
            Seller Account
          </button>
        </div>

        {accountType === "buyer" ? (
          <Card>
            <CardHeader>
              <CardTitle>Buyer Registration</CardTitle>
              <CardDescription>Create your buyer account to start purchasing raw materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyerFirstName">First Name</Label>
                  <Input id="buyerFirstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerLastName">Last Name</Label>
                  <Input id="buyerLastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerEmail">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="buyerEmail" type="email" placeholder="john@example.com" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerPhone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="buyerPhone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="buyerPassword" type="password" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerConfirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="buyerConfirmPassword" type="password" className="pl-10" required />
                </div>
              </div>
              <Link href="/buyer-dashboard">
                <Button type="submit" className="w-full">
                  Create Buyer Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Seller Registration</CardTitle>
              <CardDescription>Create your seller account to start selling raw materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sellerFirstName">First Name</Label>
                  <Input id="sellerFirstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerLastName">Last Name</Label>
                  <Input id="sellerLastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerEmail">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="sellerEmail" type="email" placeholder="john@example.com" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerPhone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="sellerPhone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerBusinessName">Business Name</Label>
                <Input id="sellerBusinessName" placeholder="Your Supply Business" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Describe your business and the raw materials you supply..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerAddress">Business Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="sellerAddress" placeholder="123 Main Street, City, State" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="sellerPassword" type="password" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerConfirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="sellerConfirmPassword" type="password" className="pl-10" required />
                </div>
              </div>
              <Link href="/seller-dashboard">
                <Button type="submit" className="w-full">
                  Create Seller Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-orange-600 hover:underline font-medium">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
