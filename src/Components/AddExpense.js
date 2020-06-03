import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import expenseService from '../Services/expense'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    textField: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
}))

const AddExpense = () => {
    
    const classes = useStyles()

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)
    })

    const [values, setValues] = useState({
        title: '',
        category: '',
        amount: '',
        date: new Date(),
        notes: '',
        error:'',
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleDateChange = date => {
        setValues({...values, date: date})
    }

    const handleSubmit = async () => {
        const expense = {
            title: values.title ||  undefined, 
            category: values.category || undefined,
            amount: values.amount || undefined,
            date: values.date || undefined,
            notes: values.notes || undefined
        }
        try {
            const response = await expenseService.addExpense(expense)
            setValues({...values, redirect: true})
            alert('expense added!')
        } catch(exception) {
            console.log(exception)
            alert(`Error adding!!`)
        }
        
    }

    if (values.redirect) {
        return(<Redirect to={'/'} />)
    }
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Expense Record
                    </Typography>
                    <br />
                    <TextField id="title" label="Title" className={classes.textField} value={values.title} onChange={handleChange('title')} margin="normal"/>
                    <br />
                    <TextField id="amount" label="Amount" className={classes.textField} value={values.amount} onChange={handleChange('amount')}margin="normal" type="number"/>
                    <br />
                    <TextField id="category" label="Category" className={classes.textField} value={values.category} onChange={handleChange('category')}margin="normal"/>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker 
                            label="Date"
                            value={values.date}
                            className={classes.textField}
                            views={["year", "month", "date"]}
                            showTodayButton
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <TextField 
                        id="multiline-flexible"
                        value={values.notes}
                        label="notes"
                        multiline
                        rows="2"
                        className={classes.textField}
                        margin="normal"
                        onChange={handleChange('notes')}
                    />
                    <br />
                    <br />
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default AddExpense