export interface SaleDataType {
  name: string;
  email: string;
  sales_amount: number;
  image: string; // New field for profile image
};

export const SaleData: SaleDataType[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    sales_amount: 5200,
    image: "/assets/img/topvendor.png", // Example image path
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    sales_amount: 7800,
    image: "/assets/img/topvendor.png",
  },
  {
    name: "Alex Brown",
    email: "alex.brown@example.com",
    sales_amount: 6150,
    image: "/assets/img/topvendor.png",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    sales_amount: 8300,
    image: "/assets/img/topvendor.png",
  },
  {
    name: "Mark Wilson",
    email: "mark.wilson@example.com",
    sales_amount: 4900,
    image: "/assets/img/topvendor.png",
  },
];