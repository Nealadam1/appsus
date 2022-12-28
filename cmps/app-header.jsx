const { useParams, useNavigate, Link, NavLink, useLocation } = ReactRouterDOM

import { MailSideMenu } from "../apps/mail/cmps/mail-side-menu.jsx"

export function AppHeader() {
    let { pathname } = useLocation()
    console.log(pathname);

    return <header className="app-header">
        <Link className="img-container" to="/">
            {(pathname === '/mail') && <MailSideMenu />}
            <img className="logo" src="../assets/img/icon.png" alt="" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
