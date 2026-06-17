interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

// YouTube video IDs are exactly 11 characters from [A-Za-z0-9_-].
// Some generated MDX pass placeholders ("N/A", sentences) when no video was found;
// guard against those so we never emit a malformed embed URL.
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

export function YouTubeEmbed({ videoId, title = "YouTube video" }: YouTubeEmbedProps) {
  if (!videoId || !YOUTUBE_ID_RE.test(videoId)) {
    return null
  }

  return (
    <div className="my-4">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
