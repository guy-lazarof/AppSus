import { NoteList } from '../cmps/note-list.jsx';
import { NoteFilter } from '../cmps/note-filter.jsx';
import { noteService } from '../services/note.service.js';
import { notesDemoData } from '../services/notes.demo.data.js';

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        setIsLoading(true)
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
                setIsLoading(false)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const updatedNotes = notes.filter(note => note.id !== noteId)
                setNotes(updatedNotes)
                showSuccessMsg('Note removed')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove note')
            })
    }

    return <section className="Note-index">
        <div className="main-layout">
            {/* <NoteFilter onSetFilter={onSetFilter} /> */}

            <Link to="/note/edit">Add Note</Link>

            {<NoteFilter onSetFilter={onSetFilter} />}
            {isLoading && <div>Loading..</div>}
            {!isLoading && <NoteList notes={notes} onRemoveNote={onRemoveNote} />}
            {!notes.length && <div>No notes to show...</div>}
        </div>
    </section>
}
