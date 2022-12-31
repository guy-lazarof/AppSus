import { EditNote } from '../cmps/edit-note.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { TopAppBar } from '../cmps/top-app-bar.jsx';
import { noteService } from '../services/note.service.js';

const { useState, useRef } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [filterByState, setFilterByState] = useState(noteService.getDefaultFilter())
    const { editNoteState, setEditNoteState } = useState(null)

    return (
        <section className="Note-index">
            {/* <Link to="/note/edit">Add Note</Link> */}
            <TopAppBar setFilter={setFilterByState} />
            <NoteList filterBy={filterByState} editNote={editNoteState} />
        </section>
    )
}
