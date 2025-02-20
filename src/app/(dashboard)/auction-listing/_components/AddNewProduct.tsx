"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { BasicInfo } from "./product-form/basic-info"
import { ProductClassification } from "./product-form/product-classification"
import { Categories } from "./product-form/categories"
import { Pricing } from "./product-form/pricing"
import { InventoryDetails } from "./product-form/inventory-details"
import { AdditionalInfo } from "./product-form/additional-info"

import { type ProductFormValues, productSchema } from "./Product"
import ProductGallery from "./product-form/product-gallery"
import { useState } from "react"

export function AddNewProduct() {
  const [tags, setTags] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      productType: "CBD",
      stockStatus: "In Stock",
      purchasePrice: 0,
      sellingPrice: 0,
      discountPrice: 0,
      quantity: 0,
      coa: false,
      tags: [],
      images: [],
    },
  })

  async function onSubmit(data: ProductFormValues) {
    try {
      const formDataWithImagesAndTags = {
        ...data,
        tags,
        images: images.map((file) => file.name),
      }
      console.log("Form Data:", formDataWithImagesAndTags)

      // You can add your API call here
      // await addProduct(formDataWithImagesAndTags)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const handleUpdate = () => {
    const currentData = form.getValues()
    const currentDataWithImagesAndTags = {
      ...currentData,
      tags,
      images: images.map((file) => file.name),
    }
    console.log("Current Form Data:", currentDataWithImagesAndTags)

  }

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl border bg-card shadow-sm p-[32px] text-[#444444] text-[16px]">
        <div className="flex flex-col space-y-1.5 p-5 bg-[#1a237e] text-white rounded-t-3xl h-[78px]">
          <h3 className="text-[32px] font-semibold">Add New Product</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <BasicInfo />
                <ProductClassification />
                <Categories />
                <Pricing />
                <InventoryDetails />
                <AdditionalInfo tags={tags} setTags={setTags} />
              </div>
              <div className="space-y-6">
                <ProductGallery files={images} setFiles={setImages} />
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={handleUpdate}>
                    Update
                  </Button>
                  <Button type="submit">Confirm</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

