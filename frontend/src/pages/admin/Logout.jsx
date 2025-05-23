import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Suppression des infos d'auth (adapter selon ton stockage)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirection vers login après déconnexion
    navigate("/admin/Signup");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
