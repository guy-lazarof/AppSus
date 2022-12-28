
export const notesDemoData = {
  notes
}

function notes() {
  return (
    [{
      id: "n101",
      type: "note-txt",
      isPinned: true,
      info: {
        txt: "Fullstack Me Baby!",
        title: "first note"
      }
    }, {
      id: "n102",
      type: "note-img",
      info: {
        url: "http://some-img/me",
        title: "second note"
      }, style: {
        backgroundColor: "#00d"
      }
    }, {
      id: "n103",
      type: "note-todos",
      info: {
        label: "Get my stuff together",
        title: "third note",
        todos: [
          {
            txt: "Driving liscence",
            doneAt: null
          },
          {
            txt: "Coding power",
            doneAt: 187111111
          }
        ]
      }

    }
    ]
  )
}