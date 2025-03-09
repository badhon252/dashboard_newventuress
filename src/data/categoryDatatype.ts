export type categoryStatement = {
  title: string;
  description: string;
  _id: string;
};
export interface categoryDataType {
  _id: string;
  categoryName: string;
  image: string;
  slug: string;
  subCategory: number;
  shortDescription: string;
  __v: number;
  categoryStatement: categoryStatement[];
}

export type metaPagination = {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface categoryDataResponse {
  success: boolean;
  message: string;
  data: categoryDataType[];
  meta: metaPagination;
}
