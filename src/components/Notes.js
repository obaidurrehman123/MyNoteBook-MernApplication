import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../contexts/notesContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import {useHistory} from "react-router-dom"
const Notes = () => {
  const context = useContext(noteContext);
  const history = useHistory();
  const { state, getAllNotes , editNote} = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
    getAllNotes();
    }
    else{
      history.push("/login");
    }
  }, []);
  const ref = useRef("");
  const refClose = useRef("")
  const [note , setNote] = useState({id:"",title :"",description :"",tag:"default"})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,title:currentNote.title,description:currentNote.description});
  };
  const handleClick =(event)=>{
      event.preventDefault();
      refClose.current.click();
      editNote(note.id,note.title,note.description,note.tag)
  }
  const onChange =(e)=>{
      setNote({...note ,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote></AddNote>
      <button
        ref={ref}
        data-toggle="modal"
        data-target="#exampleModal"
        className="d-none"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value = {note.title}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                    minLength={5} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref ={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Notes</h1>
      <div className="row my-3">
        {state.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
