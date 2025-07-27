"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

        {/* Account Type Selector */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setAccountType("buyer")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              accountType === "buyer" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
          >
            <User className="h-4 w-4" />
            Buyer
          </button>
          <button
            onClick={() => setAccountType("seller")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              accountType === "seller" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Store className="h-4 w-4" />
            Seller
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{accountType === "buyer" ? "Buyer" : "Seller"} Sign In</CardTitle>
            <CardDescription>Access your {accountType === "buyer" ? "buyer" : "seller"} dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="john@example.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="password" type="password" className="pl-10" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Link href={accountType === "buyer" ? "/buyer-dashboard" : "/seller-dashboard"}>
              <Button type="submit" className="w-full">
                Sign In as {accountType === "buyer" ? "Buyer" : "Seller"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-orange-600 hover:underline font-medium">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}
