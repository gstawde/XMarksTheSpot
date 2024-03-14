import './game-landing-page.css';
import XMarksLogo from "../assets/XMarksLogo.png";

const GameLandingPage = () => {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href={XMarksLogo}/>
            <title>X Marks the Spot</title>
        </head>
        <body>
            <div className="navbar">
                <a>Logout</a>
                <a href="/settings">Settings</a>
                <a className="active" href="/gameLanding">Play!</a>
                <a href="/dashboard">Dashboard</a>
                <img className="split" src={XMarksLogo} width="100" height="100" alt="X Marks the Spot Logo"/>
            </div>
        </body>
        </html>
    )
}
export default GameLandingPage;