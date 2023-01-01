import { utilService } from '../../../services/util.service.js';
import { noteService } from '../services/note.service.js';
import { EditNote } from './edit-note.jsx';

const { Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function NoteList({ filterBy }) {
    const [noteListState, setNoteListState] = useState([])
    const [isLoadingState, setIsLoadingState] = useState(false)
    const [backgroundColorState, setBackgroundColorState] = useState(null)
    const [noteToEditState, setNoteToEditState] = useState(noteService.createNote())
    const [addImgState, setAddImgState] = useState(false)
    const [fileSelectedState, setFileSelectedState] = useState(null);

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
            })
            .catch((err) => {
                console.log('Had issues removing', err)
            })
    }

    return (
        <div className='note-list-page'>
            <div className='note-list-add-note'>
                <EditNote noteList={noteListState} setNoteList={setNoteListState} setNoteToEdit={setNoteToEditState} noteToEdit={noteToEditState} addImg={addImgState} setAddImg={setAddImgState} fileSelected={fileSelectedState} setFileSelected={setFileSelectedState} />
            </div>
            < div className="grid-note-list-container" >

                {noteListState.length ?
                    noteListState.map((note, idx) => {
                        const { title, txt, videoUrl, imgUrl, noteType, id, todosList, backgroundColor } = note
                        return (
                            <article key={`${idx} + ${id}`} className="note-preview" style={{ backgroundColor: backgroundColor }} onClick={() => {
                                setNoteToEditState(note)
                                console.log(note)
                            }}>
                                <div className='note-pin-title'>
                                    {title && <h1> {`${title}`}</h1>}
                                    <li onClick={() => onSetFilter('pin')}><i className="note-pin-icon fa-solid fa-thumbtack"></i></li>
                                </div>
                                <div className='note-content' ></div>
                                {txt && <div> {`${txt}`}</div>}
                                {videoUrl && <div> {`${videoUrl}`}</div>}
                                {imgUrl && <img src={imgUrl} alt='a' />}

                                <div className='note-edit-nav'>
                                    <li onClick={(event) => {
                                        event.stopPropagation()
                                        onRemoveNote(note.id)
                                    }}><i className="fa-solid fa-trash"></i></li>
                                    <li onClick={(event) => {
                                        event.stopPropagation()
                                        onAddImg()
                                    }}><i className="fa-solid fa-image"></i></li>
                                    <li onClick={(event) => {
                                        event.stopPropagation()
                                        onSetbackgroundColor()
                                    }}><i className="fa-solid fa-palette"></i></li>
                                </div>
                            </article >
                        )
                    }) :
                    <h2> You haven't notes to display</h2>
                }
            </div >
        </div >
    )
}