// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array con los tiempos y fragmentos de Bruno Mars - That's What I Like
var lyricsData = [
  { text: "Hey, I got a condo in Manhattan", time: 6 },
  { text: "Baby girl, what's happening?", time: 10 },
  { text: "Jump in the Cadillac", time: 36 },
  { text: "Girl, let's put some miles on it", time: 39 },
  { text: "Anything you want just to put a smile on it", time: 43 },
  { text: "You deserve it, baby, you deserve it", time: 47 },
  { text: "Strawberry champagne", time: 54 },
  { text: "Lucky for you, that's what I like", time: 59 },
  { text: "That's what I like", time: 63 },
  { text: "Lucky for you, that's what I like", time: 67 },
  { text: "That's what I like", time: 71 },
  // Puedes encontrar la letra completa y oficial buscando la canción en Google si deseas agregar más líneas.
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

// Función para ocultar el título
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

// Ocultar título a los 211 segundos (duración aproximada del video)
setTimeout(ocultarTitulo, 211000);
