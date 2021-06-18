import triviaTypes from './trivia.types';

const INITIAL_STATE = {
    triviaData: [],
    loading:true,
    

    triviaShuffleAnswers:[],
    triviaSetting:[],

    user_correct_answers: [],
    user_incorrect_answers:[],

};

const triviaReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case triviaTypes.SET_TRIVIA:

  
          return {
            ...state,
            triviaData: action.payload,
            triviaShuffleAnswers: action.payloadAnswers,
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
            triviaSetting: action.payload
    }


        
        default:
        return state;
    }
    }
    
export default triviaReducer;