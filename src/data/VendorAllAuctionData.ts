
export interface AllAuctionDataType {
  _id: string;
  storeId: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  productType: string;
  stockStatus: string;
  cateogry: string;
  subCateogry: string;
  purchasedPrice: number;
  selllingPrice: number;
  discountPrice: number;
  size: string;
  quantity: string;
  sku: string;
  coa: boolean;
  tags: string[];
  review: string[];
  __v: number;
}

export interface AllAuctionDataResponse {
  success: boolean;
  message: string;
  data: AllAuctionDataType[];
  meta: {
    totalPages: number;
  };
}





export interface DemoTableItemsType {
  image: string;
  id: number;
  name: string;
  stock: string;
  SKU: number;
  Status: string;
  Price: number;
  Date: string;

}

export const VendorAllAuctionData: DemoTableItemsType[] = [
  {
    image: "/assets/img/reviewProduct.png",
    id: 1,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },
  {
    image: "/assets/img/reviewProduct.png",
    id: 2,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },
  {
    image: "/assets/img/reviewProduct.png",
    id: 3,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },
  {
    image: "/assets/img/reviewProduct.png",
    id: 4,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },
  {
    image: "/assets/img/reviewProduct.png",
    id: 5,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },
  {
    image: "/assets/img/reviewProduct.png",
    id: 6,
    name: "Purple Bong 50k",
    stock: "Island Guy Smokers",
    SKU: 489,
    Status: "Auction Expired",
    Price: 165,
    Date: "8 Sep, 2020",

  },

];
