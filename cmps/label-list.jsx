export function LabelList({labels, onRemoveLabel} ) {
    return <div className="label-list">

        {(labels&&labels.length) && labels.map(label => <i style={{backgroundColor: label.color}} className="fa-solid fa-tag" key={label.id}>
            {label.labelName}</i>)}
    </div>

}