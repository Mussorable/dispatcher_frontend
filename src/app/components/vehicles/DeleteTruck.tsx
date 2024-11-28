import { Truck } from "../../../store/trucks.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";

interface DeleteTruckProps {
  trucks: Truck[];
}

function DeleteTruck({trucks}: DeleteTruckProps) {
  const highlight = useSelector((state: RootState) => state.trucks.highlight);

  return(
    <div className="px-4 pt-4 flex-1">
      <h5 className="font-semibold">Delete Truck</h5>
      <form action="" className="mt-2">
        <div className="flex aign-middle ml-4 mt-2">
          <label htmlFor="trucks-delete-list" className="block self-center w-28">Truck number:</label>
          <select disabled={trucks.length == 0} className={ `ml-3 px-2 py-1 border-2 border-gray-700 rounded-md transition-colors duration-500 ease-in focus:outline-none ${highlight ? 'bg-green-200' : ''}` } name="" id="trucks-delete-list">
            <option value="">Select</option>
            {trucks && trucks.map(({number}) => <option value={number} key={number}>{number}</option>)}
          </select>
        </div>
        <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
          <button type="submit" className="flex-1 mb-2 block mx-auto py-1 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteTruck;