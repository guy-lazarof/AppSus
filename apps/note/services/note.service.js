// import { utilService } from './util.service.js'
import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        notes = notes.filter(note => regex.test(note.info.title))
      }
      if (filterBy.noteType === 'all') {
        console.log('allNotes:', notes)
        return notes
      }
      notes = notes.filter(note => note.noteType === filterBy.noteType)
      // console.log('notes with filter:', note.noteType)

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

function getEmptyNote(noteType = '', info = '') {
  return { noteType, info }
}

function getDefaultFilter() {
  return { txt: '', noteType: 'all' }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(_createNote('text', {
      txt: "txttt!",
      title: "15 first txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txtfirst txt"
    }))
    notes.push(_createNote('text', {
      txt: "txt!",
      title: "second txt"
    }))
    notes.push(_createNote('img', {
      url: "http://some-img/me",
      title: "first img"
    }))
    notes.push(_createNote('img', {
      url: "http://some-img/me",
      title: "second img"
    }))
    notes.push(_createNote('todos-list', {
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
    notes.push(_createNote('todos-list', {
      label: "friends",
      title: "second todos",
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
    notes.push(_createNote('video', {
      url: "https://youtube.com/watch?v=uF9ujvYEy5U&si=EnSIkaIECMiOmarE",
      title: "first video"
    }))
    notes.push(_createNote('video', {
      url: "https://youtube.com/watch?v=Zc7YS6JnKxQ&si=EnSIkaIECMiOmarE",
      title: "second video"
    }))
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote(noteType, info) {
  const note = getEmptyNote(noteType, info)
  note.id = utilService.makeId()
  return note
}