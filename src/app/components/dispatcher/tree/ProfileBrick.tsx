function ProfileBrick() {
  return (
    <div className="w-full border-b-2 border-b-sky-500 bg-slate-300">
      <div className="text-right px-2">
        <h2 className="text-xl font-semibold italic">FULL NAME</h2>
      </div>
      <div className="flex justify-end gap-2 px-2">
        <button className="text-xs text-blue-600 hover:text-blue-900">Settings</button>
        <button className="text-xs text-blue-600 hover:text-blue-900">Update</button>
      </div>
    </div>
  );
}

export default ProfileBrick;