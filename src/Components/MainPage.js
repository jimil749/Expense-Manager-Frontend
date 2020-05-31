import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
    type: {
        padding: theme.spacing(2), 
        textAlign: 'left',
        marginLeft: '440px',
        marginTop: '17vh'
    },

    para: {
        padding: theme.spacing(2),
        textAlign: 'left',
        marginLeft: '440px',
        marginTop: '5px'
    },

    grid: {        
        backgroundColor: '#D3D3D3',
        height: '75vh'
    },

    img: {
        marginLeft: '100px',
        marginTop: '15vh'
    }
}))

const MainPage = () => {

    const classes = useStyles()

    return(
        <Grid container spacing = {1} className = {classes.grid}>
            <Grid item xs = {6} className = {classes.grid}>
                <Typography className = {classes.type} variant = "h4"> Expense Manager </Typography>                
                <Typography className = {classes.para}> 
                    Simplest way to manage personal finances. Because Money Matters!
                    Expense Manager helps you get just about everything managed. A smart,
                    easy to use app that allows you to track and categorize your expenses.
                </Typography>
            </Grid>
            <Grid item xs = {6}>         
                <Typography className = {classes.img} component = "div">       
                    <img src = {require('../Images/unnamed.resized.png')} alt = "Expense" />
                </Typography>
            </Grid>
        </Grid>
    )
}

export default MainPage