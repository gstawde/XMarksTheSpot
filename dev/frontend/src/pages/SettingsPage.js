import './settings-page.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import XMarksLogo from "../assets/XMarksLogo.png";

const SettingsPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("auth");
  const [userId, setUserId] = useState(0);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  
  const [message, setMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);

      fetch(`http://xmarksthespot.pythonanywhere.com/api/user/${idFromCookie}`)
      .then((response) => response.json())
      .then((user) => {
        setName(`${user.first_name} ${user.last_name}`)
        setUsername(user.username);
        setEmail(user.email);
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

  const handleChangeUsername = () => {
    if(editUsername) {
      if(newUsername.trim() === '') {
        alert("Username should be at least 1 character.");
      } else {
        fetch(`http://xmarksthespot.pythonanywhere.com/api/user/update/username/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({new_username: newUsername})
        })
        .then((response) => response.json())
        .then((editUser) => {
          if(editUser.success) {
            alert(editUser.message);
            window.location.reload();
            setEditUsername(false);
          } else {
            alert(editUser.message);
            setEditUsername(false);
          }
        });
      }
    } else {
      setEditUsername(true);
    }
  };

  const handleChangeEmail = () => {
    if(editEmail) {
      if(newEmail.trim() === '') {
        alert("Email needs to be a valid email.");
      } else {
        fetch(`http://xmarksthespot.pythonanywhere.com/api/user/update/email/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({new_email: newEmail})
        })
        .then((response) => response.json())
        .then((editUser) => {
          if(editUser.success) {
            alert(editUser.message);
            window.location.reload();
            setEditEmail(false);
          } else {
            alert(editUser.message);
            setEditEmail(false);
          }
        });
      }
    } else {
      setEditEmail(true);
    }
  };

  const handleChangePw = () => {
    fetch(`http://xmarksthespot.pythonanywhere.com/api/password/reset/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }})
      .then((response) => response.json())
      .then((reset) => {
        if(reset.success) {
          navigate(`/reset-password?token=${reset.result}`);
        } else {
          console.log(reset.message);
        } 
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? All data associated with account will be deleted.");
    if(confirmDelete) {
      fetch(`http://xmarksthespot.pythonanywhere.com/api/users/delete/${userId}`, {
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
          }, 2000);
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
            <p>Name</p>
          </div>
          <div className="column user-information">
            <p>{name}</p>
          </div>
          <div className="column">
            
          </div>
        </div>
        
        <div className="row">
          <div className="column information-type">
            <p>Username</p>
          </div>
          <div className="column user-information">
            <div>{editUsername 
                ? <input type="text" className="w-5/6" onChange={(e) => setNewUsername(e.target.value)}></input>
                : username}</div>
          </div>
          <div className="column">
            <div className="change-and-delete-buttons">
              <button className="text-sm text-xmts-yellow" onClick={handleChangeUsername}>{editUsername ? "Change" : "Change"}</button>
              {editUsername && <button className="text-sm text-xmts-tan" onClick={() => setEditUsername(false)}>Cancel</button>}
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="column information-type">
            <p>Email</p>
          </div>
          <div className="column user-information">
            <div>{editEmail 
                ? <input type="text" className="w-5/6" onChange={(e) => setNewEmail(e.target.value)}></input>
                : email}</div>
          </div>
          <div className="column">
            <div className="change-and-delete-buttons">
              <button className="text-sm text-xmts-yellow" onClick={handleChangeEmail}>{editEmail ? "Change" : "Change"}</button>
              {editEmail && <button className="text-sm text-xmts-tan" onClick={() => setEditEmail(false)}>Cancel</button>}
            </div>
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