import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import expenseService from '../Services/expense'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title2: {
        padding: `32px ${theme.spacing(2.5)}px 2px`,
        color: '#2bbd7e'
    },
    totalSpent: {
        padding: '50px 40px',
        fontSize: '4em',
        margin: 20,
        marginBottom: 30,
        backgroundColor: '#01579b',
        color: '#70f0ae',
        textAlign: 'center',
        borderRadius: '50%',
        border: '10px double #70f0ae',
        fontWeight: 300
    },
    spent: {
        margin: '16px 10px 10px 0',
        padding: '10px 30px',
        border: '4px solid #58bd7f38',
        borderRadius: '0.5em'
    },
    day: {
        fontSize: '0.9em',
        fontStyle: 'italic',
        color: '#696969'
    }
}))

const Dashboard = ({ user }) => {

    const classes = useStyles()
    const [expensePreview, setExpensePreview] = useState({month: 0, today: 0, yesterday: 0})

    useEffect(() => {
        if (user.token) {
            expenseService.setToken(user.token)
            async function getPreview() {
                const response = await expenseService.monthPreview()
                setExpensePreview(response)
            }
            getPreview()
        }
    }, [])

    return (
        <div>
            <Card className={classes.card}>
                <Typography variant="h4" className={classes.title2} color="textPrimary" style={{textAlign: 'center'}}> You've Spent </Typography>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography component='span' className={classes.totalSpent} > 
                        ${expensePreview.month ?  expensePreview.month.totalSpent : '0'}
                        <span style={{display: 'block', fontSize: '0.3em'}}> so far this month </span>
                    </Typography>
                    <div style={{margin: '20px 20px 20px 30px'}}>
                        <Typography variant="h5" className={classes.spent} color="primary"> 
                            ${expensePreview.today ? expensePreview.today.totalSpent : '0'}
                            <span className={classes.day}> today</span>
                        </Typography>
                        <Typography variant="h5" className={classes.spent} color="primary">
                            ${expensePreview.yesterday ? expensePreview.yesterday.totalSpent : '0'}
                            <span className={classes.day}> yesterday</span>
                        </Typography>
                    </div>
                </div>
                <Divider />
            </Card> 
        </div>
    )
}

export default Dashboard