export type oderStatement = {
  title: string;
  description: string;
  _id: string;
};
export interface orderDataType {
  OrderID(OrderID: any): void;
  _id: string;
  user: string | null;
  fullName: string;
  country: string;
  state: string;
  address: string;
  apartment: string;
  email: string;
  phoneNumber: string;
  cartDetail: string;
  paymentMethod: "cod" | "online" | string; // Adjust based on possible values
  couponDetail: string;
  orderStatus: "processing" | "shipped" | "delivered" | "canceled" | string; // Adjust based on possible values
  __v: number;
  oderStatement: oderStatement[];
}

export interface orderDataResponse {
  success: boolean;
  message: string;
  data: orderDataType[];
}
//   {
//     id: 1,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Processing"

//   },
//   {
//     id: 2,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Pending"

//   },
//   {
//     id: 3,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Completed"

//   },
//   {
//     id: 4,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Pending"

//   },
//   {
//     id: 5,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Completed"

//   },
//   {
//     id: 6,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Pending"

//   },
//   {
//     id: 7,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Completed"

//   },
//   {
//     id: 8,
//     name: "Cameron Williamson",
//     OrderID: 738,
//     price: 500.0,
//     Data: "8 Sep, 2020",
//     Time: "16.43",
//     quantity: 7,
//     TotalProducts: "(5 Products)",
//     Status: "Completed"

//   }

// ];
