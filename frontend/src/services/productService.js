import { request } from "./http";

export const fetchProducts = () => request("/products");
export const fetchProductById = (id) => request(`/products/${id}/show`);
export const createProduct = (data) => request("/products/new", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/products/${id}/edit`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/products/${id}/delete`, { method: "DELETE" });