import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
  const noteInitials = []
  const [notes, setNotes] = useState(noteInitials);

  // Get all Note
  const getNotes = async()=>{
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

      // Add a Note
      const addNote = async(title, description, tag)=>{
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        
        
      }

      //Delete a Note
      // TODO: API Call
      const deleteNote = async (id)=>{
       // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
          }
        });
        const json = await response.json();
        console.log(json);

        
        console.log("deleting the node with id: "+ id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }

      //Edit a Note
      const editNote = async (id, title, description, tag)=>{
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client 
        for(let index = 0; index<notes.length; index++){
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;  
            break;
          }
        }
        setNotes(newNotes);
      }


    return (
    <NoteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
    )  
}

export default NoteState;