

import {Switch, Route} from 'react-router-dom';
import './css/App.css';
import './css/styleV1.css';
import PrivateRoute from './components/Route/profile/PrivateRotue';
import DefaultRoutes from './components/Route/default/DefaultRoutes';
import PrivaterotueManger from './components/Route/profile/PrivaterotueManger';
import AuthRoutes from './components/Route/auth/AuthRoutes';
import Boards from './components/pages/Boards';
import Overview from './components/pages/Overview';
import BoardsManger from './components/pages/BoardsManger';

function App() {



  return (
    <div className="App" id="home">
      
            <Switch>      
              
              <PrivaterotueManger exact path="/boards/manger" component={BoardsManger}></PrivaterotueManger>
              <PrivateRoute exact path="/boards/:projectId" component={Boards}></PrivateRoute>
              <PrivateRoute exact path="/boards" component={Overview}></PrivateRoute>
              <Route  component={AuthRoutes}  path="/auth"></Route>
              <Route  component={DefaultRoutes}></Route>


           </Switch>

    </div>
  );
}

export default App;
