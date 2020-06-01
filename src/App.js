import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './Components/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SignIn from './Components/SignIn'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SignUp from './Components/SignUp'
import expenseService from './Services/expense'
import UserPage from './Components/UserPage'


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 1300
  },
  header: {
    marginLeft: 50,    
  }
}))

function App() {

  const classes = useStyles() 
  const [user, setUser] = useState()
  
  useEffect(()=> {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      expenseService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleUser = value => {
    setUser(value)
  }

  return (
    <div className="App">
      <Router>
        <AppBar color='primary' position = 'sticky' title = 'Expense Manager'>
        <Toolbar>   
          <Typography variant="h6" className = {classes.header} >
            <a href = "/" >
              Expense Manager
            </a>
          </Typography>   
          <Button color = 'inherit' className = {classes.button} size = 'large' >          
              <Link to = '/signin'> Login </Link>          
          </Button>  
        </Toolbar>
      </AppBar>      
          <Switch>
            <Route path = '/signin'>
              <SignIn 
                handleUser={handleUser}
              />
            </Route>
            <Route path = '/signup'>
              <SignUp />
            </Route>
            <Route path = '/dashboard'>
              <UserPage />
            </Route>
            <Route exact path = "/">
              {user !== undefined ? <Redirect to="/dashboard" /> : <MainPage />}
            </Route>           
          </Switch>
      </Router>
    </div>
  );
}

export default App;
