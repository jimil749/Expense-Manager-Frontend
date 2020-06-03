import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Edit'
import expenseService from '../Services/expense'
import { ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core'

const useStyles = makeStyles(theme =>({
    root: {
        width: '90%',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 40,
        marginBottom: 40
    },
    panel: {
        border: '1px solid #58bd7f',
        margin: 6
    },
    info: {
        marginRight: 32,
        width: 90
    },
    amount: {
        fontSize: '2em',
        color: '#2bbd7e'
    },
    date: {
        fontSize: '1.1em',
        color: '#8b8b8b',
        marginTop: 4
    },
    heading: {
        fontSize: '1.5em',
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: 12,
        marginBottom: 4
    },
    notes: {
        color: 'grey'
    }
}))

const Expenses = () => {
    const classes = useStyles()
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)        
        try{
            async function getResponse() {
                const response = await expenseService.getAll()                
                setExpenses(response)
            }
            getResponse()
        } catch (exception) {
            console.log(exception)
            alert('Error fetching')
        }
    }, [])

    return (
        <div className={classes.root}>
            {expenses.map((expense, index) => {
                return (
                <span key={index}>
                    <ExpansionPanel className={classes.panel}>
                        <ExpansionPanelSummary expandIcon={<Edit />}>
                            <div className={classes.info}>
                                <Typography className={classes.amount}>$ {expense.amount}</Typography>
                                <Divider style={{ marginTop: 4, marginBottom: 4 }}/>
                                <Typography>
                                    {expense.category}
                                </Typography>
                                <Typography className={classes.date}>{new Date(expense.date).toLocaleDateString()}</Typography>
                            </div>
                            <div>
                                <Typography className={classes.heading}>{expense.title}</Typography>
                                <Typography className={classes.notes}>{expense.notes}</Typography>
                            </div>
                        </ExpansionPanelSummary>
                    </ExpansionPanel >                    
                </span>
                )
            })}
        </div>
    )
}

export default Expenses