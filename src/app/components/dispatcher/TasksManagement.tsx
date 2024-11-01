import { useState, useRef } from "react";

import RightClickContext from "../../../utils/RightClickContext";

function TasksManagement() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);

  const startPosition = useRef({x: 0, y: 0});
  const [ContextPosition, setContextPosition] = useState({x: 0, y: 0});

  // Table scrolling, change scale
  const handleMouseScale = (event: React.WheelEvent) => {
    setScale((prevScale) => {
      let newScale = prevScale + (event.deltaY < 0 ? 0.1 : -0.1);
      newScale = Math.min(Math.max(newScale, 1), 5);
      return newScale;
    });
  };

  // Table movement
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    startPosition.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - startPosition.current.x,
      y: event.clientY - startPosition.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    
    setIsContextVisible(true);
    setContextPosition({x: event.pageX - 265, y: event.pageY - 55});
  }

  const handleClick = () => {
    setIsContextVisible(false);
  }

  return(
    <div className="flex h-1/4 border-b-2">
      <div 
        className="flex-1 border-r-2 overflow-hidden relative bg-gray-100"
        onWheel={e => handleMouseScale(e)}
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={handleMouseUp}
        onContextMenu={e => handleContextMenu(e)}
        onClick={handleClick}>
        <div 
          className="bg-grid map-content w-full h-full transition-transform duration-200 ease-linear cursor-pointer" 
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}>
          {/* table map */}
        </div>
        {isContextVisible && <RightClickContext position={ContextPosition} />}
      </div>
      <div className="flex-1 border-r-2"></div>
    </div>
  );
}

export default TasksManagement;