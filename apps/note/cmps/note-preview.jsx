import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM



export function NotePreview({note,onOpenEdit}) {
    return  <article className="note-preview">
            <Link className="fa-solid fa-pen-to-square" onClick={()=>onOpenEdit()} to={`/note/edit/${note.id}`}></Link>
            <DynamicCmp id={note.id} type={note.type} info={note.info} style={note.style} />
        </article>
    
  
}