import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBricks, setData, setIsUnloadingPlace } from "../../../store/store";

import RightClickContext from "../../../utils/RightClickContext";

import type { RootState } from "../../../store/store";
import type { Brick } from "../../../store/tasks";

function TasksManagement() {
  const dispatch = useDispatch();

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const routeBricks = useSelector((state: RootState) => state.tasks.bricks);

  const startPosition = useRef({x: 0, y: 0});
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

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

  // open/close context menu using RMB
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsContextVisible(true);
  }

  const handleClick = () => {
    setIsContextVisible(false);
  }

  // Context menu actions
  const handleAddBrick = () => {
    dispatch(setBricks());
  }

  const handleDeleteBrick = () => {
    console.log('Delete clicked');
  };

  const handleEditBrick = () => {
    console.log('Edit clicked');
  };

  const handleConnectBrick = () => {
    console.log('Connect clicked');
  };

  // Make changes in Brick
  const handleDoubleClick = (brick: Brick) => {
    setIsEditing(brick.id);
  }

  const handleBrickBlur = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsEditing(null);
    }
  }

  const handleChangeBrickColor = (brick: Brick, isUnloadingPlace: boolean) => {
    dispatch(setIsUnloadingPlace({brickId: brick.id, isUnloadingPlace}));
  }

  return(
    <div className="flex h-1/4 border-b-2" onClick={handleClick}>
      {isContextVisible && <RightClickContext
        ref={contextMenuRef}
        actions={{
          'Add': handleAddBrick,
          'Delete': handleDeleteBrick,
          'Edit': handleEditBrick,
          'Connect': handleConnectBrick
        }}
      />}
      <div 
        className="flex-1 border-r-2 overflow-hidden bg-gray-100"
        onWheel={e => handleMouseScale(e)}
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={handleMouseUp}
        onContextMenu={e => handleContextMenu(e)}>
        <div 
          className="bg-grid map-content w-full h-full transition-transform duration-200 ease-linear cursor-pointer relative"
          onClick={handleBrickBlur}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {routeBricks && routeBricks.map((brick) => {
            return (
            <div
              key={brick.id}
              tabIndex={0}
              className={"absolute border-2 px-2 py-1 rounded-sm " + 
                (brick.isUnloadingPlace ? 
                  "border-pink-900 bg-pink-200 focus:border-pink-500 focus:bg-pink-300" : "border-blue-900 bg-blue-200 focus:border-blue-500 focus:bg-blue-300")}
              style={{
                top: brick.yPosition,
                left: brick.xPosition
              }}
              onDoubleClick={() => handleDoubleClick(brick)}
            >
              {isEditing === brick.id ? (
                <>
                  <div onClick={() => handleChangeBrickColor(brick, false)} className="absolute border-2 border-blue-900 bg-blue-200 w-4 h-4 top-[-20px] left-0"></div>
                  <div onClick={() => handleChangeBrickColor(brick, true)} className="absolute border-2 border-pink-900 bg-pink-200 w-4 h-4 top-[-20px] left-5"></div>
                  <form action="">
                    <div className="flex gap-2">
                      <input onChange={e => dispatch(setData({brickId: brick.id, field: 'city', value: e.currentTarget.value}))} value={brick.city} id={`brick${brick.id}-city`} type="text" className="flex-1 font-semibold uppercase border-b-2"/>
                      <input onChange={e => dispatch(setData({brickId: brick.id, field: 'client', value: e.currentTarget.value}))} value={brick.client} id={`brick${brick.id}-client`} type="text" className="text-xs border-b-2"/>
                    </div>
                    <div className="flex gap-2">
                      <input onChange={e => dispatch(setData({brickId: brick.id, field: 'deliveryTime', value: e.currentTarget.value}))} value={brick.deliveryTime} id={`brick${brick.id}-delivery-time`} type="text" className="flex-1 font-extrabold uppercase"/>
                      <input onChange={e => dispatch(setData({brickId: brick.id, field: 'refNumber', value: e.currentTarget.value}))} value={brick.refNumber} id={`brick${brick.id}-ref-number`} type="text" className="text-xs"/>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <span className="flex-1 font-semibold uppercase">{brick.city}</span>
                    <span className="text-xs">{brick.client}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-1 font-extrabold uppercase">{brick.deliveryTime}</span>
                    <span className="text-xs">{brick.refNumber}</span>
                  </div>
                </>
              )}
            </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 border-r-2 relative bg-gray-100 overflow-hidden">
          <div className="bg-white w-[90%] h-[85%] mx-auto mt-5 border-solid border-2">

          </div>
      </div>
    </div>
  );
}

export default TasksManagement;