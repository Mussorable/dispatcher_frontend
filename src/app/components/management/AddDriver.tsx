import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addDriver, Driver} from "../../../store/drivers.ts";
import {AppDispatch} from "../../../store/store.ts";
import {DriverManagementProps} from "../../ManagementPage.tsx";

function AddDriver({drivers}: DriverManagementProps) {
    const dispatch: AppDispatch = useDispatch();
    const [driver, setDriver] = useState<Driver>({
        number: '',
        fullName: '',
        driverLicense: '',
    });

    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();

        if (drivers.some(d => d.number === driver.number || d.driverLicense === driver.driverLicense)) {
            alert('Driver with this data already exists');
            return;
        }

        dispatch(addDriver(driver));

        setDriver({
            number: '',
            fullName: '',
            driverLicense: '',
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setDriver({
            ...driver,
            [id]: value,
        });
    }

    return(
        <div className="px-4 pt-4 flex-1">
            <h5 className="font-semibold">Add Driver</h5>
            <form action="" className="mt-2" onSubmit={handleSubmitForm}>
                <div className="flex align-middle ml-4 mt-2">
                    <label htmlFor="fullName" className="block self-center w-32">Full name:</label>
                    <input value={driver.fullName} required onChange={handleInputChange} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none"
                           id="fullName" type="text" placeholder="Enter name"/>
                </div>
                <div className="flex align-middle ml-4 mt-2">
                    <label htmlFor="number" className="block self-center w-32">Driver's number:</label>
                    <input value={driver.number} required onChange={handleInputChange} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none"
                           id="number" type="text" placeholder="4-digit number"/>
                </div>
                <div className="flex align-middle ml-4 mt-2">
                    <label htmlFor="driverLicense" className="block self-center w-32">Driver's number:</label>
                    <input value={driver.driverLicense} required onChange={handleInputChange} className="ml-3 px-2 py-1 border-2 border-gray-700 rounded-md focus:outline-none"
                           id="driverLicense" type="text" placeholder="Driver's license number"/>
                </div>
                <div className="flex aign-middle ml-4 mt-2 w-1/3 gap-4">
                    <button
                        type="submit"
                        className="flex-1 mb-2 block mx-auto py-1 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition-colors">Submit
                    </button>
                    <button type="reset"
                        className="flex-1 mb-2 block mx-auto py-1 bg-orange-500 text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors">Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDriver;