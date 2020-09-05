import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { MainPage } from '../MainPage';
import { history } from '../_helpers';


function App() {
 
    return (
        <div  className="jumbotron" >
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <Router history={history}>
                        <Switch>
                            <Route  exact path="/" component={MainPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };

