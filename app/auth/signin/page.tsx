"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Store, User, Mail, Lock } from "lucide-react"

export default function SignInPage() {
  const [accountType, setAccountType] = useState("buyer")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">StreetSource</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <Tabs value={accountType} onValueChange={setAccountType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Buyer
            </TabsTrigger>
            <TabsTrigger value="seller" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Seller
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buyer">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Sign In</CardTitle>
                <CardDescription>Access your buyer dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyerEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="buyerEmail" type="email" placeholder="john@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="buyerPassword" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Link href="/buyer/dashboard">
                  <Button type="submit" className="w-full">
                    Sign In as Buyer
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle>Seller Sign In</CardTitle>
                <CardDescription>Access your seller dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sellerEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="sellerEmail" type="email" placeholder="john@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="sellerPassword" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Link href="/seller/dashboard">
                  <Button type="submit" className="w-full">
                    Sign In as Seller
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-orange-600 hover:underline font-medium">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}
