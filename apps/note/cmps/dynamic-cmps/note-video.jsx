import { youtubeService } from "../../services/youtube.service.js"

export function NoteVideo({ info }) {
    const { url, title } = info
    return <div className="video-preview">
        <h3>{title}</h3>
        <div className="youTube-container">
            {youtubeService.getVideoByUrl(url) }
        </div>
      
    </div>

}