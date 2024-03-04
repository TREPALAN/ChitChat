import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";
import Register from "./component/register";
import NavigationBar from "./component/navigationBar";
import AddFriend from "./component/addFriend";
import AllFriends from "./component/allFriends";
import OnlineFriends from "./component/onlineFriends";
import isLogedin from "./utils/isLogedin";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Socket from "./socket/socket";
function App() {
  return (
    <BrowserRouter>
      {isLogedin() ? <NavigationBar /> : null}
      {isLogedin() ? <Socket /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected routes */}
          <Route path="/allFriends" element={<AllFriends />} />
          <Route path="/onlineFriends" element={<OnlineFriends />} />
          <Route path="/addFriend" element={<AddFriend />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
