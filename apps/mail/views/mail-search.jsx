const { useState} = React
const { Link } = ReactRouterDOM

import { emailService } from '../services/mail.service.js';

export function MailSearch({ onSetFilter, isLoading }) {

    const [filterByToEdit, setFilterByToEdit] = useState(emailService.getDefaultFilter())
    const [filterType, setFilterType] = useState('subject')

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handelChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onChangeFilter({ target }) {
        setFilterType(target.value)
    }

    return (
        !isLoading && (
            <div className = "header">
                <div className="logo-area"><Link to={`/mail`}>
                    <i className="logo fa-regular fa-envelope"> Gmail</i></Link>
                </div>
            <form className="search-form" onSubmit={handleSubmit} onChange={handelChange}>
                    <label htmlFor={filterType}></label><i className="fa-solid fa-magnifying-glass"></i>
                    <input className ="search-mail" type="text" id={filterType} name={filterType}></input>
                    <label htmlFor="search-filter"></label>
                    <select id="search-filter" name={filterType}  onChange={onChangeFilter}>
                    <option value="subject" name="subject" id="subject">Subject</option>
                        <option value="author" name="author" id="author">Author</option>
                    </select>
                    <button type="submit">Search</button>
            </form>
            </div>
        )
    )
}
