import React, { useContext } from "react";
import delete_logo from "../icons/delete.svg";
import edit_logo from "../icons/edit.svg";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <img src={delete_logo} className="icons" alt="Delete Icon" onClick={()=>{deleteNote(note._id)}}/>
            <img src={edit_logo} className="icons" alt="Edit Icon"/>
          </div>
          
          <p className="card-text">
          {note.description}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
