import { labelService } from "../services/label.service.js"
import { LabelList } from "./label-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes,Outlet,useParams,useNavigate } = ReactRouterDOM

export function Labels(){
    const [labels,setLabels] = useState([])
    useEffect(()=>{
        loadLabels()
    },[])

    function loadLabels(){
        labelService.query()
        .then(labels => {
            setLabels(labels)
            console.log(labels)
        })
    }
    return <div className='label-container'>
        {(labels)&& <LabelList labels={labels}/>}
        <Link to="/note/labeledit">Edit Labels</Link>

    </div>
}