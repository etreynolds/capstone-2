import React, { useState, useEffect } from 'react';
import './App.css';
import { jwtDecode } from "jwt-decode";
import Nav from './Nav';
import AppRoutes from './AppRoutes';
import WeatherApi from './api';
import useLocalStorage from "./hooks/useLocalStorage"
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';

function App() {

  // const [backgroundColor, changeBackgroundColor] = useState("#526D82")
  // const [textColor, changeTextColor] = useState("#DDE6ED");

  // document.body.style.backgroundColor = backgroundColor;
  // document.body.style.color = textColor;

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);


  async function loginUser(data) {
    try {
      const res = await WeatherApi.loginUser(data);
      setToken(res);
      setCurrentUser(res);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors }
    }
  }

  async function signupUser(data) {
    try {
      const res = await WeatherApi.signupUser(data);
      setToken(res);
      setCurrentUser(res);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors }
    }
  }

  async function updateUser(data) {
    try {
      const user = await WeatherApi.updateUser(currentUser.username, data);
      setCurrentUser(user);
      return { success: true };
    } catch (errors) {
      console.error("edit profile failed", errors);
      return { success: false, errors }
    }
  }

  async function deleteUser() {
    try {
      const user = await WeatherApi.deleteUser(currentUser.username);
      setCurrentUser(null);
      return { success: true };
    } catch (errors) {
      console.error("delete user failed", errors);
      return { success: false, errors }
    }
  }

  function logout() {
    try {
      setCurrentUser(null);
      setToken(null);
    } catch (errors) {
      console.error("logging out failed", errors);
      return { success: false, errors }
    }
  }

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(() => {
    async function checkToken() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          WeatherApi.token = token;
          const user = await WeatherApi.getUser(username)
          setCurrentUser(user);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setUserInfoLoaded(true)
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setUserInfoLoaded(false)
    checkToken();

  }, [token])




  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser, setCurrentUser,
            setToken, token, userInfoLoaded,
            setUserInfoLoaded, loginUser,
            signupUser, updateUser,
            deleteUser, logout
          }}
        >
          <Nav logout={logout} />
          <AppRoutes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
