import './settings-page.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import XMarksLogo from "../assets/XMarksLogo.png";

const SettingsPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("auth");
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);

      fetch(`http://fahmed.pythonanywhere.com/api/user/${idFromCookie}`)
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => console.error("Error fetching user data:", error));
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

  const handleChangePw = () => {
    fetch(`http://fahmed.pythonanywhere.com/api/password/reset/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }})
      .then((response) => response.json())
      .then((reset) => {
        if(reset.success) {
          navigate(`/reset-password?token=${reset.result}`);
          //navigate(`/reset-password?token=${reset.result}`);
        } else {
          console.log(reset.message);
        } 
      })
      .catch((error) => console.error("Error fetching user data:", error));
    }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? All data associated with account will be deleted.");
    if(confirmDelete) {
      fetch(`http://fahmed.pythonanywhere.com/api/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
      }})
      .then((response) => response.json())
      .then((deleteUser) => {
        if(deleteUser.success) {
          setDeleteSuccess(true);
          console.log(deleteUser.message);
          setMessage("Account successfully deleted!");

          
          setTimeout(() => {
            Cookies.remove("auth");
            window.location.href = "/";
          }, 3000);
        } else {
          setDeleteSuccess(true);
          setMessage(deleteUser.message);
          console.log(deleteUser.message);
        } 
      })
      .catch((error) => console.error("Error fetching user data:", error));
    }

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
            <p>{userData["first_name"]}</p>
          </div>
        </div>
        <div className="row">
          <div className="column information-type">
            <p>Last Name</p>
          </div>
          <div className="column user-information">
            <p>{userData["last_name"]}</p>
          </div>
        </div>
        <div className="row">
          <div className="column information-type">
            <p>Email</p>
          </div>
          <div className="column user-information">
            <p>{userData["email"]}</p>
          </div>
        </div>
        <div className="change-and-delete-buttons">
          <button onClick={handleChangePw} className="change-password">Change Password</button>
          <button onClick={handleDelete} className="delete-account">Delete Account</button>
        </div>
        <div>
          {deleteSuccess && 
            <div className="p-4 max-w-sm mx-auto text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
              <span className="font-medium">{ message } </span> 
              Redirecting you to the home page . . . 
            </div>
          }
        </div>
      </body>
    </html>
  )
}
export default SettingsPage;