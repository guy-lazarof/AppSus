import { noteService } from '../services/note.service.js';
import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteList({ filterBy }) {
    const [noteListState, setNoteListState] = useState([])
    const [isLoadingState, setIsLoadingState] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        setIsLoadingState(true)
        noteService.query(filterBy)
            .then((noteList) => {
                setNoteListState(noteList)
                setIsLoadingState(false)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const updatedNoteList = noteListState.filter(note => note.id !== noteId)
                setNoteListState(updatedNoteList)
                // showSuccessMsg('Note removed')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                // showErrorMsg('Could not remove note')
            })
    }

    return (
        < div className="grid-note-list-container" >

            {noteListState.length ?
                noteListState.map(note => {
                    const { info: { title, txt, url }, id, noteType } = note
                    return (
                        <article key={note.id} className="note-preview">
                            {title && <h1> {`title: ${title}`}</h1>}
                            {id && <div> {`id: ${id}`}</div>}
                            {noteType && <div> {`type: ${noteType}`}</div>}
                            {txt && <div> {`text: ${txt}`}</div>}
                            {url && <div> {`url: ${url}`}</div>}
                            <Link to={`/note/edit/${id}`}>✏️</Link>
                        </article >
                    )
                }) :

                <h2> no Notes to display</h2>
            }
        </div>
    )
}


