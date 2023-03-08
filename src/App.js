import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";


import Sidebar from "./bar";
import Header from "./Header";
import Mainbar from "./Mainbar";




function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const date = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };


  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-CA", date);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };


  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };


    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };






  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }


      return note;
    });


    setNotes(updatedNotesArr);
  };


  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };


  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter(({ id }) => id !== noteId));
    }
  };




  return (
    <div className="App">
      <Header />
      <div id="container">
        <Sidebar
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          notes={notes}
        />
        <Mainbar
          onUpdateNote={onUpdateNote}
          formatDate={formatDate}
          activeNote={getActiveNote()}
          onDeleteNote={onDeleteNote}
        />
      </div>
    </div>
  );
}


export default App;


