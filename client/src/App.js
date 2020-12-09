 import Footer from './components/layout/Footer';
// import Home from './components/pages/Home';
// import Projects from './components/pages/Projects';
 import PrivateRoute from './components/Route/PrivateRotue';
// import AddProjectForm from "./components/pages/AddProjectForm";
// import ProjectDetails from "./components/pages/ProjectDetails";

 import NotFound from "./components/pages/NotFound";
 import NavBar from './components/layout/Navbar';
 import {Switch, Route} from 'react-router-dom';
// import About from './components/pages/About';
 import './css/App.css';
// import AddArticle from './components/sidebar/pages/AddPost';
// import ArticleDetail from "./components/sidebar/pages/PostDetails";
// import Skills from './components/sidebar/pages/skills';
// import Certification from './components/sidebar/pages/Certification';
// import Education from './components/sidebar/pages/Education';
// import Experience from './components/sidebar/pages/Experience';
// import Login from './components/auth/login';

function App() {
  return (
    <div className="App" id="home">
      <NavBar />

      <main >
        <Switch>
          {/* <Route exact path="/login" component={Login}></Route>
          <Route exact path="/skills" component={Skills}></Route>
          <Route exact path="/experience" component={Experience}></Route>
          <Route exact path="/certification" component={Certification}></Route>
          <Route exact path="/education" component={Education}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/projects" component={Projects}></Route>
          <PrivateRoute exact path="/newproject" component={AddProjectForm}></PrivateRoute> 
          <Route exact path="/projectdetails/:id" component={ProjectDetails}></Route>
          
          <Route exact path="/about" component={About}></Route>
          <PrivateRoute exact path="/addarticle" component={AddArticle}></PrivateRoute>
          <Route exact path="/articledetail/:id" component={ArticleDetail}></Route> */}
          <Route component={NotFound}></Route>
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
