import React from 'react'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';


export default function SnackBar() {
    const [open, setOpen] = React.useState(true);
    let navigate = useNavigate();

    const handleClose = (event, reason) => {
        setOpen(false);
        navigate("/")
    };

    const onClick = () => {
        navigate("/login");
    }


    const action = (
        <React.Fragment>
            <button type="button" class="btn btn-primary" size="small" onClick={onClick}>Login</button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>   
            <Snackbar
                open={open}
                autoHideDuration={7000}
                onClose={handleClose}
                message="You are not logged in user...login first!!"
                action={action}
            />
        </div>
    )
}
