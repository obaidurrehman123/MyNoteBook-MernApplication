import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:9000";
  const notesInitial = [];
  const [state, setState] = useState(notesInitial);
//Fetch All notes
  const getAllNotes = async () => { 
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    setState(json);
  };
 //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({title,description,tag})
    });
    // // const Json = response.json();
    // console.log("Note has been added");
    // let note = {
    //   _id: "641df496f92d5d94dab809cd",
    //   user: "641d79a5b9b107669ac9f30e",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-03-24T19:05:58.436Z",
    //   __v: 0,
    // };
    const note = await response.json();
    setState(state.concat(note));
  };
  //deleteNote
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      }
    });
    const Json = response.json();
    console.log(Json);
    console.log("deleting the note of the id" + id);
    const newNote = state.filter((note) => {
      return note._id !== id;
    });
    setState(newNote);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({title,description,tag})
    });
    const Json = await response.json();
    console.log(Json);
    const newNote = JSON.parse(JSON.stringify(state))
    for (let index = 0; index < newNote.length; index++) {
      const element = state[index];
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setState(newNote);
  };
  return (
    <NoteContext.Provider
      value={{ state, setState, addNote, deleteNote, editNote ,getAllNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
