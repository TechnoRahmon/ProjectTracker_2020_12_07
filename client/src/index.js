import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import ProjectState from '../src/context/project/projectsState'
import TaskProvider from '../src/context/task/taskState'
import {AuthState} from '../src/context/auth/authState'
//import name from 'history';


ReactDOM.render(
  <CookiesProvider>
  <AuthState>
      <ProjectState >
          <TaskProvider>
              {/* // <ArticleState> */}
                  <Router>
                       <App />  
                  </Router>
              {/* // </ArticleState> */}
         </TaskProvider>
      </ProjectState>
     </AuthState>
     </CookiesProvider>
 ,
  document.getElementById('root')
);

