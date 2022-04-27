// import './App.css';
import {useState,useEffect} from 'react';
import { NotesList } from "./components/NotesList";
import { nanoid } from 'nanoid';
import Search from './components/Search';
import { Header } from './components/Header';

function App() {
  const[notes,setNotes] = useState([
    {
      id: nanoid(),
      text:'This is the first note!',
      date:'15/04/2021'
    },
    {
      id: nanoid(),
      text:'This is the second note!',
      date:'15/04/2021'
    },
    {
      id: nanoid(),
      text:'This is the third note!',
      date:'15/04/2021'
    },
    {
      id: nanoid(),
      text:'This is the third note!',
      date:'30/04/2021'
    }
  ])

  const [searchText,setSearchText]=useState('')

  const[darkMode,setDarkMode] = useState(false);

  useEffect(()=>{
    const saveNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))

    if(saveNotes){
      setNotes(saveNotes);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  },[notes]);

  const addNote = (text)=>{
    const date = new Date();
    const newNote = {
      id:nanoid(),    
      text:text,
      date:date.toLocaleDateString()
    }
    const newNotes = [...notes,newNote]
    setNotes(newNotes)
  }

  const deleteNote = (id)=>{
    const newNotes = notes.filter((note)=>note.id!==id);
    setNotes(newNotes)
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote ={deleteNote} />
      </div>
    </div>
  );
}

export default App;
