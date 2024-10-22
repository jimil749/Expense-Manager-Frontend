import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import userService from '../Services/signup'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {

  const classes = useStyles();
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()


  const handleSignUp = async event => {
    event.preventDefault()
    try {
      await userService.signup({
        username, name, password
      })
      alert('Account Created Succesfully! Login to get started')
    } catch (exception) {
      alert('Error adding user')
      console.log(exception)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up to get Started!
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            value={username}
            required
            fullWidth

            id="username"
            label="Username"
            name="username"            
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"   
            onChange={({ target }) => setName(target.value)}         
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>          
        </form>
      </div>
    </Container>
  );
}


export default SignUp