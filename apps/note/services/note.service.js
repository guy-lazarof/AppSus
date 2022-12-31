import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

// import { utilService } from './util.service.js'
const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
  createNote
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        notes = notes.filter(note => regex.test(note.title))
      }
      if (filterBy.noteType === 'all') {
        return notes
      }
      notes = notes.filter(note => note.noteType === filterBy.noteType)

      return notes

    }
    )
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)

}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote() {
  return {
    id: null,
    noteType: "text",
    backgroundColor: "white",
    txt: null,
    isPinned: false,
    title: null,
    lable: null,
    todosList: null,
    imgUrl: null,
    videoUrl: null
  }
}

function getDefaultFilter() {
  return { txt: '', noteType: 'all' }
}

function createNote(arg) {
  const note = getEmptyNote()
  // note.id = utilService.makeId()
  for (const property in arg) {
    note[property] = arg[property]
  }
  return note
}



function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'text',
      txt: "txttt!",
      title: "15 first txtfirstxt"
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'text',
      txt: "txt!",
      title: "second txt"
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'img',
      imgUrl: "http://some-img/me",
      title: "first img"
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'img',
      imgUrl: "http://some-img/me",
      title: "second img"
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'todos-list',
      label: "family",
      title: "first todos",
      todos: [
        {
          txt: "make dinner",
          doneAt: null
        },
        {
          txt: "make breakfast",
          doneAt: 187111111
        }]
    }
    ))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'todos-list',
      label: "friends",
      title: "second todos",
      backgroundColor: "#dff698",
      todos: [
        {
          txt: "meeting tonight",
          doneAt: null
        },
        {
          txt: "learn together",
          doneAt: 187111111
        }]
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'video',
      videoUrl: "https://youtube.com/watch?v=uF9ujvYEy5U&si=EnSIkaIECMiOmarE",
      title: "first video"
    })),
      notes.push(createNote({
        id: utilService.makeId(),
        noteType: 'video',
        videoUrl: "https://youtube.com/watch?v=Zc7YS6JnKxQ&si=EnSIkaIECMiOmarE",
        title: "second video"
      }))
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

