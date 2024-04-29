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
  
  const goToQuiz = () => {
    const authCookie = Cookies.get("auth");
    const idFromCookie = JSON.parse(authCookie).user_id;

    const newGame = {
      game_id: gameId,
      user_id: idFromCookie,
      game_topic: null,
    };

    fetch("http://127.0.0.1:4000/game/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    })
      .then((response) => response.json())
      .then((game) => {
        console.log(game);
        if (game.success) {
          fetch("http://127.0.0.1:4000/quiz", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((quiz) => {
              if (quiz.success) {
                //const quizQs = quiz.result;
                console.log(quiz.result);

                navigate(`/quiz/${gameId}`, { state: { quiz: quiz.result } });;
              } else {
                console.log(quiz.message);
              }
            });
        } else {
          console.log("Game Creation Failed!");
        }
      })
      .catch((error) => console.log(error));
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
      </body>
    </html>
  );
};
export default StartGame;
