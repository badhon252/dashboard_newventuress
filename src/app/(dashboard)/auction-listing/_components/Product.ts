import * as z from "zod"

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string(),
  description: z.string(),
  productType: z.enum(["CBD", "Recreational"]),
  stockStatus: z.enum(["In Stock", "Out of Stock"]),
  store: z.string().min(1, "Store is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  purchasePrice: z.number().min(0),
  sellingPrice: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
  size: z.string(),
  quantity: z.number().min(0),
  sku: z.string(),
  coa: z.boolean().default(false),
  tags: z.array(z.string()),
  images: z.array(z.string()).min(1, "At least one image is required"),
})

export type ProductFormValues = z.infer<typeof productSchema>

