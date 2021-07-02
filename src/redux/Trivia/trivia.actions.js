import triviaTypes from './trivia.types';
import axios from 'axios'



function apiFiltering(result){ // this is used for both setTrivia and triviaSettings as they request different data 

    const answers = result.map((results) => [results.correct_answer, ...results.incorrect_answers]);

    function shuffle(array){
        array = array.sort(() => Math.random() - 0.5)
        return array
    }

    const answerShuffle = []

    answers.forEach((item => answerShuffle.push(shuffle(item))));

    return(
        answerShuffle
    )
}


export const setTrivia = () => async dispatch => {
    
    try {

        const res = await axios.get(`https://opentdb.com/api.php?amount=10`)

        const result = res.data.results

        const answerShuffle = apiFiltering(result)
        
        dispatch({
        type: triviaTypes.SET_TRIVIA,
        payload: res.data.results,
        payloadAnswers:answerShuffle
    });
    }catch(err){
        dispatch( {
            type: triviaTypes.SET_TRIVIA_ERR,
            payload: err,
        })
    }
}


export const setTriviaSettings = (triviaSettings) => async dispatch =>{
    const countAPI = `amount=${triviaSettings.count}`
    const categoryAPI = `&category=${triviaSettings.category}`
    const difficultyAPI = `&difficulty=${triviaSettings.difficulty}`
    const typeAPI = `&type=${triviaSettings.type}`

    const res = await axios.get(`https://opentdb.com/api.php?${countAPI}${categoryAPI}${difficultyAPI}${typeAPI}`)

    const result = res.data.results

    const answerShuffle = apiFiltering(result)



    try{
        dispatch({
            type: triviaTypes.SET_TRIVIA_SETTINGS,
            payload: triviaSettings,
            payloadRes: answerShuffle,
        })
    }catch(err){
        console.log(err)
    }
}




export const SetTriviaUserAnswer = (triviaUserAnswer,correctAnswerCount) => async dispatch =>{
    try{

        dispatch({
            type: triviaTypes.CHECK_TRIVIA_ANSWERS,
            payload: triviaUserAnswer, //answers users picked
            payloadCount:correctAnswerCount // number of answers correct
        }) 
    
    }catch(err){
        console.log(err)
    }

}



// // count the amount of correct answers from triviaUserAnswer
// export const SetTriviaCount = (correctAnswerCount) => async dispatch =>{
//     // const correctAnswerCount = Object.values(triviaUserAnswer).reduce(((count, {mark}) => mark == 'Correct' ? count + 1 : count), 0) 
//     // const correctAnswerCount = ''
//     // console.log(correctAnswerCount,"action")
//     try{
//         dispatch({
//             type: triviaTypes.CHECK_TRIVIA_ANSWERS_SCORE,
//             payload: correctAnswerCount
//         })
//     }catch(err){
//         console.log(err)
//     }

// }

// export const SetTriviaCount = () => async dispatch =>{
//     // const correctAnswerCount = Object.values(triviaUserAnswer).reduce(((count, {mark}) => mark == 'Correct' ? count + 1 : count), 0) 
//     const correctAnswerCount =''
//     try{
//         dispatch({
//             type: triviaTypes.CHECK_TRIVIA_ANSWERS_SCORE,
//             payload: correctAnswerCount
//         })
    
//     }catch(err){
//         console.log(err)
//     }

// }
