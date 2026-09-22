// Sincronizar las letras con el nuevo fragmento de la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de letras ajustado para este fragmento (2:35 a 3:22)
var lyricsData = [
  { text: "But here I am, baby. Here I am, baby.", time: 0 },
  { text: "What's on your mind?", time: 10 },
  { text: "If you want it, girl, come and get it.", time: 13 },
  { text: "This is here for you.", time: 17 },
  { text: "Tell me baby, tell me, tell me baby, what you trying to do?", time: 21 },
  { text: "Shining bright. Strawberry champagne for you.", time: 30 },
  { text: "That's what I like. That's what I like.", time: 34 },
  { text: "That's what I like by the fire and diamonds.", time: 42 },
  { text: "I like it. That's why I like it.", time: 47 }
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  
  // Si la canción llega al segundo 203 (minuto 3:23), la devolvemos al inicio del fragmento (segundo 155)
  if (time >= 203) {
    audio.currentTime = 155;
  }

  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 4
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

// Función para ocultar el título inicial
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

setTimeout(ocultarTitulo, 10000);
