

export function NotePreview({ note }) {

  return (
    <article className="note-preview">
      {note.id && <h2> {`id: ${note.id}`}</h2>}
      {note.type && <h2> {`type: ${note.type}`}</h2>}
      {note.info.title && <h2> {`title: ${note.info.title}`}</h2>}

      {/* {note.info.title && <h2> {`Note title: ${note.info.title}`}</h2>} */}
    </article >


  )
}