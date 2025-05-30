import { request } from "./http";

export const fetchUsers = () => request("/users");
export const fetchUserById = (id) => request(`/users/${id}/show`);
export const createUser = (data) => request("/users/new", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id, data) => request(`/users/${id}/edit`, { method: "PUT", body: JSON.stringify(data) });
export const deleteUser = (id) => request(`/users/${id}/delete`, { method: "DELETE" });