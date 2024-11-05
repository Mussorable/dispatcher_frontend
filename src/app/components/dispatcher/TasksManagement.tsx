import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBrick, setData, setIsUnloadingPlace, setBrickPosition, updateBricks } from "../../../store/store";

import ImportantIcon from "../../../assets/important.svg?react";
import AlertIcon from "../../../assets/alert.svg?react";
import DeleteIcon from "../../../assets/minus.svg?react";

import RightClickContext from "../../../utils/RightClickContext";

import type { RootState } from "../../../store/store";
import type { Brick } from "../../../store/tasks";

function TasksManagement() {
  const dispatch = useDispatch();

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [isBrickDragging, setIsBrickDragging] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [brickDimensions, setBrickDimensions] = useState<{width: number, height: number}[]>([]);

  const routeBricks = useSelector((state: RootState) => state.tasks.bricks);

  const startPosition = useRef({x: 0, y: 0});
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const bricksRef = useRef<(HTMLDivElement | null)[] | []>([]);
  const currentBrickRef = useRef<Brick | null>(null);

  // Calculate brick dimensions to create path between them
  useEffect(() => {
    const dimensions = bricksRef.current.map(ref => {
      if (ref) {
        return {
          width: ref.offsetWidth,
          height: ref.offsetHeight
        };
      }
      return {width: 0, height: 0};
    });
    setBrickDimensions(dimensions);
  }, [routeBricks, isEditing]);

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
  };

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
  };

  const handleClick = () => {
    setIsContextVisible(false);
  };

  // Context menu actions
  const handleAddBrick = () => {
    dispatch(addNewBrick());
  };

  // Make changes in Brick
  const handleDoubleClick = (brick: Brick) => {
    setIsEditing(brick.id);
  };

  const handleBrickBlur = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsEditing(null);
    }
  };

  const handleChangeBrickColor = (brick: Brick, isUnloadingPlace: boolean) => {
    dispatch(setIsUnloadingPlace({brickId: brick.id, isUnloadingPlace}));
  };

  // Create path between bricks
  const createPath = (startX: number, startY: number, endX: number, endY: number) => {
    const middleX = startX;
    const middleY = endY;

    return `M ${startX} ${startY} H ${middleX} V ${middleY} H ${endX}`;
  };

  // Dragging brick
  const handleBrickMouseDown = (event: React.MouseEvent, brick: Brick) => {
    event.stopPropagation();
    setIsBrickDragging(true);
    currentBrickRef.current = brick;
    startPosition.current = {
      x: event.clientX - brick.xPosition,
      y: event.clientY - brick.yPosition
    }
  };

  const handleBrickMouseMove = (event: React.MouseEvent) => {
    if (!isBrickDragging || !currentBrickRef.current) return;

    const newX = event.clientX - startPosition.current.x;
    const newY = event.clientY - startPosition.current.y;

    dispatch(setBrickPosition({brickId: currentBrickRef.current.id, xPosition: newX, yPosition: newY}));
  };

  const handleBrickMouseUp = () => {
    setIsBrickDragging(false);
    currentBrickRef.current = null;
  };

  return(
    <div className="flex h-1/4 border-b-2" onClick={handleClick}>
      {isContextVisible && <RightClickContext
        ref={contextMenuRef}
        actions={{
          'Add': handleAddBrick,
        }}
      />}
      <div 
        className="flex-1 border-r-2 overflow-hidden relative bg-gray-100"
        onWheel={e => handleMouseScale(e)}
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={handleMouseUp}
        onContextMenu={e => handleContextMenu(e)}>
        <div 
          className="bg-grid map-content w-full h-full transition-transform duration-200 ease-linear cursor-pointer absolute"
          onClick={handleBrickBlur}
          onMouseMove={handleBrickMouseMove}
          onMouseUp={handleBrickMouseUp}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <svg className="absolute w-full h-full pointer-events-none">
            {routeBricks.length > 1 && routeBricks.slice(0, -1).map((brick, index) => {
              const nextBrick = routeBricks[index + 1];
              const brickDim = brickDimensions[index] || { width: 0, height: 0 };
              const nextBrickDim = brickDimensions[index + 1] || { width: 0, height: 0 };
              
              const pathData = createPath(
                brick.xPosition + brickDim.width / 2,
                brick.yPosition + brickDim.height / 2,
                nextBrick.xPosition + nextBrickDim.width / 2,
                nextBrick.yPosition + nextBrickDim.height / 2
              );
              return (
                <path 
                  key={brick.id}
                  d={pathData}
                  stroke="black"
                  fill="transparent"
                  strokeWidth="2"
                  />
              );
            })}
          </svg>

          {routeBricks && routeBricks.map((brick, index) => {
            return (
            <div
              key={brick.id}
              ref={element => bricksRef.current[index] = element}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  setIsEditing(null);
                } else if (e.key === 'Delete') {
                  const updatedBricks = routeBricks.filter(b => b.id !== brick.id);
                  dispatch(updateBricks(updatedBricks));
                  setIsEditing(null);
                }
              }}
              className={"absolute border-2 px-2 py-1 rounded-sm " + 
                (brick.isUnloadingPlace ? 
                  "border-pink-900 bg-pink-200 focus:border-pink-500 focus:bg-pink-300" : "border-blue-900 bg-blue-200 focus:border-blue-500 focus:bg-blue-300")}
              style={{
                top: brick.yPosition,
                left: brick.xPosition
              }}
              onDoubleClick={() => handleDoubleClick(brick)}
              onMouseDown={e => handleBrickMouseDown(e, brick)}
            >
              {isEditing === brick.id ? (
                <>
                  <div onClick={() => handleChangeBrickColor(brick, false)} className="absolute border-2 border-blue-900 bg-blue-200 w-4 h-4 top-[-20px] left-0"></div>
                  <div onClick={() => handleChangeBrickColor(brick, true)} className="absolute border-2 border-pink-900 bg-pink-200 w-4 h-4 top-[-20px] left-5"></div>
                  <form action="">
                    <div className="flex gap-2">
                      <input
                        onChange={e => dispatch(setData({brickId: brick.id, field: 'city', value: e.currentTarget.value}))} value={brick.city} id={`brick${brick.id}-city`} type="text" className="flex-1 font-semibold uppercase border-b-2"
                      />
                      <input 
                        onChange={e => dispatch(setData({brickId: brick.id, field: 'client', value: e.currentTarget.value}))} value={brick.client} id={`brick${brick.id}-client`} type="text" className="text-xs border-b-2 italic"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input 
                        onChange={e => dispatch(setData({brickId: brick.id, field: 'deliveryTime', value: e.currentTarget.value}))} value={brick.deliveryTime} id={`brick${brick.id}-delivery-time`} type="text" className="flex-none font-extrabold uppercase"
                      />
                      <input 
                        onChange={e => dispatch(setData({brickId: brick.id, field: 'refNumber', value: e.currentTarget.value}))} value={brick.refNumber} id={`brick${brick.id}-ref-number`} type="text" className="flex-1 text-xs italic"
                      />
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <span className="flex-1 font-semibold uppercase">{brick.city}</span>
                    <span className="text-xs italic">{brick.client}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-1 font-extrabold uppercase">{brick.deliveryTime}</span>
                    <span className="text-xs italic">{brick.refNumber}</span>
                  </div>
                </>
              )}
            </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 border-r-2 relative bg-gray-100 overflow-hidden">
          <div className="bg-white w-full h-full border-solid border-2">
            <div className="flex gap-10 bg-gray-400 h-full">
              <div className="flex-1 flex flex-col bg-gray-300">
                <h4 className="text-center">To do:</h4>
                <div className="flex-grow flex flex-col bg-white overflow-y-auto no-scrollbar">
                  <ul className="flex-grow flex flex-col">
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div className="flex align-middle">
                        <button className=""><ImportantIcon style={{color: "#b01302"}} /></button>
                        <button className=""><AlertIcon /></button>
                        <button className=""><DeleteIcon /></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div className="flex align-middle">
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div className="flex align-middle">
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                    <li className="flex px-1 todo-attension justify-between items-center align-middle">
                      <span>item to repair</span>
                      <div>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                        <button className=""></button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default TasksManagement;