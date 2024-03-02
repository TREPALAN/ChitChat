import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Login from "./component/login";
import Register from "./component/register";
import NavigationBar from "./component/navigationBar";
import isLogedin from "./utils/isLogedin";
function App() {
  return (
    <BrowserRouter>
      {isLogedin() ? <NavigationBar /> : null}
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
