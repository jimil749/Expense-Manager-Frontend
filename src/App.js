import React, { useState } from 'react';
import './App.css';
import MainPage from './Components/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import SignIn from './Components/SignIn'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SignUp from './Components/SignUp'
import loginService from './Services/login'
import userService from './Services/signup'


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
  let history = useHistory()
  
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [user, setUser] = useState()

  const handleUsername = value => {
    setUsername(value)
  }

  const handlePassword = value => {
    setPassword(value)
  }

  const handleName = value => {
    setName(value)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      alert('User Verified!')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      alert('Invalid Credentials')
      console.log(exception)
    }
  }

  const handleSignUp = async event => {
    event.preventDefault()
    try {
      await userService.signup({
        username, name, password
      })
      alert('Account Created Succesfully! Login to get started')
      history.push('/signin')
    } catch (exception) {
      alert('Error adding user')
      console.log(exception)
    }
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
                username={username}
                password={password}
                handlePassword={handlePassword}
                handleUsername={handleUsername}
                handleLogin={handleLogin}
              />
            </Route>
            <Route path = '/signup'>
              <SignUp
                username={username}
                name={name} 
                password={password}
                handleName={handleName}
                handlePassword={handlePassword}
                handleUsername={handleUsername}
                handleSignUp={handleSignUp}
              />
            </Route>
            <Route path = '/'>
              <MainPage />
            </Route>            
          </Switch>
      </Router>
    </div>
  );
}

export default App;
