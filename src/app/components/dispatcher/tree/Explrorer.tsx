import TreeItem from "./TreeItem";

function Explorer() {
  return (
    <div className="w-full bg-slate-100 h-full overflow-hidden pt-1 px-2">
      <TreeItem title="Trucks" />
      <TreeItem title="Trailers" />
    </div>
  );
}

export default Explorer;