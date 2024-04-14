import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AllFriends from "./component/home/allFriends";
import FriendRequests from "./component/home/friendRequests";
import GroupChat from "./component/chat/Group/groupChat";
import Groups from "./component/home/groups";
import Home from "./component/home/home";
import isLogedin from "./utils/isLogedin";
import Login from "./component/authentication/login";
import NavigationBar from "./component/navigationBar/navigationBar";
import PrivateChat from "./component/chat/Private/PrivateChat";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Register from "./component/authentication/register";
import SearchUser from "./component/home/searchUser";
import SoccketHook from "./socket/socketHook";

function App() {
  return (
    <BrowserRouter>
      {isLogedin() ? <NavigationBar /> : null}
      {isLogedin() ? <SoccketHook /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected routes */}
          <Route path="/privateChat/:username" element={<PrivateChat />} />
          <Route path="/allFriends" element={<AllFriends />} />
          <Route path="/friendRequests" element={<FriendRequests />} />
          <Route path="/addFriend" element={<SearchUser />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groupChat/:groupId" element={<GroupChat />} />

          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
