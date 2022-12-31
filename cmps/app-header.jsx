const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <header className="app-header header">

        <Link className="img-container" to="/">
            <img className="logo" src="../assets/img/icon.png" alt="img" />
        </Link>
        <nav>
            <button className="app-menu">Menu</button>

            <div className="link-container">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </div>
        </nav>
    </header>
}