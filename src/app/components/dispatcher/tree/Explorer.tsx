import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { createFolder } from "../../../../store/store";

import type { RootState } from "../../../../store/store";

import TreeItem from "./TreeItem";

function Explorer() {
  const dispatch = useDispatch();
  const storage = useSelector((state: RootState) => state.explorer.storage);

  useEffect(() => {
    dispatch(createFolder({
      title: "Trucks",
      isFolder: true,
      isUnwrapped: false,
      children: []
    }));
    dispatch(createFolder({
      title: "Trailers",
      isFolder: true,
      isUnwrapped: false,
      children: []
    }));
  }, []);

  return (
    <div className="w-full bg-slate-100 h-full overflow-hidden pt-1 px-2">
      {Object.values(storage).map((element, key) => <TreeItem key={key} element={element} />)}
    </div>
  );
}

export default Explorer;