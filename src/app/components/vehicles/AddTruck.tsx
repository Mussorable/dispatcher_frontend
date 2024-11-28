import {useDispatch, useSelector} from "react-redux";
import React, { FormEvent, useEffect, useState } from "react";
import { addTruck, AppDispatch, RootState, setHighlightTrucks } from "../../../store/store.ts";
import {getDrivers} from "../../../store/drivers.ts";
import {Trailer} from "../../../store/trailers.ts";
import {Truck} from "../../../store/trucks.ts";

interface AddTruckProps {
  trailers: Trailer[];
  trucks: Truck[];
}

function AddTruck({trailers, trucks}: AddTruckProps) {
  const dispatch: AppDispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const highlight = useSelector((state: RootState) => state.trailers.highlight);
  const [truck, setTruck] = useState<Truck>({
    number: ''
  });

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (trucks.some(t => t.number === truck.number)) {
      alert('Truck with this number already exists');
      return;
    }

    dispatch(addTruck(truck));
    const timer = setTimeout(() => {
      dispatch(setHighlightTrucks(false));
    }, 600);

    handleReset(event);

    return () => clearTimeout(timer);
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setTruck({
      number: ''
    });
  };

  return (
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Add Truck</h5>
      <form action="" className="mt-2" onSubmit={handleSubmitForm} onReset={handleReset}>
        <div className="flex align-middle ml-4 mt-2">
          <label htmlFor="truck-number" className="block self-center w-28">Truck number:</label>
          <input value={truck.number} onChange={e => setTruck({number: e.currentTarget.value})} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" id="truck-number" type="text" placeholder="7-digit number" />
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="drivers-list" className="block self-center w-28">Current driver:</label>
          <select disabled={drivers.length == 0} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none" name="" id="drivers-list">
            <option value="">Optional</option>
            {drivers && drivers.map((driver) => <option value={driver.number} key={driver.number}>{driver.fullName}</option>)}
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trailers-list" className="block self-center w-28">Current trailer:</label>
          <select disabled={trailers.length == 0} className={ `ml-3 px-2 py-1 border-2 border-gray-700 rounded-md transition-colors duration-500 ease-in focus:outline-none ${highlight ? 'bg-green-200' : ''}` } name="" id="trailers-list">
            <option value="">Optional</option>
            {trailers && trailers.map(({number}) => <option value={number} key={number}>{number}</option>)}
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