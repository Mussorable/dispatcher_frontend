import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setUsername, setPassword, setInformation } from "../store/store";
import { FetchWrapper } from "../utils/FetchWrapper";

import type { RootState } from "../store/store";
import React from "react";
import { ServerResponseAPI } from "../app/types.ts";
import { User } from "../store/user.ts";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = useSelector((state: RootState) => state.auth.username);
    const password = useSelector((state: RootState) => state.auth.password);

    const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

    const handleSetUsername = (username: string): void => {
        dispatch(setUsername(username));
    }
    const handleSetPassword = (password: string): void => {
        dispatch(setPassword(password));
    }

    async function handleSubmitLoginForm(event: React.FormEvent) {
        event.preventDefault();

        const response = await fetchWrapper.post<ServerResponseAPI<User>>('/auth/login', {
            username,
            password
        });
        if (response.data) dispatch(setInformation(response.data));

        handleSetUsername('');
        handleSetPassword('');

        navigate('/dispatcher');
    }

    return (
        <>
            <form action="" onSubmit={handleSubmitLoginForm}>
                <div className="flex mb-4 justify-center items-center gap-2">
                    <label className="w-38 text-right text-gray-700 font-semibold" htmlFor="username">Username:</label>
                    <input value={username} onChange={e => handleSetUsername(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100 transition duration-150" id="username" type="text" />
                </div>
                <div className="flex mb-8 justify-center items-center gap-2">
                    <label className="w-38 text-right text-gray-700 font-semibold" htmlFor="password">Password:</label>
                    <input value={password} onChange={e => handleSetPassword(e.currentTarget.value)} className="flex-1 mx-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:bg-black-100 transition duration-150" id="password" type="password" />
                </div>
                <button className="mb-2 block mx-auto w-7/12 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors" type="submit">Login</button>
            </form>
            <Link className="block mx-auto w-7/12 py-2 bg-orange-500 text-center text-white font-semibold rounded-md hover:bg-orange-600 transition-colors" to={'/auth/register'}>Sign Up</Link>
        </>
    );
}

export default LoginForm;