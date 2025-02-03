"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"

import { BasicInfo } from "./product-form/basic-info"
import { ProductClassification } from "./product-form/product-classification"
import { Categories } from "./product-form/categories"
import { Pricing } from "./product-form/pricing"
import { InventoryDetails } from "./product-form/inventory-details"
import { AdditionalInfo } from "./product-form/additional-info"

import { type ProductFormValues, productSchema } from "./Product"
import ProductGallery from "./product-form/product-gallery"

export function AddNewProduct() {
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
      console.log('Form Data:', data)

      console.log('\nPricing Summary:')
      console.table({
        Purchase: `$${data.purchasePrice}`,
        Selling: `$${data.sellingPrice}`,
        Discount: `$${data.discountPrice}`,
        Margin: `$${data.sellingPrice - data.purchasePrice}`
      })

      console.log('\nInventory Status:')
      console.table({
        SKU: data.sku,
        Quantity: data.quantity,
        Status: data.stockStatus,
        Size: data.size
      })

      // You can add your API call here
      // await addProduct(data)
      
    } catch (error) {
      console.error('Error submitting form:', error)
    }
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
                <AdditionalInfo />
              </div>
              <div className="space-y-6">
                <ProductGallery/>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
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

