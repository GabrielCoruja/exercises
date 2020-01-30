import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { AboutMe, ContactForm, Projects } from './components';

import './App.css';

const NavBar = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Sobre mim</Link>
        </li>
        <li>
          <Link to="/projects">Projetos</Link>
        </li>
        <li>
          <Link to="/get-in-touch">Entre em contato</Link>
        </li>
      </ul>
    </nav>
  </header>
);

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <AboutMe />
    </Route>

    <Route path="/get-in-touch">
      <ContactForm />
    </Route>

    <Route path="/projects">
      <Projects />
    </Route>

    <Route>
      <section>
        <h1>Página não encontrada</h1>
      </section>
    </Route>
  </Switch>
);

const App = () => (
  <Router>
    <NavBar />
    <Routes />
  </Router>
);

export default App;
