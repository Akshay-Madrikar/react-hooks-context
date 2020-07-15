import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeGuest from './components/HomeGuest';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';

function Main() {
    return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeGuest} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/terms" component={Terms} />
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