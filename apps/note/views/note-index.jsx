import { NotePreview } from '../cmps/note-preview.jsx';
import { noteService } from '../services/note.service.js';

export function NoteIndex() {
    noteService.test()
    noteService.test2()

    return (
        <div>
            <NotePreview />

        </div>
    )

}
