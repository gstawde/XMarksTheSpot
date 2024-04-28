import './settings-page.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import XMarksLogo from "../assets/XMarksLogo.png";

const SettingsPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("auth");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  if (!isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 0);
    return null;
  }

  return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href={XMarksLogo}/>
            <title>X Marks the Spot</title>
        </head>
        <body>
            <div className="navbar">
                <a onClick={ handleLogout }>Logout</a>
                <a className="active" href="/settings">Settings</a>
                <a href="/join-start">Play!</a>
                <a href="/dashboard">Dashboard</a>
                <img className="split" src={XMarksLogo} width="100" height="100" alt="X Marks the Spot Logo"/>
            </div>
            <h1 className="setting-page-header">Account Information</h1>
            <div className="row">
                <div className="column information-type">
                    <p>First Name</p>
                </div>
                <div className="column user-information">
                    <p>f name</p>
                </div>
            </div>
            <div className="row">
                <div className="column information-type">
                    <p>Last Name</p>
                </div>
                <div className="column user-information">
                    <p>l name</p>
                </div>
            </div>
            <div className="row">
                <div className="column information-type">
                    <p>Email</p>
                </div>
                <div className="column user-information">
                    <p>email address</p>
                </div>
            </div>
            <div className="change-and-delete-buttons">
                <button className="change-password">Change Password</button>
                <button className="delete-account">Delete Account</button>
            </div>
        </body>
        </html>
    )
}
export default SettingsPage;