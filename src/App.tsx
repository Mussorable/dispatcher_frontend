import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./auth/Auth";
import LoginForm from "./auth/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";

import ProtectedPage from "./app/ProtectedPage";
import DispatcherPage from "./app/DispatcherPage";
import VehiclesPage from "./app/VehiclesPage";
import RoutesPage from "./app/RoutesPage";
import ManagementPage from "./app/ManagementPage";
import SettingsPage from "./app/SettingsPage";
import Notification from "./utils/Notification.tsx";

function App() {
  return (
    <BrowserRouter>
      <Notification />
      <Routes>
        <Route path="/auth/" element={<Auth/>}>
          <Route path="login" element={<LoginForm />}/>
          <Route path="register" element={<RegistrationForm />} />
        </Route>
        <Route path="/" element={<ProtectedPage />}>
          <Route path="dispatcher" element={<DispatcherPage />}></Route>
          <Route path="vehicles" element={<VehiclesPage />}></Route>
          <Route path="routes" element={<RoutesPage />}></Route>
          <Route path="management" element={<ManagementPage />}></Route>
          <Route path="settings" element={<SettingsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
