import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:8000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const token = localStorage.getItem('token');

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/fecthnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    // NoteState.js

    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        const note = {
            "id": json.id,
            "user": json.user_id,
            "title": title,
            "description": description,
            "tag": tag,
            "date": json.date,
        };

        setNotes(notes.concat(note))
        getNotes();
    }
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/deletenotes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note.id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/updatenotes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element.id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;