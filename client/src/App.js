import React, { useState } from 'react'
import './styles/app.scss'
import { Switch, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch location={location} key={location.pathname}>
        <Route path="/login" exact>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/register" exact>
          <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/feed" exact>
          <Feed isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
