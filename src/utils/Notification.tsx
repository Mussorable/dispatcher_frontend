import { useDispatch, useSelector } from "react-redux";
import { RootState, setNotification } from "../store/store.ts";
import { useEffect } from "react";

function Notification() {
    const dispatch = useDispatch();
    const notification = useSelector((state: RootState) => state.notification);

    const notificationStyles = {
        information: "bg-blue-300",
        alert: "bg-yellow-300",
        error: "bg-red-300",
        success: "bg-green-300",
        important: "bg-purple-300"
    }

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
               dispatch(setNotification({
                   message: "",
                   rate: "information"
               }))
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    return (
        <>
            { notification.message &&
                <div className={ `${ notificationStyles[notification.rate] } absolute z-[2] top-[65px] right-5 w-[350px] border-2 rounded-sm border-stone-600` }>
                    <div className="py-2 border-b-2 border-stone-800">
                        <h5 className="text-center text-xl font-semibold">Notification</h5>
                    </div>
                    <div>
                        <p className="text-center px-2">{ notification.message }</p>
                    </div>
                </div>
            }
        </>
    );
}

export default Notification;