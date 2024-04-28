import "./start-game-page.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import XMarksLogo from "../assets/XMarksLogo.png";

const StartGame = () => {
  let { gameId } = useParams();
  const navigate = useNavigate();
  
  const goToQuiz = () => {
    fetch("http://127.0.0.1:4000/quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((quiz) => {
      if(quiz.success) {
        const quizQs = quiz.result;
        console.log(quiz.result);

        navigate(`/quiz/${gameId}`)
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
          <a>Logout</a>
          <a href="/settings">Settings</a>
          <a className="active" href="/join-start">Play!</a>
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
              <button onClick={ goToQuiz } className="start-button">START GAME</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default StartGame;
