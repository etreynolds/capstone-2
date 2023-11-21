import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import UserContext from "./UserContext";

function AppRoutes() {

    const contextValue = useContext(UserContext);
    const { loginUser, signupUser } = useContext(UserContext);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login loginUser={loginUser} />} />
                <Route path="/signup" element={<Signup signupUser={signupUser} />} />
            </Routes>
        </div>
    );

}

export default AppRoutes;