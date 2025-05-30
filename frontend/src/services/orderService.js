import { request } from "./http";

export const fetchOrders = () => request("/orders");
export const createOrder = (data) => request("/orders/new", { method: "POST", body: JSON.stringify(data) });
export const fetchOrdersById = (userId) => request(`/orders/${userId}/view`);