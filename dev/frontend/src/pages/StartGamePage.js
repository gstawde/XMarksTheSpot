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
  const [validGame, setValidGame] = useState(true);
  
  const [users, setUsers] = useState([]);
  const [usersLength, setUsersLength] = useState(0);
  const [usersChanged, setUsersChanged] = useState(true);

  const [gameStart, setGameStart] = useState(null);

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      
      const idFromCookie = JSON.parse(authCookie).user_id;
      setUserId(idFromCookie);

      function setPlayers() {
        fetch(`http://xmarksthespot.pythonanywhere.com/api/game/get/${gameId}`, {
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
          fetch(`http://xmarksthespot.pythonanywhere.com/api/game/get/${gameId}/${idFromCookie}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },         
          })
          .then((response) => response.json())
          .then((gameplay) => {
            if(gameplay.success) {
              if(!gameplay.result || game.result.game_in_progress == 1) {
                setValidGame(false);
      
                setTimeout(() => {
                  navigate("/join-start");
                }, 0);
              } else {
                const host = gameplay.result.host;
                if(host == 1) {
                  setIsHost(true);
                } else {
                  setIsHost(false);
                }
              }
            }
          })
        });
      }

      if(usersChanged === true) {
        setUsersChanged(false);
        setPlayers();
      }

      if(gameStart === true) {
        setGameStart(false);
        navigate(`/quiz/${gameId}/1`);
      }
    }
  }, [gameId, usersChanged, gameStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://xmarksthespot.pythonanywhere.com/api/game/get/${gameId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => response.json())
      .then((game) => {
        if (game.success) {
          const fetchedUsers = game.result.users;
            
          if (fetchedUsers.length !== usersLength) {
            setUsersChanged(true);
          }

          const inProgress = game.result.gameplay[0].game_in_progress;
          if(inProgress === 1) {
            setGameStart(true);
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

  function addQuizQuestion(question, idx) {
    fetch(`http://xmarksthespot.pythonanywhere.com/api/quiz/add/question/${gameId}/${idx}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question)
    })
    .then((response) => response.json())
    .then((quizQuestion) => {
    })
  }
  
  const startQuiz = () => {
    if(!isHost){
      alert("Only the host can start the game!")
    } else {
      fetch(`http://xmarksthespot.pythonanywhere.com/api/game/start/${gameId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((start) => {
        console.log(start.message);
      })
    
      fetch("http://xmarksthespot.pythonanywhere.com/api/quiz", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((quiz) => {
        if (quiz.success) {
          const quizQs = quiz.result;
  
          quizQs.forEach((question, idx) => {
            addQuizQuestion(question, idx);
          })
  
          navigate(`/quiz/${gameId}/1`);;
        } else {
          console.log(quiz.message);
        }
      });
    }
  }

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
              <button onClick={startQuiz} className="start-button">
                START GAME
              </button> 
            </div>
          </div>
        </div>
   
        <div className="game-users">
          {users.map((user) => (
            <div key={user.id} className="user-positioning text-2xl">{user.username}</div>
          ))}
        </div>
      </body>
    </html>
  );
};
export default StartGame;
