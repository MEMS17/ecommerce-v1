import { API_URL } from "./api";

const getToken = () => localStorage.getItem("token");

export const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    // ENVOIE LE TOKEN SANS "Bearer "
    ...(token ? { Authorization: token } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erreur API");
  }

  return response.json();
};