## Trivia Application 
Trivia generator users can customise by:
* Selecting category
* Answer type (bool vs multi) 
* Difficulty  
* Number of questions

The data API is fetched from [https://opentdb.com/](https://opentdb.com/), a user-contributed trivia question database. 

Optional mannual Email/Password and sign-in-with-google is built into this application. 

Built with React, JavaScript and firebase as BaaS. 


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine + listed dependancies 

* [Redux](https://redux.js.org/introduction/installation)
  * [Redux-Thunk](https://www.npmjs.com/package/redux-thunk)
  * [Redux-logger](https://www.npmjs.com/package/redux-logger)
* [Firebase](https://www.npmjs.com/package/firebase)
* [Sass](https://www.npmjs.com/package/sass)
* [axios](https://www.npmjs.com/package/axios)
* [react-router-dom](https://reactrouter.com/web/guides/quick-start)

## Setting up Firebase 
Firebase's official doc on setting up firebase is kinda hard to follow so, use the
[unoffical one](https://www.codegrepper.com/code-examples/shell/how+to+install+firebase+in+react+js) instead

###### ==Firebase ConfigAPI==

You need to create an account with firebase, start by making a project and retrive it's API
Insert the API in : ```src/firebase/config.js```

![firebaseConfig](/src/images/firebaseImg/firebaseConfig.PNG)




###### ==Setting up Login/Signup Method==
Enable both `Email/Password` and `Google`
![userAuth1](/src/images/firebaseImg/userAuth(1).PNG)


![userAuth2](/src/images/firebaseImg/userAuth(2).PNG)
![userAuth3](/src/images/firebaseImg/userAuth(3).PNG)

If successful, for users who signed in, their email will appear under identifier with their users unique ID    
![userAuth4](/src/images/firebaseImg/userAuth(4).PNG)




## Accessing Firebase Database

To access user's trivia answers, select ``firebase database`` underneath authentication and select ``answers`` underlined red in the image below

![triviaFirebaseDb1](/src/images/firebaseImg/trivia_firebase_db(1).PNG)
The document within answers are unique ID's for that session, select whichever one to access users data
![triviaFirebaseDb2](/src/images/firebaseImg/trivia_firebase_db(2).PNG)
