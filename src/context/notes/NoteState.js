import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const noteInitials = [
        {
          "_id": "63a4a1a87c53491b30eba46d",
          "user": "63a47428f8b3d94309c0c6f7",
          "title": "First Note",
          "description": "Please don't Sleep",
          "tag": "Personal",
          "date": "2022-12-22T18:27:52.920Z",
          "__v": 0
        },
        {
          "_id": "63a4a2587c53491b30eba470",
          "user": "63a47428f8b3d94309c0c6f7",
          "title": "Second Note",
          "description": "Please don't Sleep before 1 AM",
          "tag": "Personal",
          "date": "2022-12-22T18:30:48.941Z",
          "__v": 0
        },
        {
          "_id": "63a4a27afb29504bb2d8786f",
          "user": "63a47428f8b3d94309c0c6f7",
          "title": "Second Note",
          "description": "Please don't Sleep before 1 AM",
          "tag": "Personal",
          "date": "2022-12-22T18:31:22.094Z",
          "__v": 0
        },
        {
          "_id": "63a4a2c5967d2d917a7582b6",
          "user": "63a47428f8b3d94309c0c6f7",
          "title": "Do Or Die",
          "description": "Don't Give Up",
          "tag": "Personal",
          "date": "2022-12-22T18:32:37.153Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(noteInitials);

    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )  
}

export default NoteState;