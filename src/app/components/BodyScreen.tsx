import type { ParentComponent } from "../types";

function BodyScreen({children}: ParentComponent) {
  return(
    <div className="flex w-full pt-[56px] h-dvh">
      {children}
    </div>
  );
}

export default BodyScreen;