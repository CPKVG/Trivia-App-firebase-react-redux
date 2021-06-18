const triviaTypes = {
    SET_TRIVIA:'SET_TRIVIA', //get api data; array
    
    SET_TRIVIA_ERR:'SET_TRIVIA_ERR', //get api err
    
    ADD_TRIVIA_COUNT:'ADD_TRIVIA_COUNT',

    REDUCE_TRIVIA_COUNT:'REDUCE_TRIVIA_COUNT',

    SET_TRIVIA_SETTINGS:'SET_TRIVIA_SETTINGS',

    SET_TRIVIA_CATEGORY:'SET_TRIVIA_CATEGORY', //setTrivia category for api

    RESET_TRIVIA:'RESET_TRIVIA', //reset trivia + settings ; bool

    SET_USER_ANSWERS:'SET_USER_ANSWERS',//user's answers; array

    SET_USER_DIFFICULTY:'SET_USER_DIFFICULTY', //user select difficulty type; array
    
    SET_USER_CATEGORY:'SET_USER_CATEGORY', // user select Catagory type:array

  };
  
  export default triviaTypes;