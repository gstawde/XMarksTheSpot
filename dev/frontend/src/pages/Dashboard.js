import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import TreasureCoin from '../assets/TreasureCoin.png';
import XMarksLogo from "../assets/XMarksLogo.png";
import Cookies from 'js-cookie';
import dayjs from 'dayjs'

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  const [username, setUsername] = useState("");
  const [gameplays, setGameplays] = useState([]);

  const handleLogout = () => {
    Cookies.remove('auth');
    navigate('/');
  }

  useEffect(() => {
    if (Cookies.get('auth')) {
      const usernameFromCookie = JSON.parse(Cookies.get('auth')).username;
      setUsername(usernameFromCookie);
    }
  }, []);
  
  useEffect(() => {
    fetch("http://127.0.0.1:4000/gameplays")
        .then((response) => response.json())
        .then((gameplays) => {
            setGameplays(gameplays);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }, []);


  if(!isAuthenticated) {
    setTimeout(() => {
      navigate('/login');
    }, 0);
    return null;
  } 

  return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href={XMarksLogo}/>
            <title>X Marks the Spot</title>
        </head>
        <body>
            <div className="navbar">
                <a  href="/" onClick={ handleLogout }>Logout</a>
                <a>Settings</a>
                <a>Play!</a>
                <a className="active" href="/dashboard">Dashboard</a>
                <img className="split" src={XMarksLogo} width="100" height="100" alt="X Marks the Spot Logo"/>
            </div>
            <div className="row">
                <div className="column" style={{flexGrow: "4"}}>
                    <div className="row">
                        <h1 style={{color: "#FFB600"}}>Ahoy, {username}!</h1><p style={{color: "#D7BC95"}}>XXX points</p>
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
            {gameplays.length == 0 && (
                <h1 style={{color: "#FFB600", textAlign:"center"}}>Start Playing!</h1> // Temporary: we will put an image here!
            )}
            {gameplays && gameplays.length > 0 && (
                <div className="game-history">
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Module Name</th>
                            <th>Total Score</th>
                        </tr>
                        <tbody>
                            {gameplays.map((gameplay) => (
                                <tr key={gameplay["game_id"]}>
                                    <td>{dayjs(gameplay.game_date).format('MM/DD/YY')}</td>
                                    <td>{gameplay["game_topic"]}</td>
                                    <td>{gameplay["user_score"]}</td>
                                </tr>
                            ))}
                        </tbody>    
                    </table>
                </div>
            )}
        </body>
        </html>
    )
}
export default Dashboard;