import { FormEvent, useState } from "react";
import { Truck } from "../../../store/trucks.ts";
import { RootState, setNotification } from "../../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { FetchWrapper } from "../../../utils/FetchWrapper.ts";
import { ServerResponseAPI } from "../../types.ts";

interface PinVehicleProps {
    trucks: Truck[];
}

function PinVehicle({trucks}: PinVehicleProps) {
    const dispatch = useDispatch();
    const [truck, setTruck] = useState<string>();
    const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);
    const truckHighlight = useSelector((state: RootState) => state.trucks.highlight);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetchWrapper.post<ServerResponseAPI>('/vehicles/connect-vehicle', {
          truckNumber: truck
      });

      dispatch(setNotification({
          message: response.message,
          rate: 'success'
      }))
    };

    return (
        <div className="px-4 pt-4 flex-1">
            <h5 className="font-semibold">Pin Vehicle</h5>
            <form action="" onSubmit={ handleFormSubmit }>
                <div className="flex align-middle ml-4 mt-2">
                    <label htmlFor="trucks-list" className="block self-center w-28">Select Truck:</label>
                    <select disabled={ trucks.length == 0 }
                            className={ `ml-3 px-2 py-1 border-2 border-gray-700 rounded-md transition-colors duration-500 ease-in focus:outline-none ${ truckHighlight ? 'bg-green-200' : '' }` }
                            name="" id="trucks-list"
                            onChange={e => setTruck(e.currentTarget.value)}>
                        <option value="">Optional</option>
                        { trucks && trucks.map(({number}) => <option value={ number }
                                                                     key={ number }>{ number }</option>) }
                    </select>
                </div>
                <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
                    <button type="submit"
                            className="flex-1 mb-2 block mx-auto py-1 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition-colors">Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PinVehicle;