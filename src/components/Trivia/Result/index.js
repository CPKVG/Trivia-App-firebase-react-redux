import React ,{useState, useEffect } from 'react'


import { useSelector } from 'react-redux';



const Result = () => {

    // const userAnswers = useSelector(state => state.userAnswers)
    const userAnswers = useSelector(state => state.trivia) // this trivia comes from rootReducer

    const {loading, correctAnswerCount, err} = userAnswers

    return (
        <div>

        {loading ? "Loading..." : err ? err.message : Object.values(correctAnswerCount).map((value) =><p>You Scored: {value} correct answer</p>) }

            <h1>test</h1>
        </div>
    )
}

export default Result
