export type TProduct = {
  _id: string;
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string | null;
  price: number;
  discountPrice?: number;
  images: string[];
  isActive: boolean;
  isDeleted: boolean;
  rating: number;
  ratingAverage: number;
  ratingQuantity: number;
  favouriteCount: number;
  variants: {};
  reviews: {
    _id: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
  }[];
  sku: string;
  stock: number;
  warranty?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};




export interface TReview {
  _id: string,
  productId: Record<string,any>;
  userId: Record<string,any>;
  rating: number;
  comment: string;
  createdAt: string,
  updatedAt: string,
}
