import { NoteImgEdit } from "./note-img-edit.jsx"
import { NoteTodosEdit } from "./note-todos-edit.jsx"
import { NoteTxtEdit } from "./note-txt-edit.jsx"
import { NoteVideoEdit } from "./note-video-edit.jsx"


export function DynamicCmpEdit(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteTxtEdit {...props} />
        case 'note-img':
            return <NoteImgEdit {...props} />
        case 'note-todos':
            return <NoteTodosEdit {...props} />
        case 'note-video':
            return <NoteVideoEdit {...props} />
    }
}