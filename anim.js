// Sincronizar las letras con la canción de Bruno Mars
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos con cada línea y su segundo exacto de aparición
var lyricsData = [
  { text: "Hey, Hey, Hey", time: 3 },
  { text: "I got a condo in Manhattan", time: 5 },
  { text: "Baby girl, what's happening?", time: 6 },
  { text: "You and your ass invited", time: 8 },
  { text: "So gon' get to clapping", time: 10 },
  { text: "Go pop it for me, pop it for me", time: 12 },
  { text: "Turn around and drop it for me", time: 15 },
  { text: "Jump in the Cadillac", time: 20 },
  { text: "Girl, let's put some miles on it", time: 23 },
  { text: "Anything you want just to put a smile on it", time: 26 },
  { text: "You deserve it, baby, you deserve it", time: 29 },
  { text: "Gold jewelry shine, it's so bright", time: 31 },
  { text: "Strawberry champagne", time: 33 },
  { text: "Lucky for you, that's what I like", time: 35 },
  { text: "That's what I like", time: 37 },
  { text: "Lucky for you, that's what I like", time: 40 },
  { text: "That's what I like", time: 42 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    var fadeInDuration = 0.1;
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Función para ocultar el título (duración ajustada a la canción, ej. 211 segundos)
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

setTimeout(ocultarTitulo, 211000);
