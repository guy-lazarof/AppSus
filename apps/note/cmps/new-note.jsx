import { eventBusService, showSuccessMsg } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function NewNote({ setNoteList }) {
  const [newNoteState, setNewNoteState] = useState(noteService.createNote())
  const [newNoteOpenWindowState, setNewNoteOpenWindowState] = useState(false)
  const elInputRefTitle = useRef(null)
  const elInputRefTxt = useRef(null)
  // const navigate = useNavigate()
  // const { noteId } = useParams()

  // useEffect(() => {

  //   if (!noteId) return
  //   loadNote()
  // }, [])

  // function loadNote() {
  //   noteService.get(noteId)
  //     .then((note) => setNewNoteState(note))
  //     .catch((err) => {
  //       console.log('Had issues in note details', err)
  //       navigate('/note')
  //     })
  // }



  function handleChange({ target }) {
    let { value, name: field } = target
    setNewNoteState((prevNote) => ({ ...prevNote, [field]: value }))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    if (validValue()) {
      closeNewNote()
      setNoteList((prevNoteList) => ([newNoteState, ...prevNoteList]))
      noteService.save(newNoteState).then((note) => {
        console.log('note saved', note);
        // showSuccessMsg('Car saved!')
        // navigate('/note')
      })
    }
    return closeNewNote()
  }

  function openNewNote() {
    setNewNoteOpenWindowState(true)
  }

  function closeNewNote() {
    setNewNoteOpenWindowState(false)
    elInputRefTitle.current.value = ''
    elInputRefTxt.current.value = ''
  }

  function validValue() {
    if (elInputRefTitle.current.value || elInputRefTxt.current.value) return true
    else {
      return false
    }
  }

  return <section className="new-note">

    <form onSubmit={onSaveNote}
      className='add-note-form'>
      {newNoteOpenWindowState &&
        <input type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={handleChange}
          ref={elInputRefTitle}
          className='new-note-title'
        />}

      <input type="text"
        name="txt"
        id="txt"
        placeholder="Write a note..."
        onChange={handleChange}
        onClick={openNewNote}
        ref={elInputRefTxt}
        className='new-note-txt'
      />
      {newNoteOpenWindowState &&

        <div className='new-note-edit-nav'>
          <li onClick={() => onSetFilter('')}><i className="fa-solid fa-image"></i></li>
          <li onClick={() => onSetbackgroundColor()}><i className="fa-solid fa-palette"></i></li>
          <button>{'Add'}</button>
        </div>}
    </form>
  </section>
}
// onClick={closeNewNote}