import { noteService } from '../services/note.service.js';

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteList({ filterBy }) {
    const [noteListState, setNoteListState] = useState([])
    const [isLoadingState, setIsLoadingState] = useState(false)
    const [backgroundColorState, setBackgroundColorState] = useState(null)

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

    function onChangeBackgroundColor() {

    }
    //     function onEditNote(noteId) {
    //         noteService.remove(noteId)
    //             .then(() => {
    //                 const updatedNoteList = noteListState.filter(note => note.id !== noteId)
    //                 setNoteListState(updatedNoteList)
    //                 // showSuccessMsg('Note removed')
    //             })
    //             .catch((err) => {
    //                 console.log('Had issues removing', err)
    //                 // showErrorMsg('Could not remove note')
    //             })
    //     }
    //     function edit() {
    //     ret
    // }
    // function todos(todos) {
    //     let strHtml = todos.map(todo => {

    //     })

    // }
    return (
        < div className="grid-note-list-container" >

            {noteListState.length ?
                noteListState.map(note => {
                    const { title, txt, videoUrl, imgUrl, id, noteType, todosList, backgroundColor } = note
                    return (
                        <article key={id} className="note-preview" style={{ backgroundColor: backgroundColor }} >
                            <div className='note-pin-title'>
                                <li onClick={() => onSetFilter('pin')}><i className="fa-solid fa-thumbtack"></i></li>
                                {title && <h1> {`title: ${title}`}</h1>}
                            </div>
                            <div className='note-content' ></div>
                            {/* {id && <div> {`id: ${id}`}</div>} */}
                            {/* {noteType && <div> {`type: ${noteType}`}</div>} */}
                            {txt && <div> {`text: ${txt}`}</div>}
                            {videoUrl && <div> {`videoUrl: ${videoUrl}`}</div>}
                            {imgUrl && <div> {`imgUrl: ${imgUrl}`}</div>}
                            {/* {todosList && <div> {`todosList: ${todosList}`}</div>} */}

                            <div className='note-edit-nav'>
                                <li onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></li>
                                <li onClick={() => onSetFilter('')}><i className="fa-solid fa-image"></i></li>
                                <li onClick={() => onSetFilter('')}><i className="fa-solid fa-palette"></i></li>
                            </div>
                        </article >
                    )
                }) :
                <h2> No notes to display</h2>
            }
        </div >
    )
}