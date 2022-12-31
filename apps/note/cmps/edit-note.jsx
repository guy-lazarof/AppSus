import { eventBusService, showSuccessMsg } from '../../../services/event-bus.service.js';
import { utilService } from '../../../services/util.service.js';
import { noteService } from '../services/note.service.js';

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function EditNote({ noteList, setNoteList, setNoteToEdit, noteToEdit }) {
  const [noteOpenWindowState, setNoteOpenWindowState] = useState(false)
  const elInputRefTitle = useRef(null)
  const elInputRefTxt = useRef(null)

  let currentNote = noteToEdit

  useEffect(() => {
    if (currentNote.id) {
      openEditNote()
      elInputRefTxt.current.focus()
    }
  }, [currentNote])
  function handleChange({ target }) {
    let { value, name: field } = target
    setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    if (validValue()) {
      if (currentNote.id) {
        const updatedNoteList = noteList.filter(note => note.id !== currentNote.id)
        setNoteList(updatedNoteList)
      }
      noteService.save(noteToEdit).then((note) => {
        setNoteList((prevNoteList) => ([note, ...prevNoteList]))
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
    setNoteToEdit(noteService.createNote())
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
      {/* <h2>{noteToEdit.id ? 'Edit note' : 'Add a new note'}</h2> */}
      <form onSubmit={onSaveNote}
        className='add-note-form'>
        {noteOpenWindowState &&
          <input type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={currentNote.title || ''}
            onChange={handleChange}
            ref={elInputRefTitle}
            className='edit-note-title'
          />}

        <input type="text"
          name="txt"
          id="txt"
          placeholder="Write a note..."
          value={currentNote.txt || ''}
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