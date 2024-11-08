import ProfileBrick from "./dispatcher/tree/ProfileBrick";
import Explorer from "./dispatcher/tree/Explrorer";

function SystemTree() {
  return(
    <div className="w-[14%] h-full flex flex-col relative border-r-4 border-r-sky-500">
      <ProfileBrick />
      <Explorer />
    </div>
  );
}

export default SystemTree;