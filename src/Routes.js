import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

// paginas/Rotas
import Main from './pages/Main';
import Login from './pages/Login';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/auth/login" component={Login} exact/>
    </Switch>
    </BrowserRouter>
);

export default Routes;