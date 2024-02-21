import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import ProtectedRoutes from "./auth/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
