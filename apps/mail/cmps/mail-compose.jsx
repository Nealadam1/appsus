const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function MailCompose() {
    return <div><Link to="/mail/compose">Compose</Link></div>
}