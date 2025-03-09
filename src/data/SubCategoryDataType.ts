export type categoryStatement = {
    title: string;
    description: string;
    _id: string;
  };

  export interface SubcategoryDataType {
    _id: string;
    categoryDataType: string;
    image: string;
    slug: string;
    subCategory: number;
    shortDescription: string;
    __v: number;
    categoryStatement: categoryStatement[];
  }
  
  export interface SubcategoryDataResponse {
    success: boolean;
    message: string;
    data: SubcategoryDataType[];
    pagination: {
      totalPages: number;
    };
  }
  