

// import AddProjectForm from "./components/pages/AddProjectForm";
// import ProjectDetails from "./components/pages/ProjectDetails";
// import ArticleDetail from "./components/sidebar/pages/PostDetails";
// import Skills from './components/sidebar/pages/skills';
// import Certification from './components/sidebar/pages/Certification';
// import Education from './components/sidebar/pages/Education';
// import Experience from './components/sidebar/pages/Experience';

import {Switch, Route} from 'react-router-dom';
import './css/App.css';
import './css/styleV1.css';
import PrivateRoute from './components/Route/profile/PrivateRotue';
import DefaultRoutes from './components/Route/default/DefaultRoutes';
import AuthRoutes from './components/Route/auth/AuthRoutes';
import Boards from './components/pages/Boards';
import Buzzes from './components/pages/Buzzes';
import Overview from './components/pages/Overview';


function App() {



  return (
    <div className="App" id="home">
      
            <Switch>      
              <PrivateRoute exact path="/boards/:projectId/buzz/:taskId" component={Buzzes}></PrivateRoute>
              <PrivateRoute exact path="/boards/:projectId" component={Boards}></PrivateRoute>
              <PrivateRoute exact path="/boards" component={Overview}></PrivateRoute>
              <Route  component={AuthRoutes}  path="/auth"></Route>
              <Route  component={DefaultRoutes}></Route>

              {/*
              <Route exact path="/skills" component={Skills}></Route>
              <Route exact path="/experience" component={Experience}></Route>
              <Route exact path="/certification" component={Certification}></Route>
              <Route exact path="/education" component={Education}></Route>
              <Route exact path="/projects" component={Projects}></Route>
              <PrivateRoute exact path="/newproject" component={AddProjectForm}></PrivateRoute> 
              <Route exact path="/projectdetails/:id" component={ProjectDetails}></Route>
              
              <Route exact path="/about" component={About}></Route>
              <PrivateRoute exact path="/addarticle" component={AddArticle}></PrivateRoute>
              <Route exact path="/articledetail/:id" component={ArticleDetail}></Route> */}

           </Switch>

    </div>
  );
}

export default App;
