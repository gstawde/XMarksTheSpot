import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizQuestionPage = () => {
  const { gameId, questionId } = useParams();
  
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!Cookies.get("auth");
  const [id, setId] = useState();
  const [validGame, setValidGame] = useState(true);
  
  const [secondsLeft, setSecondsLeft] = useState(20);

  const [fibAnswer, setFibAnswer] = useState("");
  const [mcAnswer, setMcAnswer] = useState("");
  const [tfAnswer, setTfAnswer] = useState(null);
  
  const [userScore, setUserScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [topUser, setTopUser] = useState("");


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [quizQuestion, setQuizQuestion] = useState(null);
  const [display, setDisplay] = useState("");
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState(0);
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState([]);
  const [tf, setTf] = useState(0);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");

      const idFromCookie = JSON.parse(authCookie).user_id;
      setId(idFromCookie);

      fetch(`http://127.0.0.1:4000/game/get/${gameId}/${idFromCookie}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((game) => {
        if(!game.result || game.result.game_in_progress == 0) {
          setValidGame(false);

          setTimeout(() => {
            navigate("/join-start");
          }, 0);
        } else {
          if(questionId < 16) {
            fetch(`http://127.0.0.1:4000/quiz/question/${gameId}/${(questionId - 1)}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((quizQ) => {
              if(quizQ.success) {
                const q = quizQ.result[0];
    
                setQuizQuestion(q)
                setDisplay(q.question_type);
                setQuestion(q.question);
                setLevel(q.question_level);
                setCorrectOption(q.correct_option);
                setOptions(JSON.parse(q.options));
                if(q.tf == 1) {
                  setTf(true);
                } else if (q.tf == 0) {
                  setTf(false);
                } else {
                  setTf(0);
                }
                setFlag(q.flag);
              }
            })
          }
        }
      })
    }
  }, [questionId]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 && questionId < 16) {
      if(display == "tf") {
        alert(`The correct answer is ${tf}!`);
      } else {
        alert(`The correct answer is ${correctOption}!`);
       }

      navigate(`/quiz/${gameId}/${parseInt(questionId) + 1}`)

      setSecondsLeft(20);

      setFibAnswer("");
      setTfAnswer(null);
      setMcAnswer("");

      setIsButtonDisabled(false);

    } else if (questionId == 16) {
      const newUserPoints = {
        user_id: id,
        user_points: userScore,
      };

      fetch(`http://127.0.0.1:4000/game/finish/${gameId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => response.json())
      .then((finish) => {
        console.log(finish.message);
      })
      .catch((error) => console.log(error));

      fetch("http://127.0.0.1:4000/update_user_points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserPoints),
      })
        .then((response) => response.json())
        .then((points) => {
          console.log(points);
          if (points.success) {
            navigate("/game-end",{state: {userPoints: userScore, topscore: topScore, topUser: topUser.USERNAME}});
          }
        })
        .catch((error) => console.log(error));
    }
  }, [secondsLeft]);

  if (!isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 0);
    return null;
  }

  if(!validGame) {
    setTimeout(() => {
      navigate("/join-start");
    }, 0);
    return null;
  }

  function handleMcClick(val) {
    setMcAnswer(val);
  }

  function handleTfClick(val) {
    setTfAnswer(val);
  }

  // Score calculation, disabling Submit button
  const handleSubmitButton = () => {
    //setIsButtonDisabled(true);
    waitForUsersAlert();

    if (
      fibAnswer.toLowerCase() == correctOption.toLowerCase() ||
      tfAnswer == tf ||
      mcAnswer == correctOption
    ) {
      console.log("Correct!");
      const newScore = Math.floor((100 / (20 - secondsLeft)) * level);
      setUserScore((prevScore) => prevScore + newScore);

      const updateUserScore = {
        new_score: userScore + Math.floor((100 / (20 - secondsLeft)) * level),
        game_id: gameId,
        user_id: id,
      };

      fetch("http://127.0.0.1:4000/update_score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUserScore),
      })
        .then((response) => response.json())
        .then((score) => {
          console.log(score);
          if (score.success) {
            fetch(`http://127.0.0.1:4000/game_top_score?gameId=${gameId}`)
              .then((response) => response.json())
              .then((topUserScore) => {
                setTopScore(topUserScore.top_score);
                setTopUser(topUserScore.top_user_username);
                console.log(topUser.USERNAME);
                console.log(topUserScore);
                setFibAnswer("");
                setTfAnswer(null);
                setMcAnswer("");
              })
              .catch((error) =>
                console.error("Error fetching getting top score:", error)
              );
          } else {
            console.log("Failed to Update User Score!");
          }
        })
        .catch((error) => console.log(error));
    }
  };

   // Wait for Users Alert
   const tellUserToWait = () => toast.info(`There are ${secondsLeft} seconds left. Sit tight while everyone submits their answers!`);

   const waitForUsersAlert = () => {
     if (secondsLeft > 0) {
       tellUserToWait();
     }
   };
 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href={XMarksLogo} />
        <title>X Marks the Spot</title>
      </head>
      <body>
        <div className="row row-0">
          <div className="column-0">
            <p className="top-score">Top Score: {topScore}</p>
          </div>
          <div className="column-0">
            <p className="user-score">Your Score: {userScore}</p>
          </div>
        </div>{" "}
        {/*top and current user scores*/}
        <div className="row center-on-page">
          <div className="column">
            {" "}
            <h2>{question}</h2>
            {flag && (
              <div>
                <img
                  className="mb-10"
                  src={require("../" + flag)}
                  alt="Country Flag"
                />
              </div>
            )}
          </div>
          <div className="column">
            {" "}
            {/*column containing the answer choices*/}
            <div className="display-container">
              {display === "fib" && ( // 1 = fib
                <div className="circular-container">
                  <input
                    type="text"
                    className="circular-input"
                    placeholder="Type in answer..."
                    onChange={(event) => {
                      // alert("Your answer has been noted. Sit tight while everyone answers!");
                      setFibAnswer(event.target.value);
                    }}
                  />
                </div>
              )}

              {display === "mc" && ( // 2 = mcq
                <div className="new-circular-containers">
                  {options.map((choice, key) => (
                    <button
                      key={key}
                      onClick={() => handleMcClick(choice)}
                      className={`round-button${key % 2 != 0 ? "-two" : ""}`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
              {display === "tf" && ( // 3 = TF
                <div className="new-circular-containers">
                  <button
                    onClick={() => handleTfClick(true)}
                    className="round-button"
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleTfClick(false)}
                    className="round-button-two"
                  >
                    False
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row row-1">
          {" "}
          {/*row contains timer and arbitrary submit button*/}
          <div className="column column-1">
            <h3>
              Time Remaining: {secondsLeft > 0 ? secondsLeft : "Time's up!"}{" "}
              seconds
            </h3>
          </div>
          <div className="column column-1">
            <button onClick={handleSubmitButton} disabled={isButtonDisabled} className="submit-answer">
              Submit
            </button>
            <ToastContainer
                position="top-center"
                transition={Slide}
            />
          </div>
        </div>
      </body>
    </html>
  );
};

export default QuizQuestionPage;
