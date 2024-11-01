import TasksManagement from "./dispatcher/TasksManagement";
import Map from "./dispatcher/Map";
import DataInformation from "./dispatcher/DataInformation";

function TasksTable() {
  return(
    <div className="flex-1 h-full">
      <TasksManagement />
      <Map />
      <DataInformation />
    </div>
  );
}

export default TasksTable;