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
import Dashboard from './Components/Dashboard'


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 1100
  },
  header: {
    marginLeft: 50,    
  }
}))



function App() {

  const classes = useStyles() 
  const [user, setUser] = useState(null)
  
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div className="App">
      <Router>
        {user !== null ? 
          <AppBar color='primary' position = 'sticky' title = 'Expense Manager'>
          <Toolbar>   
            <Button className = {classes.header} size='large'>
              <a href = "/" >
                Expense Manager
              </a>
            </Button>  
            <Button color='inherit' size='large'>
              EXPENSES  
            </Button> 
            <Button color = 'inherit' className = {classes.button} size = 'large' onClick = {handleLogout}>          
                <Link to = '/'> LOGOUT  </Link>        
            </Button>  
          </Toolbar>
          </AppBar> 
        :
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
        }      
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
              {user !== null ? <Dashboard user = {user} /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path = "/">
              {user !== null ? <Redirect to="/dashboard" /> : <MainPage />}
            </Route>           
          </Switch>
      </Router>
    </div>
  );
}

export default App;
