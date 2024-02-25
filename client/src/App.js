import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Login from "./component/login";
import Register from "./component/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
