import React,{useContext,useState} from "react";
import noteContext from '../contexts/notesContext'
const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note , setNode] = useState({title :"",description :"",tag:""})
    const handleClick =(event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNode({title :"",description :"",tag:"default"})
    }
    const onChange =(e)=>{
        setNode({...note ,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
      <h1>Add Notes</h1>
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
            minLength={5} 
            required
            value={note.title}

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
            minLength={5}
            required
            value={note.description}
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
            minLength={5}
            required
            value={note.tag}
          />
        </div>
     
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
