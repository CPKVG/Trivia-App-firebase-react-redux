import React ,{useState, useEffect } from 'react'
import Button from '../../forms/Button';
import {GetTriviaUserAnswer } from './../../../redux/Trivia/trivia.actions'
import { useDispatch, useSelector } from 'react-redux';

const Record = () => {

    const dispatch = useDispatch();

    const [hidden, setHidden] = useState({});



    const toggleHide = index => {
        setHidden({ ...hidden, [index]: !hidden[index] });
      };


const showSavedData = (e) =>{
    dispatch(GetTriviaUserAnswer())
}



const prevUserAnswers = (triviaUserAnswer) =>{
    return(
            Object.values(triviaUserAnswer).map(({question,correct_answer,mark,users_answer}, index) =>
            <div id = {index}>
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


const recordedAnswers = useSelector(state => state.trivia)
const {loading, fetchTriviaUserAnswer,err } = recordedAnswers
console.log(fetchTriviaUserAnswer,"fetchTriviaUserAnswer")


return(
    <div>

    {<Button onClick = {() => showSavedData()} >Show Previous Results</Button> }
    {loading ? "" : err ? err.message : 
        fetchTriviaUserAnswer.map(({createdDate,correctAnswerCount,triviaUserAnswer}, index) =>
        
            <div key = {index}>
                <p>{new Date(createdDate.seconds * 1000).toUTCString()}</p>
                <p>Number of correct answers : {correctAnswerCount}</p>

                {!!hidden[index] && <div>{[prevUserAnswers(triviaUserAnswer),<Button onClick = {() => toggleHide(index)}> Show Less </Button>]}</div>}
                {!hidden[index] && <div>{<Button onClick = {() => toggleHide(index)}> Show More </Button>} </div>}




            </div>
        )
    }
    

    </div>
)
}

export default  Record