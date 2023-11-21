import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./Nav.css";

function Nav() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <div className="Nav">
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SweaterWeather</Link>
                    <ul className="navbar-nav ml-auto">

                        {currentUser ? (
                            <>
                                <li className="nav-item mr-4">
                                    <span className="nav-link">{currentUser.username}</span>
                                </li>
                                <li className="nav-item mr-4">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>

                                <li className="nav-item mr-4">
                                    <NavLink className="nav-link" to="/login">Log In</NavLink>
                                </li>

                                <li className="nav-item mr-4">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>

                                <li className="nav-item mr-4">
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav;