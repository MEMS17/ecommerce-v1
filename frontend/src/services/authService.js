// authService.js
import { request } from "./http";

export function getCurrentUser() {
  // Exemple : récupère l'utilisateur depuis le localStorage
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  // Exemple : vérifie si l'utilisateur est authentifié
  return !!getCurrentUser();
}

// Vérifie si le token JWT existe et n'est pas expiré
export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Décoder le payload du JWT (partie centrale)
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Vérifier l'expiration (exp en secondes)
    if (payload.exp && Date.now() / 1000 < payload.exp) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Token invalide ou mal formé", error);
    return false;
  }
}

export const register = (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const login = (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) });
export const logout = () => {
  // Exemple : supprime l'utilisateur du localStorage
  localStorage.removeItem("user");
  return Promise.resolve();
};