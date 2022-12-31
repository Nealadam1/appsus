const { Link, NavLink } = ReactRouterDOM
const { useState } = React
import testImg from 'assets/img/testaaaa.jpg'

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <header className="app-header header">

        <Link className="img-container" to="/">
            <img className="logo" src="assets/img/testaaaa.jpg" alt="img" />
        </Link>
        <nav>
            <button className="app-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}><i class="fa-solid fa-square-caret-down"></i></button>

            <div className={(!isMenuOpen ? "closed" : "open") + " link-container"}>
                <NavLink to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(!isMenuOpen)}>About</NavLink>
                <NavLink to="/mail" onClick={() => setIsMenuOpen(!isMenuOpen)}>Mail</NavLink>
                <NavLink to="/note" onClick={() => setIsMenuOpen(!isMenuOpen)}>Note</NavLink>
            </div>
        </nav>
    </header>
}