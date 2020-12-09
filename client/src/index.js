import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import ProjectState from '../src/context/project/projectsState'
import ResumeProvider from '../src/context/resume/resumeState'
import ArticleState from '../src/context/article/articleState'
import {AuthState} from '../src/context/auth/authState'
//import name from 'history';
ReactDOM.render(

  <AuthState>
      <ProjectState >
          <ResumeProvider>
              <ArticleState>
                  <Router>
                       <App />  
                  </Router>
              </ArticleState>
        </ResumeProvider>
      </ProjectState>
    </AuthState>
 ,
  document.getElementById('root')
);

