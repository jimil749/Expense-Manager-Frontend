import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
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
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Expense Record
                    </Typography>
                    <br />
                    <TextField id="title" label="Title" className={classes.textField} margin="normal"/>
                    <br />
                    <TextField id="amount" label="Amount" className={classes.textField} margin="normal" type="number"/>
                    <br />
                    <TextField id="category" label="Category" className={classes.textField} margin="normal"/>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker 
                            label="Date"
                            className={classes.textField}
                            views={["year", "month", "date"]}
                            showTodayButton
                        />
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <TextField 
                        id="multiline-flexible"
                        label="notes"
                        multiline
                        rows="2"
                        className={classes.textField}
                        margin="normal"
                    />
                    <br />
                    <br />
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default AddExpense