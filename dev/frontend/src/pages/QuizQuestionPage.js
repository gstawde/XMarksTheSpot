import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState } from 'react';

const QuizQuestionPage = () => {

    const [selectedDisplay, setSelectedDisplay] = useState(null);

    const handleButtonClick = () => { // generates random number to user for selecting which elements to dynamically generate
        const randomNumber = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3
        setSelectedDisplay(randomNumber);
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
                        <h2>This is an example of a question...</h2>
                    </div>
                    <div className="column"> {/*column containing the answer choices*/}
                        <div className="display-container">
                            {selectedDisplay === 1 && ( // 1 = frq
                                <div className="circular-container">
                                    <input type="text" className="circular-input" placeholder="Type in answer..." />
                                </div>
                            )}
                            {selectedDisplay === 2 && ( // 2 = mcq
                                <div className="new-circular-containers">
                                    <button className="round-button">TEST</button>
                                    <button className="round-button-two">TEST</button>
                                    <button className="round-button-two">TEST</button>
                                    <button className="round-button">TEST</button>
                                </div>
                            )}
                            {selectedDisplay === 3 && ( // 3 = TF
                                <div className="new-circular-containers">
                                    <button className="round-button">TEST</button>
                                    <button className="round-button-two">TEST</button>
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
