import { Outlet, useLocation } from "react-router-dom";

function Auth() {
  const location = useLocation();
  
  const title = location.pathname.includes('login') ? 'Login' : 'Registration';

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-blue-100 p-8 rounded-lg shadow-xl w-[600px]">
        <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;