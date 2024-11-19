import Header from "./header/Header";

import AddTruck from "./components/vehicles/AddTruck";
import DeleteTruck from "./components/vehicles/DeleteTruck";

import AddTrailer from "./components/vehicles/AddTrailer";
import DeleteTrailer from "./components/vehicles/DeleteTrailer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, getTrailers, RootState} from "../store/store.ts";
import {useEffect} from "react";

function VehiclesPage() {
  const dispatch: AppDispatch = useDispatch();
  const trailers = useSelector((state: RootState) => state.trailers.trailers);

  useEffect(() => {
    dispatch(getTrailers());
  }, [dispatch]);

  return(
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 pb-6 pt-[58px] bg-slate-200 border-x-2 border-blue-300">
        <h1 className="text-2xl my-4 block border-b-2 border-blue-200 font-bold">Vehicles page</h1>
        <div className="flex relative mx-4">
          <h3 className="text-xl flex-1 font-semibold">Trucks</h3>
          <h3 className="text-xl flex-1 font-semibold">Trailers</h3>
        </div>
        <div className="flex relative mx-4">
          <AddTruck trailers={trailers} />
          <AddTrailer trailers={trailers} />
        </div>
        <div className="flex relative mx-4">
          <DeleteTruck />
          <DeleteTrailer trailers={trailers} />
        </div>
      </div>
    </>
  );
}

export default VehiclesPage;