import { eventBusService, showSuccessMsg } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function EditNote({ noteList, setNoteList, setNoteToEdit, noteToEdit }) {
  const [noteOpenWindowState, setNoteOpenWindowState] = useState(false)
  const elInputRefTitle = useRef(null)
  const elInputRefTxt = useRef(null)
  // const navigate = useNavigate()
  // const { noteId } = useParams()
  let noteId = noteToEdit.id
  useEffect(() => {

    if (!noteId) return
    loadNote()
  }, [])

  function loadNote() {
    noteService.get(noteId)
      .then((note) => setNoteToEdit(note))
      .catch((err) => {
        console.log('Had issues in note details', err)
        // navigate('/note')
      })
  }

  function handleChange({ target }) {
    let { value, name: field } = target
    setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    if (validValue()) {
      if (noteId) {
        const updatedNoteList = noteList.filter(note => note.id !== noteId)
        setNoteList(updatedNoteList)
      }
      setNoteList((prevNoteList) => ([noteToEdit, ...prevNoteList]))
      noteService.save(noteToEdit).then((note) => {
        console.log('note saved', note);
        // showSuccessMsg('Note saved!')
        // navigate('/note')
      })
      closeEditNote()
    }
    return closeEditNote()
  }

  function openEditNote() {
    setNoteOpenWindowState(true)
  }

  function closeEditNote() {
    setNoteOpenWindowState(false)
    setNoteToEdit(null)
    elInputRefTitle.current.value = ''
    elInputRefTxt.current.value = ''
  }

  function validValue() {
    if (elInputRefTitle.current.value || elInputRefTxt.current.value) return true
    else {
      return false
    }
  }

  return (
    <section className="edit-note">
      <h2>{noteId ? 'Edit note' : 'Add a new note'}</h2>
      <form onSubmit={onSaveNote}
        className='add-note-form'>
        {noteOpenWindowState &&
          <input type="text"
            name="title"
            id="title"
            placeholder="Title"
            // value={noteToEdit.title}
            onChange={handleChange}
            ref={elInputRefTitle}
            className='edit-note-title'
          />}

        <input type="text"
          name="txt"
          id="txt"
          placeholder="Write a note..."
          // value={noteToEdit.txt}
          onChange={handleChange}
          onClick={openEditNote}
          ref={elInputRefTxt}
          className='edit-note-txt'
        />
        {noteOpenWindowState &&

          <div className='edit-note-edit-nav'>
            <li onClick={() => onSetFilter('')}><i className="fa-solid fa-image"></i></li>
            <li onClick={() => onSetbackgroundColor()}><i className="fa-solid fa-palette"></i></li>
            <button>{'Add'}</button>
          </div>}
      </form>
    </section>
  )
}