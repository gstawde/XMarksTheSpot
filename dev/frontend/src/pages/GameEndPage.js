import "./game-end-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
// import { useState } from 'react';

const GameEndPage = () => {
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
                        <h2>First Place</h2>
                        <h2>Second Place</h2>
                        <h2>Third Place</h2>
                    </div>
                    <div className="column">
                        <h2 className="user-score">User Score</h2>
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