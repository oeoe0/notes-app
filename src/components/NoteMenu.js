import { Menu } from "primereact/menu"
import { useContext, useState } from "react"
import { NotesContext } from "../App"
import { v4 as uuidv4 } from 'uuid';

import "../styles/NoteMenu.css"

const NoteMenu = (props) => {
    // context
    const { notes, setNotes } = useContext(NotesContext)

    // add note
    const addNote = () => {

        const id = uuidv4()
        let creationDt = new Date()

        let creation = creationDt.getDate() + "."
            + (creationDt.getMonth() + 1) + "."
            + creationDt.getFullYear() + " "
            + creationDt.getHours() + ":"
            + creationDt.getMinutes() + ":"
            + creationDt.getSeconds() + "."
            + creationDt.getMilliseconds()

        const tempNote = {
            id: id,
            creation: creation,
            status: "active",
            data: {
                title: "",
                text: ""
            }
        }

        const tempNotes = [tempNote, ...notes]

        setNotes(tempNotes)
    }

    const downloadNotesJson = () => {
        const fName = "notes.json"
        const data = new Blob([JSON.stringify(notes), { type: "text/json" }])
        const jsonUrl = window.URL.createObjectURL(data)
        console.log("jsonUrl => ", jsonUrl)
        const link = document.createElement("a")
        document.body.appendChild(link)
        link.href = jsonUrl
        link.setAttribute("download", fName)
        link.click()
        document.body.removeChild(link)
    }

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Add Note',
                    icon: 'pi pi-plus',
                    command: () => {
                        addNote()
                    }
                },
                {
                    label: 'Delete Note',
                    icon: 'pi pi-delete-left',
                },
                {
                    label: 'Save Notes',
                    icon: 'pi pi-save',
                    command: () => {
                        downloadNotesJson()
                    }
                }
            ]
        }
    ]


    return (
        <Menu className="note-menu" model={items} />
    )
}

export default NoteMenu;