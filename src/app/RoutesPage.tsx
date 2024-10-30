import Header from "./header/Header";
import Loader from "../utils/Loader";

function RoutesPage() {
  return(
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Loader/>
      </div>
    </>
  );
}

export default RoutesPage;