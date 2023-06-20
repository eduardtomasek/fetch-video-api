# [Sunday Projects]

# ENV File
```
DEFAULT_OUTPUT="%(upload_date)s - %(title)s (%(uploader)s,%(id)s)"
DEFAULT_FORMAT=bestvideo[height<=960][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=960]+bestaudio
DEFAULT_USER_AGENT="Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0"
DEFAULT_SUBTITLES=en,cs

YT_DLP_BINARY=D:\.bin\yt-dlp.exe
VIDEO_STORE_FOLDER=D:\videos\important-videos
```

# Usage
````shell
http://localhost:7896/download?url=<youtube-url>
````