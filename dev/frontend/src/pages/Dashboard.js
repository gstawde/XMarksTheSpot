import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TreasureCoin from "../assets/TreasureCoin.png";
import XMarksLogo from "../assets/XMarksLogo.png";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import All_Milestones from "../components/all-milestones";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("auth");
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);
  const [gameplays, setGameplays] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [userMilestone, setUserMilestone] = useState(0);
  const [userPoints, setUserPoints] = useState([]);

  const [rank, setRank] = useState(0);
  const [topThree, setTopThree] = useState([]);
  const [showMilestones, setShowMilestones] = useState(false);

  const handleShowMilestones = () => {
    setShowMilestones(true);
  };

  const handleCloseMilestones = () => {
    setShowMilestones(false);
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");

      const usernameFromCookie = JSON.parse(authCookie).username;
      setUsername(usernameFromCookie);

      const idFromCookie = JSON.parse(authCookie).user_id;
      setId(idFromCookie);

      // Get user's gameplays
      fetch(`http://127.0.0.1:4000/user_gameplays?userId=${idFromCookie}`)
        .then((response) => response.json())
        .then((gameplays) => {
          setGameplays(gameplays);
          console.log(gameplays);
        })
        .catch((error) => console.error("Error fetching user data:", error));

      // update users milestone based on total points
      const user = {
        user_id: JSON.parse(authCookie).user_id,
      };
      fetch("http://127.0.0.1:4000/update_user_milestone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((newMilestone) => {
          console.log(newMilestone);
          if (newMilestone.success) {
            console.log(newMilestone);
          } 
        })
        .catch((error) => console.log(error));

      // Get user milestone
      fetch(`http://127.0.0.1:4000/milestone_reached?userId=${idFromCookie}`)
        .then((response) => response.json())
        .then((milestone_reached) => {
          setUserMilestone(milestone_reached);
          console.log("hreeeee")
          console.log(milestone_reached)
        })
        .catch((error) => console.error("Error fetching user data:", error));

      // Get the user's points
      fetch(`http://127.0.0.1:4000/user_points?userId=${idFromCookie}`)
        .then((response) => response.json())
        .then((user_points) => {
          console.log(user_points);
          setUserPoints(user_points);
        })
        .catch((error) => console.error("Error fetching user data:", error));

      // Get milestones
      fetch(`http://127.0.0.1:4000/milestones`)
        .then((response) => response.json())
        .then((milestones) => {
          setMilestones(milestones);
          console.log(milestones);
        })
        .catch((error) => console.error("Error fetching user data:", error));

      fetch(`http://127.0.0.1:4000/ranks?userId=${idFromCookie}`)
        .then((response) => {
          console.log(response); // Log the response here
          return response.json();
        })
        .then((userRanks) => {
          console.log(userRanks);
          setTopThree(userRanks.top_three);
          setRank(userRanks.rank_number);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  if (!isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 0);
    return null;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href={XMarksLogo} />
        <title>X Marks the Spot</title>
      </head>
      <body>
        <div className="navbar">
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
          <a href="/settings">Settings</a>
          <a href="/join-start">Play!</a>
          <a className="active" href="/dashboard">
            Dashboard
          </a>
          <img
            className="split"
            src={XMarksLogo}
            width="100"
            height="100"
            alt="X Marks the Spot Logo"
          />
        </div>
        <div className="row">
          <div className="column" style={{ flexGrow: "4" }}>
            <div className="row">
              <h1 style={{ color: "#FFB600" }}>Ahoy, {username}!</h1>
              <p className="px-2" style={{ color: "#D7BC95" }}>
                {userPoints["USER_POINTS"]} points
              </p>
            </div>
            <div>
              <div className="row">
                {milestones.map((milestone, index) => (
                  <div key={index}>
                    {milestone.milestone_icon !== "N/A" &&
                      milestone.milestone_id <= 12 && (
                        <div
                          className={`m-3 flex flex-col justify-center items-center ${
                            milestone.milestone_id <=  userMilestone.milestone_reached
                              ? ""
                              : "grayscale"
                          }`}
                        >
                          <img
                            src={require("../" + milestone.milestone_icon)}
                            alt="Milestone"
                          />
                          <p className="text-md text-center">
                            {milestone.milestone_name}
                          </p>
                          <p className="text-sm text-center">
                            {milestone.milestone_points} points
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <button className="see-more" onClick={handleShowMilestones}>
                See More
              </button>
            </div>
          </div>
          {showMilestones && (
            <All_Milestones close={handleCloseMilestones}></All_Milestones>
          )}
          <div className="column leaderboard">
            <h1 className="ranking-title">User Rankings</h1>
            <br />
            {topThree.map((user, index) => (
              <p className="top-three">{index + 1}. {user.username}</p>
            ))}
            <br />
            <p className="user-rank">Ranking: {rank}</p>
          </div>
        </div>
        <br />

        <h1 style={{ paddingLeft: "100px", color: "#FFB600" }}>Game History</h1>
        {gameplays.length === 0 && (
          <h1 style={{ color: "#FFB600", textAlign: "center" }}>
            Start Playing!
          </h1> // Temporary: we will put an image here!
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
                    <td>{dayjs(gameplay.game_date).format("MM/DD/YY")}</td>
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
  );
};
export default Dashboard;
