
// const { useRef, useEffect } = React;

// export function NewNote({ setNewNote }) {
//   const elAddInputRef = useRef(null)

//   const [focuseState, setFocuseState] = React.useState(false)
//   const onFocus = () => setFocuseState(true)
//   const onBlur = () => setFocuseState(false)

//   function addNewNote(ev) {
//     ev.preventDefault()
//     let { name: field, value } = ev.target
//     console.log('field:', field)
//     console.log('target:', ev.target)
//     console.log('value:', value)
//     setNewNote(() => {
//       return {
//         [field]: value
//       }
//     })

//   }

//   return (
//     <div className='new-note'>
//       <form onSubmit={onFocosLeave}>
//         <input type="text"
//           id="new-note"
//           name="newNote"
//           placeholder="Write a new note..."
//           // value={}//setFilter?
//           onChange={updateFilter}
//           ref={elAddInputRef}
//         />

//       </form>
//     </div>
//   )
// }

// useEffect(() => {
//   elAddInputRef.current.focus()
// }, [])

