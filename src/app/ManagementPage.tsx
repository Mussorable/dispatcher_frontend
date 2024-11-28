import Header from "./header/Header";
import AddDriver from "./components/management/AddDriver";
import DeleteDriver from "./components/management/DeleteDriver";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Driver, getDrivers} from "../store/drivers.ts";
import {AppDispatch, RootState} from "../store/store.ts";

export interface DriverManagementProps {
    drivers: Driver[];
}

function ManagementPage() {
    const dispatch: AppDispatch = useDispatch();
    const drivers = useSelector((state: RootState) => state.drivers.drivers);

    useEffect(() => {
        dispatch(getDrivers());
    }, [dispatch]);

    return(
        <>
            <Header />
                <div className="max-w-6xl mx-auto px-4 pb-6 pt-[58px] bg-slate-200 border-x-2 border-blue-300">
                <h1 className="text-2xl my-4 block border-b-2 border-blue-200 font-bold">Management page</h1>
                <div className="relative mx-4">
                    <h3 className="text-xl flex-1 font-semibold">Drivers</h3>
                    <div className="flex">
                        <AddDriver drivers={drivers} />
                        <DeleteDriver drivers={drivers} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagementPage;