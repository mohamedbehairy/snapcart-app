export interface CashOrderResponse {
  status?: string;
  data?: Data;
  statusMsg?: string;
  message?: string;
}

export interface Data {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: SimpleCartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface SimpleCartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface VisaOrderResponse {
  status?: string;
  session?: Session;
  statusMsg?: string;
  message?: string;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface GetOrdersResponse {
  statusMsg?: string;
  message?: string;
  data?: Order[];
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: DetailedCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface DetailedCartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
