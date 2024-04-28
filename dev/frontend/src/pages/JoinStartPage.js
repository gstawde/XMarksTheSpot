import './join-start-page.css';
import XMarksLogo from "../assets/XMarksLogo.png";
import TreasureCoin from "../assets/TreasureCoin.png";
import XMark from "../assets/XMark.png";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const JoinStartPage = () => {

  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("auth");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);
    }
  }, [])

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

  const goToStartGame = (event) => {
    const createGameCode = Math.floor(Math.random() * 900000) + 100000;
    const gameCode = createGameCode.toString().padStart(6, "0");
    
    event.preventDefault();
    navigate(`/start/${gameCode}`);
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
          <a href="/settings">Settings</a>
          <a className="active" href="/join-start">Play!</a>
          <a href="/dashboard">Dashboard</a>
          <img className="split" src={XMarksLogo} width="100" height="100" alt="X Marks the Spot Logo"/>
        </div>
        <div className="row">
          <div className="column">
            <img src={TreasureCoin} width="400" height="400"/>
            <div className="row">
              <p>Enter Unique Game ID Below:</p>
              <input type="text"/>
              <button className="join-button">Join</button>
            </div>
          </div>
          <div className="column">
            <img src={XMark} width="400" height="410"/>
            <br/>
            <button className="start-button" onClick={goToStartGame}>Start Game</button>
          </div>
        </div>
      </body>
    </html>
  )
}
export default JoinStartPage;