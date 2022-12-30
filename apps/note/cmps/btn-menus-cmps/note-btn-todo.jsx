import { noteService } from "../../services/note.service.js";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;
const options = [
    { value: '#ffe666', label: '' },
    { value: '#f5c27d', label: '' },
    { value: '#f6cebf', label: '' },
    { value: '#e3b7d2', label: '' },
    { value: '#bfe7f6', label: '' },
    
]

export function BtnSetColor({ note, onSetBackgroundColor }) {
    function handleChange({ target }) {
        note.style = target.value
        noteService.save(note).then(console.log(note))
        onSetBackgroundColor(note.id)
        
        
    }

    return <select onChange={handleChange} className="color-menu">
        {options.map(option => {
            return <option key={option.value} value={option.value}>
                {option.label}
            </option>
        })}

    </select>
}