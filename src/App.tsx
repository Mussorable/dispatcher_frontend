import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./auth/Auth";
import LoginForm from "./auth/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={<Auth/>}>
          <Route path="login" element={<LoginForm />}/>
          <Route path="register" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
