import "./start-game-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState, useEffect } from "react";

const StartGame = () => {
  const [gameCode, setGameCode] = useState(null);

  const generateGameCode = () => {
    const createGameCode = Math.floor(Math.random() * 900000) + 100000;
    setGameCode(createGameCode.toString().padStart(6, "0"));
  };
  
  useEffect(() => {
    generateGameCode();
  }, []);
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
          <a className="active" href="/gameLanding">
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
            {generateGameCode && (
              <h1 className="text-7xl text-[#FFB600]">CODE: {gameCode}</h1>
            )}
            {!generateGameCode && (
              <h1 className="text-7xl text-[#FFB600]">
                CODE: ERROR - Please Try Again!
              </h1>
            )}
            <div style={{ "margin-top": "auto" }} className="row">
              <p className="text-[#FFB600]">
                Wait for other players to join, or start now!
              </p>
              <button className="start-button">START GAME</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default StartGame;
