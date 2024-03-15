import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse } from "../types/productsTypes";

const url = "https://fakestoreapi.com/";

export const productsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => `products`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
