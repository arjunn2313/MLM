import api from "./axiosInstance";

//FETCH ALL PRODUCTS
export const fetchProducts = async ({
  limit = 10,
  page = 1,
  search = "",
  category,
  selectedCategory,
  status,
}) => {
  const response = await api.get(`/api/admin/product/all-products`, {
    params: {
      limit,
      page,
      search,
      category,
      ...(selectedCategory !== "All" && { selectedCategory }),
      ...(status !== "All" && { status }),
    },
  });
  return response.data;
};

// FETCH PRODUCT CATEGORIES
export const fetchProductCategory = async (category) => {
  const response = await api.get(`/api/admin/product/fetch-category`, {
    params: { category },
  });
  return response.data;
};

// CREATE PRODUCT INSTANCE
export const postProductInstance = async ({data,category}) => {
  const response = await api.post(`/api/admin/product/create`, data,{
    params:{category}
  });
  return response.data;
};

// FETCH PRODUCT CATEGORIES
export const fetchProductInstance = async (productCode) => {
  const response = await api.get(`/api/admin/product/not-active/${productCode}`);
  return response.data;
};


// UPADTE PRODUCT INSTANCE
export const postProductData = async ({productCode,formData}) =>{
  const response = await api.put(`/api/admin/product/update-instance/${productCode}`,formData);
  return response.data;
}


// GET PRODUCT DETAILS
export const fetchProductDetails = async (id) =>{
  const response = await api.get(`/api/admin/product/details/${id}`);
  return response.data;
}

// UPADTE PRODUCT STATUS
export const postProductStatus = async ({status,id}) =>{
  const response = await api.put(`/api/admin/product/update-status/${id}`,{status});
  return response.data;
}