export interface SubCategoryDataType {
  _id: string;
  subCategoryName: string;
  slug: string;
  shortDescription: string;
  category: string | null;
  __v: number;
}
export interface SubCategoryDataResponse {
  success: boolean;
  message: string;
  data: SubCategoryDataType[];
  pagination: {
    totalPages: number;
  };
}
