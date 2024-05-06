import "./game-end-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useLocation } from "react-router-dom";
// import { useState } from 'react';

const GameEndPage = () => {

    const location = useLocation();
    console.log(location)

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href={XMarksLogo} />
                <title>X Marks the Spot</title>
            </head>
            <body>
                <h1 className="game-over">GAME OVER!</h1>
                <div className="row">
                    <div className="column ranking">
                        <h2>First Place Winner!</h2>
                        <h2>{location.state.topUser} : {location.state.topscore} points</h2>
                    </div>
                    <div className="column">
                        <h2 className="user-score">User Score: {location.state.userPoints} points</h2>
                    </div>
                </div>
                <a href="/dashboard">
                    <div className="row">
                        <p className="back-to-dashboard">Back to Dashboard!</p>
                        <img src={XMarksLogo} className="img-size" alt="Description"/>
                    </div>
                </a>
            </body>
        </html>
    );
};

export default GameEndPage;