import FolderIconUrl from "../../../../assets/folder.svg";
import PlusIconUrl from "../../../../assets/plus.svg";

interface TreeItemProps {
  title: string;
}

function TreeItem({ title }: TreeItemProps) {
  function handleUnwrapFolder() {
    console.log("Unwrap folder");
  }

  return (
    <div className="flex items-center gap-1">
      <button onClick={handleUnwrapFolder}><img src={PlusIconUrl} className="w-[14px] h-[14px]" alt="" /></button>
      <img src={FolderIconUrl} className="w-[16px] h-[16px]" alt="Folder Icon" />
      <span>{ title }</span>
    </div>
  );
}

export default TreeItem;