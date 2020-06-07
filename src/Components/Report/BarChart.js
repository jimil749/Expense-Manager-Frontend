import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import expenseService from '../../Services/expense'
import { VictoryTheme, VictoryAxis, VictoryBar, VictoryChart } from "victory"


const useStyles = makeStyles(theme => ({
    title: {
        padding:`32px ${theme.spacing(2.5)}px 2px`,
        color: '#2bbd7e',
        display:'inline'
    }
}))


const BarChart = () => {
    const classes = useStyles()
    const [year, setYear] = useState(new Date())
    const [expense, setExpense] = useState([])
    const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)
        try{
            async function getResponse() {
                const response = await expenseService.monthlyExp({ year:  year.getFullYear()})
                setExpense(response)
                console.log(response)
            }
            getResponse()
        } catch(err) {
            console.log(err)
            alert(`Error Fetching! Try Again Later`)
        }
    }, [])

    const handleDateChange = async (date) => {
        setYear(date)
        try {   
            const response = await expenseService.monthlyExp({ year: date.getFullYear() })
            setExpense(response)
        } catch (err) {
            console.log(err)
            alert(`Error Fetching!`)
        }        
    }

    return (
        <div>
            <Typography variant="h6" className={classes.title}> Monthly Expenitures in </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker 
                    value={year}
                    onChange={handleDateChange}
                    views={["year"]}
                    disableFuture
                    animateYearScrolling
                    variant="inline"
                />
            </MuiPickersUtilsProvider>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={300}
                width={450}>
                <VictoryAxis/>
                <VictoryBar 
                    categories={{
                        x: monthStrings
                    }}
                    style={{ data: {fill: "#69f0ae", width: 20}, labels: {fill: "#01579b"} }}
                    data={expense.monthlyExp}
                    x={monthStrings['x']}
                    domain={{x: [0, 13]}}
                    labels={({ datum }) => `$${datum.y}`}
                />
            </VictoryChart>
        </div>
    )
}

export default BarChart