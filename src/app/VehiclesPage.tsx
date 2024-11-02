import Header from "./header/Header";
import AddTruck from "./components/vehicles/AddTruck";
import Loader from "../utils/Loader";

function VehiclesPage() {
  return(
    <>
      <Header />
      {/* <div className="flex flex-col min-h-screen">
        <Loader/>
      </div> */}
      <div className="max-w-6xl mx-auto px-4 pt-[56px] bg-slate-200 border-x-2 border-blue-300">
        <AddTruck />
      </div>
    </>
  );
}

export default VehiclesPage;