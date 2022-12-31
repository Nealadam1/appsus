const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <header className="app-header header">

        <Link className="img-container" to="/">
            <img className="logo" src="cmps/test.png" alt="img" />
        </Link>
        <nav>
            <button className="app-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa-solid fa-square-caret-down"></i></button>

            <div className={(!isMenuOpen ? "closed" : "open") + " link-container"}>
                <NavLink to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(!isMenuOpen)}>About</NavLink>
                <NavLink to="/mail" onClick={() => setIsMenuOpen(!isMenuOpen)}>Mail</NavLink>
                <NavLink to="/note" onClick={() => setIsMenuOpen(!isMenuOpen)}>Note</NavLink>
            </div>
        </nav>
    </header>
}