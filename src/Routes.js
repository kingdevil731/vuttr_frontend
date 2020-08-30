import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

// paginas/Rotas
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicial from './pages/Inicial';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/auth/login" component={Login} exact/>
        <Route path="/auth/register" component={Register} exact/>
        <Route path="/main" component={Inicial} exact/>
    </Switch>
    </BrowserRouter>
);

export default Routes;