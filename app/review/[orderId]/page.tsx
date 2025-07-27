"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Star, Upload, Camera, Video, X, Play } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  type: string
  url: string
  file: File
}

export default function ReviewPage({ params }: { params: { orderId: string } }) {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [reviews, setReviews] = useState<Record<string, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({})

  // Mock order data
  const orderData = {
    id: params.orderId,
    supplier: "Fresh Farm Supplies",
    date: "2024-01-10",
    items: [
      {
        id: 1,
        name: "Premium Tomatoes",
        quantity: "10kg",
        price: 25.0,
        image: "/placeholder.svg?height=100&width=100&text=Tomatoes",
      },
      {
        id: 2,
        name: "Fresh Lettuce",
        quantity: "5kg",
        price: 20.5,
        image: "/placeholder.svg?height=100&width=100&text=Lettuce",
      },
    ],
  }

  const handleRatingChange = (itemId: string | number, rating: number) => {
    setRatings((prev) => ({ ...prev, [itemId]: rating }))
  }

  const handleReviewChange = (itemId: string | number, review: string) => {
    setReviews((prev) => ({ ...prev, [itemId]: review }))
  }

  const handleFileUpload = (itemId: string | number, files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file,
    }))

    setUploadedFiles((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), ...newFiles],
    }))
  }

  const removeFile = (itemId: string | number, fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || []).filter((file) => file.id !== fileId),
    }))
  }

  const StarRating = ({
    itemId,
    rating,
    onRatingChange,
  }: { itemId: string | number; rating: number; onRatingChange: (id: string | number, rating: number) => void }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(itemId, star)}
            className={`p-1 transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating ? `${rating} star${rating !== 1 ? "s" : ""}` : "Click to rate"}
        </span>
      </div>
    )
  }

  const FilePreview = ({ file, onRemove }: { file: UploadedFile; onRemove: () => void }) => {
    const isImage = file.type.startsWith("image/")
    const isVideo = file.type.startsWith("video/")

    return (
      <div className="relative group">
        {isImage && (
          <div className="relative">
            <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-20 h-20 object-cover rounded-lg" />
            <button
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {isVideo && (
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-gray-600" />
            </div>
            <button
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-xs text-gray-500 mt-1 truncate w-20">{file.name}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/buyer-dashboard" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">StreetSource</span>
            </Link>
            <Badge variant="secondary">Review Order</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leave Your Review</h1>
          <p className="text-gray-600">Share your experience with {orderData.supplier}</p>
          <div className="mt-2">
            <Badge variant="outline">Order {orderData.id}</Badge>
            <span className="text-sm text-gray-500 ml-2">Delivered on {orderData.date}</span>
          </div>
        </div>

        <div className="space-y-6">
          {orderData.items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>
                      Quantity: {item.quantity} • Price: ${item.price}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating */}
                <div>
                  <Label className="text-base font-medium">Rate this product *</Label>
                  <div className="mt-2">
                    <StarRating itemId={item.id} rating={ratings[item.id] || 0} onRatingChange={handleRatingChange} />
                  </div>
                </div>

                {/* Written Review */}
                <div>
                  <Label htmlFor={`review-${item.id}`} className="text-base font-medium">
                    Your Review *
                  </Label>
                  <Textarea
                    id={`review-${item.id}`}
                    placeholder="Share your experience with this product. How was the quality, freshness, packaging, etc.?"
                    rows={4}
                    className="mt-2"
                    value={reviews[item.id] || ""}
                    onChange={(e) => handleReviewChange(item.id, e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum 20 characters required</p>
                </div>

                {/* Photo/Video Upload */}
                <div>
                  <Label className="text-base font-medium">Add Photos or Videos *</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Help other buyers by showing the actual product you received
                  </p>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <div className="flex justify-center space-x-4 mb-4">
                        <Camera className="h-8 w-8 text-gray-400" />
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-2">Drag and drop your files here, or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, MP4, MOV (Max 10MB each)</p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        id={`file-upload-${item.id}`}
                        onChange={(e) => handleFileUpload(item.id, e.target.files)}
                      />
                      <Label htmlFor={`file-upload-${item.id}`}>
                        <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Files
                          </span>
                        </Button>
                      </Label>
                    </div>
                  </div>

                  {/* File Previews */}
                  {uploadedFiles[item.id] && uploadedFiles[item.id].length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Uploaded files ({uploadedFiles[item.id].length}):
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {uploadedFiles[item.id].map((file) => (
                          <FilePreview key={file.id} file={file} onRemove={() => removeFile(item.id, file.id)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium">Would you buy this again?</Label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input type="radio" name={`repurchase-${item.id}`} value="yes" className="mr-2" />
                        Yes
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" name={`repurchase-${item.id}`} value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Recommend to others?</Label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input type="radio" name={`recommend-${item.id}`} value="yes" className="mr-2" />
                        Yes
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" name={`recommend-${item.id}`} value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Overall Experience</CardTitle>
            <CardDescription>Rate your overall experience with this supplier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Overall Rating</Label>
              <div className="mt-2">
                <StarRating itemId="overall" rating={ratings.overall || 0} onRatingChange={handleRatingChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="overall-review" className="text-base font-medium">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="overall-review"
                placeholder="Any additional feedback about delivery, packaging, customer service, etc."
                rows={3}
                className="mt-2"
              />
            </div>
            <div className="flex justify-between items-center pt-4">
              <Link href="/buyer-dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                size="lg"
                className="px-8"
                onClick={() => {
                  // Here you would typically submit the review data
                  alert("Review submitted successfully!")
                }}
              >
                Submit Reviews
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
