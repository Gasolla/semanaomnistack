import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncedents from './pages/NewIncedents';

function Routes(){
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incedents/new" component={NewIncedents} />
                
			</Switch>
		</BrowserRouter>
    );
};

export default  Routes;
