interface MousePosition {
  position: {
    x: number,
    y: number
  };
}

function RightClickContext({position}: MousePosition) {
  return(
    <div 
      className="absolute z-[2] shadow-md border-2 rounded-md bg-gray-50"
      style={{
        top: position.y,
        left: position.x
      }}>
      <ul>
        <li><button className="px-6 py-2 hover:bg-gray-100 transition duration-75 w-full text-left">Add</button></li>
        <li><button className="px-6 py-2 hover:bg-gray-100 transition duration-75 w-full text-left">Edit</button></li>
        <li><button className="px-6 py-2 hover:bg-gray-100 transition duration-75 w-full text-left">Delete</button></li>
        <li><button className="px-6 py-2 hover:bg-gray-100 transition duration-75 w-full text-left">Connect</button></li>
      </ul>
    </div>
  );
}

export default RightClickContext;