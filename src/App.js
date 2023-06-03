
import './App.css';
import React, { useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import FormLogin from './components/formLogin';
import { Navbar } from './components/navbar';
import Context from './components/context'
import { routesProyect } from './routes/routesProyect';


function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') == null || localStorage.getItem('token') == '' ? false : true) //para saber si está logeado o no

  const [userId, setUserId] = useState(localStorage.getItem('id'));

  const login = (token, id) => {

    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    setUserId(userId);
    setLoggedIn(true)
    window.location.href = '/home';

  }

  const logout = () => {
    const itemsToRemove = ['token', 'id'];
    itemsToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    window.location.href = '/home';
  }


  return <Context.Provider value={{ loggedIn, login, userId, logout }}>

    {loggedIn ?
      <>

        <Navbar />
        <Routes>
          {routesProyect.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              element={<route.component />}
            />
          ))}
        </Routes>
      </>

      :
      <>
        <div>
          <FormLogin />

        </div>
      </>
    }

  </Context.Provider>

}



export default App;
