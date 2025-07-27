"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Store, User, Mail, Lock, Phone, MapPin } from "lucide-react"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "buyer"
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

        <Tabs value={accountType} onValueChange={setAccountType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Buyer Account
            </TabsTrigger>
            <TabsTrigger value="seller" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Seller Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buyer">
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
                  <Label htmlFor="businessName">Street Food Business Name</Label>
                  <Input id="businessName" placeholder="Your Street Food Business" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food-truck">Food Truck</SelectItem>
                      <SelectItem value="street-stall">Street Stall</SelectItem>
                      <SelectItem value="restaurant">Small Restaurant</SelectItem>
                      <SelectItem value="catering">Catering Service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="buyerPassword" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="buyerTerms" />
                  <Label htmlFor="buyerTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Buyer Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle>Seller Registration</CardTitle>
                <CardDescription>Create your seller account to start selling raw materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
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
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Business Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="sellerBusinessName">Business Name</Label>
                    <Input id="sellerBusinessName" placeholder="Your Supply Business" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellerBusinessType">Business Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wholesaler">Wholesaler</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                        <SelectItem value="farmer">Farmer/Producer</SelectItem>
                        <SelectItem value="importer">Importer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Describe your business and the raw materials you supply..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Business Address
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="sellerAddress">Street Address</Label>
                    <Input id="sellerAddress" placeholder="123 Main Street" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sellerCity">City</Label>
                      <Input id="sellerCity" placeholder="New York" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellerState">State</Label>
                      <Input id="sellerState" placeholder="NY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellerZip">ZIP Code</Label>
                      <Input id="sellerZip" placeholder="10001" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="sellerPassword" type="password" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sellerTerms" />
                    <Label htmlFor="sellerTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-orange-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sellerAgreement" />
                    <Label htmlFor="sellerAgreement" className="text-sm">
                      I agree to the{" "}
                      <Link href="/seller-agreement" className="text-orange-600 hover:underline">
                        Seller Agreement
                      </Link>{" "}
                      and commission structure
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Seller Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-orange-600 hover:underline font-medium">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
