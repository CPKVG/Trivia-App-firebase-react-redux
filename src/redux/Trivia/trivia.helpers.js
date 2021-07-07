// import { firestore } from './../../firebase/utils';


// //pass data into trivia db firebase
// export const handleAddTrivia = trivia => {
//     return new Promise((resolve, reject) => {
//       firestore
//         .collection('trivia')
//         .doc()
//         .set(trivia)
//         .then(() => {
//           resolve();
//         })
//         .catch(err => {
//           reject(err);
//         })
//     });
//   }

// //retrive data from trivia db firebase
//   export const handleFetchTrivia = (trivia) => {
//     return new Promise((resolve, reject) => {
//       firestore
//         .collection('products')
//         .doc(trivia)
//         .get()
//         .then(snapshot => {
//           if(snapshot.exists){
//             resolve(
//               snapshot.data()
//             );
//           }
//         })
//         .catch(err => {
//           reject();
//         })
//     })
//   }