import "./quiz-question-page.css";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useState } from 'react';

const QuizQuestionPage = () => {

    const [selectedDisplay, setSelectedDisplay] = useState(null);

    const handleButtonClick = () => {
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
                <div className="row">
                    <div className="column">
                        <h2>This is an example of a question...</h2>
                    </div>
                    <div className="column">
                        <div className="display-container">
                            {selectedDisplay === 1 && (
                                <div className="circular-container">
                                    <input type="text" className="circular-input" placeholder="Type in answer..." />
                                </div>
                            )}
                            {selectedDisplay === 2 && (
                                <div className="new-circular-containers">
                                    <button className="round-button">TEST</button>
                                    <button className="round-button-two">TEST</button>
                                    <button className="round-button-two">TEST</button>
                                    <button className="round-button">TEST</button>
                                </div>
                            )}
                            {selectedDisplay === 3 && (
                                <div className="new-circular-containers">
                                    <button className="round-button">TEST</button>
                                    <button className="round-button-two">TEST</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <h3>Time Remaining: XX seconds</h3>
                        <button onClick={handleButtonClick} className="submit-answer">Submit</button>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default QuizQuestionPage;
