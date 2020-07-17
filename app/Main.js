import React, { useState } from 'react'
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

function Main() {

    const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('data')));
    const [flashMessages, setFlashMessages] = useState([]);

    const addFlashMessage = (msg) => {
      setFlashMessages(prev => prev.concat(msg))
    }

    return (
    <BrowserRouter>
    <FlashMessages messages={flashMessages}/>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route exact path="/" component={ loggedIn ? Home : HomeGuest } />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/create-post" render={() => <CreatePost addFlashMessage={addFlashMessage}/>} />
        <Route exact path="/post/:id" component={ViewSinglePost} />
      </Switch>
      <Footer />
    </BrowserRouter>
    );
};

ReactDOM.render(<Main/>,
    document.querySelector("#app")
);

if(module.hot) {
    module.hot.accept();
};