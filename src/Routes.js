import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

// paginas/Rotas
import Main from './pages/Main';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route path="/" component={Main} exact/>
    </Switch>
    </BrowserRouter>
);

export default Routes;