//This component is just to host the other 3 data visualizer components

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import PieChart from './PieChart'

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 40,
        marginBottom: 40
    },    
}))


const Reports = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <PieChart />
        </div>
    )
}

export default Reports