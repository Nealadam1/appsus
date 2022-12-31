import { Labels } from "../../../cmps/labels.jsx"
import { noteService } from "../services/note.service.js"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM


export function NoteNav({ className, onSetFilter }) {
    return <section className="nav-container">
        <aside className={className}>
            <div onClick={()=>{
                const filter=noteService.getDefaultFilter()
                onSetFilter(filter)}}>
                <i className="fa-solid fa-note-sticky"></i><span>Notes</span>
            </div>
            <div>
                <Labels onSetFilter={onSetFilter} />
            </div>
            <div onClick={()=> {
                const filter=noteService.getDefaultFilter()
                filter.isArchived=true
                onSetFilter(filter)
                }}>
                <i className="fa-solid fa-box-archive"></i><span>Archive</span>
            </div>
            <div onClick={()=> {
                const filter=noteService.getDefaultFilter()
                filter.isTrash=true
                onSetFilter(filter)
                }}>
                <i className="fa-solid fa-trash"></i><span>Trash</span>
            </div>

        </aside>
        <div className="edit-label">
            <Outlet />
        </div>

    </section>
}