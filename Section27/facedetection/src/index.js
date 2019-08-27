import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/MainApp/App';
import * as serviceWorker from './serviceWorker';
import "tachyons";
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import { Provider} from 'react-redux';
import rootReducer from "./Containers/MainApp/reducer";
import {BrowserRouter as Router} from "react-router-dom";
import Thunk from 'redux-thunk';


//logger to log state in console
const store = createStore(rootReducer, applyMiddleware(logger, Thunk));


ReactDOM.render(

	<Provider store={store}> {/*This app use Provider from react-redux and store from redux*/}
		<Router>{/*This app use react-router*/}
			<App />
		</Router>
	</Provider>
	, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
