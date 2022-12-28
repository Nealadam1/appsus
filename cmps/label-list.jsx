export function LabelList({labels, onRemoveLabel} ) {
    console.log(labels)
    return <ul className="label-list">

        {(labels&&labels.length) && labels.map(label => <li key={label.id}>
            {label.labelName}</li>)}
    </ul>

}