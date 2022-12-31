const { useRef, useEffect, useState } = React;

export function TopAppBar({ setFilter }) {
  const elInputRef = useRef(null)

  const [showFilterSelectState, setShowFilterSelectState] = useState(false)

  // useEffect(() => {
  //   elInputRef.current.focus()
  // }, [])

  function updateFilter(ev) {
    ev.preventDefault()
    let { name: field, value } = ev.target
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [field]: value
      }
    })
  }
  function showFilterSelect() {
    setShowFilterSelectState(() => true)
  }
  function hideFilterSelect() {
    setShowFilterSelectState(() => null)
  }


  return (
    <div className='top-app-bar'>
      <div className='note-logo'> Keep <i className="note-logo-icon fa-regular fa-lightbulb"></i></div>

      <form className='note-filter' >
        <input type="text"
          id="note-txt"
          name="txt"
          placeholder="Search note"
          onChange={updateFilter}
          ref={elInputRef}
          className='note-search'
          onFocus={() => showFilterSelect()}
        />

        {showFilterSelectState &&

          <select
            id="noteType"
            name="noteType"
            placeholder="By note type"
            onChange={updateFilter}
            className='note-filter-select'
          >

            <option value="all">all</option>
            <option value="text">text</option>
            <option value="todos-list">todos-list</option>
            <option value="img">img</option>
            <option value="video">video</option>
          </select>}
      </form>
      <div className='note-top-buttons'>
        <i className="fa-solid fa-gear"></i>
        <i className="fa-regular fa-rectangle-list"></i>
        <i className="fa-solid fa-rotate-right"></i>
      </div>
    </div >
  )
} 