import { useEffect, useState } from 'react';

import './App.css';
import AddBook from './AddBook';

import { getDatabase,ref,set, push, get, onValue, remove } from 'firebase/database';
import app from './firebase';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

function App() {

  const [ books, setBooks ] = useState([]);

  useEffect(()=>{

     const fetchData = ()=>{
      const database = getDatabase(app);
      const booksRef = ref(database, 'books');
      onValue(booksRef, (snapshot)=>{
        const data=snapshot.val();
        if(data){
          const itemsArray = Object.keys(data).map(key=>({
            id: key,
            ...data[key]
          }));
          setBooks(itemsArray);
        }else{
          setBooks([]);
        }
      });
    }; 
    fetchData();

  }, []);

  
   const addBook =async(newBook)=>{
    const database = getDatabase(app);
    const newBookRef=push(ref(database, 'books'));
    await set(newBookRef, newBook);
      const booksRef = ref(database, 'books');
      onValue(booksRef, (snapshot)=>{
        const data = snapshot.val();
        if(data){
          const itemsArray = Object.keys(data).map(key=>({
            id: key,
            ...data[key]
          }));
          setBooks(itemsArray);
        }else{
          setBooks([]);
        }
      });
  };

  const deleteBook = async(id)=>{
    const database = getDatabase(app);
    const itemRef = ref(database, `books/${id}`);
    await remove(itemRef);
    setBooks(books.filter(book=>book.id !==id));
  };
 
 const columns = [
  {field: 'title', headerName: 'Title',filter:'true', sortable:'true'},
  {field: 'author', headerName: 'Author', filter: 'true', sortable: 'true'},
  {field: 'year', headerName: 'Year', filter: 'true', sortable:'true'},
  {field: 'isbn', headerName: 'Isbn', filter: 'true', sortable:'true'},
  {field: 'price', headerName: 'Price', filter: 'true', sortable:'true'},
  {
    field: 'actions',
    headerName:'',
    sortable: false,
    renderCell:(params)=>{
      <IconButton onClick={()=>deleteBook(params.id)}>
        <DeleteIcon />
      </IconButton>
    }
  }
 ]

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      
      <AddBook addBook={addBook} />
      <div
        className='ag-theme-material' 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 150px)', marginTop: 20 }}>
        <div style={{ height: 400, width:  600, margin: 'auto' }}>
          <DataGrid
            rows={books}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
