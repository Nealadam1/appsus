const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function MailCompose() {
    return <div className="compose-link-container"><Link to="/mail/compose"><i className="fa-solid fa-pencil"></i><span> Compose</span></Link></div>
}