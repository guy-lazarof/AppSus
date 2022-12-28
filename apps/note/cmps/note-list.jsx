import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM

export function NoteList({ notes }) {
    return (
        <ul className="grid-note-list-container">
            {
                notes.map(note => <li key={note.id}>
                    <NotePreview note={note} />

                </li>
                )
            }
        </ul>
    )
}
