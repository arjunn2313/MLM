import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCategorySalesReport,
  fetchProductCategory,
  fetchProductDashboard,
  fetchProductDetails,
  fetchProductInstance,
  fetchProducts,
  fetchSalesReport,
  postProductData,
  postProductInstance,
  postProductStatus,
  postProductStock,
} from "../api/productApi";
import toast from "react-hot-toast";

// GET --- ALL PRODUCTS
export const useProductLists = (
  page,
  search,
  category,
  selectedCategory,
  status
) => {
  return useQuery({
    queryKey: ["products", page, search, category, selectedCategory, status],
    queryFn: () =>
      fetchProducts({
        page,
        search,
        category,
        selectedCategory,
        status,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// GET --- PRODUCTS CATEGORIES
export const useProductCategory = (category) => {
  return useQuery({
    queryKey: ["product-category", category],
    queryFn: () => fetchProductCategory(category),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// GET --- PRODUCTS DETAILS
export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// POST --- CREATE PRODUCT INSTANCE (ADDING NEW STOCK)
export const useCreateNewStock = () => {
  return useMutation({
    mutationFn: postProductInstance,
    onSuccess: (data) => {
      toast.success("Successfully created!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// GET --- PRODUCTS INSTANCE
export const useCheckProduct = (productCode) => {
  return useQuery({
    queryKey: ["product-instance", productCode],
    queryFn: () => fetchProductInstance(productCode),
    enabled: productCode?.length >= 3, 
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};


// PUT -- UPDATE PRODUCT INSTANCE
export const useUpdateProductInstance = () =>{
  return useMutation({
    mutationFn : postProductData,
    onSuccess: (data) => {
      toast.success("Successfully Details Updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  })
}

// PUT -- UPDATE PRODUCT Status
export const useUpdateProductStatus= () =>{
  return useMutation({
    mutationFn : postProductStatus,
    onSuccess: (data) => {
      toast.success("Successfully Status Updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  })
}

// PUT -- UPDATE PRODUCT STOCK
export const useUpdateProductStock= () =>{
  return useMutation({
    mutationFn : postProductStock,
    onSuccess: (data) => {
      toast.success("Successfully Stock Updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  })
}


// GET --- PRODUCTS DASHBOARD
export const useProductDashboard = () => {
  return useQuery({
    queryKey: ["product-dashboard", ],
    queryFn: () => fetchProductDashboard(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// GET --- PRODUCTS SALES CHARTS
export const useProductSales = (category,interval) => {
  return useQuery({
    queryKey: ["product-sales",category,interval],
    queryFn: () => fetchSalesReport(category,interval),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// GET --- PRODUCTS SUB CATEGORY SALES CHARTS
export const useSubProductSales = (category,interval) => {
  return useQuery({
    queryKey: ["product-sub-sales",category,interval ],
    queryFn: () => fetchCategorySalesReport(category,interval),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};