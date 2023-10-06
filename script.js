let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let songIndex = 0;
const currentTimeDisplay = document.querySelector('timestamp');

let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [{
        songName: "town",
        filePath: "songs/song1.mp3",
        coverPath: "https://i.pinimg.com/736x/d5/05/ee/d505ee867802323770ec4b02a9134b25.jpg"
    },
    {
        songName: "wohoo",
        filePath: "songs/song2.mp3",
        coverPath: "https://images.template.net/90560/music-album-cover-template-05xmk.jpeg"
    },
    {
        songName: "Beat",
        filePath: "songs/song3.mp3",
        coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4CizKs6VxFXB6SZpF4dv27Gvk3RSqdyl4NoN99MUzg9kNtYeEnXKgYWf3A3hOUHY8XRU&usqp=CAU"
    },
    {
        songName: "trip",
        filePath: "songs/song4.mp3",
        coverPath: "https://marketplace.canva.com/EAFWz37wwl0/1/0/1600w/canva-black-minimalist-photocentric-rose-on-fire-hip-hop-album-cover-laJL2q01ZUU.jpg"
    }, {
        songName: "beap",
        filePath: "songs/song5.mp3",
        coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlo1SEctH8EtnneE5uAPCOsw_ZFmfDnLB6_7RwyhkUThz0t5ms-D5VEajd_n5imS1f2g&usqp=CAU"
    },
    // Add more song objects as needed
];

let audioElement = new Audio(songs[0].filePath);
const currentTime = audioElement.currentTime;
const duration = audioElement.duration;
const minutes = Math.floor(currentTime / 60);
const seconds = Math.floor(currentTime % 60);
const totalMinutes = Math.floor(duration / 60);
const totalSeconds = Math.floor(duration % 60);



function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


//play pause logic 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; //gif audio beat

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; //gif audio beat


    }
});





songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

function updateTimestampDisplay() {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);

    // Loop through all the songItem elements and update their timestamp
    songItems.forEach((element, index) => {
        const timestampElement = element.querySelector(".timestamp");

        if (index === songIndex) {
            // Highlight the currently playing song's timestamp
            timestampElement.style.color = "black";


        } else {
            timestampElement.style.color = "transparent";


        }
        timestampElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    });
}


//range bar logic
audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration

    ) * 100);


    updateTimestampDisplay();

    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })

}


//small play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', function(e) {
        // If the audio is playing, pause it; otherwise, play it
        if (!audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');

            gif.style.opacity = 0; // Hide the audio beat GIF
        } else {
            makeAllPlays();

            songIndex = index;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');

            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1; // Show the audio beat GIF

            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});


//previous && next
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Handle looping to the last song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; //gif audio beat

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Handle looping to the first song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; //gif audio beat

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
