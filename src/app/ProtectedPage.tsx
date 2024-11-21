import { useNavigate, Outlet } from "react-router-dom";
import { AppDispatch, getAuth, RootState } from "../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedPage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const isLoading = useSelector((state: RootState) => state.user.isLoading);

    useEffect(() => {
        dispatch(getAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/auth/login", { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <>
            {isAuthenticated && <Outlet/> }
        </>
    );
}

export default ProtectedPage;