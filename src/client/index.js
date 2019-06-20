import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {Register} from '../client/containers';
import {Login} from '../client/containers';
import {MainPage} from '../client/containers';
import {Start} from '../client/containers';
import {recipeview} from '../client/containers';
import {personalview} from '../client/containers';
import {recommendview} from '../client/containers';
import {App} from '../client/containers';
import {UserSettings} from '../client/containers';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import reducers from '../client/reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import '../asset/sass/ready.scss';
import PersonalGraph from "./containers/PersonalGraph";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div id = "full_body">
                <Route exact path="/" component={() => <Redirect to="/Start" />}/>
                <Route path="/" component={App}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/settings" component={UserSettings}/>
                <Route path="/MainPage" component={MainPage}/>
                <Route path="/recipeview" component={recipeview}/>
                <Route path="/personalpage" component={personalview} />
                <Route path="/personalgraph" component={PersonalGraph}/>
                <Route path="/recommendview" component={recommendview} />
                <Route path="/Start" component={Start}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));