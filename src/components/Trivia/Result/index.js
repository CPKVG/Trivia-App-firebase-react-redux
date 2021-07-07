import React ,{useState, useEffect } from 'react'
import Button from '../../forms/Button';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import './styles.scss'


const Result = () => {
    const history = useHistory();


    // const userAnswers = useSelector(state => state.userAnswers)
    const userAnswers = useSelector(state => state.trivia) // this trivia comes from rootReducer

    const {loading, correctAnswerCount,triviaUserAnswer, err} = userAnswers



    const redirectToTrivia = () =>{
        let path = `/`;  // redirect back 
        history.push(path);
    }



    const showScore = () =>{
        return(
            <div>You got {correctAnswerCount} correct answers right!</div>
        )
    }

    const showResults = () =>{

        return(
            Object.values(triviaUserAnswer).map(({question,correct_answer,mark,users_answer}, index) =>
            <div id = {index} className = "results">

                <br/>

                {/* <ul class="list">
                    <li><span>{index + 1} </span>:{question}</li>
                </ul> */}

                <ol>
                <li value = {index + 1}>{question}</li>
                </ol>
                    { mark == "Incorrect" ? 
                    [<ul className="list">
                        <li>Your answer was: {mark}</li>
                        <li>Correct answer was: {correct_answer}</li>
                        <li>You answered: {users_answer}</li>
                    </ul>
                        ] : [
                    <ul className="list">
                        <li>You were: {mark}</li>
                        <li>You answered: {users_answer}</li>
                    </ul>
                        ]
                    }
        
            </div>
            )
        )
    }


    console.log(triviaUserAnswer,"triviaUserAnswer")
    
    return (
        <div>

        {loading ? "Loading Results..." : err ? err.message : [showScore() , showResults()]
        }

        {<Button onClick = {() => redirectToTrivia()} >Try Again</Button> }
        </div>
    )
}

export default Result
