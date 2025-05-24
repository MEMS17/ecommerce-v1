import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();  // supprime token + met isAuthenticated à false
    navigate("/admin/Login"); // redirection après déconnexion
  }, [logout, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
