import React from 'react';
import './App.css';
import MainPage from './Components/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './Components/SignIn'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SignUp from './Components/SignUp'



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
              <SignIn />
            </Route>
            <Route path = '/signup'>
              <SignUp />
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
