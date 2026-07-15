import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProblem from "./pages/AddProblem";
import Report from "./pages/Report";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/add-problem" element={<AddProblem />} />

                <Route path="/report/:id" element={<Report />} />

                <Route path="/progress" element={<Progress />} />

                <Route path="/profile" element={<Profile />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;