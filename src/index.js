import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import {createStore} from 'redux'
import {Provider} from 'react-redux'


const stateFilm = {     //state global
  activeItems : 'home'
}

const reducerFilm = ( state = stateFilm , action ) => {
  console.log("action nya =>", action)
  switch(action.type){
    
    case "ACTIVE_ITEM":
      var stateActiveItems ={...state, activeItems : action.Activeitem}
      return stateActiveItems
      default:
        return state
  }
  
}

const store = createStore(reducerFilm)

ReactDOM.render(
  
    <Auth0Provider
    domain="tvmaze-film.us.auth0.com"
    clientId="PjqG5vNUH5kFBEJSxK3eV9g0Xl9hyuAS"
    redirectUri={window.location.origin}
    >
    <Provider store={store}>
    <Routes />
    </Provider>
    </Auth0Provider>
  ,
  document.getElementById('root')
);

