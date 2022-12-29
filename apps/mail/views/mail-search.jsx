const { useState, useEffect, useRef } = React

import { emailService } from '../services/mail.service.js';

export function MailSearch({ mails, onSetFilter, isLoading }) {

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
        console.log(target.value)
        setFilterType(target.value)
    }

    return (
        !isLoading && (
            <div className = "header">
                <div className="logo-area">
                    <i className="logo fa-regular fa-envelope"> Gmail</i>
                </div>
            <form className="search-form" onSubmit={handleSubmit} onChange={handelChange}>
                    <label htmlFor={filterType}></label><i className="fa-solid fa-magnifying-glass"></i>
                    <input className ="search-mail" type="text" id={filterType} name={filterType}></input>
                    <label htmlFor="search-filter"> Filter by:</label>
                    <select id="search-filter" name="searchFilter"  onChange={onChangeFilter}>
                        <option value="subject">Subject</option>
                        <option value="author">Author</option>
                    </select>
                    <button type="submit">Search</button>
            </form>
            </div>
        )
    )
}
