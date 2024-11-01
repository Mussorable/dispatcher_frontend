import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated } from "../../store/store";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogoutButton(): void {
    dispatch(setIsAuthenticated(false));
    sessionStorage.clear();
    navigate('/auth/login');
  }
  
  return (
  <>
    <header className="w-full absolute index-1 bg-gray-200 border-solid border-b-4 border-sky-500 top-0">
      <nav className="container mx-auto flex justify-between gap-3 items-center py-4 px-6">
        <div>Brand</div>
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