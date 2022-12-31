import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate, useLocation, useSearchParams } = ReactRouterDOM



export function NotePreview({ note, onOpenEdit }) {
    const location = useLocation();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams({})

    function getNoteData() {
        new URL('http://127.0.0.1:5503/#/note?hello=world');
    }


    // to={'/mail/compose'}
    return <article className="note-preview">
        <Link className="fa-solid fa-pen-to-square" onClick={() => onOpenEdit()} to={`/note/edit/${note.id}`}></Link>
        {/* <Link className="mail-btn fa-solid fa-envelope" to={''} onClick={getNoteData}></Link> */}
        <DynamicCmp id={note.id} labels={note.labels} type={note.type} info={note.info} style={note.style} />
    </article>


}