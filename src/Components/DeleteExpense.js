import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DeleteExpense = () => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const  handleClose = () => {
        setOpen(false)
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
                    <Button color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

export default DeleteExpense