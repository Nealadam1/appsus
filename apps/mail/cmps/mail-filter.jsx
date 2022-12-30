const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
export function MailFilter({ setFilter }) {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [searchParams, setSearchParams] = useSearchParams({})

    useEffect(() => {
        // Query params later
        // console.log('mail-filter query params');
        // console.log(Object.fromEntries([...searchParams]))
        // console.log(filterBy[]);

    }, [])
    useEffect(() => {
        setFilter(filterBy)
        // setSearchParams(filterBy)

        return () => {
        }
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        let filterValue = value.split(':')
        if (filterValue.length === 0) {
            // setSearchParams(mailService.getDefaultFilter())
            setFilterBy(mailService.getDefaultFilter())
        }

        if (filterValue.length > 1) {
            setFilterBy(prevFilter => {
                // setSearchParams(mailService.getDefaultFilter())

                return { ...prevFilter, [filterValue[0]]: filterValue[1] }
            })
        }
        else {
            setFilterBy(prevFilter => {
                return { ...prevFilter, [field]: value }
            })
        }
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilter(filterBy)
    }

    return <form className="filter-bar" onSubmit={onSubmitFilter}>
        <input type="text"
            id="filterMail"
            name="mail"

            placeholder="Search mail"
            list="filter-options"
            onChange={utilService.debounce(handleChange)}
        />

        <datalist id="filter-options">
            <option value="subject:" label="Filter by subject"></option>
            <option value="name:" label="Filter by title"></option>
            <option value="label:" label="Filter by label"></option>
        </datalist>
    </form>
}
