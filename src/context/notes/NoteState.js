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
        //const json =  response.json();

        console.log("Adding a new Note")
        const note = {
          "_id": "63a4a2c5996d2d917a7582b6",
          "user": "63a47428f8b3d94309c0c6f7",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-12-22T18:32:37.153Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      //Delete a Note
      // TODO: API Call
      const deleteNote = async (id)=>{

        // TODO: API Call
        // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        //   method: 'POST',
        //   headers: {
        //     'content-type': 'application/json',
        //     'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
        //   },
        //   body: JSON.stringify(data)
        // });
        // const json =  response.json();

        console.log("deleting the node with id: "+ id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }

      //Edit a Note
      const editNote = async (id, title, description, tag)=>{
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc0MjhmOGIzZDk0MzA5YzBjNmY3In0sImlhdCI6MTY3MTgxODI3MH0.y17yQqCCx-SPjthOt0Pbu0xBx0iYsCKhFnl5Xhxmjwc'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json =  response.json();

        // Logic to edit in client 
        for(let index = 0; index<notes.length; index++){
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;  
          }
        }
      }


    return (
    <NoteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
    )  
}

export default NoteState;