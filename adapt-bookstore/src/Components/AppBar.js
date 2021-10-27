import React from 'react'
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {toggleModal} from "../Redux/slices/bookstore";

const NavBar = () => {
    const dispatch = useDispatch();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Adapt BookStore
                </Typography>
                <Button color="inherit" onClick={()=>dispatch(toggleModal())}> Add Book</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;