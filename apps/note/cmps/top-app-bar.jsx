const { useRef, useEffect } = React;

export function TopAppBar({ currentFilter, setFilter }) {
  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current.focus()
  }, [])

  function updateFilter(ev) {
    ev.preventDefault()
    let { name: field, value } = ev.target
    console.log('field:', field)
    console.log('target:', ev.target)
    console.log('value:', value)
    setFilter((currentFilter) => {
      const x = {
        ...currentFilter,
        [field]: value
      }
      console.log('x:', x)
      return x
    })
  }

  return (
    <div className='top-app-bar'>
      <h2>Filter our notes</h2>
      <form onSubmit={updateFilter}>
        <label htmlFor="note-txt">text:</label>
        <input type="text"
          id="note-txt"
          name="txt"
          placeholder="By text"
          // value={}//setFilter?
          onChange={updateFilter}
          ref={elInputRef}
        />
        <br />
        <label htmlFor="noteType">type:</label>
        <select
          id="noteType"
          name="noteType"
          placeholder="By note type"
          // value={filterByToEditState.noteType}//setFilter?
          onChange={updateFilter}>
          <option value="all">all</option>
          <option value="text">text</option>
          <option value="todos-list">todos-list</option>
          <option value="img">img</option>
          <option value="video">video</option>
        </select>

        <button>Filter notes!</button>
      </form>
      {/* {console.log(':',)} */}
    </div>
  )
}