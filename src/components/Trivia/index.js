import React ,{useState} from 'react'
import Button from './../forms/Button'
// import axios from 'axios'
import {setTrivia, setTriviaSettings, SetTriviaUserAnswer } from './../../redux/Trivia/trivia.actions'
import { useDispatch, useSelector } from 'react-redux';
import Results from './Result'
import { useHistory } from "react-router-dom";

    const Trivia = () => {

        const [count, handleSetCount] = useState('')
        const [category, handleSetCategory] = useState('')
        const [difficulty, handleSetDifficulty] = useState('')
        const [type, handleSetType] = useState('')


        const [values, setValues] = useState([])

        const trivia = useSelector(state => state.trivia)

//if user wants to change settings of trivia 
        const triviaSettings = {count, category, difficulty, type} 

        // const triviaAnswerShuffle = {incorrect_answers,correct_answer}


//trivia default, bypass settings 
        const {loading, triviaData, err, triviaShuffleAnswers} = trivia
        console.log(trivia,"trivia")
        
        //  const triviaUserAnswer = [{}]
        //  triviaUserAnswer.push({...values})

        const triviaUserValues = {...values}

        // const { triviaData } = useSelector();
        const dispatch = useDispatch();

        const onLoadTrivia = () =>{
            dispatch(setTrivia());
            // console.log(triviaData)
        }



/*PAGE REDIRECTION ONSUBMIT */
        const history = useHistory();

        // const routeChange = () =>{ 
        //     let path = `newPath`;  // redirect page to present results
        //     history.push(path);
        //   }
/*END */



        const handleOptionSubmit = (e) => {
            e.preventDefault();
            dispatch(setTriviaSettings(triviaSettings))
         }


        const handleInputChange = (e) =>{
            
            const { value, name, id } = e.target;
            
                setValues(prevValues => [...prevValues,{
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
            dispatch(SetTriviaUserAnswer({triviaUserAnswer},{correctAnswerCount}))


            let path = `results`;  // redirect page to present results
            history.push(path);

         }



         // create answer key  placement for shuffled answers 
        const answersAssign = (array) => [{"answers": array }] 

         //assign the answers key into the triviaData array as shuffledAnswers(these contained the shuffled answer data)
        const shuffledAnswers = triviaData.map((item, i) => Object.assign({},item, ...answersAssign(...[triviaShuffleAnswers[i]]) ))

        //shuffledAnswers will evenullay be used to match the answers from users to score them
        // console.log(shuffledAnswers,"shuffledAnswers")



        return (

            <div>
            <form onSubmit = {handleOptionSubmit}>

                {/* <input type = "text" value = {amount} onChange ={e => setAmount(e.target.value)}/> */}
                {/* <span className = "amountBtn"
                    onClick={() => handleAddTrivia(count)}>
                        {' + '}
                </span>

                <span className = "amountBtn"
                    onClick={() => handleReduceTrivia(count)}>
                        {' - '}
                </span> */}


                <input type="text" placeholder = "Number of questions" onChange = {(e) => handleSetCount(e.target.value)}></input>

                <select value = {category} onChange = {(e) => handleSetCategory(e.target.value)}>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment:Books</option>
                    <option value="11">Entertainment:Film</option>
                    <option value="12">Entertainment:Music</option>
                    <option value="13">Entertainment:Musicals &amp; Theatres</option>
                    <option value="14">Entertainment:Television</option>
                    <option value="15">Entertainment:Video Games</option>
                    <option value="16">Entertainment:Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science:Gadgets</option>
                    <option value="31">Entertainment:Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animation</option>
                </select>

                <select value = {difficulty} onChange = {(e) => handleSetDifficulty(e.target.value)}>
                    <option value = "easy"> Easy </option>
                    <option value = "medium"> Medium </option>
                    <option value = "hard"> Hard </option>
                </select>


                <select value = {type} onChange = {(e) => handleSetType(e.target.value)}>
                    <option value = "multiple"> Multi-choice </option>
                    <option value = "boolean"> true/false</option>
                </select>



                <button type = "submit">
                    Confirm Settings
                </button>
            </form>
            
            <Button onClick = {() => onLoadTrivia()}>
                Start Trivia
            </Button>
            
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
    
            {/* {showResults ? <Results/> : console.log("false")} */}
            </div>

        

    )
    }




    export default Trivia
    