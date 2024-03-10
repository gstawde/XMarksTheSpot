import './dashboard.css';
import TreasureCoin from '../assets/TreasureCoin.png';
import XMarksLogo from "../assets/XMarksLogo.png";

const GamePage = () => {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href={XMarksLogo}/>
            <title>X Marks the Spot</title>
        </head>
        <body>
            <div className="navbar">
                <a  href="/">Logout</a>
                <a>Settings</a>
                <a>Play!</a>
                <a className="active" href="/dashboard">Dashboard</a>
                <img className="split" src={XMarksLogo} width="100" height="100" alt="X Marks the Spot Logo"/>
            </div>
            <div className="row">
                <div className="column" style={{flexGrow: "4"}}>
                    <div className="row">
                        <h1 style={{color: "#FFB600"}}>First Last Name</h1><p style={{color: "#D7BC95"}}>XXX points</p>
                    </div>
                    <div className="row">
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin-achieved" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin" src={TreasureCoin} alt="Token" />
                        <img className="treasure-coin" src={TreasureCoin} alt="Token" />
                        <button className="see-more">See More</button>
                    </div>
                </div>
                <div className="column leaderboard">
                    <h1 className="ranking-title">User Rankings</h1>
                    <br/>
                    <p className="top-three">User 1</p>
                    <p className="top-three">User 2</p>
                    <p className="top-three">User 3</p>
                    <br/>
                    <p className="user-rank">User Rank</p>
                </div>
            </div>
            <br/>
            <h1 style={{paddingLeft: "100px", color: "#FFB600"}}>Game History</h1>
            <div className="game-history">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Module Name</th>
                        <th>Total Score</th>
                    </tr>
                    <tr>
                        <td>03/14/2024</td>
                        <td>North America</td>
                        <td>11000</td>
                    </tr>
                    <tr>
                        <td>03/14/2024</td>
                        <td>Asia</td>
                        <td>1300</td>
                    </tr>
                    <tr>
                        <td>03/12/2024</td>
                        <td>California</td>
                        <td>1300</td>
                    </tr>
                    <tr>
                        <td>03/09/2024</td>
                        <td>Australia</td>
                        <td>1300</td>
                    </tr>
                    <tr>
                        <td>03/03/2024</td>
                        <td>World Geography</td>
                        <td>1300</td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
    )
}
export default GamePage;