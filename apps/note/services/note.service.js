// import { utilService } from './util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
// _createNotes()

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
      // if (filterBy.importance) {
      //   notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
      // }
      return notes
    })
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

function getEmptyNote(type = '', info = '') {
  return { type, info }
}

function getDefaultFilter() {
  return { txt: '' }
}

function _createNotes() {
  let cars = utilService.loadFromStorage(NOTE_KEY)
  if (!cars || !cars.length) {
    cars = []
    cars.push(_createCar('audu', 300))
    cars.push(_createCar('fiak', 120))
    cars.push(_createCar('subali', 50))
    cars.push(_createCar('mitsu', 150))
    cars.push(_createCar('audu', 250))
    cars.push(_createCar('fiak', 180))
    cars.push(_createCar('subali', 35))
    cars.push(_createCar('mitsu', 135))
    utilService.saveToStorage(NOTE_KEY, cars)
  }
}

function _createNotes(type, info) {
  const note = getEmptyNote(type, info)
  note.id = utilService.makeId()
  return note
}