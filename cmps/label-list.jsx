export function LabelList({labels, onRemoveLabel} ) {
    return <ul className="label-list">

        {(labels&&labels.length) && labels.map(label => <li key={label.id}>
            {label.labelName}</li>)}
    </ul>

}