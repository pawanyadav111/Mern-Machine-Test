// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
