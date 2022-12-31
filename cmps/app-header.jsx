const { useParams, useNavigate, Link, NavLink, useLocation } = ReactRouterDOM

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx";
import { } from "appsus/assets/img/icon.png"


export function AppHeader() {
    let { pathname } = useLocation()
    // console.log(pathname);

    return <header className="app-header header">
        <Link className="img-container" to="/">
            <img className="logo" src="appsus/assets/img/icon.png" alt="" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
