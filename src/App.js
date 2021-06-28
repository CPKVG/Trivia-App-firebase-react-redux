import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route } from 'react-router-dom';

//components 

//hoc
// import WithAuth from './hoc/withAuth';
// import WithAdminAuth from './hoc/withAdminAuth';

//layouts 
import HomepageLayout from './layouts/HomepageLayout';
//pages
import Homepage from './pages/Homepage';

import Resultpage from './pages/Resultpage'

import './default.scss';
//actions

export const App = () => {


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
        </Switch>
  
      </div>
    );
  }
 


export default App
