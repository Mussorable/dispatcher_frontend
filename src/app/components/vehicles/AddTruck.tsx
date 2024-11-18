import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {getDrivers} from "../../../store/drivers.ts";

function AddTruck() {
  const dispatch: AppDispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const [truck, setTruck] = useState({
    vehicleNumber: '',
    driverNumber: '',
    trailerNumber: '',
  });

  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;
    setTruck({
      ...truck,
      [id]: value,
    });
  };

  return (
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Add Truck</h5>
      <form action="" className="mt-2">
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="truck-number" className="block self-center w-28">Truck number:</label>
          <input value={truck.vehicleNumber} onChange={handleInputChange} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="truck-number" type="text" placeholder="7-digit number" />
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="drivers-list" className="block self-center w-28">Current driver:</label>
          <select value={truck.driverNumber} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="drivers-list">
            <option value="">Optional</option>
            {drivers && drivers.map((driver) => <option value={driver.number} key={driver.number}>{driver.fullName}</option>)}
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trailers-list" className="block self-center w-28">Current trailer:</label>
          <select value={truck.trailerNumber} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="trailers-list">
            <option value="">Optional</option>
            <option value="trailer-1">trailer-1</option>
            <option value="trailer-2">trailer-2</option>
            <option value="trailer-3">trailer-3</option>
            <option value="trailer-4">trailer-4</option>
            <option value="trailer-5">trailer-5</option>
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition-colors">Submit</button>
          <button type="reset" className="flex-1 mb-2 block mx-auto py-1 bg-orange-500 text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default AddTruck;