const { useState, useEffect } = React

export function MailFilter() {
    const [filterBy, setFilterBy] = useState(null)

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(value);
        setFilterBy()
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()

    }

    return <form onSubmit={onSubmitFilter}>
        <input type="text"
            id="filterMail"
            name="filterMail"
            placeholder="Search mail"
            onChange={handleChange}
        />
    </form>
}