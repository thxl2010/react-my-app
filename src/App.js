import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Demo from './views/Demos';
import Todo from './views/Todo';

function App() {
  return (
    <Router>
      <div>
        <aside>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/demo">Demo</Link>
            </li>
            <li>
              <Link to="/todo">Todo List</Link>
            </li>
          </ul>
        </aside>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/Demo">
              <Demo />
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
