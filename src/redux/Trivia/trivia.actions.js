import triviaTypes from './trivia.types';
import axios from 'axios'
import { firestore } from './../../firebase/utils';
import { auth, user, handleUserProfile, GoogleProvider } from './../../firebase/utils';



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



export const setTrivia = (triviaSettings) => async dispatch => {
    const res = await axios.get(`https://opentdb.com/api.php?amount=10`)
    const result = res.data.results

    const answerShuffle = apiFiltering(result)

    const countAPI = `amount=${triviaSettings.count}`
    const categoryAPI = `&category=${triviaSettings.category}`
    const difficultyAPI = `&difficulty=${triviaSettings.difficulty}`
    const typeAPI = `&type=${triviaSettings.type}`

    const res1 = await axios.get(`https://opentdb.com/api.php?${countAPI}${categoryAPI}${difficultyAPI}${typeAPI}`)

    console.log(res1.data.response_code)
    //if data with settings is requested 
    if(res1.data.response_code == 0){
        const result = res1.data.results
        const answerShuffle = apiFiltering(result)
        console.log("response_code == 0")

    try {
        dispatch({
        type: triviaTypes.SET_TRIVIA,
        payload: res1.data.results,
        payloadAnswers:answerShuffle
    }); 
    }catch(err){
        dispatch( {
            type: triviaTypes.SET_TRIVIA_ERR,
            payload: err,
        })
    }
}else{
    //default status
    try {
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
}


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


export const SetTriviaUserAnswer = (triviaUserAnswer,correctAnswerCount, user ) => async dispatch =>{

            try{
                const timestamp = new Date();
                // send results to firebase 
                if (user !== null) { // check if logged in, else dont care
                    const { uid } = auth.currentUser;
                    const userRef = firestore.doc(`users/${uid}`);

                    const res = userRef.collection('answers').add({
                        triviaUserAnswer,
                        correctAnswerCount,
                        createdDate: timestamp
                    });
                    handleUserProfile(user,{res})

                dispatch({
                    type: triviaTypes.CHECK_TRIVIA_ANSWERS,
                    payload: triviaUserAnswer, //answers users picked
                    payloadCount:correctAnswerCount // number of answers correct
                    
                    
                })}else{
                    console.log("user=null")
                }
            
            }catch(err){
                console.log(err)
            }
}

export const GetTriviaUserAnswer = (user) => async dispatch => {

    try{
        if (user !== null) {
        //get users previous answers from subcollection, userRef = collection + doc, res = subcollection 
            const data = []
            const { uid } = auth.currentUser;
            const userRef = firestore.doc(`users/${uid}`);
            const res = userRef.collection('answers');
            await res.get().then(response => {
                response.docs.forEach(document => {
                    const fetchedData = {
                        id:document.id, 
                        ...document.data()
                    }
                    data.push(fetchedData);

                })
                return data
            })

            
            dispatch({
                type: triviaTypes.GET_TRIVIA_ANSWERS,
                payload: data
            })


        }

    }catch(err){

    }

 
}
            
