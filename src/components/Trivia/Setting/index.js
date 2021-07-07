import React ,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setTriviaSettings,setTrivia } from './../../../redux/Trivia/trivia.actions'

import styles from './styles.scss'

const Setting = () => {
    const dispatch = useDispatch();

    const [count, handleSetCount] = useState(10)
    const [category, handleSetCategory] = useState('')
    const [difficulty, handleSetDifficulty] = useState('')
    const [type, handleSetType] = useState('')

    // const [errMsg, handleErrMsg] = useState('')


    //*****if(count > 26) // build an error message like trivia index if count is greater than 25

    const triviaSettings = {count, category, difficulty, type} 
    // dispatch(setTrivia(triviaSettings))


    const handleOptionSubmit = (e) => {
        e.preventDefault();
        dispatch(setTriviaSettings(triviaSettings))
        // setTrivia to reset and bring up trivia + settings??
        dispatch(setTrivia(triviaSettings))
     }



     // need to change this dynamically with out clicking submit
    //  useEffect(() => {
    //     dispatch(setTrivia(triviaSettings))

    //  }, [])



    return (
    <div>
        <form onSubmit = {handleOptionSubmit}>
            <div className = "optionForm">

            <div className = "formInput">
                Number of questions :
                <input type="text" placeholder = "10" onChange = {(e) => handleSetCount(e.target.value)}></input>
                (max 50)
            </div>


            <div className = "formSelect">
                Select Category :
                <select value = {category} onChange = {(e) => handleSetCategory(e.target.value)}>
                    {/* <option value="DEFAULT" disabled>Select Category</option> */}
                    <option value="DEFAULT">Random</option>
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
            </div>


            <div className = "formSelect">
                Select Difficulty :
                <select value = {difficulty} onChange = {(e) => handleSetDifficulty(e.target.value)}>
                {/* <option value="DEFAULT" disabled>Select Difficulty</option> */}
                    <option value = "DEFAULT"> Random </option>
                    <option value = "easy"> Easy </option>
                    <option value = "medium"> Medium </option>
                    <option value = "hard"> Hard </option>
                </select>
            </div>

            <div className = "formSelect">
                Select Question Type (multichoice or true/false) : 
                <select value = {type} onChange = {(e) => handleSetType(e.target.value)}>
                {/* <option value="DEFAULT" disabled>Select Answer Type</option> */}
                    <option value = "DEFAULT"> Random </option>
                    <option value = "multiple"> Multi-choice </option>
                    <option value = "boolean"> true/false</option>
                </select>
            </div>


            <button type = "submit">
                Generate new trivia (with settings)
            </button> 
            </div> 
        </form>

            
    </div>
    )
}

export default Setting
