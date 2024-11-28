import FolderIconUrl from "../../../../assets/folder.svg";
import FolderOpenedIconUrl from "../../../../assets/open-folder.svg";
import PlusIconUrl from "../../../../assets/plus.svg";
import MinusIconUrl from "../../../../assets/minus.svg";

import { useDispatch } from "react-redux";
import { changeUnwrap } from "../../../../store/store";

import type { ExplorerFolder, ExplorerObject } from "../../../../store/explorer";

interface TreeItemProps {
  element: ExplorerFolder | ExplorerObject;
}

function TreeItem({ element }: TreeItemProps) {
  const dispatch = useDispatch();

  function handleUnwrapFolder(folder: ExplorerFolder) {
    dispatch(changeUnwrap(folder.title));
  }

  return (
    <div className="flex items-center gap-1">
      {element.isFolder && (<>
        <button onClick={() => handleUnwrapFolder(element)}><img src={element.isUnwrapped ? MinusIconUrl : PlusIconUrl} className="w-[14px] h-[14px]" alt="" /></button>
        <img src={element.isUnwrapped ? FolderOpenedIconUrl : FolderIconUrl} className="w-[16px] h-[16px]" alt="Folder Icon" />
      </>)}
      <button className="text-blue-600 border-b-[1px] border-b-blue-600 leading-4">{element.title}</button>
    </div>
  );
}

export default TreeItem;