
const { Link } = ReactRouterDOM

export function NotePreview({ note }) {

  return (
    <article className="note-preview">
      {note.info.title && <h1> {`title: ${note.info.title}`}</h1>}
      {note.id && <div> {`id: ${note.id}`}</div>}
      {note.type && <div> {`type: ${note.type}`}</div>}
      {note.info.txt && <div> {`text: ${note.info.txt}`}</div>}
      {note.info.url && <div> {`url: ${note.info.url}`}</div>}
      <Link to={`/note/edit/${note.id}`}>✏️</Link>
      {/* <Link to={`/note/edit/${note.id}`}>noteasdasdadsas</Link> */}
      {/* {note.info.title && <h2> {`Note title: ${note.info.title}`}</h2>} */}
    </article >


  )
}