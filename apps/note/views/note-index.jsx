import { NoteList } from '../cmps/note-list.jsx';
import { noteService } from '../services/note.service.js';
import { notesDemoData } from '../services/notes.demo.data.js';

export function NoteIndex() {

    const notes = notesDemoData.notes()
    console.log('notes:', notes)
    return (
        <div>
            <NoteList notes={notes} />
        </div>
    )

}
