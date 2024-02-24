import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./component/Index";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Login from "./component/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
