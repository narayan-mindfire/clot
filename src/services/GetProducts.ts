import axios from "axios";

const PRODUCT_API = "https://dummyjson.com/products";

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface MetaData {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaData;
  images: string[];
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
}


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<ProductResponse>(PRODUCT_API);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
