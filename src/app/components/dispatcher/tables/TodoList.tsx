import ImportantIcon from "../../../../assets/important.svg?react";
import AlertIcon from "../../../../assets/alert.svg?react";
import DeleteIcon from "../../../../assets/minus.svg?react";
import PlusSqIcon from "../../../../assets/plus_sq.svg?react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, removeTask, setImportance, setTaskText } from "../../../../store/store";

import type { RootState } from "../../../../store/store";

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleAddTask = () => {
    if (!isEditing) {
      dispatch(addTask());
      setIsEditing(true);
    }
  }

  const handleSetTaskText = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      dispatch(setTaskText({id, text: inputValue}));
      setInputValue('');
      setIsEditing(false);
    }
  }

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col bg-gray-300">
          <h4 className="text-center text-md font-bold sea-salt text-white">
            Truck Tasks
          </h4>
          <div className="flex-grow flex flex-col bg-white overflow-y-auto no-scrollbar border-t-2 border-t-sky-600">
            <ul className="flex-grow flex flex-col bg-slate-300">
              <li className="bg-slate-200 group flex items-start align-middle text-sm m-1 px-1 py-[1px] border-[1px] box-content border-green-700">
                <button disabled={isEditing} onClick={handleAddTask} className="flex-1 flex justify-start items-center gap-1 text-green-700 hover:text-green-900 disabled:text-gray-600"><PlusSqIcon /><span>Add new task</span></button>
              </li>
              {tasks && tasks.map((task) => {
                
                if (task.text) {
                  return (
                    <li key={task.id} className={`group flex pl-1 ${task.isImportant ? "todo-important" : "todo-attension"} justify-between items-center align-middle`}>
                      <span>{task.text}</span>
                      <div className="flex gap-1 justify-start align-middle bg-slate-300 h-full px-2 invisible group-hover:visible">
                        <button onClick={() => dispatch(setImportance(task.id))} className="flex-1 text-red-700 hover:text-red-900"><ImportantIcon /></button>
                        <button className="flex-1 text-yellow-900 hover:text-yellow-700"><AlertIcon /></button>
                        <button onClick={() => handleRemoveTask(task.id)} className="flex-1 text-red-700 hover:text-red-900"><DeleteIcon /></button>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={task.id} className={`group flex pl-1 ${task.isImportant ? "todo-important" : "todo-attension"} justify-between items-center align-middle`}>
                      <input
                        className="h-5 my-1 border-[1px] border-zinc-600 rounded-sm min-w-[300px] bg-gray-300 focus:bg-white"
                        type="text" 
                        autoFocus 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => handleSetTaskText(e, task.id)}
                      />
                    </li>
                  );
                }
              })}
              {tasks.length === 0 && (
                <li className="flex-1 flex justify-center items-center text-sm text-gray-700">
                  <span>No tasks</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;