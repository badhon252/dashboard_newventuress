export type HighlightedStatement = {
  title: string;
  description: string;
  _id: string;
};

export interface blogsDataType {
  id: any;
  _id: string;
  image: string;
  title: string;
  author: string;
  views: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  highlightedStatement: HighlightedStatement[];
  __v: number;
}

export interface blogsDataResponse {
  success: boolean;
  message: string;
  data: blogsDataType[];
  meta: {
    totalPages: number;
  };
}