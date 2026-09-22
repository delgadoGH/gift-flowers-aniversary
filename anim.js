// Sincronizar las letras con la canción de Bruno Mars
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos con cada línea y su segundo exacto de aparición
var lyricsData = [
  { text: "Hey, I got a condo in Manhattan", time: 6 },
  { text: "Baby girl, what's happening?", time: 10 },
  { text: "You and your ass invited", time: 13 },
  { text: "So gon' get to clapping", time: 15 },
  { text: "Go pop it for me, pop it for me", time: 17 },
  { text: "Turn around and drop it for me", time: 20 },
  { text: "Jump in the Cadillac", time: 36 },
  { text: "Girl, let's put some miles on it", time: 39 },
  { text: "Anything you want just to put a smile on it", time: 43 },
  { text: "You deserve it, baby, you deserve it", time: 47 },
  { text: "Gold jewelry shine, it's so bright", time: 51 },
  { text: "Strawberry champagne", time: 54 },
  { text: "Lucky for you, that's what I like", time: 59 },
  { text: "That's what I like", time: 63 },
  { text: "Lucky for you, that's what I like", time: 67 },
  { text: "That's what I like", time: 71 },
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
