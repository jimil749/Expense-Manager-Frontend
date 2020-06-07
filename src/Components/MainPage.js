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
        <div>
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
                    <img src = {require('../Images/expense.png')} alt = "Expense" />
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={1} >
            <Grid item xs={6} >
                <img src={require('../Images/App-image-1.png')} alt="App ScreenShot" style={{height: '350px', marginLeft: '250px', marginTop: '50px', marginBottom: '50px'}} />
            </Grid>
            <Grid item xs={6} >
                <Typography variant="h5" style={{marginTop: '100px', marginLeft: '20px'}}> Simple Money Tracker </Typography>
                <Typography style={{marginTop: '15px', marginRight: '350px', marginLeft: '20px', height: '200px'}}> 
                    It takes seconds to record daily transactions. Put them into clear and visualized categories 
                    such as Expense: Food, Shopping etc. It allows you to overview your most recent expenses along
                    with comparitive studies with previous month's expenses.
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography variant="h5" style={{marginTop: '100px', marginLeft: '275px'}}> Intuitive Reports </Typography>
                <Typography style={{marginLeft: '275px', marginTop: '15px'}}> 
                    We provide you with intuitive reports to make sense out of the data with bar charts 
                    and pie charts, to help educate you more about your expenses and manage them well.
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <img src={require('../Images/App-image-2.png')} alt="App Screenshot #2" style={{height: '350px', marginLeft: '100px' }}/>
            </Grid>
        </Grid>
        </div>
    )
}

export default MainPage