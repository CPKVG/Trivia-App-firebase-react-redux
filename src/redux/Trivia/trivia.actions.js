import triviaTypes from './trivia.types';
import axios from 'axios'


// const triviaParam = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`


// const triviaAmount = ''
// const triviaCategory = ''
// const triviaDifficulty = ''
// const triviaType = ''

    

export const setTrivia = () => async dispatch => {

    try {
        /*https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple */
        const res  = await axios.get(`https://opentdb.com/api.php?amount=10`) // default setting
        const results = res.data.results

        const answers = results.map((results) => [results.correct_answer, ...results.incorrect_answers]);

        function shuffle(array){
            array = array.sort(() => Math.random() - 0.5)
            return array
        }

        const answerShuffle = []

        answers.forEach((item => answerShuffle.push(shuffle(item))));
        // console.log(answerShuffle,"answerShuffle")
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




// export const addTriviaCount = (count) =>({
//     type: triviaTypes.ADD_TRIVIA_COUNT,
//     payload: count
//  });

//  export const reduceTriviaCount = (count) =>({
//     type: triviaTypes.REDUCE_TRIVIA_COUNT,
//     payload: count
//  });


export const setTriviaSettings = (triviaSettings) => async dispatch =>{
    try{
        dispatch({
            type: triviaTypes.SET_TRIVIA_SETTINGS,
            payload: triviaSettings
        })
    }catch(err){
        console.log(err)
    }
}


export const SetTriviaUserAnswer = (triviaUserAnswer ) => async dispatch =>{
    console.log(triviaUserAnswer,"action")
    

    try{
        dispatch({
            type: triviaTypes.CHECK_TRIVIA_ANSWERS,
            payload: triviaUserAnswer
        })
    
    }catch(err){
        console.log(err)
    }
}

