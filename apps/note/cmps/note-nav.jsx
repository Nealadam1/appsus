import { Labels } from "../../../cmps/labels.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteNav({ className }) {
    return <section className="nav-container">
        <aside className={className}>
            <NavLink to="">Notes</NavLink>
            <Labels />
            <NavLink to="">Archive</NavLink>
            <NavLink to="">Trash</NavLink>

        </aside>
        <div className="edit-label">
            <Outlet />
        </div>

    </section>
}