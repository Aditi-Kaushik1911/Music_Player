// Song data
const songs = [
    {
        title: "Song 1",
        src: "song1.mp3",
        cover: "cover1.jpeg"
    },
    {
        title: "Song 2",
        src: "song2.mp3",
        cover: "cover2.jpeg"
    },
    {
        title: "Song 3",
        src: "song3.mp3",
        cover: "cover3.jpeg"
    }
];

let currentSongIndex = 0;
const audio = new Audio();
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const coverImage = document.getElementById("cover");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

// Load song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    coverImage.src = song.cover;
}

// Format time (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

// Play or Pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶️";
    }
}

// Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.textContent = "⏸️";
}

// Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.textContent = "⏸️";
}

// Update Progress
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.value = progress;
    currentTimeElement.textContent = formatTime(audio.currentTime);
    durationElement.textContent = formatTime(audio.duration || 0);
});

// Seek Song
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Confirmation Before Closing
window.addEventListener("beforeunload", (event) => {
    if (!audio.paused) {
        event.preventDefault();
        event.returnValue = "You are listening to a song. Are you sure you want to leave?";
    }
});

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Initial Load
loadSong(currentSongIndex);
