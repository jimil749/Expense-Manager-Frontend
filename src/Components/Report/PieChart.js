import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import expenseService from '../../Services/expense'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory"

const useStyles = makeStyles(theme => ({
    search: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        padding: `16px ${theme.spacing(2.5)} 2px`,
        color: '#2bbd7e',
        display: 'inline'
    },
    textField: {
        margin: '8px 16px',
        width: 240
    },
}))

const PieChart = () => {
    const classes = useStyles()
    const [expenses, setExpenses] = useState([])
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const [firstDay, setFirstDay] = useState(new Date(y,m,1))
    const [lastDay, setLastDay] = useState(new Date(y, m+1, 0))

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)
        try{
            async function getResponse() {
                const response = await expenseService.avgMonthlyChart({firstDay: firstDay, lastDay: lastDay})
                setExpenses(response)
            }
            getResponse()
        } catch(err) {
            console.log(err)
            alert(`Please reload.`)
        }        
    }, [])

    const handleDateChange = name => date => {
        if (name === 'firstDay') {
            setFirstDay(date)
        } else {
            setFirstDay(date)
        }
    }

    const handleSearch = async () => {
        const response = await  expenseService.avgMonthlyChart({firstDay: firstDay, lastDay: lastDay})
        setExpenses(response)
    }

    return(        
        <div>
          <div className={classes.search}>
              <Typography variant="h6" className={classes.title}> Category wise Expenditure </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableFuture
                    format="dd/MM/yyyy"
                    label="FROM"
                    views={["year", "month", "date"]}
                    value={firstDay}
                    className={classes.textField}
                    onChange={handleDateChange('firstDay')}
                  />

                  <DatePicker 
                    format="dd/MM/yyyy"
                    label="TO"
                    views={["year", "month", "date"]}
                    value={lastDay}
                    className={classes.textField}
                    onChange={handleDateChange('lastDay')}
                  />
              </MuiPickersUtilsProvider>
              <Button variant="contained" color="secondary" onClick={handleSearch}> GO </Button>
          </div> 
          <div style={{width: 550, margin: 'auto'}}>
              <svg viewBox="0 0 320 320">
                <VictoryPie 
                    standalone={false}
                    data={expenses.monthlyAvg}
                    innerRadius={50}
                    theme={VictoryTheme.material}
                    labelRadius={({ innerRadius }) => innerRadius+14}
                    labelComponent={<VictoryLabel angle={0} style={[{
                        fontSize: '11px',
                        fill: '#0f0f0f' , 
                    },
                    {
                        fontSize: '10px',
                        fill: '#013157'
                    }
                ]}  text={( {datum} ) => `${datum.x}\n $${datum.y}`} />}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 14, fill: '#8b8b8b'}}
                    x={175}
                    y={170}
                    text={`Spent per\n Category`}
                />
              </svg>
          </div>
        </div>
    )
}

export default PieChart