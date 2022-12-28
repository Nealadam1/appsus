const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NotePreview(note) {
    return <Link to={`/note/edit/${note.id}`}>
        <article className="note-preview">
            <DynamicCmp type={note.type} info={note.info} style={note.style} />

        </article>
    </Link>
}