import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Router, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 1300
  },
  header: {
    marginLeft: 50
  }
}))

const NavBar = () => {

  const classes = useStyles()

  return (
    <AppBar color='primary' position = 'sticky' title = 'Expense Manager'>
      <Toolbar>   
        <Typography variant="h6" className = {classes.header}>
          Expense Manager
        </Typography>   
        <Button color = 'inherit' className = {classes.button} size = 'large' >
          <Router>
            <Link to = '/signin'> Login </Link>
          </Router>
        </Button>  
      </Toolbar>
    </AppBar>
  )
}

export default NavBar