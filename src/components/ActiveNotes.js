import { useContext } from "react";
import { NotesContext } from "../App";
import "../styles/ActiveNotes.css";
import Note from "./Note";

const ActiveNotes = (props) => {
    // context
    const { notes } = useContext(NotesContext)

    return (
        <div className="active-notes-container">
            <h3>Active Notes</h3>
            {
                notes.map((note, key) => {
                    if (note.status === "active") {
                        return <Note key={note.id} note={note} />
                    }
                })
            }
        </div>
    )
}

export default ActiveNotes;