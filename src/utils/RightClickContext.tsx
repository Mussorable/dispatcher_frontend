import { forwardRef } from "react";

interface MousePosition {
  actions: {
    [key: string]: () => void;
  };
}

const RightClickContext = forwardRef<HTMLDivElement, MousePosition>(({ actions }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute z-[2] shadow-md border-2 rounded-md bg-gray-50"
      style={{
        top: 0,
        left: 0,
      }}
    >
      <ul>
        {actions && Object.entries(actions).map(([actionName, actionFunc], key) => {
          {if (actionName === 'Add') return <li key={key}><button className="px-6 py-2 hover:bg-green-500 bg-green-600 transition duration-100 w-full text-left" onClick={actionFunc}>{actionName}</button></li>}
          return <li key={key}><button className="px-6 py-2 hover:bg-gray-100 transition duration-75 w-full text-left" onClick={actionFunc}>{actionName}</button></li>
        })}
      </ul>
    </div>
  );
});

export default RightClickContext;