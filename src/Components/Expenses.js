import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Edit'
import expenseService from '../Services/expense'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

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
    },
    search: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textField: {
        margin: '8px 16px',
        width: 240
    },
    button: {
        textAlign: 'right'
    },
    submit: {

    }
}))

const Expenses = () => {
    const classes = useStyles()
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const [firstDay, setfirstDay] = useState(new Date(y,m,1))
    const [lastDay, setlastDay] = useState(new Date(y, m+1, 1))
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)        
        try{
            async function getResponse() {
                const response = await expenseService.getAll({firstDay: firstDay, lastDay: lastDay})                
                setExpenses(response)
            }
            getResponse()
        } catch (exception) {
            console.log(exception)
            alert('Error fetching')
        }
    }, [])

    const handleSearchFieldChange = name => date => {
        if (name === 'firstDay') {
            setfirstDay(date)
        } else {
            setlastDay(date)
        }
    }

    const handleSearch = () => {
        try{
            async function getResponse() {
                const response = await expenseService.getAll({firstDay: firstDay, lastDay: lastDay})                
                setExpenses(response)
            }
            getResponse()
        } catch (exception) {
            console.log(exception)
            alert('Error fetching')
        }
    }
    
    const handleChange = (name, index) => event => {
        console.log('in here')
        const updatedExpenses = [...expenses]
        updatedExpenses[index][name] = event.target.value
        setExpenses(updatedExpenses)
    }

    const handleUpdate = async index => {
        let expense = expenses[index]        
        try{ 
            const response = await expenseService.updateExpense({
                expenseId: expense.id
            }, expense)
        } catch(err) {
            console.log(err)
            alert('error updating, retry!')
        }
    }

    const handleDateChange = index => date => {
        console.log('in date change')
        const updatedExpenses = [...expenses]
        updatedExpenses[index].date = date
        setExpenses(updatedExpenses)
    }


    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableFuture
                        format="dd/MM/yyyy"
                        label="SHOWING RECORDS FROM"
                        className={classes.textField}
                        views={["year", "month", "date"]}
                        value={firstDay}
                        onChange={handleSearchFieldChange('firstDay')}
                    />
                    <DatePicker
                        format="dd/MM/yyyy"
                        label="TO"
                        className={classes.textField}
                        views={["year", "month", "date"]}
                        value={lastDay}
                        onChange={handleSearchFieldChange('lastDay')}
                    />                    
                </MuiPickersUtilsProvider>
                <Button variant="contained" color="secondary" onClick={handleSearch}>GO</Button>
            </div>
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
                        <Divider />                    
                        <ExpansionPanelDetails style={{display: 'block'}}>
                            <div>
                                <TextField label="Title" className={classes.textField} value={expense.title} onChange={handleChange('title', index)} margin='normal' />
                                <TextField label="Amount" className={classes.textField} value={expense.amount} onChange={handleChange('amount', index)} margin='normal' type="number"/>
                            </div>
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker 
                                        label="Date"
                                        className={classes.textField}
                                        views={["year", "month", "date"]}
                                        value={expense.date}
                                        onChange={handleDateChange(index)}
                                        showTodayButton
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField label="Category" className={classes.textField} value={expense.category} onChange={handleChange('category', index)} margin="normal"/>                            
                            </div>
                            <TextField label="Notes" multiline rows="2" className={classes.textField} value={expense.notes} onChange={handleChange('notes', index)} margin="normal"/>
                            <div className={classes.button}>
                                <Button color='primary' variant="contained" onClick={() => handleUpdate(index)}className={classes.submit}> Update </Button>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>             
                </span>
                )
            })}
        </div>
    )
}

export default Expenses