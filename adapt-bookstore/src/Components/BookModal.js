import React, {useEffect} from 'react'
import {Modal} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {toggleModal} from "../Redux/slices/bookstore";
import {cleanState} from "../Redux/slices/bookEdit";
import BookForm from "./BookForm";

const BookModal = () => {

        const [open, setOpen] = React.useState(false);
        const {showModal, modalContext, selectedBook} = useSelector((state)=> state.BookStore);
        const dispatch = useDispatch();
        useEffect(()=>{
            setOpen(showModal);
        },[showModal])
        const handleClose = () => {
            dispatch(toggleModal());
            dispatch(cleanState());
        }
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

        return (
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{timeout: 500}}
                    sx={{minWidth: '500px'}}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <BookForm context={modalContext} book={selectedBook}/>
                        </Box>
                    </Fade>
                </Modal>
        );
}

export default  BookModal