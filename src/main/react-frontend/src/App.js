import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListUserComponent from "./components/ListUserComponent"
import CreateUserComponent from "./components/CreateUserComponent"
import ViewLogComponent from "./components/ViewLogComponent"
import CreateWorkSearchLogComponent from "./components/CreateWorkSearchLogComponent"
import ListWorkSearchLogComponent from "./components/ListWorkSearchLogComponent"
import ExportWorkSearchLogComponent from "./components/ExportWorkSearchLogComponent"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
            <div className="container">
              <Switch>
                <Route path = "/" exact component = {ListUserComponent}></Route>
                <Route path = "/users" component = {ListUserComponent}></Route>
                <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
                <Route path = "/view-log/:id" component = {ViewLogComponent}></Route>
                <Route path = "/add-work-search-log/:id/:userId" component = {CreateWorkSearchLogComponent}></Route>
                <Route path = "/diaplay-work-search-log/:id" component = {ListWorkSearchLogComponent}></Route>
                <Route path = "/export-work-search-log-by-date/:id" component = {ExportWorkSearchLogComponent}></Route>
              </Switch>
          </div>
          <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
