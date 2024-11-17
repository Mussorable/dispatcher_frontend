import {useEffect, useState} from "react";
import {UserTokenInformation} from "../../../../auth/types.ts";

import {jwtDecode} from "jwt-decode";

function ProfileBrick() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            try {
                const decodedToken: UserTokenInformation = jwtDecode(token);
                setUsername(decodedToken.username.replace('_', ' '));
            } catch (err) {
                console.log('Failed to decode token', err);
            }
        }
    }, []);

    return (
        <div className="w-full border-b-2 border-b-sky-500 shady-lane">
            <div className="text-right px-2">
                <h2 className="text-xl font-semibold italic">{username}</h2>
            </div>
            <div className="flex justify-end gap-2 px-2">
                <button className="text-xs text-blue-600 hover:text-blue-900">Settings</button>
                <button className="text-xs text-blue-600 hover:text-blue-900">Update</button>
            </div>
        </div>
    );
}

export default ProfileBrick;