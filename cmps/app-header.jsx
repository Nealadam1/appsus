const { useParams, useNavigate, Link, NavLink, useLocation } = ReactRouterDOM

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx";
export function AppHeader() {
    let { pathname } = useLocation()

    return <header className="app-header header">

        <Link className="img-container" to="/">
            <img className="logo" src="../assets/img/icon.png" alt="img" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}