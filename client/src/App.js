import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";
import Register from "./component/register";
import NavigationBar from "./component/navigationBar";
import SearchFriend from "./component/searchFriend";
import AllFriends from "./component/allFriends";
import PrivateChat from "./component/PrivateChat";
import FriendRequests from "./component/friendRequests";
import isLogedin from "./utils/isLogedin";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Effect from "./socket/socketEffect";
function App() {
  return (
    <BrowserRouter>
      {isLogedin() ? <NavigationBar /> : null}
      {isLogedin() ? <Effect /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected routes */}
          <Route path="/privateChat/:username" element={<PrivateChat />} />
          <Route path="/allFriends" element={<AllFriends />} />
          <Route path="/friendRequests" element={<FriendRequests />} />
          <Route path="/addFriend" element={<SearchFriend />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
