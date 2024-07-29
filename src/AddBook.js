import { useState } from "react";
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function AddBook(props){
    const [open, setOpen]=useState(false);
    const [book, setBook ] = useState({description:'', date: '', priority: ''});

    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const hadleSaved=()=>{
        props.addBook(book);
        setBook({title: '', author:'', year:'', isbn:'', price:''})
        handleClose();
    }

    const inputChanged =(event)=>{
        setBook({...book, [event.target.name]: event.target.value});
    }
      

    return(
        <div>
            <Button
              onClick={handleOpen} 
              color="primary"
              variant="outlined"
            >
            Add book
            </Button>
            <Dialog
                open={open} 
            >
                <DialogTitle>
                    New Book 
                </DialogTitle>
                <DialogContent>
                <TextField
                    variant='standard'
                    label='Title'
                    name='title' 
                    value={book.title} 
                    onChange={inputChanged}
                        />
                <TextField
                    variant='standard' 
                    label='Author' 
                    name='author' 
                    value={book.author} 
                    onChange={inputChanged} />
                <TextField
                    variant='standard' 
                    label='Year' 
                    name='year' 
                    value={book.year} 
                    onChange={inputChanged} />
                <TextField
                    variant='standard' 
                    label='ISBN' 
                    name='isbn' 
                    value={book.isbn} 
                    onChange={inputChanged} />
                <TextField
                    variant='standard' 
                    label='Price' 
                    name='price' 
                    value={book.price} 
                    onChange={inputChanged} />
                </DialogContent>
                <DialogActions>
                    <Button
                      color="primary"
                      onClick={handleClose}
                    >Cancel</Button>
                    <Button
                      color="primary"
                      onClick={hadleSaved}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddBook;