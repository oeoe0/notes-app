import { Card } from "primereact/card";
import "../styles/Note.css";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { NotesContext } from "../App";

const Note = (props) => {
    // state management
    const [mouseEntered, setMouseEntered] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [editOn, setEditOn] = useState(false)

    // context
    const { notes, setNotes } = useContext(NotesContext)

    // vars
    const note = props.note

    // first render
    useEffect(() => {
        setTitle(note.data.title)
        setText(note.data.text)
    }, [])


    const saveEdit = () => {
        const tempNotes = [...notes]

        tempNotes.find((elem) => {
            if (elem.id === note.id) {
                elem.data.title = title
                elem.data.text = text
                return 0
            }
        })

        setNotes(tempNotes)
        setEditOn(!editOn)
    }

    // change status
    const changeStatus = () => {
        const tempNotes = [...notes]

        tempNotes.find((elem) => {
            if (elem.id === note.id) {
                if (elem.status === "active") {
                    elem.status = "inactive"
                }
                else {
                    elem.status = "active"
                }
            }

            return 0
        })

        setNotes(tempNotes)
    }

    // card elements
    const header = (
        <div className="card-header-container">
            <h2>{note.data.title}</h2>
            <p>{note.creation.split(" ")[0]}</p>
        </div>
    )

    const headerEdit = (
        <div className="card-header-container">
            <InputText
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <p>{note.creation.split(" ")[0]}</p>
        </div>
    )

    const cardNormal = (
        <Card
            style={(mouseEntered && props.editOn) && {
                outline: "solid 1px #24afff",
                boxSizing: "border-box"
            }}
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}
            id={note.id}
            className="note"
            header={header} >

            <p className="note-text">{note.data.text}</p>
            {
                mouseEntered &&
                <div>
                    <Button
                        onClick={() => setEditOn(!editOn)}
                        icon="pi pi-pencil"
                        rounded
                        text
                        aria-label="Filter" />
                </div>
            }
        </Card >
    )

    const cardEdit = (
        <Card
            style={{ height: "20rem", flexDirection: "column" }}
            id={note.id}
            className="note note-edit"
            header={headerEdit}>
            <InputTextarea
                placeholder="Text"
                className="text-edit"
                value={text}
                onChange={(e) => setText(e.target.value)} />
            <div className="footer-buttons-container">
                <Button
                    onClick={() => setEditOn(!editOn)}
                    size="small"
                    label="Cancel"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-secondary cancel-btn" />
                <Button
                    onClick={changeStatus}
                    className="change-status-btn"
                    size="small"
                    label={note.status === "active" ? "Deactivate" : "Activate"}
                    icon="pi pi-check" />
                <Button
                    onClick={saveEdit}
                    className="save-btn"
                    size="small"
                    label="Save"
                    icon="pi pi-check" />
            </div>
        </Card >
    )

    return !editOn
        ? cardNormal
        : cardEdit
}

export default Note;