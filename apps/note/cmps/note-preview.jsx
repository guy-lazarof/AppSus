

export function NotePreview() {
  const note1 = {
    id: "n101",
    type: "note-txt",
    isPinned: true,
    info: {
      txt: "Fullstack Me Baby!"
    }
  }

  const note2 = {
    id: "n102",
    type: "note-img",
    info: {
      url: "http://some-img/me",
      title: "Bobi and Me"
    }, style: {
      backgroundColor: "#00d"
    }
  }

  return (
    <div className="note-preview" >
      <section className='grid-note-container'>
        <div className='note-title'>${robot.fname}</div>
        <div className='note-'>Phone: ${robot.Phone}</div>
        <div className='city'>City: ${robot.City}</div>
        <div className='state'>State: ${robot.State}</div>
        <div className='zip'>Zip: ${robot.Zip}</div>
        {note1.id}
        {note2.id}
      </section>
    </div >

  )
}