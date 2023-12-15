import { Routes, Route } from "react-router-dom";
import KanBan from "./components/KanBan";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

export const App = () => {
 
  return (
    <div className=" text-white ">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<KanBan />} />
      </Routes>
    </div>
  );
};
