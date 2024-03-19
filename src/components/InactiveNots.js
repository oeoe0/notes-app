import { useContext } from "react"
import "../styles/InactiveNotes.css"
import { NotesContext } from "../App"
import Note from "./Note"

const InactiveNotes = (props) => {
    // context
    const { notes } = useContext(NotesContext)

    return (
        <div className="inactive-notes-container">
            <h3>Inactive Notes</h3>
            {
                notes.map((note, key) => {
                    if (note.status === "inactive") {
                        return <Note key={note.id} note={note} />
                    }
                })
            }
        </div>
    )
}

export default InactiveNotes;