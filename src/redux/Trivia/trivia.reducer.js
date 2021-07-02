import triviaTypes from './trivia.types';

const INITIAL_STATE = {
    triviaData: [],
    loading:true,
    

    triviaShuffleAnswers:[],

    triviaUserAnswer:[],

    correctAnswerCount:[],
    triviaSetting:[],

    user_correct_answers: [],
    user_incorrect_answers:[],

};

const triviaReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case triviaTypes.SET_TRIVIA:
        return {
            ...state,
            triviaData: action.payload, // default setup from api
            triviaShuffleAnswers: action.payloadAnswers, // data api modified, answers shuffled
            loading: false,
        }
        case triviaTypes.SET_TRIVIA_ERR:
        return{
            loading: false, 
            err: action.payload 
        }

        case triviaTypes.SET_TRIVIA_SETTINGS:
            return{
            ...state,
                triviaSetting: action.payload,
                triviaDataSetting:action.payloadRes,
                loading: false,
        }

        case triviaTypes.CHECK_TRIVIA_ANSWERS: //checks with selected answers with default api    
        return {
            ...state,
            triviaUserAnswer: action.payload,
            correctAnswerCount: action.payloadCount,
            loading: false,
            
        }


        
        default:
        return state;
    }
    }
    
export default triviaReducer;