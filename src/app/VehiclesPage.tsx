import Header from "./header/Header";
import Loader from "../utils/Loader";

function VehiclesPage() {
  return(
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Loader/>
      </div>
    </>
  );
}

export default VehiclesPage;