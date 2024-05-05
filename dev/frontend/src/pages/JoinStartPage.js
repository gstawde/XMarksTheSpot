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

  const [joinCode, setJoinCode] = useState(0);
  const [joinSuccess, setJoinSuccess] = useState(null);
  const [joinErrorMsg, setJoinErrorMsg] = useState("");

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

  const joinGame = () => {
    fetch(`http://127.0.0.1:4000/game/join/${joinCode}/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => response.json())
    .then((joinGame) => {
      //console.log(userId, joinCode);
      console.log(joinGame);
      if(joinGame.success) {
        setJoinSuccess(true);
        navigate(`/start/${joinCode}`);
      } else {
        setJoinSuccess(false);
        setJoinErrorMsg(joinGame.message);
      }
    });
  }

  const goToStartGame = (event) => {
    const createGameCode = Math.floor(Math.random() * 900000) + 100000;
    const gameCode = createGameCode.toString().padStart(6, "0");

    const newGame = {
      game_id: gameCode,
      user_id: userId,
      host: 1,
      game_topic: "General",
    };

    fetch("http://127.0.0.1:4000/game/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    })
    .then((response) => response.json())
    .then((game) => {
      console.log(game);
      if (game.success) {
        navigate(`/start/${gameCode}`);
      } else {
        console.log("Game Creation Failed!");
      }
    })
    .catch((error) => console.log(error));
    
    event.preventDefault();
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
              <input onChange={(e) => setJoinCode(e.target.value)} type="text"/>
              <button onClick={joinGame} className="join-button">Join</button>
              {!joinSuccess && joinSuccess !== null &&
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Attempt to join unsuccessful!</span> {joinErrorMsg}
                </div>
              }
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