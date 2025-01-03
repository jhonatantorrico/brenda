const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

/* Playlist */
const songs = [
    {
        name: '../musica/song1',
        displayName: 'San Lucas',
        artista: 'Kevin Kaarl',
    },
    {
        name: '../musica/song2',
        displayName: 'Ladrando a la Luna',
        artista: 'Kudai',
    },
    {
        name: '../musica/song3',
        displayName: '¿Cómo pasó?',
        artista: 'Ela Taubert',
    },
    {
        name: '../musica/song4',
        displayName: 'Love Scenary',
        artista: 'IKON',
    },
];

// Para ver si esta reproduciendo la musica //
let isPlaying = false;

/* Función Play */
function playSong() {
    isPlaying = true;
    playBtn.setAttribute('name', 'pause');
    playBtn.setAttribute('titulo', 'pause');
    music.play();
}

/* Function Pause */
function pauseSong() {
    isPlaying = false;
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('titulo', 'play');
    music.pause();
}

// Al hacer click en el boton play activa las funciones Play o Pause, dependiendo si está reproduciendo o no
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

/* Funcion Leer Cancion */
function loadSong(song) {
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `musica/${song.name}.mp3`;
}

/* Cancion Actual */
let songIndex = 0;

/* Anterior Cancion */
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; 
    }

    loadSong(songs[songIndex]);
    playSong();
}

/* Siguiente Canción */
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Al cargar las canciones se leerá la primera canción
loadSong(songs[songIndex]);

/* Actualizar la barra de progreso y el tiempo de la canción */
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;  //Actualiza la barra de progreso
        progress.style.width = `${progressPercent}%`;  //Cambia la propiedad css de progress
        const durationMinutes = Math.floor(duration / 60);  //Calcula la duración total en minutos 
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            duracion.textContent = `0${durationMinutes} : ${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60); //calcula la deración total del recorrido de la canción
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        if (currentSeconds) {
            tiempoActual.textContent = `${currentMinutes} : ${currentSeconds}`;
        }
    }
}

// Mostrar la barra de progreso
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);