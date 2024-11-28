import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setIsAuthenticated } from "../../store/store";
import { FetchWrapper } from "../../utils/FetchWrapper.ts";
import { ServerResponseAPI } from "../types.ts";

function Header() {
  const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogoutButton(): void {
    fetchWrapper.get<ServerResponseAPI>('/auth/logout')
      .then(response => {
        if (response.ok) {
          dispatch(setIsAuthenticated(false));
        }
      })
    navigate('/auth/login');
  }
  
  return (
  <>
    <header className="w-full absolute z-[1] bg-gray-200 border-solid border-b-4 border-sky-500 top-0">
      <nav className="container mx-auto flex justify-between gap-3 items-center py-1 px-6">
        <img src="logo.webp" height={46} width={46} alt="web application logo" />
        <ul className="flex justify-between gap-2 w-[34rem] items-center text-sm">
          <li className=""><Link to={'/dispatcher'} className="">Dispatcher</Link></li>
          <li className=""><Link to={'/vehicles'} className="">Vehicles</Link></li>
          <li className=""><Link to={'/routes'} className="">Routes</Link></li>
          <li className=""><Link to={'/management'} className="">Management</Link></li>
          <li className=""><Link to={'/settings'} className="">Settings</Link></li>
        </ul>
        <button onClick={handleLogoutButton}>Logout</button>
      </nav>
    </header>
  </>
  );
}

export default Header;