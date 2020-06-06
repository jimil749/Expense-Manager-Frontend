import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import expenseService from '../Services/expense'

const DeleteExpense = (props) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const  handleClose = () => {
        setOpen(false)
    }

    const deleteExpense = async () => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUserJson)
        expenseService.setToken(user.token)
        try{
            console.log(props.expense)
            const response = await expenseService.deleteExpense({expenseId: props.expense.id})
            setOpen(false)
            props.onRemove(props.expense)
        } catch(err) {
            alert(`Error Deleting`)
            console.log(err)
        }      
    }
    
    return (
        <span>
            <IconButton aria-label="Delete" onClick={handleClick}>
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Delete </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your expense?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={deleteExpense} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

DeleteExpense.propTypes = {
    expense: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default DeleteExpense