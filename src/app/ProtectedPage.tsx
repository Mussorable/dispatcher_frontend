import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return(
    <>
      <Outlet/>
    </>
  );
}

export default ProtectedPage;