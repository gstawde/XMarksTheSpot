import './base-style.css'; // Import regular stylesheet
import XMarksNameLogo from '../assets/XMarksNameLogo.png';
import TreasureCoin from '../assets/TreasureCoin.png';
import SignupPage from "./SignupPage.js";
import LoginPage from "./LoginPage.js";

const HomePage = () => {
    return (
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <title>React App</title>
        </head>
        <body>
            <div className="landing-view1">
                <a href="/login">
                    <button className="landing-view1-login">Login</button>
                </a>
                <img className="landing-view1-img" src={XMarksNameLogo} alt="Full Logo" />
            </div>
            <div className="landing-view2">
                <p className="landing-view2-header">Play. Learn. Win!</p>
                <p className="landing-view2-para">Compete with other players to get the highest score on each quiz!</p>
                <p className="landing-view2-para">Your points at the end of each game increase your overall player rank...</p>
                <p className="landing-view2-para">Pass milestones to earn a new token to add to your collection!</p>
                <div className="landing-view2-coins">
                    <div className="landing-view2-coin-column">
                        <img className="landing-view2-coins" src={TreasureCoin} alt="Treasure Coin"/>
                    </div>
                    <div className="landing-view2-coin-column">
                        <img className="landing-view2-coins" src={TreasureCoin} alt="Treasure Coin"/>
                    </div>
                    <div className="landing-view2-coin-column">
                        <img className="landing-view2-coins" src={TreasureCoin} alt="Treasure Coin"/>
                    </div>
                </div>
            </div>
            <div className="landing-view3">
                <p className="landing-view3-header">Join Now and Start Learning!</p>
                <a href="/signup">
                    <button className="landing-view3-signup">Sign Up</button>
                </a>
            </div>
            <div className="landing-view4-bottombar">
                <img className="landing-view4-img" src={XMarksNameLogo} alt="Full Logo"/>
            </div>
        </body>
    </html>

    )
}
export default HomePage;