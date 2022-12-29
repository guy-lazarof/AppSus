const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteFilter({ onSetFilter }) {

  const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())
  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current.focus()
  }, [])

  useEffect(() => {
    // update father cmp that filters change very type
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { name: field, type } = target
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    // update father cmp that filters change on submit
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  // WE WILL NEVER REPEAT OURSELVES
  // function handleVendorChange(ev) {
  //     console.log('ev', ev.target.name);
  //     const { value } = ev.target
  //     setFilterByToEdit((prevFilter) => {
  //         return { ...prevFilter, txt: value }
  //     })
  //     // filterByToEdit.txt = value
  //     // setFilterByToEdit(filterByToEdit)
  // }

  // function handleMinSpeedChange(ev) {
  //     console.log('ev', ev.target.name);
  //     const { value } = ev.target
  //     setFilterByToEdit((prevFilter) => {
  //         return { ...prevFilter, minSpeed: value }
  //     })
  // }
  // console.log('elInputRef', elInputRef);
  return <section className="note-filter full main-layout">
    <h2>Filter our notes</h2>
    {console.log(filterByToEdit)}
    {console.log(elInputRef)}
    <form onSubmit={onSubmitFilter}>
      <label htmlFor="txt">text:</label>
      <input type="text"
        id="txt"
        name="txt"
        placeholder="By text"
        value={filterByToEdit.txt}
        onChange={handleChange}
        ref={elInputRef}
      />

      {/* <label htmlFor="minSpeed">Min speed:</label>
      <input type="number"
        id="minSpeed"
        name="minSpeed"
        placeholder="By min speed"
        value={filterByToEdit.minSpeed}
        onChange={handleChange}
      /> */}

      <button>Filter notes!</button>
    </form>

  </section>
}