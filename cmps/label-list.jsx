import { noteService } from "../apps/note/services/note.service.js"

export function LabelList({labels,onSetFilter} ) {
    return <div className="label-list">

        {(labels&&labels.length) && labels.map(label => <i onClick={()=>{
            const filter=noteService.getDefaultFilter()
            filter.labels=[]
            filter.labels.push(label.labelName)
            onSetFilter(filter)
            }} style={{backgroundColor: label.color}} className="fa-solid fa-tag" key={label.id}>
            {label.labelName}</i>)}
    </div>

}