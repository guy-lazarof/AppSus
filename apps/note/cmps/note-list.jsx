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

    function onSetbackgroundColor() {

    }


    return (
        <div className='note-list-page'>
            <div className='note-list-add-note'>
                <EditNote noteList={noteListState} setNoteList={setNoteListState} setNoteToEdit={setNoteToEditState} noteToEdit={noteToEditState} />
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
                                    {/* <Link to={`/note/${note.id}`}> Edit</Link> */}
                                    <li onClick={() => onSetFilter('pin')}><i className="note-pin-icon fa-solid fa-thumbtack"></i></li>
                                </div>
                                <div className='note-content' ></div>
                                {/* {id && <div> {`id: ${id}`}</div>} */}
                                {/* {noteType && <div> {`type: ${noteType}`}</div>} */}
                                {txt && <div> {`${txt}`}</div>}
                                {videoUrl && <div> {`${videoUrl}`}</div>}
                                {imgUrl && <div> {`${imgUrl}`}</div>}
                                {/* {todosList && <div> {`todosList: ${todosList}`}</div>} */}

                                <div className='note-edit-nav'>
                                    <li onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></li>
                                    <li onClick={() => onSetFilter('')}><i className="fa-solid fa-image"></i></li>
                                    <li onClick={() => onSetbackgroundColor()}><i className="fa-solid fa-palette"></i></li>
                                </div>
                            </article >
                        )
                    }) :
                    <h2> No notes to display</h2>
                }
            </div >
        </div >
    )
}