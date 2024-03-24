import './game-landing-page.css';
import XMarksLogo from "../assets/XMarksLogo.png";
import TreasureCoin from "../assets/TreasureCoin.png";

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
            <select className="module-categories" name="categories" id="module-categories">
                <option value="0">Narrow Quizzes by Category...</option>
                <option value="1">North + South America</option>
                <option value="2">Europe</option>
                <option value="3">Africa</option>
                <option value="4">Asia + Australia</option>
                <option value="5">Random</option>
            </select>
            <div className="row">
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 1</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 2</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 3</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 4</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 5</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 6</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 7</a>
                </div>
                <div className="column">
                    <img className="module-image" src={TreasureCoin} alt="Token" />
                    <a href="/join-start">Module 8</a>
                </div>
            </div>

        </body>
        </html>
    )
}
export default GameLandingPage;