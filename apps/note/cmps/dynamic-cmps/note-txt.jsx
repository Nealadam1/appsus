export function NoteTxt({ info }) {
    const { txt, title } = info
    return <div className="note-text-container">
        <h3>{title}</h3>
        <pre>{txt}</pre>
    </div>

}