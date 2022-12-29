import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM



export function NotePreview({note,onOpenEdit}) {
    console.log('note from preview:', note)
    return <Link onClick={()=>onOpenEdit()} to={`/note/edit/${note.id}`}>
        <article className="note-preview">
            <DynamicCmp type={note.type} info={note.info} style={note.style} />
        </article>
    </Link>

  
}