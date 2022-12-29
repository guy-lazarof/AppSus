import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM

export function NoteList({ notes }) {
    return (
        <div className="grid-note-list-container">
            {
                notes.map(note => <div key={note.id}>
                    <NotePreview note={note} />

                </div>
                )
            }
        </div>
    )
}
