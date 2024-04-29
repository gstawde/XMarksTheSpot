import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const QuizQuestionPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [secondsLeft, setSecondsLeft] = useState(30);
  const [id, setId] = useState();

  const quiz = location.state?.quiz;

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(quiz[0]);

  const [display, setDisplay] = useState(quizQuestion.question_type);
  const [question, setQuestion] = useState(quizQuestion.question);
  const [level, setLevel] = useState(quizQuestion.level);
  const [choiceType, setChoiceType] = useState(quizQuestion.choice_type);
  const [correctOption, setCorrectOption] = useState(quizQuestion.main_option);

  function setOptionChoices(q) {
    if(q.question_type == "mc") {
      let arrayLen = q.incorrect_options.length + 1;
      const optionChoices = Array(arrayLen).fill(null);

      const incorrectOptions = q.incorrect_options;

      incorrectOptions.forEach(option => {
        const nullIndices = optionChoices.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
        const randomIndex = nullIndices[Math.floor(Math.random() * nullIndices.length)];

        optionChoices[randomIndex] = option
      });

      const emptyIndex = optionChoices.findIndex(idx => idx === null);
      if (emptyIndex !== -1) {
        optionChoices[emptyIndex] = q.main_option;
      }

      return optionChoices;
    } else if (q.question_type == "tf") {
      const optionChoices = ["True", "False"]
    } else {
      return null;
    }
  }
  const [options, setOptions] = useState(setOptionChoices(quizQuestion));

  function setFlagPath(q) {
    if(q.question_type == "mc" || q.question_type == "fib") {
      if(q.display_flag) {
        return q.main_option.flag;
      } else {
        return null;
      }
    } else if(q.question_type == "tf") {
      if(q.tf) {
        if(q.display_flag) {
          return q.main_option.flag;
        } else {
          return null;
        }
      } else {
        if(q.display_flag) {
          return q.incorrect_options.flag;
        } else {
          return null;
        }
      }
    }
  }
  const [flag, setFlag] = useState(setFlagPath(quizQuestion));
  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");

      const idFromCookie = JSON.parse(authCookie).user_id;
      setId(idFromCookie);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(secondsLeft == 30) {
      
    }

    if(secondsLeft === 0 && quizIdx < 14) {
      setQuizIdx((prevIdx) => prevIdx + 1);

      const nextQuestion = quiz[quizIdx + 1];
      
      setQuizQuestion(nextQuestion);

      console.log(nextQuestion);
      
      setSecondsLeft(30);
    } else if (quizIdx == 14) {
      console.log("Quiz done");
    }

  }, [secondsLeft]);

  useEffect(() => {
    setDisplay(quizQuestion.question_type);
    setQuestion(quizQuestion.question);
    setLevel(quizQuestion.question_level);
    setChoiceType(quizQuestion.choice_type);
    setCorrectOption(quizQuestion.main_option);
    setOptions(setOptionChoices(quizQuestion));
    setFlag(setFlagPath(quizQuestion));
  }, [quizQuestion])

  const [fib, setFib] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  
  const handleButtonClick = () => {
    console.log(choiceType);
    console.log(correctOption);
    console.log(fib);
    if (display === "fib") { 
      if (fib === correctOption[choiceType]) {
        const newScore = Math.floor((100 / (30 - secondsLeft)) * level); 
        setUserScore(prevScore => prevScore + newScore);

        const updateUserScore = {
          new_score: userScore + Math.floor((100 / (30 - secondsLeft)) * level), 
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
            setSecondsLeft(30);
            setFib("");
            fetch(`http://127.0.0.1:4000/game_top_score?gameId=${gameId}`)
            .then((response) => response.json())
            .then((topUserScore) => {
              setTopScore(topUserScore.top_score);
              console.log(topUserScore);
            })
            .catch((error) => console.error("Error fetching getting top score:", error));
          } else {
            console.log("Failed to Update User Score!");
          }
        })
        .catch((error) => console.log(error));
      }
    }     
  }

  const [buttonClicked, setButtonClicked] = useState(false);
  const testFunc = () => {
    if (secondsLeft > 0) {
      alert(`There are ${secondsLeft} seconds left. Sit tight while everyone submits their answers!`);
    }
    setButtonClicked(true);
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
              {display == "fib" && ( // 1 = fib
                <div className="circular-container">
                  <input
                    type="text"
                    className="circular-input"
                    placeholder="Type in answer..."
                    onChange={(event) => {
                      alert("Your answer has been noted. Sit tight while everyone answers!");
                      setFib(event.target.value);
                    }}
                  />
                </div>
              )}
              {display == "mc" && ( // 2 = mcq
                <div className="new-circular-containers">
                  {options.map((choice, key) => (
                    <button
                      key={key}
                      className={`round-button${key % 2 != 0 ? "-two" : ""}`}
                    >
                      {choice[choiceType]}
                    </button>
                  ))} 
                  <button onClick={testFunc} className="round-button">TEST</button>
                  <button onClick={testFunc} className="round-button-two">TEST</button>
                  <button onClick={testFunc} className="round-button-two">TEST</button>
                  <button onClick={testFunc} className="round-button">TEST</button>
                  
                </div>
              )}
              {display == "tf" && ( // 3 = TF
                <div className="new-circular-containers">
                  <button onClick={testFunc} className="round-button">True</button>
                  {/*{buttonClicked && secondsLeft > 0 && <p>Sit tight!</p>}*/}
                  <button onClick={testFunc} className="round-button-two">False</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row row-1">
          {" "}
          {/*row contains timer and arbitrary submit button*/}
          <div className="column column-1">
            <h3>Time Remaining: {secondsLeft > 0 ? secondsLeft : "Time's up!"} seconds</h3> 
          </div>
          <div className="column column-1">
            <button onClick={handleButtonClick} className="submit-answer">
              Submit
            </button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default QuizQuestionPage;
