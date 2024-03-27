import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AddCredential from "./components/AddCredential";
import UpdateCredential from "./components/updateCredential";
import AdminPage from "./components/AdminPage";
import UpdateUser from "./components/UpdateUser";
import NoPage from "./components/NoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/AddCred" element={<AddCredential />} />
        <Route path="/EditCred" element={<UpdateCredential />} />
        <Route path="/Admin" element={<AdminPage />} />
        {/* 
        <Route path="/UpdateUser" element={<UpdateUser />} /> */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
