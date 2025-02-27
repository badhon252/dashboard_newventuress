export type reveiwStatement = {
  title: string;
  description: string;
  _id: string;
};
export interface reveiwDataType {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reveiwStatement: reveiwStatement[];
}

export interface reviewDataResponse {
  success: boolean;
  message: string;
  data: reveiwDataType[];
}
