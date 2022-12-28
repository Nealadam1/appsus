export function NoteImg({ info }) {
  const {url,title} =info
  return <div className="img-preview">
    <h3>{title}</h3>
   <img src={url} alt="Note Image Preview" />
  </div>
}