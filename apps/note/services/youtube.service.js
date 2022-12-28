export const youtubeService={
    getVideoByUrl
}

function getVideoByUrl(url) {
    const videoId = url.split("v=")[1]
    const embedCode = <iframe
    width="560" height="315" 
    src={`https://www.youtube.com/embed/${videoId}`} 
    frameBorder="0" allow="accelerometer; 
    autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture" allowFullScreen>
    </iframe>;

    return embedCode
}