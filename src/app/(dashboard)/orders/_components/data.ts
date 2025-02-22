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

