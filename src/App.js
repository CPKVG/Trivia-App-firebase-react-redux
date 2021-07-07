import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//components 


// hoc
import WithAuth from './hoc/withAuth';

//layouts 
import HomepageLayout from './layouts/HomepageLayout';
//pages
import Homepage from './pages/Homepage';
import Resultpage from './pages/Resultpage'

import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import './default.scss';


const App = props => {
  // user auth
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        })
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  }, []);


    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
        )}/>
        <Route exact path="/results" render={() => (
            <HomepageLayout>
              <Resultpage />
            </HomepageLayout>
        )}/>
        
        <Route exact path="/registration" render={() => (
          <HomepageLayout>
            <Registration />
          </HomepageLayout>
        )} />
        <Route exact path="/login"
          render={() => (
            <HomepageLayout>
              <Login />
            </HomepageLayout>
          )} />
        <Route exact path="/recovery" render={() => (
          <HomepageLayout>
            <Recovery />
          </HomepageLayout>
        )} />
        <Route exact path="/dashboard" render={() => (
          <WithAuth>
            <HomepageLayout>
              <Dashboard />
            </HomepageLayout>
          </WithAuth>
        )} />
        </Switch>
  
      </div>
    );
  }
 


export default App
