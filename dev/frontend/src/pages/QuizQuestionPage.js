import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState, useEffect } from 'react';

const QuizQuestionPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedDisplay, setSelectedDisplay] = useState(null);
    
    const [question, setQuestion] = useState("");
    const [flag, setFlag] = useState(false);
    
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [choiceType, setChoiceType] = useState("");

    const [mcChoices, setMcChoices] = useState([]);
    const [tfChoice, setTfChoice] = useState(null);

    useEffect(() => {
      setSubmitted(false);

      const randomNumber = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3
      setSelectedDisplay(randomNumber);

      // 1 = fib, 2 = mc, 3 = tf
      const questionType = randomNumber === 1 ? "fib" : randomNumber === 2 ? "mc" : "tf";
        
      fetch(`http://127.0.0.1:4000/question/get/${questionType}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(question => {
        if(question.success) {
          const result = question.result;

          const q = result.question;
          setQuestion(q);

          const flag = result.display_flag;
          setFlag(flag);

          console.log(result.display_flag)

          if(questionType == "mc" || questionType == "fib") {
            const choice_type = result.choice_type;
            setChoiceType(choice_type);

            const correct_option = result.correct_option;  
            setCorrectAnswer(correct_option);
          
            if(questionType == "mc") {
              const options = result.options;

              const newMcChoices = [null, null, null, null];

              options.forEach(option => {
                const nullIndices = newMcChoices.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
                const randomIndex = nullIndices[Math.floor(Math.random() * nullIndices.length)];

                newMcChoices[randomIndex] = option
              });

              const emptyIndex = newMcChoices.findIndex(idx => idx === null);
              if (emptyIndex !== -1) {
                newMcChoices[emptyIndex] = correctAnswer;
              }
            
              setMcChoices(newMcChoices);
              console.log(newMcChoices);
            }
          
          } else if(questionType == "tf") {
            const tf = result.tf;
            setTfChoice(tf);
          }
        } else {
          console.log("Fail: ", question.message);
        }
      })
    }, [submitted])

    const handleButtonClick = () => { // generates random number to user for selecting which elements to dynamically generate
        //check answer  

        setSubmitted(true);
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
                        <p className="user-score">Your Score: </p>
                    </div>
                </div> {/*top and current user scores*/}
                <div className="row center-on-page">
                    <div className="column"> {/*column containing the question*/}
                        {flag && <div>*Insert flag icon*</div>}

                        <h2>{question}</h2>
                    </div>
                    <div className="column"> {/*column containing the answer choices*/}
                      <div className="display-container">

                        {selectedDisplay === 1 && ( // 1 = fib
                          <div className="circular-container">
                            <input type="text" className="circular-input" placeholder="Type in answer..." />
                          </div>
                        )}
                        {selectedDisplay === 2 && ( // 2 = mcq
                          <div className="new-circular-containers">
                            {mcChoices.map((choice, key) => <button key={key} className={`round-button${key % 2 != 0 ? "-two" : ""}`}>{choice[choiceType]}</button>)}
                          </div>
                        )}
                        {selectedDisplay === 3 && ( // 3 = TF
                          <div className="new-circular-containers">
                            <button className="round-button">True</button>
                            <button className="round-button-two">False</button>
                          </div>
                        )}
                      </div>
                    </div>
                </div>
                <div className="row row-1"> {/*row contains timer and arbitrary submit button*/}
                    <div className="column column-1">
                        <h3>Time Remaining: XX seconds</h3>
                    </div>
                    <div className="column column-1">
                        <button onClick={handleButtonClick} className="submit-answer">Submit</button>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default QuizQuestionPage;
