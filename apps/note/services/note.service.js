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
      txt: "avaScript is the world's most popular programming language JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced. ",
      title: "Js"
    }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'text',
      txt: "As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following hello world example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.",
      title: "NodeJs"
    }))
    // notes.push(createNote({
    //   id: utilService.makeId(),
    //   noteType: 'img',
    //   imgUrl: "blob:http://127.0.0.1:5500/9e9acc23-90e9-4b3c-8765-a28795d92990",
    //   title: "img"
    // }))
    // notes.push(createNote({
    //   id: utilService.makeId(),
    //   noteType: 'img',
    //   imgUrl: "blob:http://127.0.0.1:5500/fefd7398-886e-4707-82fe-6d8bfc4def4f",
    //   title: "img"
    // }))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'text',
      txt: "At npm, Inc., we're proud to dedicate teams of full-time employees to operating the npm Registry, enhancing the CLI, improving JavaScript security, and other projects that support and nurture a vibrant open source community.",
      title: "Npm",
    }
    ))
    notes.push(createNote({
      id: utilService.makeId(),
      noteType: 'text',
      txt: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
      title: "React",
    }
    ))
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

