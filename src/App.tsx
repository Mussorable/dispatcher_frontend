import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./auth/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
