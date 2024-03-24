import './join-start-page.css';
import XMarksLogo from "../assets/XMarksLogo.png";
import TreasureCoin from "../assets/TreasureCoin.png";
import XMark from "../assets/XMark.png";

const JoinStartPage = () => {
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
            <div className="row">
                <div className="column">
                    <img src={TreasureCoin} width="400" height="400"/>
                    <div className="row">
                        <p>Enter Unique Game ID Below:</p>
                        <input type="text"/>
                        <button className="join-button">Join</button>
                    </div>
                </div>
                <div className="column">
                    <img src={XMark} width="400" height="410"/>
                    <br/>
                    <button className="start-button">Start Game</button>
                </div>
            </div>
        </body>
        </html>
    )
}
export default JoinStartPage;