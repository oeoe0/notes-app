import { useState } from "react";
import ActiveNotes from "../components/ActiveNotes";
import InactiveNotes from "../components/InactiveNots";
import NoteMenu from "../components/NoteMenu";
import "../styles/Notes.css"

const Notes = () => {
    // state management
    const [editOn, setEditOn] = useState(false)

    return (
        <div className="notes-page-container">
            <NoteMenu editOn={editOn} setEditOn={setEditOn} />
            <div className="notes-container">
                <ActiveNotes editOn={editOn} setEditOn={setEditOn} />
                <InactiveNotes />
            </div>
        </div>
    )
}

export default Notes;