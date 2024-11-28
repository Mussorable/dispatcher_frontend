import Header from "./header/Header";
import BodyScreen from "./components/BodyScreen";
import SystemTree from "./components/SystemTree";
import TasksTable from "./components/TasksTable";

function DispatcherPage() {
  return(
    <>
      <Header/>
      <BodyScreen>
        <SystemTree />
        <TasksTable />
      </BodyScreen>
    </>
  );
}

export default DispatcherPage;