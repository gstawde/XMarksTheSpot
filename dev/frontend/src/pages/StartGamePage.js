import "./start-game-page.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import XMarksLogo from "../assets/XMarksLogo.png";

const StartGame = () => {
  let { gameId } = useParams();
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get("auth");
  const [userId, setUserId] = useState(0);
  
  const [users, setUsers] = useState([]);
  const [usersLength, setUsersLength] = useState(0);
  const [usersChanged, setUsersChanged] = useState(true);

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);

      function setPlayers() {
        fetch(`http://127.0.0.1:4000/game/get/${gameId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        .then((response) => response.json())
        .then((game) => {
          if(game.success) {
            setUsers(game.result.users);
            setUsersLength(game.result.users.length);
          }

          // Check if user is a host
          fetch(`http://127.0.0.1:4000/game/get/${gameId}/${idFromCookie}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }         
          })
          .then((response) => response.json())
          .then((gameplay) => {
            if(gameplay.success) {
              const host = gameplay.result.host;
              console.log(host);
              if(host == 1) {
                setIsHost(true);
              } else {
                setIsHost(false);
              }
            }
          })
        });
      }

      if(usersChanged == true) {
        setUsersChanged(false);
        setPlayers();
      }
    }
  }, [gameId, usersChanged]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://127.0.0.1:4000/game/get/${gameId}`)
        .then((response) => response.json())
        .then((game) => {
          if (game.success) {
            const fetchedUsers = game.result.users;
            
            if (fetchedUsers.length !== usersLength) {
              setUsersChanged(true);
            }
          }
        })
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, [gameId, usersLength]); 
  
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
  
  const goToQuiz = () => {
    fetch("http://127.0.0.1:4000/quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((quiz) => {
      if (quiz.success) {
        navigate(`/quiz/${gameId}`, { state: { quiz: quiz.result } });;
      } else {
        console.log(quiz.message);
      }
    });
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href={XMarksLogo} />
        <title>X Marks the Spot</title>
      </head>
      <body>
        <div className="navbar">
          <a onClick={ handleLogout }>Logout</a>
          <a href="/settings">Settings</a>
          <a className="active" href="/join-start">
            Play!
          </a>
          <a href="/dashboard">Dashboard</a>
          <img
            className="split"
            src={XMarksLogo}
            width="100"
            height="100"
            alt="X Marks the Spot Logo"
          />
        </div>
        <div className="row">
          <div className="column">
            <h1 className="text-7xl text-[#FFB600]">CODE: {gameId}</h1>
            <div style={{ "margin-top": "auto" }} className="row">
              <p className="text-[#FFB600]">
                Wait for other players to join, or start now!
              </p>
              <button onClick={goToQuiz} className="start-button">
                START GAME
              </button> 
            </div>
          </div>
        </div>

        
          <div className="relative w-100 h-100">
            {users.map((user) => (
              <div key={user.id} className="absolute text-2xl" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>{user.username}</div>
            ))}
          </div>


        
      </body>
    </html>
  );
};
export default StartGame;
