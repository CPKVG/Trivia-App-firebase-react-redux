import React ,{useState} from 'react'
import Button from './../forms/Button'
// import axios from 'axios'
import {setTrivia, SetTriviaUserAnswer } from './../../redux/Trivia/trivia.actions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Setting from './Setting'

    const Trivia = () => {

//toggle display of settings input 
        const [displaySettings, setDisplaySettings] = useState(false) 


        const [values, setValues] = useState([])

        const trivia = useSelector(state => state.trivia)

//if user wants to change settings of trivia 

        // const triviaAnswerShuffle = {incorrect_answers,correct_answer}


//trivia default, bypass settings 
        const {loading, triviaData, err, triviaShuffleAnswers} = trivia

        const triviaUserValues = {...values}

        const dispatch = useDispatch();

        const triviaSettings = [] // default keep empty
        const onLoadTrivia = () =>{
            dispatch(setTrivia(triviaSettings));
        }

        const history = useHistory();

        const toggle = () => {
            setDisplaySettings(show => !show);
          }



        const handleInputChange = (e) =>{
            
            const { value, name, id } = e.target;
            
                setValues(prev => [...prev,{
                    id:id,
                    users_answer:value,
                    correct_answer:shuffledAnswers[id].correct_answer,
                    question:name,
                    mark:shuffledAnswers[id].correct_answer == value  ? 'Correct' : 'Incorrect'
                }])


      }


         const handleSubmit = (e) => {
             e.preventDefault();
            
            //function to group values by their ID (find duplicates)
            const groupBy = (objectArray, property) =>{
                return objectArray.reduce(function (acc, obj) {
                    const key = obj[property]
                        if (!acc[key]) { acc[key] = [] }
                        acc[key].push(obj)
                        
                        return acc
                  }, {}) 
            }
            const groupedIndex = groupBy(Object.values(triviaUserValues), 'id')

            const triviaUserAnswer = []

            Object.values(groupedIndex).map((key) =>{
                // groupedIndex.length == 1 ? updatedUserAnswers.push(key): updatedUserAnswers.push(key.slice(-1)) //prohibut slice(-1) on array length == 1
                triviaUserAnswer.push(...(key.slice(-1))) // remove all data except last inputed value
            })
            const correctAnswerCount = Object.values(triviaUserAnswer).reduce(((count, {mark}) => mark == 'Correct' ? count + 1 : count), 0) 
            console.log(correctAnswerCount,"correctAnswerCount")
            dispatch(SetTriviaUserAnswer(triviaUserAnswer,correctAnswerCount))


            let path = `results`;  // redirect page to present results
            history.push(path);

         }



         // create answer key  placement for shuffled answers 
        const answersAssign = (array) => [{"answers": array }] 

         //assign the answers key into the triviaData array as shuffledAnswers(these contained the shuffled answer data)
         // this will be key for HOC when triviaSetting is triggered 
        const shuffledAnswers = triviaData.map((item, i) => Object.assign({},item, ...answersAssign(...[triviaShuffleAnswers[i]]) ))
         
        //shuffledAnswers will evenullay be used to match the answers from users to score them




        return (

            <div>
            {/*toggle settings display */}
            <Button onClick = {() => toggle()}>
                Settings
            </Button>
            
            
            { displaySettings ? <Setting /> : 

            <Button onClick = {() => onLoadTrivia()}>
                Start Trivia (default)
            </Button> }
            

            {/*toggle start/reset trivia */}

            
            
            <br/>
                <form onSubmit = {handleSubmit}>
                {loading ? "Loading..." : err ? err.message : 
                
                    shuffledAnswers.map(({question, answers, correct_answer}, index) => 
                        <div>
                            
                            <p>{question}</p>
                            <p>{correct_answer}</p>
                            {answers.map((answers)=>
                                <div id={index}>
                                    
                                    <label>

                                    <input type="radio" name={question} id={index} value={answers} onChange={handleInputChange} />
                                    {answers}
                                    
                                    {/*add correct value as value = (answers, correct answers) and use these to compare*/}
                                    </label>
                                </div>
                                )}      
                        </div>
                ) 

                
         
        

            }

            {loading ? "Loading..." : err ? err.message : <button type="submit" > Submit </button>}
            </form>

            </div>

        

    )
    }




    export default Trivia
    