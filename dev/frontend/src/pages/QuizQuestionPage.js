import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuizQuestionPage = () => {
  let { gameId } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(null);

  const [question, setQuestion] = useState("");
  const [flag, setFlag] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [choiceType, setChoiceType] = useState("");

  const [mcChoices, setMcChoices] = useState([]);
  const [tfChoice, setTfChoice] = useState(null);
  const [fibAnswer, setFibAnswer] = useState();

  const [userScore, setUserScore] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSubmitted(false);

    const randomNumber = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3
    setSelectedDisplay(randomNumber);

    // // 1 = fib, 2 = mc, 3 = tf
    // const questionType =
    //   randomNumber === 1 ? "fib" : randomNumber === 2 ? "mc" : "tf";

    // fetch(`http://127.0.0.1:4000/question/get/${questionType}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((question) => {
    //     if (question.success) {
    //       const result = question.result;

    //       const q = result.question;
    //       setQuestion(q);

    //       const flag = result.display_flag;
    //       setFlag(flag);

    //       console.log(result.display_flag);

    //       if (questionType == "mc" || questionType == "fib") {
    //         const choice_type = result.choice_type;
    //         setChoiceType(choice_type);

    //         const correct_option = result.correct_option;
    //         setCorrectAnswer(correct_option);

    //         if (questionType == "mc") {
    //           const options = result.options;

    //           const newMcChoices = [null, null, null, null];

    //           options.forEach((option) => {
    //             const nullIndices = newMcChoices
    //               .map((value, index) => (value === null ? index : -1))
    //               .filter((index) => index !== -1);
    //             const randomIndex =
    //               nullIndices[Math.floor(Math.random() * nullIndices.length)];

    //             newMcChoices[randomIndex] = option;
    //           });

    //           const emptyIndex = newMcChoices.findIndex((idx) => idx === null);
    //           if (emptyIndex !== -1) {
    //             newMcChoices[emptyIndex] = correctAnswer;
    //           }

    //           setMcChoices(newMcChoices);
    //           console.log(newMcChoices);
    //         }
    //       } else if (questionType == "tf") {
    //         const tf = result.tf;
    //         setTfChoice(tf);
    //       }
    //     } else {
    //       console.log("Fail: ", question.message);
    //     }
    //   });
  }, [submitted]);

  const handleButtonClick = () => {
    // console.log(choiceType);
    // console.log(correctAnswer);
    // console.log(fibAnswer);
    // if (selectedDisplay === 1) { 
    //   if (fibAnswer === correctAnswer[choiceType]) {
    //     const newScore = Math.floor((100 / (30 - secondsLeft)) * 1); // need to add difficulty level
    //     setUserScore(prevScore => prevScore + newScore);
         setSecondsLeft(30);
    //   }
    // }
    setSubmitted(true);
  };

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
            <p className="top-score">Top Score: </p>
          </div>
          <div className="column-0">
            <p className="user-score">Your Score: {userScore}</p>
          </div>
        </div>{" "}
        {/*top and current user scores*/}
        <div className="row center-on-page">
          <div className="column">
            {" "}
            {/*flag && (
              <div>
                <img
                  className="mb-10"
                  src={require("../" + correctAnswer.flag)}
                  alt="Country Flag"
                />
              </div>
            )} */}
            <h2>Question</h2>
          </div>
          <div className="column">
            {" "}
            {/*column containing the answer choices*/}
            <div className="display-container">
              {selectedDisplay === 1 && ( // 1 = fib
                <div className="circular-container">
                  <input
                    type="text"
                    className="circular-input"
                    placeholder="Type in answer..."
                    onChange={(event) => {
                      alert("Your answer has been noted. Sit tight while everyone answers!");
                    }}
                    // onChange={(event) => {
                    //   setFibAnswer(event.target.value);
                    // }}
                  />
                </div>
              )}
              {selectedDisplay === 2 && ( // 2 = mcq
                <div className="new-circular-containers">
                  {/* {mcChoices.map((choice, key) => (
                    <button
                      key={key}
                      className={`round-button${key % 2 != 0 ? "-two" : ""}`}
                    >
                      {choice[choiceType]}
                    </button>
                  ))} */}
                  <button onClick={testFunc} className="round-button">TEST</button>
                  <button onClick={testFunc} className="round-button-two">TEST</button>
                  <button onClick={testFunc} className="round-button-two">TEST</button>
                  <button onClick={testFunc} className="round-button">TEST</button>
                </div>
              )}
              {selectedDisplay === 3 && ( // 3 = TF
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
