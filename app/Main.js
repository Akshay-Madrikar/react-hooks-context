import React, { useState, useReducer, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:5000'; // this will be used for every request made to that server

import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';
import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

function Main() {
  //const { avatar, token, username } = JSON.parse(localStorage.getItem('data'));

    const INTAIL_STATE = {
      loggedIn: Boolean(localStorage.getItem('data')),
      flashMessages: [],
      user: {
        token: '',
        username: '',
        avatar: ''
      }
    };

    // const ourReducer = ( state, action ) => {
    //   switch(action.type) {
    //     case 'LOGIN':
    //       return { 
    //         loggedIn: true,
    //         flashMessages: state.flashMessages 
    //       }
    //     case 'LOGOUT':
    //       return { 
    //         loggedIn: false,
    //         flashMessages: state.flashMessages 
    //       }
    //     case 'FLASH_MESSAGE':
    //       return { 
    //         loggedIn: state.loggedIn,
    //         flashMessages: state.flashMessages.concat(action.value) 
    //       }
    //   }
    // };

    //------ Immer way of writing reducers -------------
    const ourReducer = ( draft, action ) => {
      switch(action.type) {
        case 'LOGIN':
          draft.loggedIn = true;
          draft.user = action.payload
          return
        case 'LOGOUT':
          draft.loggedIn = false
          return
        case 'FLASH_MESSAGE':
          draft.flashMessages.push(action.value)
          return
      }
    };

    //const [ state, dispatch ] = useReducer(ourReducer, INTAIL_STATE);
    const [ state, dispatch ] = useImmerReducer(ourReducer, INTAIL_STATE); // using to have existing state of the app

    useEffect(() => {
      if (state.loggedIn) {
        localStorage.setItem('data', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('data');
      }
    }, [state.loggedIn]);

    return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages}/>
          <Header />
          <Switch>
            <Route exact path="/" component={ state.loggedIn ? Home : HomeGuest } />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/create-post" component={CreatePost} />
            <Route exact path="/post/:id" component={ViewSinglePost} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
    );
};

ReactDOM.render(<Main/>,
    document.querySelector("#app")
);

if(module.hot) {
    module.hot.accept();
};