import { NoteList } from '../cmps/note-list.jsx';
import { TopAppBar } from '../cmps/top-app-bar.jsx';
import { noteService } from '../services/note.service.js';

const { useState } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [filterByState, setFilterByState] = useState(noteService.getDefaultFilter())

    return (
        <section className="Note-index">
            {/* <Link to="/note/edit">Add Note</Link> */}
            <TopAppBar currentFilter={filterByState} setFilter={setFilterByState} />
            <NoteList filterBy={filterByState} />
        </section>
    )
}
