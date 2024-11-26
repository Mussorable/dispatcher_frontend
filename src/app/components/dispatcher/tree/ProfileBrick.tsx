import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store.ts";

function ProfileBrick() {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <div className="w-full border-b-2 border-b-sky-500 shady-lane">
            <div className="text-right px-2">
                { user && <h2 className="text-xl font-semibold italic">{ user.name }</h2> }
            </div>
            <div className="flex justify-end gap-2 px-2">
                <button className="text-xs text-blue-600 hover:text-blue-900">Settings</button>
                <button className="text-xs text-blue-600 hover:text-blue-900">Update</button>
            </div>
        </div>
    );
}

export default ProfileBrick;