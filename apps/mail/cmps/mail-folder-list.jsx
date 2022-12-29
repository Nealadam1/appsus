
export function MailFolderList({ displayDeleted }) {
    console.log(displayDeleted);
    return <div>
        <button onClick={() => displayDeleted(true)}>Deleted</button>
    </div>
}